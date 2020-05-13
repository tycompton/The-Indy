import React, { Component } from 'react';
import UserLayout from '../../hoc/user';
import UserProductBlock from '../utils/User/product_block';

import { connect } from 'react-redux';
import { getCartItems, removeCartItem, onSuccessBuy } from '../../actions/user_actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons/faFrown';
import { faSmile } from '@fortawesome/free-solid-svg-icons/faSmile';

import Paypal from '../utils/paypal';

class UserCart extends Component {
  state = {
    loading: true,
    total: 0,
    showTotal: false,
    showSuccess: false,
    showDeliveryAddress: false
  };

  componentDidMount() {
    let cartItems = [];
    let user = this.props.user;

    if (user.userData.cart) {
      if (user.userData.cart.length > 0) {
        user.userData.cart.forEach((item) => {
          cartItems.push(item.id);
        });

        this.props
          .dispatch(getCartItems(cartItems, user.userData.cart))
          .then(() => {
            if (this.props.user.cartDetail.length > 0) {
              this.calculateTotal(this.props.user.cartDetail);
            }
          });
      }
    }
  }

  calculateTotal = (cartDetail) => {
    let total = 0;

    cartDetail.forEach((item) => {
      total += parseInt(item.price, 10) * item.quantity;
    });

    this.setState({
      total,
      showTotal: true,
    });
  };

  removeFromCart = (id) => {
    this.props.dispatch(removeCartItem(id)).then(() => {
      if (this.props.user.cartDetail.length <= 0) {
        this.setState({
          showTotal: false,
        });
      } else {
        this.calculateTotal(this.props.user.cartDetail);
      }
    });
  };

  showNoItemMessage = () => (
    <div className="cart_no_items">
      <FontAwesomeIcon icon={faFrown} />
      <div>You have no items</div>
    </div>
  );

  showDeliveryAddressForm = () => (
        <div className="delivery_address">
          <h4>Delivery Address</h4>
          <p>Brighton £30 min. order | Hove £40 min. order</p>
          
         <div className="form-group">
          {/* <label htmlFor="inputAddress">Address Line 1</label> */}
          <input 
            type="text" 
            className="form-control" 
            id="inputAddress"
            placeholder="Address Line 1">  
          </input>
         </div>
         <div className="form-group">
          {/* <label htmlFor="inputAddress2">Address Line 2</label> */}
          <input 
            type="text" 
            className="form-control" 
            id="inputAddress2"
            placeholder="Address Line 2 (optional)">  
          </input>
         </div>
         <div className="form-row">
          <div className="form-group col-md-6">
            {/* <label for="inputCity">Town/City</label> */}
            <input 
              type="text" 
              className="form-control" 
              id="inputCity"
              placeholder="Town/City">
            </input>
          </div>
          <div className="form-group col-md-4">
            {/* <label for="inputState">County</label> */}
            <input 
              type="text" 
              id="inputState" 
              className="form-control"
              placeholder="County">
            </input>
          </div>
          <div className="form-group col-md-2">
            {/* <label htmlFor="inputZip">Postcode</label> */}
            <input 
              type="text" 
              className="form-control" 
              id="inputZip"
              placeholder="Postcode">         
            </input>
          </div>
        </div>
        </div> 
  );

  onButtonClickDelivery = () => {
    this.setState({
      showDeliveryAddress: true,
    });
  }

  onButtonClickCollection = () => {
    this.setState({
      showDeliveryAddress: false,
    });
  }


  transactionError = (data) => {
    console.log("Paypal error")
  };

  transactionCancelled = () => {
    console.log("Transaction cancelled")
  };

  transactionSuccess = (data) => {
    this.props
      .dispatch(
        onSuccessBuy({
          cartDetail: this.props.user.cartDetail,
          paymentData: data,
        })
      )
      .then(() => {
        if (this.props.user.successBuy) {
          this.setState({
            showTotal: false,
            showSuccess: true,
          });
        }
      })
  }

  render() {
    return (
        <div className="container">  
          <h1 className="text-center">Checkout</h1>  

          <button 
            className="btn btn-primary" 
            type="submit"
            onClick={this.onButtonClickCollection}>
            
            Collection
          </button>

          <button 
            className="btn btn-primary" 
            onClick={this.onButtonClickDelivery}>
              Delivery
          </button>

          {this.state.showDeliveryAddress ? 
            this.showDeliveryAddressForm()
            : null
          }


          <div className="user_cart">
            <UserProductBlock
              products={this.props.user}
              type="cart"
              removeItem={(id) => this.removeFromCart(id)}
            />
            {this.state.showTotal ? (
              <div>
                <div className="user_cart_sum">
                  <div>Order Total: £ {this.state.total}</div>
                </div>
              </div>
            ) : this.state.showSuccess ? (
              <div className="cart_success">
                <FontAwesomeIcon icon={faSmile} />
                <div>Thank you!</div>
                <div>Your order is complete!</div>
              </div>
            ) : (
              this.showNoItemMessage()
            )}
          </div>
          {this.state.showTotal ? (
            <div className="paypal_button_container">
              <Paypal
                toPay={this.state.total}
                transactionError={(data) => this.transactionError(data)}
                transactionCancelled={(data) => this.transactionCancelled(data)}
                onSuccess={(data) => this.transactionSuccess(data)}
              />
            </div>
          ) : null}
        </div>        
      
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(UserCart);