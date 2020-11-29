import React, { Component } from 'react';
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import { authCheckState } from "./store/actions";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout')
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders')
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth')
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAuthSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path='/login' component={asyncAuth}/>
        <Route path='/' exact component={BurgerBuilder}/>
        <Redirect to='/'/>
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/login' component={asyncAuth}/>
          <Route path='/checkout' component={asyncCheckout}/>
          <Route path='/orders' component={asyncOrders}/>
          <Route path='/logout' component={Logout}/>
          <Route path='/' exact component={BurgerBuilder}/>
          <Redirect to='/'/>
        </Switch>
      );
    }

    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  onTryAuthSignup: () => dispatch(authCheckState())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
