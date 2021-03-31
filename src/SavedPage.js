import React, { Component } from "react";

import SavedCards from './SavedCards';
import Topbar from './Topbar';

import { Layout } from 'antd';
import { Link, Redirect } from 'react-router-dom';

import { cardlist, CardTypes, Issuers, AnnualFees, SortTypes } from "./const.js";
import './App.css';
import Grid from '@material-ui/core/Grid';
const { Header, Content, Footer } = Layout;


class SavedPage extends Component {
  constructor() {
    super();


  }

  removeFromSaved = card => {

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
  };



  render() {
    // only allow if there is a current user
    if (localStorage.getItem("currentUser") === null) {
      return <Redirect to='/'></Redirect>
    }
    return (
      <div>
        <div><Topbar /></div>
        <div style={{ margin: "2% 5% 2% 5%", }}>
          <h1 style={{ margin: 10 }}>Your Cards</h1>

          <div style={{
            display: 'flex', flexDirection: 'row', flexWrap: 'wrap', padding: 5,
          }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <SavedCards
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default SavedPage;
