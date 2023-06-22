import styled from "styled-components";

const Result = styled.table`
  max-width: 50rem;
  margin: 2rem auto;
  padding: 1rem;
  table-layout: fixed;
  border-spacing: 1rem;
  text-align: right;

  & thead {
    font-size: 0.7rem;
    color: #83e6c0;
  }

  & tbody {
    font-family: "Roboto Condensed", sans-serif;
    font-size: 0.85rem;
    color: #c2e9e0;
  }
`;

// ------------------------------------------------------------

// formatter used to format output table
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const ResultTable = (props) => {
  /* Todo: Show below table conditionally (only once result data is available) */
  /* Show fallback text if no data is available */

  let totalInterestGain = 0;
  let firstYear = props.results[0];
  let totalInvestmentCapital =
    firstYear.savingsEndOfYear -
    firstYear.yearlyContribution -
    firstYear.yearlyInterest;

  return (
    <Result>
      <thead>
        <tr>
          <th>Year</th>
          <th>Total Savings</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>

      <tbody>
        {props.results.map((yeardata) => {
          totalInterestGain += yeardata.yearlyInterest;
          totalInvestmentCapital += yeardata.yearlyContribution;
          return (
            <tr key={yeardata.year}>
              <td>{yeardata.year}</td>
              <td>{formatter.format(yeardata.savingsEndOfYear)}</td>
              <td>{formatter.format(yeardata.yearlyInterest)}</td>
              <td>{formatter.format(totalInterestGain)}</td>
              <td>{formatter.format(totalInvestmentCapital)}</td>
            </tr>
          );
        })}
      </tbody>
    </Result>
  );
};

export default ResultTable;
