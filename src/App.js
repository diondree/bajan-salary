import React, { Component } from 'react';
import { Col, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getYearlySalary, getNIS, getTax, returnToFrequency } from './util';
import './App.css';

function calculateSalary(salary, frequency) {
  // converts to yearly salary
  const yearlySalary = getYearlySalary(salary, frequency);

  // Calculate NIS
  const nis = getNIS(yearlySalary);

  // Calculate Income Tax
  const incomeTax = getTax(yearlySalary);

  // Deduct NIS and Income Tax from salary
  const afterDeductions = yearlySalary - nis - incomeTax;

  // Convert back to frequency
  return returnToFrequency(afterDeductions, frequency);
}

class App extends Component {
  state = {
    salary: '',
    frequency: 'monthly',
    net: 0,
  };

  inputHandler = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => this.updateSalary());
  };

  updateSalary = () => {
    const { salary, frequency } = this.state;
    const income = calculateSalary(salary, frequency);
    const net = Math.round(income * 100) / 100;
    this.setState({ net });
  };

  render() {
    const { salary, frequency, net } = this.state;
    return (
      <div className="app">
        <div className="header" color="faded">
          <h3 className="header-text">Bajan Salary</h3>
        </div>
        <div className="body">
          <Form>
            <FormGroup row>
              <Label for="examplePassword" sm={2}>
                Frequency
              </Label>
              <Col sm={6}>
                <Input
                  type="select"
                  name="frequency"
                  placeholder="Frequency"
                  value={frequency}
                  onChange={this.inputHandler}
                >
                  <option value="weekly">Weekly</option>
                  <option value="bimonthly">Bi-Monthly</option>
                  <option value="monthly">Monthly</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="salary" sm={2}>
                Gross Salary
              </Label>
              <Col sm={6}>
                <InputGroup>
                  <InputGroupAddon className="dollaricon" addonType="prepend">
                    $
                  </InputGroupAddon>
                  <Input
                    className="amount"
                    placeholder="0"
                    type="text"
                    name="salary"
                    value={salary}
                    onChange={this.inputHandler}
                  />
                </InputGroup>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="answer" sm={2}>
                Take Home Pay
              </Label>
              <Col sm={8}>
                <h3>$ {net}</h3>
              </Col>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}

export default App;
