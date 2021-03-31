import React, { Component } from "react";
import { SortTypes } from './const.js';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';



class Sorter extends Component {
  render() {
    return (
      <FormControl>
        <InputLabel>Sort By</InputLabel>
        <Select value={this.props.sortType} onChange={this.props.changeSort}>
          <MenuItem value={SortTypes.NAME}>{SortTypes.NAME}</MenuItem>
          <MenuItem value={SortTypes.FEE}>{SortTypes.FEE}</MenuItem>
        </Select>
      </FormControl>
    );
  }
}
export default Sorter;
