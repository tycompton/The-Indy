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

  transactionError = (data) => {
    console.log("Paypal error");
  };

  transactionCancelled = () => {
    console.log("Transaction cancelled");
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
      });
  };

  render() {
    return (
      <UserLayout>
        <div>
          <h1>Checkout</h1>
          <div className="container">
            {/* <button className="btn btn-primary" type="submit">
              Order for collection
            </button>
            <button className="btn btn-primary" type="submit">
              Order for delivery
            </button> */}
            <label for="deliveryAddress">Delivery address</label>
            <textarea id="deliveryAddress" rows="20" cols="10" placeholder="leave blank if collecting from pub"></textarea>
          </div>
          <div className="user_cart">
            <UserProductBlock
              products={this.props.user}
              type="cart"
              removeItem={(id) => this.removeFromCart(id)}
            />
            {this.state.showTotal ? (
              <div>
                <div className="user_cart_sum">
                  <div>Total amount: £ {this.state.total}</div>
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
      </UserLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(UserCart);