import React from 'react';
import Card from '@material/react-card';
import '@material/react-card/dist/card.css';

const MyCard = ({ content }) => (
  <Card className="input">
    <h4>Your Take Home Pay</h4>
    <h3>
      <i className="material-icons">attach_money</i>
      <span className="net-salary">{content}</span>
    </h3>
  </Card>
);

export default MyCard;
