import React, { Component } from 'react';
import { createFormFieldObject, getInputElementConfig, inputChangedHandler } from '../../helpers/formHelper';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';

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
    }
  }

  inputChangedControlsFormHandler(event, elementId) {
    const changedData = inputChangedHandler(this.state.controls, event, elementId)
    this.setState({controls: changedData.updatedForm, formIsValid: changedData.formIsValid});
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
      <form onSubmit={this.orderHandler}>
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
    return (
      <div className={classes.Auth}>
          {form}
      </div>
    )
  }
}

export default Auth;
