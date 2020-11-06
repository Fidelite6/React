import React, { Component } from 'react';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
  salad: 0.4,
  cheese: 0.5,
  meat: 1.2,
  bacon: 0.9
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({purchasable: sum > 0});
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = oldCount + 1;
    const newTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

    this.setState({totalPrice: newTotalPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];

    if (oldCount > 0) {
      const updatedIngredients = {
        ...this.state.ingredients
      };
      updatedIngredients[type] = oldCount - 1;
      const newTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
      this.setState({totalPrice: newTotalPrice, ingredients: updatedIngredients})
      this.updatePurchaseState(updatedIngredients);
    }
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disable={disabledInfo}
          purchasable={this.state.purchasable}
          total={this.state.totalPrice}
        />
      </>
    );
  }
}

export default BurgerBuilder;
