import React, { Component } from 'react';
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import { authCheckState } from "./store/actions";

class App extends Component {
  componentDidMount() {
    this.props.onTryAuthSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path='/login' component={Auth}/>
        <Route path='/' exact component={BurgerBuilder}/>
        <Redirect to='/'/>
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/login' component={Auth}/>
          <Route path='/checkout' component={Checkout}/>
          <Route path='/orders' component={Orders}/>
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
