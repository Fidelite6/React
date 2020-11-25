import React, { Component } from 'react';
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Route, Switch, withRouter } from 'react-router-dom'
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
    return (
      <Layout>
        <Switch>
          <Route path='/checkout' component={Checkout}/>
          <Route path='/orders' component={Orders}/>
          <Route path='/login' component={Auth}/>
          <Route path='/logout' component={Logout}/>
          <Route path='/' exact component={BurgerBuilder}/>
        </Switch>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onTryAuthSignup: () => dispatch(authCheckState())
})

export default withRouter(connect(null, mapDispatchToProps)(App));
