import React, { Component } from 'react';
import style from './Auth.module.css';
import Button from '../../components/UI/button';
import Input from '../../components/UI/Input';
import { connect } from 'react-redux';
import { auth } from '../../store/actions/auth';

class Auth extends Component {

  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Enter your email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: 'Enter your password',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        }
      },
    }
  }
  loginHandler = async () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    )
  }

  registerHandler = async () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false
    )
  }

  submitHandler (e) {
    e.preventDefault()
  }

  validateEmail (email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  validateControl (value, validation) {
    if(!validation) {
      return true
    }
    let isValid = true

    if(validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if(validation.email) {
      isValid = this.validateEmail(value) && isValid
    }

    if(validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
  }
  onChangeHandler(event, controlName) {
    const formControls = {...this.state.formControls}
    const control = {...formControls[controlName]}
    control.value = event.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)
    formControls[controlName] = control

    let isFormValid = true
    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })
    this.setState({
      formControls, isFormValid
    })
  }
  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMassage={control.errorMessage}
          onChange={e => this.onChangeHandler(e, controlName)}
        />
      )
    })
  }
  render () {
    return (
      <div className={style.Auth}>
        <div>
          <h1>Authorization</h1>
          <form className={style.AuthForm} onSubmit={this.submitHandler}>
            {this.renderInputs()}
            <Button
              type='success'
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >
              SignIn
            </Button>
            <Button type='primary' onClick={this.registerHandler}>SignUp</Button>
          </form>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  }
}

export default connect(null, mapDispatchToProps)(Auth)
