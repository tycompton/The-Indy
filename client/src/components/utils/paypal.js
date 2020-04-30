import React, { Component } from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

class Paypal extends Component {
  
  render() {
  
    const onSuccess = (payment) => {
      this.props.onSuccess(payment);
    }; 
 
      // Paypal successful transaction log 
      // {
      //   "paid":true,
      //   "cancelled":false,
      //   "payerID":"3234GNJAFGSMA",
      //   "paymentID":"PAYID-L2LSM2I3XC66739YU1014725",
      //   "paymentToken":"EC-303656521R809414U",
      //   "returnUrl":"https://www.paypal.com/checkoutnow/error?paymentId=PAYID-L2LSM2I3XC66739YU1014725&token=EC-303656521R809414U&PayerID=3234GNJAFGSMA",
      //   "address":{
      //     "recipient_name":"John Doe",
      //     "line1":"WOLVERHAMPTON QUEENS SQ",
      //     "city":"LEICESTER",
      //     "state":"LEICESTERSHIRE",
      //     "postal_code":"LE87 2BB",
      //     "country_code":"GB" 
      //   },
      //     "email":"sb-c0lma1464591@business.example.com"
      // }

    const onCancel = (data) => {
      console.log(JSON.stringify(data));
    };

    const onError = (err) => {
      console.log(JSON.stringify(err));
    };

    let env = 'sandbox';
    let currency = 'GBP';
    let total = this.props.toPay;

    const client = {
			sandbox:    'AdQuGyC2jBtv8uosDISCUftYSeGXc7wjzNUu6NInPlMOLI18XhBCYVmiUiPwJH-7E9eLgDvRR_Z1cnSa',
			production: '',
    }
 

    return (
      <div>
        <PaypalExpressBtn 
          env={env}
          client={client}
          currency={currency}
          total={total}
          onError={onError}
          onSuccess={onSuccess}
          onCancel={onCancel}
          style={{
            size:'large',
            color:'blue',
            shape:'rect',
            label:'checkout'
          }}
        />
      </div>
    );
  }
}

export default Paypal;