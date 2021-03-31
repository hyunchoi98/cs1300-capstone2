import React, { Component } from "react";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class ApplyItem extends Component {
  state = {
    text: "Mark as Opened",
    clicked: false,
    backgroundColor: "#5cb85c"
  }

  saveCard = () => {
    console.log(this.state.clicked);
    if (!this.state.clicked) {
      this.props.saveCard(this.props.card);
      this.setState({
        text: "Opened",
        clicked: true,
        backgroundColor: "#d9534f"
      });
    }
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
        <Button style={{ margin: 5, backgroundColor: "#0275d8" }} target="_blank" href={creditcard.link}>Apply for Card</Button>
        <Button style={{ margin: 5, backgroundColor: this.state.backgroundColor }} onClick={this.saveCard}>{this.state.text}</Button>
      </Card>

    );



  }
}
export default ApplyItem