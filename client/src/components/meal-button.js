import React, { Component } from "react";
import { Grid, Cell } from "react-mdl";
import {
  ButtonToolbar,
  Button,
  Modal,
  Form,
  FormControl
} from "react-bootstrap";

export default class MealButton extends Component {
  constructor(props) {
    super(props);
    console.log("testtest");
  }
  state = {
    count: 0,
    buttonS: false,
    buttonM: false,
    buttonSkip: false,
    buttonSelect: false,
    buttonSurprise: false,
    requestModal: false
  };

  changeButtonS = () => {
    this.setState({
      buttonS: true,
      buttonM: false,
      buttonSkip: false
    });

    this.button.disabled = this.button.enabled;
    this.button2.disabled = this.button2.enabled;
  };

  changeButtonM = () => {
    this.setState({
      buttonM: true,
      buttonS: false,
      buttonSkip: false
    });

    this.button.disabled = this.button.enabled;
    this.button2.disabled = this.button2.enabled;
  };

  changeButtonSkip = () => {
    this.setState({
      buttonM: false,
      buttonS: false,
      buttonSkip: true,

      buttonSurprise: false,
      buttonSelect: false
    });
    this.button.disabled = !this.button.disabled;
    this.button2.disabled = !this.button2.disabled;
  };

  changeButtonSelect = () => {
    this.setState({
      buttonSelect: true,
      buttonSurprise: false
    });
  };
  changeButtonSurprise = () => {
    this.setState({
      buttonSelect: false,
      buttonSurprise: true
    });
  };
  specialRequest = () => {
    this.setState({
      requestModal: !this.state.requestModal
    });
  };
  render() {
    const pink = {
      width: "80px",
      height: "80px",
      backgroundColor: "pink",
      color: "gray"
    };

    const hide = {
      width: "80px",
      height: "80px",
      backgroundColor: "white",
      color: "gray"
    };
    const green = {
      width: "80px",
      height: "80px",
      backgroundColor: "green",
      color: "white"
    };

    function MyVerticallyCenteredModal(props) {
      return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Special Request
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control as="textarea" rows="3" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }

    function App() {
      const [modalShow, setModalShow] = React.useState(false);

      return (
        <ButtonToolbar>
          <Button
            variant="outline-secondary"
            style={{ width: "80px", height: "80px" }}
            onClick={() => setModalShow(true)}
          >
            Special Requests
          </Button>

          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </ButtonToolbar>
      );
    }
    return (
      <div>
        <ButtonToolbar>
          <div className="radio">
            <Button
              variant="outline-secondary"
              ref={button => (this.button = button)}
              onClick={this.changeButtonS}
              style={this.state.buttonS ? pink : hide}
            >
              {this.props.day1}
              <br />
              {this.props.date1}
            </Button>
            &nbsp;
            <Button
              variant="outline-secondary"
              onClick={this.changeButtonM}
              style={this.state.buttonM ? pink : hide}
            >
              {this.props.day2}
              <br />
              {this.props.date2}
            </Button>
            &nbsp;
            <Button
              variant="outline-secondary"
              onClick={this.changeButtonSkip}
              style={{ width: "80px", height: "80px" }}
            >
              Skip This Week
            </Button>
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            variant="outline-secondary"
            ref={button => (this.button = button)}
            onClick={this.changeButtonSelect}
            style={this.state.buttonSelect ? green : hide}
          >
            Select Meal
          </Button>
          &nbsp;
          <Button
            variant="outline-secondary"
            ref={button => (this.button2 = button)}
            onClick={this.changeButtonSurprise}
            style={this.state.buttonSurprise ? green : hide}
          >
            Surprise Me!
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <App />
        </ButtonToolbar>
        <div style={this.state.requestModal ? {} : { display: "none" }}>
          <App />
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
    );
  }
}
