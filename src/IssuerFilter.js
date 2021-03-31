import React, { Component } from "react";
import { Issuers } from "./const.js";

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


class IssuerFilter extends Component {
  render() {
    let filter = this.props.filter;

    return (
      <FormControl>
        <InputLabel>Issuer</InputLabel>
        <Select value={filter["issuer"]} onChange={this.props.changeIssuer}>
          <MenuItem value={Issuers.ALL_ISSUERS}>{Issuers.ALL_ISSUERS}</MenuItem>
          <MenuItem value={Issuers.AMEX}>{Issuers.AMEX}</MenuItem>
          <MenuItem value={Issuers.BARC}>{Issuers.BARC}</MenuItem>
          <MenuItem value={Issuers.BOA}>{Issuers.BOA}</MenuItem>
          <MenuItem value={Issuers.CHASE}>{Issuers.CHASE}</MenuItem>
        </Select>
      </FormControl>
    )

  }
}

export default IssuerFilter;