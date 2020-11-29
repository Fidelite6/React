import { React, Component } from "react";
import Button from "../../components/UI/Button/Button";
import classes from './ContactData.module.css';
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {
  createFormFieldObject,
  getInputElementConfig,
  inputChangedHandler
} from "../../helpers/formHelper";

class ContactData extends Component {
  state = {
    orderForm: {
      name: createFormFieldObject(
        'input',
        getInputElementConfig('text', 'Your Name'),
        '',
        {
          required: true
        },
        'Please, enter your name',
      ),
      street: createFormFieldObject(
        'input', getInputElementConfig('text', 'Street'),
        '',
        {
          required: true
        },
        'Please, enter your street',
      ),
      zipCode: createFormFieldObject(
        'input', getInputElementConfig('text', 'ZIP'),
        '',
        {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        'Please, enter ZIP code',
      ),
      country: createFormFieldObject(
        'input', getInputElementConfig('text', 'Country'),
        '',
        {
          required: true
        },
        'Please, enter your country',
      ),
      email: createFormFieldObject(
        'input', getInputElementConfig('email', 'Your E-Mail'),
        '',
        {
          required: true
        },
        'Please, provide correct email',
      ),
      deliveryMethod: createFormFieldObject(
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

  orderHandler = (e) => {
    e.preventDefault();

    const formData = {};

    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData,
      userId: this.props.userId,
    };

    this.props.onOrderBurger(order, this.props.token);
  }

  inputChangedOrderFormHandler(event, elementId) {
    const changedData = inputChangedHandler(this.state.orderForm, event, elementId)
    this.setState({orderForm: changedData.updatedForm, formIsValid: changedData.formIsValid});
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
            changed={(event) => this.inputChangedOrderFormHandler(event, formElement.id)}
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
    if (this.props.loading) {
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
  ingredients: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
  onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(ContactData, axios)));
