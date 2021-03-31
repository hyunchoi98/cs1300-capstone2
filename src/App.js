import React, { Component } from "react";

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CardSearch from './CardSearch.js';
import Authenticate from './Authenticate';
import Register from './Register';
import SavedPage from './SavedPage';
import Apply from './Apply';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


import './App.css';

class App extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="App">
            <Switch>
              <Route path="/" exact component={Authenticate}></Route>
              <Route path="/register" exact component={Register}></Route>
              <Route path="/cardsearch" exact component={CardSearch}></Route>
              <Route path="/saved" exact component={SavedPage}></Route>
              <Route path="/apply" exact component={Apply}></Route>
              {/* <Route path="/about" component={About}></Route>
              <Route path="/signup" component={Signup}></Route>
              <Route path="/user" component={User}></Route> */}


            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
