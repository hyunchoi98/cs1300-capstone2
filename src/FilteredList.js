import React, { Component } from "react";
import List from "@material-ui/core/List";
import { cardlist, CardTypes, Issuers, AnnualFees, SortTypes } from "./const";
import CreditCard from "./CreditCard.js";

class FilteredList extends Component {
  addCard = card => {
    this.props.addToCart(card);
  };

  createList = card => {
    return (
      <CreditCard style={{ margin: 5 }} card={card} addCard={this.addCard} />
    );
  };


  filterHandler(data, filter) {
    // Filter the list of cards one by one by each attribute 
    let filtered = data;
    if (filter['type'] !== CardTypes.ALL_TYPES) {
      filtered = filtered.filter(card => card['type'] === filter['type']);
    }

    if (filter['issuer'] !== Issuers.ALL_ISSUERS) {
      filtered = filtered.filter(card => card['issuer'] === filter['issuer']);
    }

    if (filter['fee'] !== AnnualFees.ALL_FEES) {
      if (filter['fee'] === AnnualFees.ZERO) {
        filtered = filtered.filter(card => card['fee'] === 0);
      } else if (filter['fee'] === AnnualFees.LESSTHAN300) {
        filtered = filtered.filter(card => card['fee'] < 300);
      } else {
        filtered = filtered.filter(card => card['fee'] > 300);
      }
    }
    return filtered;
  }

  sortHandler(data, sortType) {
    // Handle each sort type individually
    if (sortType === SortTypes.NAME) {
      data.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        } else if (a.name < b.name) {
          return -1;
        } else {
          return 0;
        }
      });
    } else if (sortType === SortTypes.FEE) {
      data.sort((a, b) => {
        if (a.fee > b.fee) {
          return 1;
        } else if (a.fee < b.fee) {
          return -1;
        } else {
          return 0;
        }
      });
    }
  }

  render() {
    let filtered = this.filterHandler(cardlist, this.props.filter);
    this.sortHandler(filtered, this.props.sortType);
    const listItems = filtered.map(this.createList);

    return <List style={{
      display: 'flex', flexDirection: 'row', flexWrap: 'wrap', padding: 5
    }
    }> {listItems}</List >;
  }

}

export default FilteredList;