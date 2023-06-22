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
  let totalInvestmentCapital = firstYear.savingsEndOfYear - firstYear.yearlyContribution - firstYear.yearlyInterest;

  return (
    <table className="result">
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
    </table>
  );
};

export default ResultTable;
