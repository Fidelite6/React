import { React, Component } from "react";
import Button from "../../components/UI/Button/Button";
import classes from './ContactData.module.css';
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import { connect } from "react-redux";

class ContactData extends Component {
  getInputElementConfig = (inputType, placeholder) => {
    return {
      type: inputType,
      placeholder: placeholder,
    };
  }

  createFormFieldObject = (elementType, elementConfig, value, validation = undefined, validationError = '',) => {
    return {
      elementType,
      elementConfig,
      validation,
      validationError,
      value,
      valid: !validation,
      touched: false,
    };
  }

  state = {
    loading: false,
    orderForm: {
      name: this.createFormFieldObject(
        'input',
        this.getInputElementConfig('text', 'Your Name'),
        '',
        {
          required: true
        },
        'Please, enter your name',
      ),
      street: this.createFormFieldObject(
        'input', this.getInputElementConfig('text', 'Street'),
        '',
        {
          required: true
        },
        'Please, enter your street',
      ),
      zipCode: this.createFormFieldObject(
        'input', this.getInputElementConfig('text', 'ZIP'),
        '',
        {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        'Please, enter ZIP code',
      ),
      country: this.createFormFieldObject(
        'input', this.getInputElementConfig('text', 'Country'),
        '',
        {
          required: true
        },
        'Please, enter your country',
      ),
      email: this.createFormFieldObject(
        'input', this.getInputElementConfig('email', 'Your E-Mail'),
        '',
        {
          required: true
        },
        'Please, provide correct email',
      ),
      deliveryMethod: this.createFormFieldObject(
        'select', {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'},
          ]
        },
        'fastest'
      ),
    },
    formIsValid: false,
  }

  checkValidity(value, rules) {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({loading: true});

    const formData = {};

    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData
    };

    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading: false});
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({loading: false});
      });
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
  }

  render() {
    const formElementsArray = [];

    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      })
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            validationError={formElement.config.validationError}
            touched={formElement.config.touched}
            shouldValidate={formElement.config.validation}
          />
        ))}
        <Button
          btnType='Success'
          disabled={!this.state.formIsValid}
        >
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner/>;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter you Contact Data</h4>
        {form}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ingredients: state.ingredients,
  totalPrice: state.totalPrice,
});

export default connect(mapStateToProps)(withRouter(ContactData));
