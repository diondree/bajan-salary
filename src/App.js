import React, { Component } from 'react';
import { getYearlySalary, getYearlyNIS, getTax, returnToFrequency } from './util';
import './App.css';

const periods = [
  ['weekly', 'Weekly', 'week'],
  ['bimonthly', 'Twice monthly', 'half-month'],
  ['monthly', 'Monthly', 'month'],
];
const money = value =>
  new Intl.NumberFormat('en-BB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
    value
  );
const agency =
  'https://www.dewebgineer.com/?utm_source=bajan_salary&utm_medium=referral&utm_campaign=tool';
function Arrow() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
class App extends Component {
  state = { salary: '', frequency: 'monthly' };
  componentDidMount() {
    for (let placement = 0; placement < 2; placement += 1) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        /* Keep the calculator and other placement available if an ad fails. */
      }
    }
  }

  render() {
    const { salary, frequency } = this.state;
    const gross = Number(salary);
    const invalid = salary !== '' && (!Number.isFinite(gross) || gross < 0 || gross > 100000000);
    const active = salary !== '' && !invalid;
    const yearly = active ? getYearlySalary(gross, frequency) : 0;
    const nis = returnToFrequency(getYearlyNIS(yearly), frequency);
    const tax = returnToFrequency(getTax(yearly), frequency);
    const net = active ? gross - nis - tax : 0;
    const period = periods.find(item => item[0] === frequency)[2];
    const share = active && gross > 0 ? (net / gross) * 100 : 0;
    const show = value => (active ? money(value) : '—');
    return (
      <div className="app">
        <header className="site-header shell">
          <a className="brand" href="/" aria-label="Bajan Salary home">
            Bajan Salary
          </a>
          <a className="header-link" href="#how-it-works">
            About the calculation
          </a>
        </header>
        <main className="shell">
          <aside className="ad-area ad-area-top" aria-label="Advertisement above calculator">
            <span>ADVERTISEMENT</span>
            <ins
              className="adsbygoogle"
              style={{ display: 'block', width: '100%', height: '50px' }}
              data-ad-client="ca-pub-3060667970956964"
              data-ad-slot="5006115912"
            />
          </aside>
          <section className="intro" aria-labelledby="page-title">
            <div>
              <h1 id="page-title">Barbados Salary Calculator</h1>
              <p className="intro-copy">
                Enter your salary to estimate your take-home pay after NIS and income tax. All
                amounts are in Barbados dollars.
              </p>
            </div>
          </section>
          <section className="calculator" aria-label="Salary calculator">
            <div className="input-panel">
              <h2>Your salary</h2>
              <p className="muted">Use the amount before any deductions.</p>
              <fieldset>
                <legend>How often are you paid?</legend>
                <div className="frequency-options">
                  {periods.map(([value, label]) => (
                    <label key={value} className={frequency === value ? 'selected' : ''}>
                      <input
                        type="radio"
                        name="frequency"
                        value={value}
                        checked={frequency === value}
                        onChange={event => this.setState({ frequency: event.target.value })}
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="salary-label" htmlFor="salary">
                Gross salary <span>per {period}</span>
              </label>
              <div className={`salary-input ${invalid ? 'invalid' : ''}`}>
                <span>BDS $</span>
                <input
                  id="salary"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  max="100000000"
                  step="0.01"
                  placeholder="0.00"
                  value={salary}
                  onChange={event => this.setState({ salary: event.target.value })}
                  aria-invalid={invalid}
                  aria-describedby="salary-help"
                />
              </div>
              <p id="salary-help" className={invalid ? 'error helper' : 'helper'}>
                {invalid
                  ? 'Enter an amount between $0 and $100,000,000.'
                  : 'Include dollars and cents. Your estimate updates instantly.'}
              </p>
              <div className="examples">
                <span>Try an example</span>
                {[2500, 5000, 8000].map(value => (
                  <button
                    type="button"
                    key={value}
                    onClick={() => this.setState({ salary: String(value) })}
                  >
                    ${money(value).replace('.00', '')}
                  </button>
                ))}
              </div>
              <div className="input-note">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  aria-hidden="true"
                >
                  <rect x="5" y="10" width="14" height="11" rx="3" />
                  <path d="M8 10V7a4 4 0 018 0v3M12 14v3" />
                </svg>
                <p>
                  No account needed.
                  <br />
                  <strong>The calculation runs in your browser.</strong>
                </p>
              </div>
            </div>
            <div className="result-panel" aria-live="polite" aria-atomic="true">
              <h2 className="result-heading">Estimated take-home pay</h2>
              <div className="net-amount">
                <span className="currency-prefix">BDS $</span>
                <strong>{show(net)}</strong>
              </div>
              <p className="result-period">per {period}, after estimated deductions</p>
              <div className="breakdown-bar" aria-hidden="true">
                <span style={{ width: `${share}%` }} />
                <i style={{ width: `${active && gross > 0 ? (nis / gross) * 100 : 0}%` }} />
              </div>
              <div className="breakdown">
                <div>
                  <span>Gross pay</span>
                  <strong>${show(active ? gross : 0)}</strong>
                </div>
                <div>
                  <span>
                    <i className="key nis" />
                    NIS contribution
                  </span>
                  <strong>− ${show(nis)}</strong>
                </div>
                <div>
                  <span>
                    <i className="key tax" />
                    Income tax (PAYE)
                  </span>
                  <strong>− ${show(tax)}</strong>
                </div>
                <div className="total">
                  <span>
                    <i className="key net" />
                    Take-home pay
                  </span>
                  <strong>${show(net)}</strong>
                </div>
              </div>
              <p className="result-note">
                {active && gross > 0
                  ? `You keep approximately ${share.toFixed(1)}% of your gross pay.`
                  : 'Enter your salary to see your pay breakdown.'}
              </p>
            </div>
          </section>
          <div className="assumption-note">
            <span aria-hidden="true">ⓘ</span>
            <p>
              This estimate uses the calculator’s existing rate assumptions. It does not yet reflect
              verified 2026 rates.{' '}
              <a
                href="#assumptions"
                onClick={() => {
                  document.getElementById('assumptions').open = true;
                }}
              >
                See what’s included
              </a>
              .
            </p>
          </div>
          <aside className="agency-card">
            <div>
              <h2>Need a tool like this for your business?</h2>
              <p>Dewebgineer builds websites, apps, and tools that put your ideas to work.</p>
            </div>
            <a className="agency-cta" href={`${agency}#contact`}>
              Talk to Dewebgineer <Arrow />
            </a>
          </aside>
          <aside className="ad-area" aria-label="Advertisement below calculator">
            <span>ADVERTISEMENT</span>
            <ins
              className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client="ca-pub-3060667970956964"
              data-ad-slot="5006115912"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </aside>
          <section id="how-it-works" className="explainer">
            <div>
              <h2>About the calculation</h2>
              <p className="muted">
                How your pay frequency, NIS contribution, and income tax affect the estimate.
              </p>
            </div>
            <div className="faq">
              <details open>
                <summary>What is take-home pay?</summary>
                <p>
                  It’s your gross salary minus the NIS contribution and income tax estimated here.
                  Other payroll deductions, benefits, or personal allowances can change the amount
                  on your payslip.
                </p>
              </details>
              <details>
                <summary>What does twice monthly mean?</summary>
                <p>
                  Two paydays each month, or 24 payments a year. This is different from fortnightly
                  pay, which has 26 payments a year. Choose the frequency that matches the amount
                  you enter.
                </p>
              </details>
              <details id="assumptions">
                <summary>Which rates does this calculator use?</summary>
                <p>
                  The existing calculation uses a $25,000 annual allowance, 12.5% tax on the next
                  $50,000, and 28.5% above that. It estimates NIS at 11.25%, capped at $7,128
                  annually. Weekly, twice-monthly, and monthly amounts are annualised over 52, 24,
                  and 12 payments respectively.
                </p>
                <p>
                  These are legacy assumptions, not verified current rates. This estimate excludes
                  additional allowances, credits, and other deductions. Confirm your actual
                  deductions with your payroll provider.
                </p>
              </details>
            </div>
          </section>
        </main>
        <footer className="site-footer">
          <div className="shell footer-inner">
            <a className="footer-brand" href="/">
              Bajan Salary
            </a>
            <p>
              Built and maintained by{' '}
              <a href={agency}>
                Dewebgineer <span aria-hidden="true">↗</span>
              </a>
            </p>
            <span className="footer-currency">Made for Barbados · BDS $</span>
          </div>
        </footer>
      </div>
    );
  }
}
export default App;
