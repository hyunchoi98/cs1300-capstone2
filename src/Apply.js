import React, { Component } from "react";

import ApplyItem from './ApplyItem';
import {
  List,
  ListItemText,
  ListItem,
} from "@material-ui/core";
import Topbar from './Topbar';

import { Layout } from 'antd';
import { Link, Redirect } from 'react-router-dom';

import { cardlist, CardTypes, Issuers, AnnualFees, SortTypes } from "./const.js";
import './App.css';
import Grid from '@material-ui/core/Grid';
const { Header, Content, Footer } = Layout;


class Apply extends Component {

  constructor() {
    super();

    this.state = {
      cart: [],
      filter: { // store the state of each filter all in one variable
        type: CardTypes.ALL_TYPES,
        issuer: Issuers.ALL_ISSUERS,
        fee: AnnualFees.ALL_FEES,
      },
      sortType: SortTypes.NAME,
      totalFee: 0,
    };


    let importedCards = [];
    let importedTotal = 0;
    let request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: localStorage.getItem('currentUser') })
    };
    fetch('/getCards', request)
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            data.forEach(function (id) {
              let card = cardlist.find(x => x.id === id)
              importedCards.push(card);
              importedTotal += card.fee;
            });
            console.log(importedCards);
            this.setState({
              cart: importedCards,
              totalFee: importedTotal
            });


          });
        }
      });
  }
  addToSaved = card => {
    console.log(card);
    let username = localStorage.getItem('currentUser');
    let cardid = card.id;

    let request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, cardID: cardid })
    };
    fetch('/addToSaved', request)
      .then((response) => {
        if (response.status === 200) {
          console.log("Added saved card to profile")
        } else {
          console.log("Failed to add saved card to profile");
        };
      });
  };

  cartList = card => {
    return (
      <ApplyItem card={card} saveCard={this.addToSaved} />
    )
  }

  render() {
    // only allow browse if there is a current user
    if (localStorage.getItem("currentUser") === null) {
      return <Redirect to='/'></Redirect>
    }

    let listOfCards = this.state.cart.map(this.cartList);

    return (
      <div>
        <Topbar />
        <div style={{ margin: "2% 5% 2% 5%", }}>
          <h1 style={{ margin: 10 }}>Your Cart</h1>
          <h3 style={{ margin: 10 }}>Press "Mark as Opened" after opening each card!</h3>
          <List style={{ margin: 5, width: "50%" }} >{listOfCards}</List>

        </div>

      </div>
    );






    // return (
    //   <div>
    //     <Topbar />
    //     <div style={{ margin: "2% 5% 2% 5%", }}>
    //       <h1 style={{ margin: 10 }}>Apply for the Cards in your Cart</h1>

    //       <div style={{
    //         display: 'flex', flexDirection: 'row', flexWrap: 'wrap', padding: 5,
    //       }}>
    //         <Grid container spacing={1}>
    //           <Grid item xs={9}>
    //             <ApplyItem
    //               filter={this.state.filter}
    //               sortType={this.state.sortType}
    //               addToCart={this.addToCart}
    //               removeFromCart={this.removeFromCart}
    //             />
    //           </Grid>
    //         </Grid>
    //       </div>
    //     </div>
    //   </div>
    // );
  }
}

export default Apply;
