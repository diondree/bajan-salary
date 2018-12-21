import React, { Component } from 'react';
// import { Col, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon } from 'reactstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, InputField, Dropdown, MyCard, Content } from './components';
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
    netSalary: 0,
    options: [
      {
        id: 1,
        label: 'Weekly',
        value: 'weekly',
      },
      {
        id: 2,
        label: 'Monthly',
        value: 'monthly',
      },
      {
        id: 3,
        label: 'BiMonthly',
        value: 'bimonthly',
      },
    ],
  };

  inputHandler = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => this.updateSalary());
  };

  updateSalary = () => {
    const { salary, frequency } = this.state;
    const income = calculateSalary(salary, frequency);
    const netSalary = Math.round(income * 100) / 100;
    this.setState({ netSalary });
  };

  render() {
    const { salary, frequency, netSalary, options } = this.state;
    return (
      <div className="app">
        <Navbar />
        <div className="body">
          <Content>
            <div className="inner-content">
              <h1>Salary Calculator</h1>
              <Dropdown
                name="frequency"
                label="Frequency"
                value={frequency}
                handler={this.inputHandler}
                options={options}
              />
              <InputField
                label="Gross Salary"
                name="salary"
                value={salary}
                handler={this.inputHandler}
                icon={<i className="material-icons">attach_money</i>}
              />
              <MyCard content={netSalary} />
            </div>
          </Content>
        </div>
      </div>
    );
  }
}

export default App;
