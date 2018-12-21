import React from 'react';
import '@material/react-card/dist/card.css';
import { Cell, Row } from '@material/react-layout-grid';
import '@material/react-layout-grid/dist/layout-grid.css';

const SalaryCard = ({ content }) => {
  const { netSalary, nis, incomeTax, salary } = content;
  return (
    <div className="salary-card">
      <Row>
        <Cell columns={6} phoneColumns={6}>
          <h4>Gross Pay</h4>
        </Cell>
        <Cell columns={6} phoneColumns={6}>
          <h3>
            <i className="material-icons">attach_money</i>
            <span className="calculations">{salary || 0}</span>
          </h3>
        </Cell>
      </Row>
      <Row>
        <Cell columns={6} phoneColumns={6}>
          <h4>NIS</h4>
        </Cell>
        <Cell columns={6} phoneColumns={6}>
          <h3>
            <i className="material-icons">attach_money</i>
            <span className="calculations deductions">{nis}</span>
          </h3>
        </Cell>
      </Row>
      <Row>
        <Cell columns={6} phoneColumns={6}>
          <h4>Income Tax</h4>
        </Cell>
        <Cell columns={6} phoneColumns={6}>
          <h3>
            <i className="material-icons">attach_money</i>
            <span className="calculations deductions">{incomeTax}</span>
          </h3>
        </Cell>
      </Row>
      <Row>
        <Cell columns={12} phoneColumns={12}>
          <hr className="answer-separator" />
        </Cell>
      </Row>
      <Row>
        <Cell columns={6} phoneColumns={6}>
          <h4>Your Take Home Pay</h4>
        </Cell>
        <Cell columns={6} phoneColumns={6}>
          <h3>
            <i className="material-icons">attach_money</i>
            <span className="calculations net-salary">{netSalary}</span>
          </h3>
        </Cell>
      </Row>
    </div>
  );
};

export default SalaryCard;
