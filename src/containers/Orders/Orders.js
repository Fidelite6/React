import React, { Component } from 'react';
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
  state = {
    orders: null,
    error: false,
  }

  componentDidMount() {
    axios.get('/orders.json')
      .then(res => {
        this.setState({orders: res.data})
      })
      .catch(error => console.log(error));
  }

  render() {
    let orders = this.state.error ? 'Ingredients can`t be loaded' : <Spinner/>;

    if (this.state.orders) {
      orders = Object.keys(this.state.orders).map(key => {
        const order = this.state.orders[key];
        return (
          <Order
            key={key}
            ingredients={order.ingredients}
            price={+order.price}/>
        );
      });
    }
    return (<>{orders}</>);
  }
}

export default withErrorHandler(Orders, axios);
