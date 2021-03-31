import React, { Component } from "react";

import TypeFilter from "./TypeFilter.js";
import IssuerFilter from "./IssuerFilter.js";
import FeeFilter from "./FeeFilter.js";
import FilteredList from "./FilteredList.js";
import Sorter from "./Sorter.js";
import Cart from './Cart.js';
import Button from '@material-ui/core/Button';
import Topbar from './Topbar';

import { Layout } from 'antd';
import { Link, Redirect } from 'react-router-dom';

import { cardlist, CardTypes, Issuers, AnnualFees, SortTypes } from "./const.js";
import './App.css';
import Grid from '@material-ui/core/Grid';
const { Header, Content, Footer } = Layout;


class CardSearch extends Component {

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

  // Change type filter
  changeType = event => {
    let newType = event.target.value;
    let newFilter = this.state.filter;
    newFilter["type"] = newType;
    this.setState({
      filter: newFilter,
    });
  };

  // Change issuer filter
  changeIssuer = event => {
    let newIssuer = event.target.value;
    let newFilter = this.state.filter;
    newFilter["issuer"] = newIssuer;
    this.setState({
      filter: newFilter,
    });
  };

  // Change fee filter
  changeFee = event => {
    let newFee = event.target.value;
    let newFilter = this.state.filter;
    newFilter["fee"] = newFee;
    this.setState({
      filter: newFilter,
    });
  };

  // Change the type of sort used
  changeSortType = event => {
    let newSortType = event.target.value;
    this.setState({
      sortType: newSortType,
    });
  };

  addToCart = card => {
    console.log(card);
    let cart = this.state.cart;

    // Only allow one of each card to be added to the cart
    if (cart.filter(e => e.name === card.name).length > 0) {
      window.alert("Only one of each card can be added to your cart!")
    } else {
      cart.push(card);
      let total = this.state.totalFee + card.fee;
      this.setState({
        totalFee: total,
        cart: cart,
      });
      let username = localStorage.getItem('currentUser');
      let cardid = card.id;

      let request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, cardID: cardid })
      };
      fetch('/addCard', request)
        .then((response) => {
          if (response.status === 200) {
            console.log("Added card to profile")
          } else {
            console.log("Failed to add card to profile");
          };
        });
    }

  };

  removeFromCart = card => {
    let total = this.state.totalFee;
    let cart = this.state.cart;

    total = total - card.fee; // decrements total fee
    cart = cart.filter((x) => x !== card); // removes the card from the cart

    this.setState({
      totalFee: total,
      cart: cart,
    });

    let username = localStorage.getItem('currentUser');
    let cardid = card.id;

    let request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, cardID: cardid })
    };
    fetch('/removeCard', request)
      .then((response) => {
        if (response.status === 200) {
          console.log("Removed card from profile")
        } else {
          console.log("Failed to remove card to profile");
        };
      });
  };

  resetFilters = () => {
    let newFilter = { // store the state of each filter all in one variable
      type: CardTypes.ALL_TYPES,
      issuer: Issuers.ALL_ISSUERS,
      fee: AnnualFees.ALL_FEES,
    }
    this.setState({
      filter: newFilter,
    })
  }


  render() {
    // only allow browse if there is a current user
    if (localStorage.getItem("currentUser") === null) {
      return <Redirect to='/'></Redirect>
    }
    return (
      <div>
        <Topbar />
        <div style={{ margin: "2% 5% 2% 5%", }}>
          <h1 style={{ margin: 10 }}>Browse Credit Cards</h1>
          <h2 style={{ margin: 10 }}>Find the best credit card for you!</h2>
          <div id="filters">
            <Grid style={{ margin: 10, padding: 5 }}>
              <Sorter style={{ padding: 5 }} changeSort={this.changeSortType} sortType={this.state.sortType}></Sorter>
              <TypeFilter style={{ padding: 5 }} changeType={this.changeType} filter={this.state.filter}></TypeFilter>
              <IssuerFilter style={{ padding: 5 }} changeIssuer={this.changeIssuer} filter={this.state.filter}></IssuerFilter>
              <FeeFilter style={{ padding: 5 }} changeFee={this.changeFee} filter={this.state.filter}></FeeFilter>
              <Button style={{ backgroundColor: "#f0ad4e", padding: 5 }} onClick={this.resetFilters}>Reset Filters</Button>
            </Grid>
          </div>

          <div style={{
            display: 'flex', flexDirection: 'row', flexWrap: 'wrap', padding: 5,
          }}>
            <Grid container spacing={1}>
              <Grid item xs={9}>
                <FilteredList
                  filter={this.state.filter}
                  sortType={this.state.sortType}
                  addToCart={this.addToCart}
                  removeFromCart={this.removeFromCart}
                />
              </Grid>
              <Grid item xs={3}>
                <Cart
                  cart={this.state.cart}
                  totalFee={this.state.totalFee}
                  removeFromCart={this.removeFromCart}
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default CardSearch;
