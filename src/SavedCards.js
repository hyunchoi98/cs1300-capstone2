import React, { Component } from "react";
import List from "@material-ui/core/List";
import { cardlist, CardTypes, Issuers, AnnualFees, SortTypes } from "./const";
import SavedItem from './SavedItem';

class SavedCards extends Component {
  constructor() {
    super();

    this.state = {
      saved: [],
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
    fetch('/getSavedCards', request)
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
              saved: importedCards,
              totalFee: importedTotal
            });


          });
        }
      });

  }


  removeFromSaved = card => {
    // let total = this.state.totalFee;
    // let cart = this.state.cart;

    // total = total - card.fee; // decrements total fee
    // cart = cart.filter((x) => x !== card); // removes the card from the cart

    // this.setState({
    //   totalFee: total,
    //   cart: cart,
    // });

    let saved = this.state.saved;

    saved = saved.filter((x) => x !== card); // removes the card from the cart

    this.setState({
      saved: saved
    });


    let username = localStorage.getItem('currentUser');
    let cardid = card.id;

    let request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, cardID: cardid })
    };
    fetch('/removeSavedCard', request)
      .then((response) => {
        if (response.status === 200) {
          console.log("Removed card from profile")
        } else {
          console.log("Failed to remove card to profile");
        };
      });
    this.setState()
  };

  closeCard = card => {
    this.removeFromSaved(card);
  };

  createList = card => {
    return (
      <SavedItem style={{ margin: 5 }} card={card} closeCard={this.closeCard} />
    );
  };

  render() {
    let savedCards = this.state.saved;
    savedCards.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      } else if (a.name < b.name) {
        return -1;
      } else {
        return 0;
      }
    });
    const listItems = savedCards.map(this.createList);

    return <List style={{
      display: 'flex', flexDirection: 'row', flexWrap: 'wrap', padding: 5
    }
    }> {listItems}</List >;
  }

}

export default SavedCards;