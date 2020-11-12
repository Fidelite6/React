import React from 'react';
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Route, Switch } from 'react-router-dom'
import Checkout from "./containers/Checkout/Checkout";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/checkout' component={Checkout}/>
        <Route path='/' exact component={BurgerBuilder}/>
      </Switch>
    </Layout>
  );
}

export default App;
