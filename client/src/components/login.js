import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import crypto from "crypto";
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

export default function Login (props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [loginStatus, setLoginStatus] = useState("");
  //const [users, setUsers] = useState([]);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  useEffect(() => { }, []);
 
  // Social Media Login

  // API GET Request for Social Media User Data
  async function checkForSocial(user) {
    const res = await fetch(props.SOCIAL_API_URL + '/' + user );
    const api = await res.json();
    const social = api.result.result[0];
    return social;
  }

  async function grabSocialUserInfor(uid) {
    const res = await fetch(props.SOCIAL_API_URL + 'acc/' + uid );
    const api = await res.json();
    const login = api.result.result[0];
    return login;
  }

  const responseGoogle = (response) => {
    console.log(response);
    const e = response.Qt.zu;
    const fn = response.Qt.vW;
    const ln = response.Qt.wU;
    const tok = response.accessToken;
    const u = fn + ln;
    console.log(e)

    checkForSocial(e)
    .then(res => { console.log(res.user_id)
      grabSocialUserInfor(res.user_id)
      .then(res => socialLogin(res))
      .catch(err => console.log(err)) }
    )
    .catch(err => {
      console.log(err)
      props.history.push({
        pathname: "/socialsignup",
        state: {
          email: e,
          social: "google"
        }
      });
      window.location.reload(false);
    });
  }

  const responseFacebook = (response) => {
    console.log(response);
  }

  function socialLogin(user, testUser, testPass) {
    let uid = user.user_uid
    let name = user.first_name
      
    document.cookie = " loginStatus: Hello " + name  + "! , " + " user_uid: " + uid + " , ";
    console.log(document.cookie)

    // redirect & reload page for buttons and login status
    props.history.push("/");
    window.location.reload(false);
    
    console.log('end of login');
  }

  // Direct Login

  // API GET Request for User Data
  async function grabLoginInfoForUser(userName, userPass) {
    const res = await fetch(props.SINGLE_ACC_API_URL + '/' + userName + '/' + userPass);
    const api = await res.json();
    const login = api.result.result;
    return login;
  }

  // Direct User Login
  function checkLogin() {
    grabLoginInfoForUser(email, password)
    .then(res => login(res))
    .catch(err => console.log(err));
  }

  function login(user) {
    let arr = user
    console.log(arr);
    for (var i = 0; i < arr.length; i++) {
      var u = arr[i].user_name;
      var p = arr[i].password_sha512;
      console.log(i);
      if (u === email && p === ( crypto.createHash('sha512').update( password ).digest('hex')) ) {
        // setLoginStatus("Logged In");

        document.cookie = " loginStatus: Hello " + arr[i].first_name  + "! , " + " user_uid: " + arr[i].user_uid + " , ";
        console.log(document.cookie)
        i = arr.length;

        // redirect & reload page for buttons and login status
        props.history.push("/");
        window.location.reload(false);
      } 
      else {
        document.cookie = " loginStatus: Sign In , user_uid: null , ";
      }
    console.log('end of login');
    }
  }

  return (
    <main Style="margin-top:-80px;">
        <div class="container text-center" Style="margin-top:-40px;">
            <h1>Login</h1>
        <div class="row">
            <Col></Col>

            <Container className="justify-content-center bg-success">
              <Row>
                <Col>               
                  <Form onSubmit={handleSubmit} autoComplete="off">

                    <Form.Label>Email</Form.Label>
                    <InputGroup className="mb-3">
                      <FormControl
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        id="userForm"
                        placeholder="Enter Email"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      />
                    </InputGroup>

                    <Form.Label>Password</Form.Label>
                    <InputGroup className="mb-3">
                      <FormControl
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        id="passForm"
                        placeholder="Enter Password"
                        aria-label="Password"
                        aria-describedby="basic-addon2"
                        type="password"
                      />
                    </InputGroup>

                    <Button variant="dark" onClick={ checkLogin } disabled={!validateForm()} type="submit" >Sign In</Button>

                  </Form>
                </Col>
              </Row>
                <Col>
                  <h4>
                    Or Login With Social Media!
                  </h4>
                  <Row>
                    <Col>
                      <div Style="width:150px;"> 
                      <FacebookLogin
                        appId="1088597931155576"
                        autoLoad={true}
                        fields="name,email,picture"
                        onClick={console.log('test')}
                        callback={responseFacebook} 
                        size="small"
                        textButton="FB Login"
                      />
                      </div>
                    </Col>
                    
                    <Col>
                      <GoogleLogin
                        clientId="333899878721-tc2a70pn73hjcnegh2cprvqteiuu39h9.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                      />
                    </Col>
                  </Row>
                </Col>
              <Row>

              </Row>
            </Container>

            <Col></Col>
          </div>
        </div>
    </main>
  );
}
