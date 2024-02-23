const express = require('express');  
const cors = require('cors');
const axios = require('axios');

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//all currencies
app.get('/getAllcurrencies', async (req, res) => {
    const nameURL = `https://openexchangerates.org/api/currencies.json?prettyprint=false&show_alternative=false&show_inactive=false&app_id=029721144ed24df1baca54e3071f1fc7`;
    

    try {
        const nameResponse = await axios.get(nameURL);
        const nameData = nameResponse.data;
        
        return res.json(nameData);
    }catch (error) {
        console.error(error); 
    }

})
  
//get target currency
app.get("/getCurrencyConversion", (req, res) => { 
    const { date,sourceCurrency, targetCurrency, amountInSourceCurrency } = req.query;

    try {
        const dataURL = `https://openexchangerates.org/api/historical/${date}.json?app_id=029721144ed24df1baca54e3071f1fc7`;
        const dataResponse = axios.get(dataURL);
        const rates = dataResponse.data.rates;

        //rates
        const sourceCurrencyRate = rates[sourceCurrency];
        const targetCurrencyRate = rates[targetCurrency];

        //conversion
        const targetCurrencyAmount = (amountInSourceCurrency / sourceCurrencyRate) * targetCurrencyRate;
        return  res.json(targetCurrencyAmount);

    } catch (error) {
        console.error(error);
    }
})

//listen to port
app.listen(5000, () => {
    console.log('Server is running on port 5000');
})