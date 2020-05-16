import React, { Component } from 'react';
import { PayPalButton } from "react-paypal-button-v2";

class Paypal extends Component {
  render() {

    const onSuccess = (payment) => {
      this.props.onSuccess(payment);  
    }; 

    const onCancel = (data) => {
      console.log(JSON.stringify(data));
    };

    const onError = (err) => {
      console.log(JSON.stringify(err));
    };

    let total = this.props.toPay;

    return (
      <PayPalButton
        amount={total}
        currency="GBP"
        onSuccess={onSuccess}
        onCancel={onCancel}
        onError={onError}
        options={{
          clientId: "AdQuGyC2jBtv8uosDISCUftYSeGXc7wjzNUu6NInPlMOLI18XhBCYVmiUiPwJH-7E9eLgDvRR_Z1cnSa"
        }}
      />
    );
  }
}

export default Paypal;