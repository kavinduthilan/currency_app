import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function App() {
  const [date, Setdate] = useState();
  const [sourceCurrency, setsourceCurrency] = useState("");
  const [targetCurrency, settargetCurrency] = useState("");
  const [amountInSourceCurrency, setamountInSourceCurrency] = useState(0);
  const [amountInTargetCurrency, setamountInTargetCurrency] = useState(0);
  const [currencyNames, setCurrencyNames] = useState([]); 

  const handleSubmit = async (e) => { 
    e.preventDefault();
    //console.log(date, sourceCurrency, targetCurrency, amountInSourceCurrency);
    try {
      const response = await axios.get("http://localhost:5000/getCurrencyConversion", {
        params: {
        date,
        sourceCurrency,
        targetCurrency,
        amountInSourceCurrency,
      },
      });  
      
    } 
    catch (error) {
      console.error(error);
    }
  }

  //get all currency names
  useEffect(() => { 
    const getCurrencyNames = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getAllcurrencies");
        //to store the currency names in the state
        setCurrencyNames(response.data);
      }
      catch (error) {
        console.error(error);
      }
    }
    getCurrencyNames();
  }, []);
  return (
    <div className="App">
      <h1 className="lg:mx-32  text-5xl font-black flex items-center justify-normal text-pink-500">Currency Converter</h1>
      <div>
        <section>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor={date} name={date} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
              <input
                onChange={(e) => Setdate(e.target.value)}
                type="date"
                id="date"
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com"></input>
            </div>

            <div>
              <label htmlFor={sourceCurrency} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Source Currency</label>
              <select
                onChange={(e) => setsourceCurrency(e.target.value)}
                id={sourceCurrency}
                name={sourceCurrency}
                value={sourceCurrency}
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com">
                <option>Select source currency</option>
                {Object.keys(currencyNames).map((key) => {
                  return (
                    <option key={key} value={key}>
                      {currencyNames[key]}
                    </option>
                  )
                })}
              </select>
            </div>

            <div>
              <label htmlFor={targetCurrency} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Target Currency</label>
              <select
                onChange={(e) => settargetCurrency(e.target.value)}
                id={targetCurrency}
                name={targetCurrency}
                value={targetCurrency}
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com">
                <option>Select your target currency</option>
                {Object.keys(currencyNames).map((key) => {
                  return (
                    <option key={key} value={key}>
                      {currencyNames[key]}
                    </option>
                  )
                })}
              </select>
            </div>

            <div>
              <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount in source currency</label>
              <input
                onChange={(e) => setamountInSourceCurrency(e.target.value)}
                type="number"
                id="date"
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="amount in source currency"></input>
            </div>

            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 my-4 rounded">
              Get the target Currency
            </button>

          </form>
        </section>
      </div>
    </div>
  );
}

export default App;
