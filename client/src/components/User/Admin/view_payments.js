import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserLayout from '../../../hoc/user';


// import { getSiteData } from '../../../actions/site_actions';



class ViewPayments extends Component {
  render() {
    return (
      <UserLayout>
        Payments
      </UserLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    payments: state.payments
  }
}

export default connect(mapStateToProps)(ViewPayments);