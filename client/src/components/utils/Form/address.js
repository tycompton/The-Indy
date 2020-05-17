import React, { Component } from 'react';

class Address extends Component {

  state = {
    address1: '',
    address2: '',
    city: '',
    county: '',
    postcode: '',
  }; 

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const {address1, address2, city, county, postcode} = this.state;

    console.log(address1)
    // .post('/api/users/address', {address1, address2, city, county, postcode})
    //   .then((result) => {
    //     console.log(result);    
    //   });
  }

  showDeliveryAddressForm = () => (
    <div className="delivery_address">
      <h4>Delivery Address</h4>
      <p>Brighton £30 min. order | Hove £40 min. order</p>

      <div className="form-group">
        <input
          type="text"
          className="form-control"
          id="address1"
          placeholder="Address Line 1"
        ></input>
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          id="address2"
          placeholder="Address Line 2 (optional)"
        ></input>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <input
            type="text"
            className="form-control"
            id="city"
            placeholder="Town/City"
          ></input>
        </div>
        <div className="form-group col-md-4">
          <input
            type="text"
            id="county"
            className="form-control"
            placeholder="County"
          ></input>
        </div>
        <div className="form-group col-md-2">
          <input
            type="text"
            className="form-control"
            id="postcode"
            placeholder="Postcode"
          ></input>
        </div>
      </div>
    </div>
  );

  render() {
    const {address1, address2, city, county, postcode} = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          name="address1"
          value={address1}
          onChange={this.onChange}
        />

        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default Address;
