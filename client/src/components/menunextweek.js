import React, { Component } from "react";
import { Card } from "react-bootstrap";
import IMG6 from "../img/img6.jpg";

class Selectmealplan extends Component {
  render() {
    return (
        <main Style="margin-top:-80px;">
          <div class="container text-center">
              <h3>COMING NEXT WEEK</h3>
              <h5 Style="margin-top:-10px;">January 5th & 6th</h5>
              <hr></hr>
              <div class="row justify-content-md-center" Style="margin-top:-10px; margin-bottom:-10px;">
                  <ul class="navbar-nav">
                      <li class="nav-item">
                          <a class="nav-link" href="/menuthisweek">THIS WEEK</a>
                      </li>
                  </ul>
              </div>
              <hr></hr>
              <h5>LOCAL. ORGANIC. RESPONSIBLE.</h5>
              <h6 Style="margin-top:-10px;">STRAIGHT TO YOUR DOOR</h6>
              <hr></hr>
          </div>
          <div class="album py-5 bg-white">
              <div class="container" Style="margin-top:-40px;">
                <div class="row">
                    <div class="col-md-4">
                    <div class="card mb-4 shadow-sm" Style="height:300px; width:300px;">
                        <img class="card-img-top" width="100%" height="200px" src={IMG6} alt="meal pic"/>
                        <Card.Body>
                          <Card.Title>RAINBOW ZOODLES</Card.Title>
                          <Card.Text>
                            Cal 500, Prot 14, Carb 37, Fat 36, Sug 23, Fat 36, Sat 5
                          </Card.Text>
                        </Card.Body>
                    </div>
                    </div>

                    <div class="col-md-4">
                    <div class="card mb-4 shadow-sm" Style="height:300px; width:300px;">
                        <img class="card-img-top" width="100%" height="200px" src={IMG6} alt="meal pic"/>
                        <Card.Body>
                          <Card.Title>KALE POWER SALAD</Card.Title>
                          <Card.Text>
                            Cal 820, Prot 26, Carb 93, Sug 18, Fib 26, Fat 42, Sat 6
                          </Card.Text>
                        </Card.Body>
                    </div>
                    </div>

                    <div class="col-md-4">
                    <div class="card mb-4 shadow-sm" Style="height:300px; width:300px;">
                        <img class="card-img-top" width="100%" height="200px" src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg" alt="meal pic"/>
                        <Card.Body>
                          <Card.Title>SMOKEY BLACKEYED PEA SOUP</Card.Title>
                          <Card.Text Style="font-size:10px">
                            Cal 290, Prot 19, Carbs 51, Sug 9, Fib 18, Fat 4.5, Sat .5
                          </Card.Text>
                        </Card.Body>
                    </div>
                    </div>

                    <div class="col-md-4">
                    <div class="card mb-4 shadow-sm" Style="height:300px; width:300px;">
                      <img class="card-img-top" width="100%" height="200px" src={IMG6} alt="meal pic"/>
                        <Card.Body>
                          <Card.Title>MASHERS w/ TURKEY TEMPEH & SAUTEED RED CABBAGE</Card.Title>
                          <Card.Text Style="font-size:10px">
                            Cal 540, Prot 22, Carb 51, Sug 7, Fib 7, Fat 31, Sat 5 
                          </Card.Text>
                        </Card.Body>
                    </div>
                    </div>

                    <div class="col-md-4">
                    <div class="card mb-4 shadow-sm" Style="height:300px; width:300px;">
                      <img class="card-img-top" width="100%" height="200px" src={IMG6} alt="meal pic"/>
                        <Card.Body>
                          <Card.Title>BUDDHA BOWL</Card.Title>
                          <Card.Text>
                            Cal 459, Prot 13, Carb 50, Sug 9.5, Fib 14, Fat 23, Sat 3
                          </Card.Text>
                        </Card.Body>
                    </div>
                    </div>

                    <div class="col-md-4">
                    <div class="card mb-4 shadow-sm" Style="height:300px; width:300px;">
                      <img class="card-img-top" width="100%" height="200px" src={IMG6} alt="meal pic"/>
                        <Card.Body>
                          <Card.Title>GINGERBREAD OATS</Card.Title>
                          <Card.Text>
                            Cal 760, Prot 16, Carb 72, Sug 28, Fib 50, Fat 46, Sat 23
                          </Card.Text>
                        </Card.Body>
                    </div>
                    </div>

                    

                </div>
              </div>
          </div>
        </main>
      
    );
  }
}

export default Selectmealplan;
