import React, { Component } from 'react';
// import { Col, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon } from 'reactstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Cell, Grid, Row } from '@material/react-layout-grid';
import '@material/react-layout-grid/dist/layout-grid.css';

import { Navbar, InputField, Dropdown, SalaryCard, Content } from './components';
import { getYearlySalary, getNIS, getTax, returnToFrequency, roundTo2 } from './util';

import './App.css';

class App extends Component {
  state = {
    salary: '',
    frequency: 'monthly',
    netSalary: '0.00',
    nis: '0.00',
    incomeTax: '0.00',
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
    const yearlySalary = getYearlySalary(salary, frequency);

    // Calculate NIS Yearly
    const nisYearly = getNIS(yearlySalary);

    // Calculate Income Tax Yearly
    const incomeTaxYearly = getTax(yearlySalary);

    // Deduct NIS and Income Tax from salary
    const afterDeductionsYearly = yearlySalary - nisYearly - incomeTaxYearly;

    const nisVal = returnToFrequency(nisYearly, frequency);
    const incomeTaxVal = returnToFrequency(incomeTaxYearly, frequency);
    const afterDeductions = returnToFrequency(afterDeductionsYearly, frequency);

    const nis = roundTo2(nisVal);
    const incomeTax = roundTo2(incomeTaxVal);
    const netSalary = roundTo2(afterDeductions);

    this.setState({ netSalary, nis, incomeTax });
  };

  render() {
    const { salary, frequency, netSalary, options, nis, incomeTax } = this.state;
    return (
      <div className="app">
        <Navbar />
        <div className="body">
          <Content>
            <Grid>
              <Row>
                <Cell columns={12}>
                  <h1 className="page-heading">Salary Calculator</h1>
                </Cell>
              </Row>
              <Row>
                <Cell columns={6}>
                  <Row>
                    <Cell columns={12}>
                      <Dropdown
                        name="frequency"
                        label="Frequency"
                        value={frequency}
                        handler={this.inputHandler}
                        options={options}
                      />
                    </Cell>
                  </Row>
                  <Row>
                    <Cell columns={12}>
                      <InputField
                        label="Gross Salary"
                        name="salary"
                        value={salary}
                        handler={this.inputHandler}
                        icon={<i className="material-icons">attach_money</i>}
                      />
                    </Cell>
                  </Row>
                </Cell>
                <Cell columns={6}>
                  <SalaryCard content={{ netSalary, nis, incomeTax, salary }} />
                </Cell>
              </Row>
            </Grid>
          </Content>
        </div>
      </div>
    );
  }
}

export default App;
