import { React, Component } from "react";
import Button from "../../components/UI/Button/Button";
import classes from './ContactData.module.css';
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";
import Input from "../../components/UI/Input/Input";

class ContactData extends Component {
  getInputElementConfig = (inputType, placeholder) => {
    return {
      type: inputType,
      placeholder: placeholder,
    };
  }

  createFormFieldObject = (elementType, elementConfig, validation = null, value = '') => {
    return {
      elementType,
      elementConfig,
      validation,
      value,
      valid: false,
    };
  }

  state = {
    loading: false,
    orderForm: {
      name: this.createFormFieldObject(
        'input',
        this.getInputElementConfig('text', 'Your Name'),
        {
          required: true
        }
      ),
      street: this.createFormFieldObject(
        'input', this.getInputElementConfig('text', 'Street'),
        {
          required: true
        }
      ),
      zipCode: this.createFormFieldObject(
        'input', this.getInputElementConfig('text', 'ZIP'),
        {
          required: true,
          minLength: 5,
          maxLength: 5,
        }
      ),
      country: this.createFormFieldObject(
        'input', this.getInputElementConfig('text', 'Country'),
        {
          required: true
        }
      ),
      email: this.createFormFieldObject(
        'input', this.getInputElementConfig('email', 'Your E-Mail'),
        {
          required: true
        }
      ),
      deliveryMethod: this.createFormFieldObject(
        'select', {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'},
          ]
        },
      ),
    },
  }

  checkValidity(value, rules) {
    let isValid = true;

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
      price: this.props.price,
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
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    console.log(updatedFormElement);
    this.setState({orderForm: updatedOrderForm});
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
            value={formElement.config.value}/>
        ))}
        <Button
          btnType='Success'>
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

export default withRouter(ContactData);
