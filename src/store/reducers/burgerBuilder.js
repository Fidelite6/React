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

const addIngredient = (state, action) => {
  return updateObject(state, {
    ingredients: {
      ...state.ingredients,
      [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] + 1,
    },
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload.ingredientName]
  });
};

const removeIngredient = (state, action) => {
  return updateObject(state, {
    ingredients: {
      ...state.ingredients,
      [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] - 1,
    },
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload.ingredientName]
  });
};

const setIngredient = (state, action) => {
  return updateObject(state, {
    ingredients: action.payload.ingredients,
    error: false,
    totalPrice: INITIAL_PRICE,
  });
};

const fetchIngredient = (state, action) => {
  return updateObject(state, {error: true});

}

const burgerBuilder = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENT: return setIngredient(state, action);
    case actionTypes.FETCH_INGREDIENT_FAILED: return fetchIngredient(state, action);
    default: return state;
  }
};

export default burgerBuilder
