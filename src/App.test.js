import React from 'react';
import ReactDOM from 'react-dom';
import { Simulate } from 'react-dom/test-utils';
import App from './App';

let container;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});
afterEach(() => {
  ReactDOM.unmountComponentAtNode(container);
  container.remove();
});
const enterSalary = value => {
  const input = container.querySelector('#salary');
  input.value = value;
  Simulate.change(input, { target: { value } });
};
const net = () => container.querySelector('.net-amount strong').textContent;

it('calculates a decimal monthly salary and recalculates when frequency changes', () => {
  ReactDOM.render(<App />, container);
  expect(net()).toBe('—');
  enterSalary('5000.50');
  expect(net()).toBe('4,073.30');
  Simulate.change(container.querySelector('input[value="weekly"]'), {
    target: { value: 'weekly' },
  });
  expect(net()).toBe('3,729.15');
});

it('supports zero, rejects negatives, and clears stale results', () => {
  ReactDOM.render(<App />, container);
  enterSalary('0');
  expect(net()).toBe('0.00');
  enterSalary('-1');
  expect(net()).toBe('—');
  expect(container.querySelector('#salary').getAttribute('aria-invalid')).toBe('true');
  enterSalary('5000');
  enterSalary('');
  expect(net()).toBe('—');
});

it('provides working salary examples and tracked agency links', () => {
  ReactDOM.render(<App />, container);
  Simulate.click(container.querySelector('.examples button'));
  expect(container.querySelector('#salary').value).toBe('2500');
  expect(net()).toBe('2,166.67');
  const cta = container.querySelector('.agency-cta');
  expect(cta.href).toContain('https://www.dewebgineer.com/?utm_source=bajan_salary');
  expect(cta.hash).toBe('#contact');
  expect(container.querySelector('.site-footer p a').href).toContain(
    'https://www.dewebgineer.com/'
  );
});
