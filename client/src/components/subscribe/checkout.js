import React, {Component} from "react";

import {Button, Form, Row, Col, Container} from "react-bootstrap";
import TruckIcon from "../../img/prepTruckIcon.png";

import crypto from "crypto";
import Cookies from "js-cookie";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_uid: this.searchCookie4UserID("loginStatus"),
      password_salt: null,
      purchase: {},
      disabled: true,
      gift: "FALSE",
      password: null,
      salt: null
    };

    this.sendForm = this.sendForm.bind(this);
    this.checkout = this.checkout.bind(this);
    this.handleApi = this.handleApi.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleGiftChange = this.handleGiftChange.bind(this);
    this.handlePwChange = this.handlePwChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }
  // function searchCookie4UserID(str) {
  //   let arr = str.split(" ");
  //   let i = arr.indexOf("user_uid:");
  //   return arr[i + 1];
  // }
  getCookieAttrHelper(cname, type) {
    const values = Cookies.get(cname);
    if (values === "" || values === undefined) {
      return null;
    } else {
      for (let val of values.split(",")) {
        let [n, v] = val.split(":");
        if (n === type) {
          return v;
        }
      }
      return null;
    }
  }

  searchCookie4Login(cname) {
    // pass cookie name to look for user's first name
    return this.getCookieAttrHelper(cname, "first_name");
  }

  searchCookie4UserID(cname) {
    //// pass cookie name to look for user's id
    return this.getCookieAttrHelper(cname, "user_uid");
  }
  searchCookie4loginMethod(cname) {
    //// pass cookie name to look for user's id
    return this.getCookieAttrHelper(cname, "loggedInBy");
  }

  // searchCookie4LoginID(str) {
  //   try {
  //     let arr = str.split(" ");
  //     let i = arr.indexOf("login_id:");
  //     return arr[i + 1];
  //   } catch {
  //     return null;
  //   }
  // }

  searchCookie4SessionID(cname) {
    // try {
    //   let arr = str.split(" ");
    //   let i = arr.indexOf("session_id:");
    //   return arr[i + 1];
    // } catch {
    //   return null;
    // }
    return this.getCookieAttrHelper(cname, "session_id");
  }
  async componentDidMount() {
    const login_session = {
      login_id: this.searchCookie4Login("loginStatus"),
      session_id: this.searchCookie4SessionID("loginStatus")
    };
    console.log(`login_session.login_id: ${login_session.login_id}`);
    console.log(`login_session.session_id: ${login_session.session_id}`);

    if (this.state.user_uid) {
      console.log(`session_url: ${this.props.SESSION_URL}`);
      if (this.searchCookie4loginMethod("loginStatus") !== "social") {
        const res = await fetch(
          `${this.props.SESSION_URL}/${this.state.user_uid}/${login_session.session_id}`
        );
        const api = await res.json();
        console.log(`api.result:${api.result}`);
        if (api.result.length === 0) {
          //could not verify login session
          this.props.history.push("/invalidsession");
          return;
        }

        //  Social Media accounts will have null salts
        //  Disable password field if salt is null
        this.setState({
          password_salt: api.result[0].password_salt
        });
        console.log(`password_salt: ${this.state.password_salt}`);
      }
      console.log(
        `this.props.PURCHASE_API_URL: ${this.props.PURCHASE_API_URL}`
      );
      const pur = await fetch(
        `${this.props.PURCHASE_API_URL}/${this.state.user_uid}`
      );
      const purApi = await pur.json();
      if (purApi.result.length != 0) {
        this.setState({purchase: purApi.result[0]});
      } else {
        const acc = await fetch(
          `${this.props.SINGLE_ACC_API_URL}/${this.state.user_uid}`
        );
        const accApi = await acc.json();
        if (accApi.result.length != 0) {
          this.setState({
            purchase: {
              delivery_first_name: accApi.result[0].first_name,
              delivery_last_name: accApi.result[0].last_name,
              delivery_email: accApi.result[0].user_email,
              delivery_phone: accApi.result[0].phone_number
            }
          });
        }
      }
    }
  }

  async sendForm() {
    console.log(this.state.purchase);
    const res = await fetch(this.props.CHECKOUT_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...this.state.purchase,
        salt: this.state.salt,
        is_gift: this.state.gift,
        user_uid: this.state.user_uid,
        item: this.props.location.item.name,
        item_price: this.props.location.item.total
      })
    });
    const api = await res.json();
    return api;
  }

  async checkout(event) {
    event.preventDefault();
    this.state.salt = await crypto
      .createHash("sha512")
      .update(this.state.password + this.state.password_salt)
      .digest("hex");
    this.sendForm()
      .then(res => this.handleApi(res))
      .catch(err => console.log(err));
  }

  validateForm() {
    var fields = [
      "delivery_first_name",
      "delivery_last_name",
      "delivery_instructions",
      "delivery_email",
      "delivery_address",
      "delivery_city",
      "delivery_state",
      "delivery_zip",
      "delivery_region",
      "delivery_phone",
      "cc_num",
      "cc_cvv",
      "cc_exp_month",
      "cc_exp_year",
      "billing_zip"
    ];

    //  Check if fields are null/empty
    for (var field of fields) {
      if (!this.state.purchase[field]) {
        return true;
      }
    }

    //  Check if fields have correct length
    //  Disable submit if phone number isn't 10 digits
    if (
      this.state.purchase.delivery_phone.length != 10 ||
      !/^\d+$/.test(this.state.purchase.delivery_phone)
    ) {
      return true;
    }
    //  Disable submit if cc_num isn't 16 characters
    if (this.state.purchase.cc_num.length != 16) {
      return true;
    }
    //  Disable submit if cc_num isn't 16 characters
    if (this.state.purchase.cc_cvv.length != 3) {
      return true;
    }

    //  Data check zipcodes
    var zipcode_fields = ["delivery_zip", "billing_zip"];

    for (var zipfield of zipcode_fields) {
      if (
        this.state.purchase[zipfield].length != 5 &&
        this.state.purchase[zipfield].length != 10
      ) {
        return true;
      }

      //  Disable submit if zipcode is 5 characters but contains nondigits
      if (
        this.state.purchase[zipfield].length == 5 &&
        !/^\d+$/.test(this.state.purchase[zipfield])
      ) {
        return true;
      }

      //  Disable submit if zipcode is 10 characters but contains nondigits in first 5 characters or last 4 characters or if 6th character is not a hyphen
      if (
        this.state.purchase[zipfield].length == 10 &&
        (!/^\d+$/.test(this.state.purchase[zipfield].substring(0, 5)) ||
          !/^\d+$/.test(this.state.purchase[zipfield].substring(6, 10)) ||
          this.state.purchase[zipfield][5] != "-")
      ) {
        return true;
      }
    }

    return false;
  }

  handleApi(response) {
    if (
      response.result.purchase.code == 281 &&
      response.result.payment.code == 281
    ) {
      this.props.history.push("/checkoutsuccess");
    } else {
      this.props.history.push("/checkout");
    }
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState(prevState => ({
      purchase: {
        ...prevState.purchase,
        [name]: target.value
      }
    }));
  }

  handlePwChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleGiftChange(event) {
    if (event.target.checked == true) {
      this.setState({
        gift: "TRUE"
      });
    } else {
      this.setState({
        gift: "FALSE"
      });
    }
  }

  render() {
    try {
      return (
        <Container>
          <Row>
            <Col md={4}>
              <div class='justify-content-md-center'>
                <img
                  src={TruckIcon}
                  style={{height: "75%", width: "75%"}}
                  alt='Delivery Truck Icon'
                />
              </div>
              <h3>Order Summary</h3>
              <div id='cart'>
                <p>{this.props.location.item.name}</p>
              </div>
              <hr />
              <p>Estimated Shipping - $15.00</p>
              <p>
                Estimated Tax - $
                {(this.props.location.item.total * 0.0825).toFixed(2)}
              </p>
              <hr />
              <h3>
                Total: $
                {(this.props.location.item.total * 1.0825 + 15.0).toFixed(2)}
              </h3>
              <Form>
                <Form.Row>
                  <Form.Group as={Col} md={8} controlId='formGridCouponCode'>
                    <Form.Label>Coupon/Gift Code</Form.Label>
                    <Form.Control placeholder='Secret Passcode' />
                  </Form.Group>

                  <Button
                    variant='success'
                    size='sm'
                    Style='height:30px; margin-top:30px;'
                    type='submit'
                  >
                    Checkout
                  </Button>
                </Form.Row>
              </Form>
            </Col>
            <Col Style='margin-top:-50px;'>
              <h5>Delivery Address</h5>
              <Form>
                <Form.Row>
                  <Form.Group as={Col} controlId='formGridFirstName'>
                    <Form.Label>
                      First Name
                      <span className='required-red'> (required)</span>
                    </Form.Label>
                    <Form.Control
                      placeholder='Enter First Name'
                      value={this.state.purchase.delivery_first_name}
                      name='delivery_first_name'
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId='formGridLastName'>
                    <Form.Label>
                      Last Name<span className='required-red'> (required)</span>
                    </Form.Label>
                    <Form.Control
                      placeholder='Enter Last Name'
                      value={this.state.purchase.delivery_last_name}
                      name='delivery_last_name'
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Group controlId='formGridNotes'>
                  <Form.Label>
                    Delivery Notes
                    <span className='required-red'> (required)</span>
                  </Form.Label>
                  <Form.Control
                    placeholder='Enter Notes or N/A (e.g. Gate Code, Special Instructions)'
                    value={this.state.purchase.delivery_instructions}
                    name='delivery_instructions'
                    onChange={this.handleChange}
                  />
                </Form.Group>

                <Form.Row>
                  <Form.Group as={Col} controlId='formGridEmail'>
                    <Form.Label>
                      Email<span className='required-red'> (required)</span>
                    </Form.Label>
                    <Form.Control
                      type='email'
                      placeholder='Enter Email'
                      value={this.state.purchase.delivery_email}
                      name='delivery_email'
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId='formGridPassword'>
                    <Form.Label>
                      Password<span className='required-red'> (required)</span>
                    </Form.Label>
                    <Form.Control
                      type='password'
                      placeholder={
                        !this.state.password_salt
                          ? "Social Media Account"
                          : "Enter Password"
                      }
                      value={this.state.password}
                      name='password'
                      onChange={this.handlePwChange}
                      disabled={!this.state.password_salt ? true : false}
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Group controlId='formGridAddress'>
                  <Form.Label>
                    Address<span className='required-red'> (required)</span>
                  </Form.Label>
                  <Form.Control
                    placeholder='1234 Main St'
                    value={this.state.purchase.delivery_address}
                    name='delivery_address'
                    onChange={this.handleChange}
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  md={4}
                  Style='margin-left:-15px;'
                  controlId='formGridAptNum'
                >
                  <Form.Label>
                    Apartment/Unit <b>(optional)</b>
                  </Form.Label>
                  <Form.Control
                    placeholder='Apartment, studio, or floor'
                    value={this.state.purchase.delivery_address_unit}
                    name='delivery_address_unit'
                    onChange={this.handleChange}
                  />
                </Form.Group>

                <Form.Row>
                  <Form.Group as={Col} controlId='formGridCity'>
                    <Form.Label>
                      City<span className='required-red'> (required)</span>
                    </Form.Label>
                    <Form.Control
                      placeholder='Prep City'
                      value={this.state.purchase.delivery_city}
                      name='delivery_city'
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId='formGridState'>
                    <Form.Label>
                      State<span className='required-red'> (required)</span>
                    </Form.Label>
                    <Form.Control
                      as='select'
                      value={this.state.purchase.delivery_state}
                      name='delivery_state'
                      onChange={this.handleChange}
                    >
                      <option>Choose...</option>
                      <option>TX</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group as={Col} controlId='formGridZip'>
                    <Form.Label>
                      Zip<span className='required-red'> (required)</span>
                    </Form.Label>
                    <Form.Control
                      placeholder='12345'
                      value={this.state.purchase.delivery_zip}
                      name='delivery_zip'
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Group
                  as={Col}
                  md={6}
                  Style='margin-left:-15px;'
                  controlId='formGridCountry'
                >
                  <Form.Label>
                    Country<span className='required-red'> (required)</span>
                  </Form.Label>
                  <Form.Control
                    as='select'
                    value={this.state.purchase.delivery_region}
                    name='delivery_region'
                    onChange={this.handleChange}
                  >
                    <option>Choose...</option>
                    <option>US</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId='formGridPhoneNumber'>
                  <Form.Label>
                    Phone Number
                    <span className='required-red'> (required)</span>
                  </Form.Label>
                  <Form.Control
                    placeholder='1234567890'
                    value={this.state.purchase.delivery_phone}
                    name='delivery_phone'
                    onChange={this.handleChange}
                  />
                </Form.Group>

                <Form.Group id='formGridCheckbox'>
                  <Form.Check
                    id='isGift'
                    type='checkbox'
                    label='This is a Gift'
                    value={this.state.gift}
                    onChange={this.handleGiftChange}
                  />
                </Form.Group>

                <h5>Billing Information</h5>

                <Form.Row>
                  <Form.Group as={Col} md={6} controlId='formGridCardNumber'>
                    <Form.Label>
                      Credit Card Number
                      <span className='required-red'> (required)</span>
                    </Form.Label>
                    <Form.Control
                      placeholder='Enter Card Number'
                      value={this.state.purchase.cc_num}
                      name='cc_num'
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} md={3} controlId='formGridCardCvc'>
                    <Form.Label>
                      CVC<span className='required-red'> (required)</span>
                    </Form.Label>
                    <Form.Control
                      placeholder='123'
                      value={this.state.purchase.cc_cvv}
                      name='cc_cvv'
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group as={Col} md={3} controlId='formGridCardMonth'>
                    <Form.Label>
                      Month<span className='required-red'> (required)</span>
                    </Form.Label>
                    <Form.Control
                      as='select'
                      value={this.state.purchase.cc_exp_month}
                      name='cc_exp_month'
                      onChange={this.handleChange}
                    >
                      <option>Choose...</option>
                      <option>01</option>
                      <option>02</option>
                      <option>03</option>
                      <option>04</option>
                      <option>05</option>
                      <option>06</option>
                      <option>07</option>
                      <option>08</option>
                      <option>09</option>
                      <option>10</option>
                      <option>11</option>
                      <option>12</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group as={Col} md={3} controlId='formGridCardYear'>
                    <Form.Label>
                      Year<span className='required-red'> (required)</span>
                    </Form.Label>
                    <Form.Control
                      as='select'
                      value={this.state.purchase.cc_exp_year}
                      name='cc_exp_year'
                      onChange={this.handleChange}
                    >
                      <option>Choose...</option>
                      <option>2020</option>
                      <option>2021</option>
                      <option>2022</option>
                      <option>2023</option>
                      <option>2024</option>
                      <option>2025</option>
                      <option>2026</option>
                      <option>2027</option>
                      <option>2028</option>
                      <option>2029</option>
                    </Form.Control>
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} md={4} controlId='formGridBillingZip'>
                    <Form.Label>
                      Postal Code
                      <span className='required-red'> (required)</span>
                    </Form.Label>
                    <Form.Control
                      placeholder='12345'
                      value={this.state.purchase.billing_zip}
                      name='billing_zip'
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId='formGridBillingCountry'>
                    <Form.Label>
                      Country<span className='required-red'> (required)</span>
                    </Form.Label>
                    <Form.Control as='select'>
                      <option>Choose...</option>
                      <option>US</option>
                    </Form.Control>
                  </Form.Group>
                </Form.Row>

                <Button
                  onClick={this.checkout}
                  variant='success'
                  type='submit'
                  disabled={this.validateForm()}
                >
                  Checkout
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      );
    } catch (err) {
      console.log(err);
      return (
        <div class='container text-center'>
          <h1>Cart Lost: Select Another Plan</h1>
          <a href='/selectmealplan'>
            <img src={TruckIcon} alt='Truck Icon' />
          </a>
        </div>
      );
    }
  }
}

export default Checkout;
