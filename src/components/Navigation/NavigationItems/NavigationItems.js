import React from 'react';
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from './NavigationItems.module.css';

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link='/'>BurgerBuilder</NavigationItem>
      <NavigationItem link='/orders'>My Orders</NavigationItem>
    </ul>
  );
}

export default navigationItems;
