import React, { Component } from 'react'
import TextField from './TextField'

class ReviewForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      image: '',
      clicked: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.addRestaurantClicked = this.addRestaurantClicked.bind(this);
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({[name]: value});
  }

  validateForm() {
    if (Object.values(this.state).includes('')){
      return false;
    } else {
      return  true;
    }
  }

  handleFormSubmit(event) {
    event.preventDefault();

    let formIsValid = this.validateForm();

    if (formIsValid) {
      let idName = this.state.name.replace(" ", "-");
      let newId = `${idName.toLowerCase()}-${this.state.city.toLowerCase()}`
      let formattedLocation = `${this.state.address}, ${this.state.city}, ${this.state.state}, ${this.state.zipCode}`
      let newRestaurant = {
        id: newId,
        name: this.state.name,
        location: formattedLocation,
        image: this.state.image
      };
      this.props.submitNewRestaurant(newRestaurant);
      this.clearForm();
    } else {
      let error = Object.keys(this.state).find(key => this.state[key] === '');
      this.setState({errorMessage: `Please fill out the ${error} field`});
    }
  }

  clearForm() {
    this.setState({
      name: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      image: '',
      clicked: false
    });
  }

  addRestaurantClicked() {
    this.setState({clicked: !this.state.clicked})
  }

  render() {
    if (this.state.clicked){
    return (
      <form id="restaurant-form" onSubmit={this.handleFormSubmit}>
        <h2>New Restaurant</h2>
        <TextField
          label='Name:'
          name='name'
          value={this.state.name}
          onChange={this.handleInputChange}
        />

        <TextField
          label='Steet Address:'
          name='address'
          value={this.state.address}
          onChange={this.handleInputChange}
        />

        <TextField
          label='City:'
          name='city'
          value={this.state.city}
          onChange={this.handleInputChange}
        />

        <label htmlFor="state">State:</label>
          <select name="state" id="state" value={this.state.state} onChange={this.handleInputChange}>
            <option></option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>

        <TextField
          label='Zip Code'
          name='zipCode'
          value={this.state.zipCode}
          onChange={this.handleInputChange}
        />

        <TextField
          label='Image URL:'
          name='image'
          value={this.state.image}
          onChange={this.handleInputChange}
        />

        <div>
        <h3>{this.state.errorMessage}</h3>
          <input type="submit" value="Submit" />
        </div>
      </form>
    )} else {
      return(
      <button onClick={this.addRestaurantClicked}>Add New Restaurant</button>
    )
    }
  }
}


export default ReviewForm
