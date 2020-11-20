import * as actionTypes from '../actions/actionTypes';
import { updateObject } from "../utility";

const INITIAL_PRICE = 4;
const initialState = {
  ingredients: null,
  totalPrice: INITIAL_PRICE,
  error: false,
};

const INGREDIENT_PRICES = {
  salad: 0.4,
  cheese: 0.5,
  meat: 1.2,
  bacon: 0.9
};

const burgerBuilder = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ingredients: {
          ...state.ingredients,
          [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload.ingredientName]
      }
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ingredients: {
          ...state.ingredients,
          [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload.ingredientName]
      }
    case actionTypes.SET_INGREDIENT:
      return updateObject(state, {
        ingredients: action.payload.ingredients,
        error: false,
        totalPrice: INITIAL_PRICE,
      });
    case actionTypes.FETCH_INGREDIENT_FAILED:
      return updateObject(state, {error: true});
    default:
      return state;
  }
};

export default burgerBuilder
