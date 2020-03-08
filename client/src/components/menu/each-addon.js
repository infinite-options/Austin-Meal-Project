import React, { Component } from "react";
import { Grid, Cell } from "react-mdl";

//  Replace FINDUS1 below with this.props.imgurl

class EachAddon extends Component {
  state = {
    countFood: 0
  };
  render() {
    return (
      <div>
        <center>
          <h6>
            {this.props.mealTitle.length > 22 ? (
              this.props.mealTitle
            ) : (
              <div>
                {this.props.mealTitle} <br />
                <br />
              </div>
            )}
          </h6>
        </center>

        <Grid>
          <Cell col={7}>
            <img class="img-fluid" src={this.props.imgurl} alt="no_meal_img" />
          </Cell>
          <Cell col={5}>
            <div class="input-group">
              <div id="input_div">
                <input
                  type="text"
                  size="4"
                  value={this.state.countFood}
                  id="count"
                  style={{ textAlign: "center", width: "90%" }}
                />
                &nbsp;
                <input
                  type="button"
                  value="-"
                  onClick={() => {
                    if (this.state.countFood > 0) {
                      this.props.decrementAddon();
                      this.setState({
                        countFood: this.state.countFood - 1
                      });
                    }
                  }}
                />
                <input
                  type="button"
                  value="+"
                  onClick={() => {
                    this.props.incrementAddon();
                    this.setState({
                      countFood: this.state.countFood + 1
                    });
                  }}
                />
              </div>
            </div>
          </Cell>
          <p>{this.props.ingridents}</p>
          <p>{this.props.detail}</p>
        </Grid>
      </div>
    );
  }
}

export default EachAddon;
