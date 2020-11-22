import React, { Component } from 'react';
import { createFormFieldObject, getInputElementConfig, inputChangedHandler } from '../../helpers/formHelper';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";

class Auth extends Component {
  state = {
    controls: {
      email: createFormFieldObject(
        'input',
        getInputElementConfig('email', 'Email Address'),
        '',
        {
          required: true,
          isEmail: true
        },
        'Please, enter correct email',
      ),
      password: createFormFieldObject(
        'input',
        getInputElementConfig('password', 'Password'),
        '',
        {
          required: true,
          minLength: 6
        },
        'Password show be longer than 6 characters',
      ),
    },
    isSignup: true
  }

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangedControlsFormHandler(event, elementId) {
    const changedData = inputChangedHandler(this.state.controls, event, elementId)
    this.setState({controls: changedData.updatedForm, formIsValid: changedData.formIsValid});
  }

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {isSignup: !prevState.isSignup};
    })
  }

  render() {
    const formElementsArray = [];

    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      })
    }

    let form = (
      <form onSubmit={this.submitHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            changed={(event) => this.inputChangedControlsFormHandler(event, formElement.id)}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            validationError={formElement.config.validationError}
            touched={formElement.config.touched}
            shouldValidate={formElement.config.validation}
          />
        ))}
        <Button
          btnType='Success'
          // disabled={!this.state.formIsValid}
        >
          SUBMIT
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner/>;
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath}/>
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        {form}
        <Button btnType='Danger' clicked={this.switchAuthModeHandler}>
          Switch to {this.state.isSignup ? 'SignIn' : 'SignUp'}
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token !== null,
  buildingBurger: state.burgerBuilder.building,
  authRedirectPath: state.auth.authRedirectPath,
});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
  onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
