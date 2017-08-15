import React, { Component } from 'react'

import Restaurant from '../components/Restaurant'
import Reviews from '../components/Reviews'
import ReviewForm from '../components/ReviewForm'
import RestaurantForm from '../components/RestaurantForm'

import restaurants from '../constants/restaurants'
import reviews from '../constants/reviews'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurants,
      reviews,
      selectedId: restaurants[0].id
    }
    this.submitNewReview = this.submitNewReview.bind(this);
    this.restaurantClick = this.restaurantClick.bind(this);
    this.submitNewRestaurant = this.submitNewRestaurant.bind(this);
  }

  restaurantClick(event) {
    event.preventDefault()
    this.setState({selectedId: event.target.id})
  }

  selectedRestaurant() {
    return this.state.restaurants.find((restaurant) =>
      (restaurant.id === this.state.selectedId)
    )
  }

  submitNewReview(newReview) {
    newReview.restaurant_id = this.state.selectedId;
    let newReviews = this.state.reviews.concat([newReview]);

    this.setState({reviews: newReviews});
  }

  submitNewRestaurant(newRestaurant) {
    let newRestaurants = this.state.restaurants.concat([newRestaurant]);

    this.setState({restaurants: newRestaurants});
  }

  render() {
    let restaurantComponents = this.state.restaurants.map((restaurant) => {
      return (
        <Restaurant key={restaurant.id}
          data={restaurant}
          isSelected={this.state.selectedId === restaurant.id}
          handleClick={this.restaurantClick}/>
      )
    })

    let relevantReviews = this.state.reviews.filter((review) =>
      (this.state.selectedId === review.restaurant_id)
    )

    return(
      <div>
        <div className="row">
          <div className="small-3 columns">
            <h1>Restaurants</h1>
            {restaurantComponents}
            <RestaurantForm submitNewRestaurant={this.submitNewRestaurant} />
          </div>
          <div className="small-9 columns">
            <h2>Reviews for {this.selectedRestaurant().name}</h2>
            <Reviews data={relevantReviews} />
            <ReviewForm submitNewReview={this.submitNewReview}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App
