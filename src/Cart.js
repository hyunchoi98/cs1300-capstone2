import React, { Component } from "react";
import {
  List,
  ListItemText,
  ListItem,
} from "@material-ui/core";
import Button from '@material-ui/core/Button';


import CartItem from './CartItem.js'
import { Link, Redirect } from 'react-router-dom';


class Cart extends Component {
  cartList = card => {
    return (
      <CartItem card={card} removeCard={this.props.removeFromCart} />
    )
  }

  render() {
    let listOfCards = this.props.cart.map(this.cartList);

    // Add cart total to the beginning of the list
    listOfCards.unshift(
      <ListItem style={{ textAlign: "left" }}>
        <ListItemText variant="h" component="h2">
          Total annual fees: ${this.props.totalFee}
        </ListItemText>
      </ListItem>
    );

    listOfCards.push(
      <Link to="/apply" style={{ margin: 5, backgroundColor: "#0275d8", width: "100%" }} className="btn btn-primary">Apply for these cards</Link>
    );

    return <List>{listOfCards}</List>;
  }


}
export default Cart;