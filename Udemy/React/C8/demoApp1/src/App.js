import {useState} from 'react';
import logo from "./assets/investment-calculator-logo.png";
import CalculateForm from "./components/calculateform/CalculateForm";
import ResultTable from "./components/results/ResultTable";


function App() {

  const yearlyData = [];    // proxy object to calculateResults state
  const [calculationResults, setCalculationResults]= useState([]);
  const [isInputValid, setIsInputValid] = useState(false);

  const calculateHandler = (userInput) => {
    // Should be triggered when form is submitted
    // You might not directly want to bind it to the submit event on the form though...

    // const yearlyData = []; // per-year results

    let currentSavings = +userInput["current-savings"]; // feel free to change the shape of this input object!
    const yearlyContribution = +userInput["yearly-contribution"]; // as mentioned: feel free to change the shape...
    const expectedReturn = +userInput["expected-return"] / 100;
    const duration = +userInput["duration"];

    // The below code calculates yearly results (total savings, interest etc) incrementally
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        // feel free to change the shape of the data pushed to the array!
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }

    setCalculationResults(yearlyData);
    // do something with yearlyData ...
    console.log(yearlyData);
    
    setIsInputValid(true);
  };




  return (
    <div>
      <header className="header">
        <img src={logo} alt="logo" />
        <h1>Investment Calculator</h1>
      </header>

      <CalculateForm onCalculate={calculateHandler} setIsInputValid = {setIsInputValid} />

      <ResultTable results={calculationResults} isInputValid = {isInputValid}/>
    </div>
  );
}

export default App;
