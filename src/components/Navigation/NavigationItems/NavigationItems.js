import React from 'react';
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from './NavigationItems.module.css';

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link='/'>BurgerBuilder</NavigationItem>
      {
        props.isAuth
          ? <NavigationItem link='/orders'>My Orders</NavigationItem>
          : null
      }
      {
        props.isAuth
          ? <NavigationItem link='/logout'>Log Out</NavigationItem>
          : <NavigationItem link='/login'>Authenticate</NavigationItem>
      }
    </ul>
  );
}

export default navigationItems;
