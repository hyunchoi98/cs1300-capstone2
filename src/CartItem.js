import React, { Component } from "react";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class CartItem extends Component {
  removeCard = () => {
    this.props.removeCard(this.props.card);
  }

  render() {
    let creditcard = this.props.card;

    return (
      <Card style={{ margin: 5, width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">{creditcard.name}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">{creditcard.type}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">Issuer: {creditcard.issuer}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">Annual Fee: ${creditcard.fee}</Typography>
        </CardContent>
        <Button style={{ margin: 5, backgroundColor: "#f6685e" }} onClick={this.removeCard}>Remove</Button>
      </Card>

    );



  }
}
export default CartItem