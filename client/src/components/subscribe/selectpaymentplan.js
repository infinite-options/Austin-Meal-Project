import React, { Component } from "react";
import { Card, CardDeck, Row, Col, Container } from "react-bootstrap";
import { Grid, Cell } from "react-mdl";
import IMG9 from "../../img/img9.webp";
import { Link } from "react-router-dom";

class SelectPaymentPlan extends Component {
  constructor(props) {
    super(props);
    this.state = { meals: null, obj: null, paymentPlans: [], otherPlans: [] };
  }

  async componentDidMount() {
    console.log(this.props);
    this.setState({ obj: this.props.objectIndex });
    this.setState({ meals: this.props.meals });
    const res = await fetch(this.props.API_URL);
    const api = await res.json();
    const plans = api.result[this.state.obj].result;
    //  const plans = plansData.Plans;
    this.setState({ paymentPlans: plans });
    //  const otherPlans = plansData.OtherPaymentPlans;
    //  this.setState( {otherPlans: otherPlans} );
  }

  render() {
    return (
      <section class="content-section">
        <div class="container font2">
          <center>
            <h2 class="font1">{this.state.meals} MEALS PAYMENT OPTIONS</h2>
            <hr class="two" />
            <h4 class="font1">
              <b>
                LOCAL. ORGANIC. RESPONSIBLE.<br></br>STRAIGHT TO YOUR DOOR
              </b>
            </h4>
            <br></br>
            <hr class="three" />
            <a href="/5-meals-subscription" style={{ color: "black" }}>
              5 MEALS
            </a>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <a href="/10-meals-subscription" style={{ color: "black" }}>
              10 MEALS{" "}
            </a>{" "}
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <a href="/15-meals-subscription" style={{ color: "black" }}>
              15 MEALS{" "}
            </a>{" "}
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <a href="/20-meals-subscription" style={{ color: "black" }}>
              20 MEALS{" "}
            </a>
            <hr class="three" />
            <br></br>
            <CardDeck>
              {this.state.paymentPlans.map(paymentPlan => (
                <Card
                  style={{
                    maxWidth: "20rem",
                    boxShadow: "0px 5px 32px 4px rgba(0,0,0,0.3)"
                  }}
                >
                  {" "}
                  <span class="border border-dark" style={{}}>
                    <Card.Img
                      class="black"
                      variant="top"
                      src={paymentPlan.photo_URL}
                    />
                    <div
                      class="mealoption-center"
                      style={{
                        marginBottom: "10%",
                        fontSize: "100px",
                        textShadow: "2px 2px 4px #FFEFB0",
                        lineHeight: "35px",
                        color: "white"
                      }}
                    >
                      {paymentPlan.num_meals}
                    </div>
                    <Card.Body>
                      <Card.Title>
                        <b>{paymentPlan.payment_frequency.toUpperCase()}</b>
                      </Card.Title>
                      <Card.Text style={{ fontSize: "15px", color: "#888785" }}>
                        ${paymentPlan.meal_plan_price_per_meal.toFixed(2)} per
                        meal
                      </Card.Text>
                      <br></br>
                      <Card.Title>
                        ${paymentPlan.meal_plan_price.toFixed(2)} /week
                      </Card.Title>
                      <Card.Text style={{ fontSize: "13px", color: "#888785" }}>
                        Sales tax of 8.25% will be added
                      </Card.Text>
                      <Link
                        style={{ fontFamily: "Kalam", color: "white" }}
                        to={{
                          pathname: "/checkout",
                          item: {
                            name: `${
                              paymentPlan.meal_plan_desc
                            } Subscription - $${paymentPlan.meal_plan_price.toFixed(
                              2
                            )} /week`,
                            total: paymentPlan.meal_plan_price.toFixed(2)
                          }
                        }}
                      >
                        <button
                          type="button"
                          class="btn2 btn2-primary font4"
                          style={{
                            marginTop: "10px",
                            paddingLeft: "30px",
                            paddingRight: "30px",
                            paddingTop: "5px",
                            paddingBottom: "5px",
                            color: "white",
                            fontSize: "15px"
                          }}
                        >
                          CHECKOUT
                        </button>
                      </Link>
                      <img
                        class="img-fluid"
                        src={IMG9}
                        alt=""
                        style={{
                          width: "90%"
                        }}
                      />
                    </Card.Body>
                  </span>
                </Card>
              ))}
            </CardDeck>
            <br></br>
            <br></br>
            <hr></hr>
            <br></br>
            <br></br>
            <h3 class="font1" style={{ color: "#196F3D" }}>
              Our Customers Say
            </h3>
            <Container>
              <Row style={{ fontSize: "20px" }}>
                <Col>
                  <span class="fa fa-star checked" />
                  <span class="fa fa-star checked" />
                  <span class="fa fa-star checked" />
                  <span class="fa fa-star checked" />
                  <span class="fa fa-star checked" />
                </Col>
                <Col>
                  <span class="fa fa-star checked" />
                  <span class="fa fa-star checked" />
                  <span class="fa fa-star checked" />
                  <span class="fa fa-star checked" />
                  <span class="fa fa-star checked" />
                </Col>
                <Col>
                  <span class="fa fa-star checked" />
                  <span class="fa fa-star checked" />
                  <span class="fa fa-star checked" />
                  <span class="fa fa-star checked" />
                  <span class="fa fa-star checked" />
                </Col>
              </Row>
              <Row style={{ fontSize: "15px" }}>
                <Col>Convenience and goodness</Col>
                <Col>PTYD feels like family!</Col>
                <Col>They make life SO easy!</Col>
              </Row>
              <br></br>
              <Row style={{ fontSize: "15px", color: "#196F3D" }}>
                <Col>
                  <hr class="one" />
                </Col>
                <Col>
                  <hr class="one" />
                </Col>
                <Col>
                  <hr class="one" />
                </Col>
              </Row>
              <Row
                style={{
                  fontSize: "15px",
                  color: "black",
                  lineHeight: "25px"
                }}
              >
                <Grid>
                  <Col>
                    <Cell col={10}>
                      Besides the convenience and goodness going inside our
                      bods, PTYD is also the friendliest most generous team that
                      is always quick to respond.
                      <br />- Austin
                    </Cell>
                  </Col>
                  <Col>
                    <Cell col={10}>
                      Whether I split a soup between our two kids, feed my
                      husband after his workout, or snack on a salad while the
                      kids nap, it's an outstanding addition to our fridge!
                      <br />- Christy
                    </Cell>
                  </Col>
                  <Col>
                    <Cell col={10}>
                      I love how the food is as locally sourced as possible and
                      containers are not going to waste. I don't think I've ever
                      had a meal I didn't like!
                      <br />- Courtney
                    </Cell>
                  </Col>
                </Grid>
              </Row>
              <br></br>
            </Container>
            <br />
            <br />
            <div style={{ backgroundColor: "black" }}>
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
            <br />
          </center>
        </div>
      </section>
    );
  }
}

export default SelectPaymentPlan;
