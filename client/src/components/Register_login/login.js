import React, { Component } from 'react';
import FormField from '../utils/Form/formfield';
import { update, generateData, isFormValid } from '../utils/Form/formActions';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { loginUser } from '../../actions/user_actions';


class Login extends Component {

  state = {
    formError: false,
    formSuccess:'',
    formdata:{
      email: {
        element: 'input',
        value: '',
        config:{
          label: "Email",
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter your email'
        },
        validation:{
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage:'',
        showlabel: true
      },
      password: {
        element: 'input',
        value: '',
        config:{
          label: "Password",
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter your password'
        },
        validation:{
          required: true
        },
        valid: false,
        touched: false,
        validationMessage:'',
        showlabel: true
      }
    }
  }

  updateForm = (element) => {
    const newFormdata = update(element,this.state.formdata,'login');
    this.setState({
      formError: false,
      formdata: newFormdata
    })
  }

  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata,'login');
    let formIsValid = isFormValid(this.state.formdata,'login');

    if(formIsValid){
      this.props.dispatch(loginUser(dataToSubmit)).then(response =>{
        if(response.payload.loginSuccess){
          this.props.history.push('/user/dashboard')
        }else{
          this.setState({
            formError: true
          })
        }
      });
    } else {
      this.setState({
        formError: true
      })
    }  
  }
  

  render() {
    return (
      <div className="login-form">

        <h1>Sign in</h1>

        <form onSubmit={(event)=>this.submitForm(event)}>
          
          <FormField
            id={'email'}
            formdata={this.state.formdata.email}
            change={(element)=> this.updateForm(element)}
          />
            
          

          <FormField
            id={'password'}
            formdata={this.state.formdata.password}
            change={(element)=> this.updateForm(element)}
          />

          { this.state.formError ? 
            <div className="error_label">
              Please check your data
            </div>
          :null}
          <button onClick={(event)=> this.submitForm(event)}>
            Sign in
          </button>
          
        </form>
        <div className="forgotten-password">
          <a href="#">Forgotten your password?</a>
        </div>

        <div className="sign-up">
          <a href="/register">New user? Start here</a>
        </div>
      </div>
    );
  }

  // render() {
  //   return (
  //     <div className="login-form">
  //       <h1>Sign in</h1>
  //       <form onSubmit={(event)=>this.submitForm(event)}>
  //         <div>
  //           <label htmlFor="email">Email</label> 
  //           <input
  //             type="text"
  //             // placeholder="Enter your email address"
  //             id={'email'}
  //             formdata={this.state.formdata.email}
  //             change={(element)=> this.updateForm(element)}
  //           />
  //         </div>
  //         <div>
  //           <label htmlFor="password">Password</label>
  //           <input
  //             type="password"
  //             placeholder="Enter your password"
  //             id={"password"}
  //             formdata={this.state.formdata.password}
  //             change={(element)=> this.updateForm(element)}
  //           />
  //         </div>
  //         <button>Sign in</button>
  //       </form>

        // <div className="forgotten-password">
        //   <a href="#">Forgotten your password?</a>
        // </div>

        // <div className="sign-up">
        //   <a href="/register">New user? Start here</a>
        // </div>
  //     </div>
  //   );
  // }




}

export default connect()(withRouter(Login));