import * as actionTypes from './actions';

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrice: 4,
};

const INGREDIENT_PRICES = {
  salad: 0.4,
  cheese: 0.5,
  meat: 1.2,
  bacon: 0.9
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ingredients: {
          ...state.ingredients,
          [action.payload.type]: state.ingredients[action.payload.type] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload.type]
      }
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ingredients: {
          ...state.ingredients,
          [action.payload.type]: state.ingredients[action.payload.type] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload.type]
      }
    default:
      return state;
  }
};

export default reducer
