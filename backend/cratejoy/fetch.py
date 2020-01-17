from requests.auth import HTTPBasicAuth
from datetime import datetime
import sys
import requests
import json

API_URL = 'http://api.cratejoy.com/v1/'
API_URL_SHIPMENTS = API_URL + 'shipments/'
SECRET_KEYS = 'cratejoy_keys.json'
OUTPUT_FILE = 'data.json'

try:
    with open(SECRET_KEYS, 'r') as keysFile:
        keys = json.load(keysFile)

    CLIENT_ID = keys['CRATEJOY_API_ID']
    CLIENT_SKEY = keys['CRATEJOY_API_SECRET_KEY']
    print("Retrieved secret keys from", SECRET_KEYS)
except:
    print("Could not retrieve secret keys. Check your " + SECRET_KEYS + "file.")
    raise Exception("Bad secret keys")

GET_URL = API_URL_SHIPMENTS

response = {'start_time': None, 'end_time': None, 'data': []}

try:
    response['start_time'] = datetime.now().strftime('%Y-%M-%d %H:%M:%S')
    while GET_URL:
        print("Getting data from:", GET_URL)
        api_response = requests.get(GET_URL, auth=(CLIENT_ID, CLIENT_SKEY))
        api_response.raise_for_status()
        objs = api_response.json()
        if objs['next']:
            GET_URL = API_URL_SHIPMENTS + objs['next']
        else:
            GET_URL = None
        for obj in objs['results']:
            response['data'].append(obj)
    print("Finished retrieving API data.")
except:
    print("Error occured while retrieving API data.")
    print("URL of API:", GET_URL)
    raise Exception("Could not retrieve API data")
finally:
    response['end_time'] = datetime.now().strftime('%Y-%M-%d %H:%M:%S')
    sys.stdout = open(OUTPUT_FILE, 'w')
    print(response)
