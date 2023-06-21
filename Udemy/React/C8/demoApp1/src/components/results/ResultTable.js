const ResultTable = (props) => {
  /* Todo: Show below table conditionally (only once result data is available) */
  /* Show fallback text if no data is available */

  let totalInterestGain = 0;
  let firstYear = props.results[0];
  // let totalInvestmentCapital = firstYear.savingsEndOfYear - firstYear.yearlyContribution - firstYear.yearlyInterest;
  let totalInvestmentCapital = 0;

  return (
    <div>
      {!props.isInputValid && <p style={{ color: "white" }}>invalid input!</p>}

      {props.isInputValid && (
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
                  <td>{yeardata.savingsEndOfYear.toFixed(2)}</td>
                  <td>{yeardata.yearlyInterest.toFixed(2)}</td>
                  <td>{totalInterestGain.toFixed(2)}</td>
                  <td>{totalInvestmentCapital.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ResultTable;
