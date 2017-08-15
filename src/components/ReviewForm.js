import React, { Component } from 'react'
import TextField from './TextField'

class ReviewForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      rating: '',
      content: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = name === "rating" ? parseInt(event.target.value) : event.target.value;

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
      let newReview = {
        name: this.state.name,
        rating: this.state.rating,
        content: this.state.content
      };
      this.props.submitNewReview(newReview);
      this.clearForm();
    } else {
      let error = Object.keys(this.state).find(key => this.state[key] === '');
      this.setState({errorMessage: `Please fill out the ${error} field`});
    }
  }

  clearForm() {
    this.setState({
      name: '',
      rating: '',
      content: '',
      errorMessage: null
    });
  }

  render() {
    return (
      <form id="review-form" onSubmit={this.handleFormSubmit}>
        <h2>New review</h2>
        <TextField
          label='Name'
          name='name'
          value={this.state.name}
          onChange={this.handleInputChange}
        />

        <div>
          <label htmlFor="rating">Score:</label>
          <select id="rating" name="rating" value={this.state.rating} onChange={this.handleInputChange}>
            <option></option>
            <option value="100">*****</option>
            <option value="80">****</option>
            <option value="60">***</option>
            <option value="40">**</option>
            <option value="20">*</option>
          </select>
        </div>

        <TextField
          label='Review'
          name='content'
          value={this.state.content}
          onChange={this.handleInputChange}
        />

        <div>
          <h3>{this.state.errorMessage}</h3>
          <input type="submit" value="Submit" />
        </div>
      </form>
    )
  }
}

export default ReviewForm
