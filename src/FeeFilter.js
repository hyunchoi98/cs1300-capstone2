import React, { Component } from "react";
import { AnnualFees } from "./const.js";

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


class FeeFilter extends Component {
  render() {
    let filter = this.props.filter;

    return (
      <FormControl>
        <InputLabel>Annual Fee</InputLabel>
        <Select value={filter["fee"]} onChange={this.props.changeFee}>
          <MenuItem value={AnnualFees.ALL_FEES}>{AnnualFees.ALL_FEES}</MenuItem>
          <MenuItem value={AnnualFees.ZERO}>{AnnualFees.ZERO}</MenuItem>
          <MenuItem value={AnnualFees.LESSTHAN300}>{AnnualFees.LESSTHAN300}</MenuItem>
          <MenuItem value={AnnualFees.MORETHAN300}>{AnnualFees.MORETHAN300}</MenuItem>
        </Select>
      </FormControl>
    )

  }
}

export default FeeFilter;