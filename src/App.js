import "./App.css";
import { useState, useRef } from "react";

function App() {
  const [mortgage, setMortgage] = useState();
  const interestRef = useRef(0);
  const principalRef = useRef(0);
  const loanRef = useRef(0);

  const handleCalculation = (e) => {
    e.preventDefault();
    const P = parseFloat(principalRef.current.value); //principal loan amount
    const r = parseFloat(interestRef.current.value) / 100 / 12; //monthly interest rate
    const n = parseFloat(loanRef.current.value) * 12; //total number of payments on your mortgage
    const calculation =
      Math.round(
        P * ((r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)) * 100 //standard math equation for calculating your monthly mortgage payment
      ) / 100; //Rounded to 100th place

    const resultArr = calculation.toString().split("."); //Separate array based on decimal

    resultArr.length > 1
      ? setMortgage([resultArr[0].split(""), resultArr[1].split("")]) //With decimal
      : setMortgage([resultArr[0].split("")]); //Without decimal
  };

  return (
    <form className="App" onSubmit={handleCalculation}>
      <h1>Mortgage Calculator</h1>
      <label>Principal Loan Amount</label>
      <input ref={principalRef} type="number" required />
      <label>Interest Rate</label>
      <input
        ref={interestRef}
        type="number"
        min="1"
        max="100"
        required
        placeholder="Enter % of interest"
      />
      <label>Length of Loan</label>
      <input
        ref={loanRef}
        type="number"
        min="1"
        max="100"
        required
        placeholder="Enter # of years"
      />
      <button aria-label="calculate mortgage">Calculate</button>
      {mortgage && (
        <p>
          Your mortgage payment will be $
          {mortgage[0]
            .toReversed()
            .map((value, index) => {
              if (index % 3 === 0 && index !== 0) return value + ",";
              return value;
            })
            .reverse()}
          {mortgage[1] && `.${mortgage[1].join("")}`} 
        </p>
      )}
    </form>
  );
}

export default App;
