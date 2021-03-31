import React, { Component } from "react";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';



class CreditCard extends Component {
  addCard = () => {
    this.props.addCard(this.props.card);
  }

  render() {
    let creditcard = this.props.card;

    return (
      <Card style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 200, margin: 5 }}>
        <CardMedia style={{ width: '100%', paddingTop: '60%' }}
          image={creditcard.image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">{creditcard.name}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">{creditcard.type}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">Issuer: {creditcard.issuer}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">Annual Fee: ${creditcard.fee}</Typography>
        </CardContent>
        <Button style={{ backgroundColor: "#6fbf73", margin: 5 }} onClick={this.addCard}>Add Card</Button>
      </Card>
    )


  }
}

export default CreditCard;