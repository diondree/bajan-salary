const ALLOWANCE = 25000;
const NIS_CEILINGS = {
  bimonthly: '267.51',
  monthly: '535.02',
  weekly: '123.43',
};
const NIS_RATE = 11.1 / 100;

const PAY_FREQUENCIES = {
  bimonthly: 24,
  weekly: 52,
  monthly: 12,
};

function roundTo2(num) {
  return (Math.round(num * 100) / 100).toFixed(2);
}

function getYearlySalary(salary, frequency) {
  // Calculate Yearly Salary
  return PAY_FREQUENCIES[frequency] * salary;
}

function returnToFrequency(amount, frequency) {
  return amount / PAY_FREQUENCIES[frequency];
}

function getYearlyNIS(salary) {
  return salary * NIS_RATE;
}

function getNIS(initialVal, frequency, salary) {
  if (Number.isNaN(salary)) {
    return 'NaN';
  }
  const ceiling = NIS_CEILINGS[frequency];
  if (initialVal < ceiling) {
    return roundTo2(initialVal);
  }
  return ceiling;
}

function getTax(salary) {
  const taxable = salary - ALLOWANCE;

  if (taxable < 0) {
    return 0;
  }

  // if amount is 35000 or under then income tax is 16%
  if (taxable <= 35000) {
    return (taxable * 16) / 100;
  }

  // if amount is over 35000 and less than or equal to 50 000
  // then the 35000 is done at 16% and the remainder is done at 33.5%
  if (taxable > 35000 && taxable <= 50000) {
    const bracket1 = (35000 * 16) / 100;
    const remainder = ((taxable - 35000) * 33.5) / 100;
    return bracket1 + remainder;
  }

  // if amount is over 50000 then the first 35000 is done at 16%
  // the amount next 15000 is done at 33.5%
  // the remainder is done at 40%
  const bracket1 = (35000 * 16) / 100;
  const bracket2 = (50000 * 33.5) / 100;
  const remainder = ((taxable - 35000 - 50000) * 40) / 100;
  return bracket1 + bracket2 + remainder;
}

export { getTax, getYearlyNIS, getNIS, getYearlySalary, returnToFrequency, roundTo2 };
