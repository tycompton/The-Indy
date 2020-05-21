import React, { Component } from 'react';

import FormField from '../../utils/Form/formfield';
import { update, generateData, isFormValid, populateFields } from '../../utils/Form/formActions';

import { connect } from 'react-redux';

import { getSiteData, updateSiteData } from '../../../actions/site_actions';

class UpdateSiteInfo extends Component {

  state = { 
    formError: false,
    formSuccess: false,
    formdata:{ 
      address: {
        element: 'input',
        value: '',
        config:{
          label: 'Address',
          name: 'address_input',
          type: 'text',
          placeholder: 'Enter site address'
        },
        validation:{
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage:'',
        showlabel: true
      },
      hours: {
        element: 'input',
        value: '',
        config:{
          label: 'Hours',
          name: 'hours_input',
          type: 'text',
          placeholder: 'Enter site opening hours'
        },
        validation:{
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage:'',
        showlabel: true
      },
      telephone: {
        element: 'input',
        value: '',
        config:{
          label: 'Telephone',
          name: 'telephone_input',
          type: 'text',
          placeholder: 'Enter telephone number'
        },
        validation:{
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage:'',
        showlabel: true
      },
      email: {
        element: 'input',
        value: '',
        config:{
          label: 'Email',
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter email address'
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
    }
  }

  updateForm = (element) => {
    const newFormdata = update(element,this.state.formdata,'site_info');
    this.setState({
      formError: false,
      formdata: newFormdata
    })
  }

  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata,'site_info');
    let formIsValid = isFormValid(this.state.formdata,'site_info');

    if (formIsValid) {
      this.props.dispatch(updateSiteData(dataToSubmit)).then(() => {
        this.setState(
          {
            formSuccess: true,
          },
          () => {
            setTimeout(() => {
              this.setState({
                formSuccess: false,
              });
            }, 2000);
          }
        );
      });
    } else {
      this.setState({
        formError: true,
      });
    }  
  }

  componentDidMount(){
    this.props.dispatch(getSiteData()).then(()=>{
      const newFormData = populateFields(this.state.formdata,this.props.site.siteData[0]);
      this.setState({
        formdata: newFormData
      })
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={(event) => this.submitForm(event)}>
          <h1>Site Info</h1>
          <FormField
            id={"address"}
            formdata={this.state.formdata.address}
            change={(element) => this.updateForm(element)}
          />
          <FormField
            id={"hours"}
            formdata={this.state.formdata.hours}
            change={(element) => this.updateForm(element)}
          />
          <FormField
            id={"telephone"}
            formdata={this.state.formdata.telephone}
            change={(element) => this.updateForm(element)}
          />
          <FormField
            id={"email"}
            formdata={this.state.formdata.email}
            change={(element) => this.updateForm(element)}
          />
          <div>
            {
              this.state.formSuccess ?
                <div className="form_success">
                  Update Successful
                </div>

              :null
            }
            {this.state.formError ? (
              <div className="error_label">Please check your data</div>
            ) : null}
            <button onClick={(event) => this.submitForm(event)}>
              Update
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    site: state.site
  }
}

export default connect(mapStateToProps)(UpdateSiteInfo);