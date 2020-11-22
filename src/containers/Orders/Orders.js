import React, { Component } from 'react';
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions";
import { connect } from "react-redux";

class Orders extends Component {
  componentDidMount() {
    this.props.getOrders(this.props.token);
  }

  render() {
    let orders = <Spinner/>;

    if (!this.props.loading) {
      orders = Object.keys(this.props.orders).map(key => {
        const order = this.props.orders[key];
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

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token
});

const mapDispatchToProps = dispatch => ({
  getOrders: (token) => dispatch(actions.fetchOrders(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
