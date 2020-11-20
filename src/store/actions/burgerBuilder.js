import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    payload: {
      ingredientName: name
    }
  }
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    payload: {
      ingredientName: name
    }
  }
};

const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENT,
    payload: {
      ingredients
    }
  }
};

const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENT_FAILED
  }
};

export const fetchIngredients = () => {
  return dispatch => {
    axios.get('https://react-burger-aaf89.firebaseio.com/ingredients.json')
      .then(response => {
        dispatch(setIngredients(response.data));
      })
      .catch(error => {
        dispatch(fetchIngredientsFailed);
      });
  }
}
