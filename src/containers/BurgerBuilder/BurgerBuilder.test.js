import React from "react";
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import BurgerBuilder from './BurgerBuilder';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

configure({adapter: new Adapter()});

describe('Burger Builder', () => {
  it('test', () => {
      expect(true).toBeTruthy();
  });

  // let wrapper;
  // beforeEach(() => {
  //   wrapper = shallow(<BurgerBuilder fetchIngredients={() =>{}}/>);
  // });
  //
  // /* TODO:: check Adapter */
  // it('should render BuildControls when receiving ingredients', () => {
  //   wrapper.setProps({ings: {salad: 0}})
  //   expect(wrapper.find(BuildControls)).toHaveLength(1);
  // });
});

