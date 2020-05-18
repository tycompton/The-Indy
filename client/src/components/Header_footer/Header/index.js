import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/user_actions';

class Header extends Component {

  state = {
    page:[
      {
        name:'Home',
        linkTo:'/',
        public: true
      },
      {
        name:'Beers',
        linkTo:'/shop',
        public: true
      }
    ],
    user:[
      {
        name:'Basket',
        linkTo:'/user/cart',
        public: false
      },
      {
        name:'My Account',
        linkTo:'/user/dashboard',
        public: false
      },
      {
        name:'Sign in',
        linkTo:'/register_login',
        public: true
      },
      {
        name:'Sign out',
        linkTo:'/user/logout',
        public: false
      },
    ]
  }

  logoutHandler = () => {
    this.props.dispatch(logoutUser()).then(response =>{
      if(response.payload.success){
        this.props.history.push('/')
        window.location.reload();
      }
    })
  }

  cartLink = (item, i) => {
    const user = this.props.user.userData;  
    
    return (
      <div className="cart_link" key={i}>
        <span>{user.cart ? user.cart.length : 0}</span>
        <Link to={item.linkTo}>
          {item.name}
        </Link>
      </div>
    )
  }

  defaultLink = (item,i) => (
    item.name === 'Sign out' ? 
      <div className="log_out_link"
        key={i}
        onClick={()=> this.logoutHandler()}
      >
        {item.name}
      </div>
    :
    <Link to={item.linkTo} key={i}>
      {item.name}
    </Link>
  )  

  showLinks = (type) => {
    let list = [];

    if(this.props.user.userData){
      type.forEach((item)=>{
        if(!this.props.user.userData.isAuth){
          if(item.public === true){
            list.push(item)
          }
        } else {
          if(item.name !== 'Sign in'){
            list.push(item)
          }
        }
      });
    }

    return list.map((item,i)=>{
      if(item.name !== 'Basket'){
        return this.defaultLink(item,i)
      } else {
        return this.cartLink(item,i)
      }    
    })
  }

  render() {
    return (
      <header className="bck_b_light">
        <div className="container">

          <Link to={'/'}>
          <div className="left">
            <div className="logo">
              The Indy
            </div>
          </div>
          </Link>

          <div className="right">
            <div className="top">
              {this.showLinks(this.state.user)}
            </div>
            <div className="bottom">
              {this.showLinks(this.state.page)}
            </div>
          </div>

        </div>
      </header>
    );
  }
}

function mapStateToProps(state){
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(withRouter(Header));