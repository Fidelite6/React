import React, { Component } from 'react';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as burgerBuilderActions from '../../store/actions';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  }

  componentDidMount() {
    this.props.fetchIngredients()
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinue = () => {
    this.setState({loading: true});
    this.props.history.push('/checkout');
  }

  render() {
    const disabledInfo = {
      ...this.props.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? 'Ingredients can`t be loaded' : <Spinner/>;

    if (this.props.ingredients) {
      burger = (
        <>
          <Burger ingredients={this.props.ingredients}/>
          <BuildControls
            ingredientAdded={this.props.addIngredient}
            ingredientRemoved={this.props.removeIngredient}
            disable={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ingredients)}
            ordered={this.purchaseHandler}
            total={this.props.totalPrice}
          />
        </>
      )
      orderSummary = (<OrderSummary
        totalPrice={this.props.totalPrice}
        ingredients={this.props.ingredients}
        cancel={this.purchaseCancelHandler}
        continue={this.purchaseContinue}
      />);
    }

    return (
      <>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>

        {burger}
      </>
    );
  }
}

const mapStateToProps = state => ({
  ingredients: state.ingredients,
  totalPrice: state.totalPrice,
  error: state.error
});

const mapDispatchToProps = dispatch => ({
  addIngredient: type => dispatch(burgerBuilderActions.addIngredient(type)),
  removeIngredient: type => dispatch(burgerBuilderActions.removeIngredient(type)),
  fetchIngredients: () => dispatch(burgerBuilderActions.fetchIngredients()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
