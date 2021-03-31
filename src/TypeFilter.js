import React, { Component } from "react";
import { CardTypes } from "./const.js";

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


class TypeFilter extends Component {
  render() {
    let filter = this.props.filter;

    return (
      <FormControl>
        <InputLabel>Type</InputLabel>
        <Select value={filter["type"]} onChange={this.props.changeType}>
          <MenuItem value={CardTypes.ALL_TYPES}>{CardTypes.ALL_TYPES}</MenuItem>
          <MenuItem value={CardTypes.PERSONAL}>{CardTypes.PERSONAL}</MenuItem>
          <MenuItem value={CardTypes.BUSINESS}>{CardTypes.BUSINESS}</MenuItem>
        </Select>
      </FormControl>
    )

  }
}

export default TypeFilter;