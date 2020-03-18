import React, { Component } from "react";
import { Table, Button, Card, Container, Row, Col } from "react-bootstrap";
import MaterialTable from "material-table";
// import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
// import { MenuCreation } from "./MenuCreation";
import Jumbotron from "./Jumbotron";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import ItemToPurchase from "./ItemToPurchase";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upcomingMeals: [],
      MealName1: "Tomato",
      MealName2: "cake",

      columns: [
        { title: "Subscription", field: "name" },
        { title: "Meal Name", field: "surname" },
        { title: "Qty", field: "birthYear", type: "numeric" }
        // {
        //   title: "Birth Place",
        //   field: "birthCity",
        //   lookup: { 34: "İstanbul", 63: "Şanlıurfa" }
        // }
      ],
      data: [
        { name: "Wkly Spcl 1", surname: "	Tomato", birthYear: 1 },

        {
          name: "Wkly Spcl 2",
          surname: "cake",
          birthYear: 2
        }
      ]
    };
  }

  async componentDidMount() {
    const res = await fetch(this.props.API_URL);
    const api = await res.json();
    const upcomingMeals = api.result.Meals_by_week;
    this.setState({ upcomingMeals });
  }
  handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  render() {
    return (
      <div class="container" style={{ marginTop: "10%" }}>
        {/* title for the site ----------------------------------------- */}
        <Jumbotron />
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" onClick={this.handleClick}>
            Admin Site
          </Link>

          {/* upcoming meal order ----------------------------------------- */}
          <Typography color="textPrimary">Upcoming Meals Order</Typography>
        </Breadcrumbs>
        <br />
        {/* {this.state.upcomingMeals.map(upcomingMeal => (
          <div
            style={{
              width: "25%",
              margin: "0",
              padding: "0"
            }}
          >
            {upcomingMeal.Category}
          </div>
        ))} */}
        <Row>
          {/* {this.state.upcomingMeals.map(upcomingMeal => ( */}
          <Col>
            <Card
              style={{
                width: "30%",
                boxShadow: "0px 5px 10px 4px rgba(0,0,0,0.2)"
              }}
            >
              <Card.Body>
                <Card.Title>Week 1</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  The week of:
                </Card.Subtitle>
                <Card.Text>
                  <Table
                    responsive
                    striped
                    bordered
                    style={{ textAlign: "center" }}
                  >
                    <thead style={{ overflow: "scroll", display: "block" }}>
                      <tr>
                        <th>Menu</th>
                        <th>Meal</th>
                        <th>Quantity Ordered</th>
                      </tr>
                    </thead>
                    <tbody
                      style={{
                        height: "300px",
                        overflowY: "scroll",
                        display: "block"
                      }}
                    >
                      <tr>
                        {/* <td>{upcomingMeal.Category}</td> */}
                        <td>aaaaaaa</td>
                        <td>Saag</td>
                        <td>45</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          {/* ))} */}
        </Row>

        <br />
        <br />

        {/* weekly purchase ----------------------------------------- */}
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" onClick={this.handleClick}>
            Admin Site
          </Link>
          <Typography color="textPrimary">Weekly Purchases</Typography>
        </Breadcrumbs>
        <br />
        <Card
          style={{
            width: "30%",
            boxShadow: "0px 5px 10px 4px rgba(0,0,0,0.2)"
          }}
        >
          <Card.Body>
            <Card.Title>Week 1</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              The week of:
            </Card.Subtitle>
            <ItemToPurchase />
          </Card.Body>
        </Card>
        <br />
        <br />

        {/* Meal info ----------------------------------------- */}

        <br />
        <Row>
          <Col>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" onClick={this.handleClick}>
                Admin Site
              </Link>
              <Typography color="textPrimary">Meal Info</Typography>
            </Breadcrumbs>
            <Card
              style={{
                width: "100%",
                boxShadow: "0px 5px 10px 4px rgba(0,0,0,0.2)"
              }}
            >
              <Card.Body>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" onClick={this.handleClick}>
                Admin Site
              </Link>
              <Link color="inherit" onClick={this.handleClick}>
                Meal Info
              </Link>
              <Typography color="textPrimary">Graph</Typography>
            </Breadcrumbs>
            <Card
              style={{
                width: "100%",
                boxShadow: "0px 5px 10px 4px rgba(0,0,0,0.2)"
              }}
            >
              <Card.Body>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <br />
        <br />

        {/* Menu Creation  ----------------------------------------- */}
        <MaterialTable
          style={{ boxShadow: "0px 5px 10px 4px rgba(0,0,0,0.2)" }}
          title="Meal Creation"
          columns={this.state.columns}
          data={this.state.data}
          editable={{
            onRowAdd: newData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  this.setState(prevState => {
                    const data = [...prevState.data];
                    data.push(newData);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  if (oldData) {
                    this.setState(prevState => {
                      const data = [...prevState.data];
                      data[data.indexOf(oldData)] = newData;
                      return { ...prevState, data };
                    });
                  }
                }, 600);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  this.setState(prevState => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                  });
                }, 600);
              })
          }}
        />

        {/* <MaterialTable style={{width: '100rem'}}
      title="Editable Example"
      columns= [
               { title: "Subscription", field: "name" },
               { title: "Meal Name", field: "surname" },
               { title: "Qty", field: "birthYear", type: "numeric" }
                ] 
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    /> */}

        <br></br>

        <Row>
          <Card style={{ width: "100rem" }}>
            <Card.Header as="h2">Meal Info</Card.Header>
            <Card.Body>
              <Card.Title>Special title treatment</Card.Title>
              <Card.Text>
                With supporting text below as a natural lead-in to additional
                content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Row>

        <br></br>

        <Row>
          <Card style={{ width: "100rem" }}>
            <Card.Header as="h2">Customer Info</Card.Header>
            <Card.Body>
              <Card.Title>Special title treatment</Card.Title>
              <Card.Text>
                With supporting text below as a natural lead-in to additional
                content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Row>
      </div>
    );
  }
}
export default Home;
