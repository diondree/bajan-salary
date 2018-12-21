import React from 'react';
import Card from '@material/react-card';
import '@material/react-card/dist/card.css';

const MyCard = ({ content }) => {
  const { netSalary, nis, incomeTax } = content;
  return (
    <Card className="input">
      <h4>Your Take Home Pay</h4>
      <h3>
        <i className="material-icons">attach_money</i>
        <span className="net-salary">{netSalary}</span>
      </h3>
      <h4>NIS</h4>
      <h3>
        <i className="material-icons">attach_money</i>
        <span className="net-salary">{nis}</span>
      </h3>
      <h4>Income Tax</h4>
      <h3>
        <i className="material-icons">attach_money</i>
        <span className="net-salary">{incomeTax}</span>
      </h3>
    </Card>
  );
};

export default MyCard;
