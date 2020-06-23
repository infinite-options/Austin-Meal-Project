import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css"

import defaultMeal from "../img/default-meal.png";
import SLIDE1 from "../img/slide1-cobb-salad.png"
import NEXT from "../img/right_arrow-512.svg"
import PREV from "../img/left_arrow-512.svg"

export default class MenuCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWeek: null,
      dates: null,
      meals: {
        Seasonal: { Category: null, Menu: [] },
        Weekly: { Category: null, Menu: [] },
        Smoothies: { Category: null, Menu: [] },
        Addons: { Category: null, Menu: [] },
        Misc: { Category: null, Menu: [] }
      }
    };
  }
  renderArrows = () => {
    return (
      <div className="slider-arrow">
        <div
          className="arrow-btn prev"
          onClick={() => this.slider.slickPrev()}
        >
          <img src={PREV} style={{height: "40px", width: "40px"}}/>
        </div>
        <div
          className="arrow-btn next"
          onClick={() => this.slider.slickNext()}
        >
          <img src={NEXT}
          style={{height: "40px", width: "40px"}}
          />
        </div>
      </div>
    );
  };
  
  async componentDidMount() {
    // this.setState({ currentWeek: this.props.objectIndex });
    // const res = await fetch(this.props.API_URL);
    // const api = await res.json();
    // console.log(api)
    // const sundayDate = api.result[this.state.currentWeek].Sunday;
    // const mondayDate = api.result[this.state.currentWeek].Monday;
    // const deliveryDates = sundayDate + " & " + mondayDate;
    // this.setState({ dates: deliveryDates });
    // const mealsData = api.result[this.state.currentWeek].Meals;
    // this.setState({ meals: mealsData });
  }

  render() {
    var settings = {
      dots: true,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      pauseOnHover: true,
      arrows: false,
    };
    return (
      <div><div>
        {this.renderArrows()}
          
        <Slider {...settings}> 
        {Object.keys(this.state.meals).map(key =>
      this.state.meals[key].Menu.map(meal => (
          <div>
            <img
              src={meal.meal_photo_url === null ? defaultMeal : meal.meal_photo_url}
              alt="meal pic"
              style={{
                height:"300px",
                width:"100%",
                objectFit:"cover",
                boxShadow:"1px 2px 5px 1px grey"
              }}
            />
            <div>
              <div
                style={{
                  wordWrap:"break-word",
                  color: "grey",
                  textAlign:"right",
                }}
              >
                <h4>{meal.meal_name}</h4>
                <p>
                  Cal {meal.meal_calories}, Prot {meal.protein}, Carb{" "}
                  {meal.meal_carbs}, Sug {meal.meal_sugar}, Fat{" "}
                  {meal.meal_fat}, Sat {meal.meal_sat}
                </p>

                <p>Ingredients:</p>
                <p>{meal.meal_desc}</p>

              </div>
            </div>

          </div> 
        )))}
        
        </Slider>
      </div></div>
    );
  }
}

{/* </Slider> */}

  {/* <div>
    {Object.keys(this.state.meals).map(key =>
      this.state.meals[key].Menu.map(meal => (
      <div 
        //each item plus padding
        style={{
          margin: "30px",
        }}
      >
        <img
          src={meal.meal_photo_url === null ? defaultMeal : meal.meal_photo_url}
          alt="meal pic"
          style={{
            height:"300px",
            width:"100%",
            objectFit:"cover",
            boxShadow:"1px 2px 5px 1px grey"
          }}
        />
        <div
          style={{
            
          }}
        >
          <div
            //meal titles (to show)
            style={{
              wordWrap:"break-word",
              color: "grey",
              textAlign:"right",
            }}
          >
            <h4>{meal.meal_name}</h4>
            <p>
              Cal {meal.meal_calories}, Prot {meal.protein}, Carb{" "}
              {meal.meal_carbs}, Sug {meal.meal_sugar}, Fat{" "}
              {meal.meal_fat}, Sat {meal.meal_sat}
            </p>

            <p>Ingredients:</p>
            <p>{meal.meal_desc}</p>

          </div>
        </div>
      </div>
      ))
    )}
  </div> */}

  {/* <div>
    <div className='menu-carousel-img-container'>
      <img
        className='menu-carousel-img img-fluid'
        src={SLIDE1}
        alt='slide1'
      />
      <div className="content">
        <div className="text font1">Cobb Salad</div>
      </div>
    </div>
  </div>
  
  <div>
    <div className='menu-carousel-img-container'>
      <img
        className='menu-carousel-img'
        src={SLIDE1}
        alt='slide1'
      />
      <div className="content">
        <div className="text font1">Cobb Salad</div>
      </div>
    </div>
  </div>

  <div>
    <div className='menu-carousel-img-container'>
      <img
        className='menu-carousel-img'
        src={SLIDE1}
        alt='slide1'
      />
      <div className="content">
        <div className="text font1">Cobb Salad</div>
      </div>
    </div>
  </div>

  <div>
    <div className='menu-carousel-img-container'>
      <img
        className='menu-carousel-img'
        src={SLIDE1}
        alt='slide1'
      />
      <div className="content">
        <div className="text font1">Cobb Salad</div>
      </div>
    </div>
  </div>

  <div>
    <div className='menu-carousel-img-container'>
      <img
        className='menu-carousel-img'
        src={SLIDE1}
        alt='slide1'
      />
      <div className="content">
        <div className="text font1">Cobb Salad</div>
      </div>
    </div>
  </div>

  <div>
    <div className='menu-carousel-img-container'>
      <img
        className='menu-carousel-img'
        src={SLIDE1}
        alt='slide1'
      />
      <div className="content">
        <div className="text font1">Cobb Salad</div>
      </div>
    </div>
  </div>

  <div>
    <div className='menu-carousel-img-container'>
      <img
        className='menu-carousel-img'
        src={SLIDE1}
        alt='slide1'
      />
      <div className="content">
        <div className="text font1">Cobb Salad</div>
      </div>
    </div>
  </div>

  <div>
    <div className='menu-carousel-img-container'>
      <img
        className='menu-carousel-img'
        src={SLIDE1}
        alt='slide1'
      />
      <div className="content">
        <div className="text font1">Cobb Salad</div>
      </div>
    </div>
  </div>

</Slider> */}


{/* <Slider {...settings}
            ref= {c => (this.slider = c)}
          > */}