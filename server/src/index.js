//api = 24a4ac1765ca469aa613c29dcbfb94c5

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

//middlewares 
app.use(express.json());  //response convert the json
app.use(cors());

//all currencies
app.get("/getAllCurrencies", async (req, res) => {
    const nameURL = "https://openexchangerates.org/api/currencies.json?prettyprint=false&show_alternative=false&show_inactive=false&app_id=24a4ac1765ca469aa613c29dcbfb94c5"

    
    try{
        const namesResponse = await axios.get(nameURL);
    const nameData = namesResponse.data;

    return res.json(nameData);


    }catch(err){
        console.log(err);
    }
})

//get target amount
app.get ("/convert", async(req,res) => {
    const {date, sourceCurrency, targetCurrency, amount} = req.query;

    try {
     const dataURL = `https://openexchangerates.org/api/historical/${date}.json?app_id=24a4ac1765ca469aa613c29dcbfb94c5`

     const dataResponse = await axios.get(dataURL);
     const rates = dataResponse.data.rates;

     //rates
     const sourceRate = rates[sourceCurrency];
     const targetRate = rates[targetCurrency];

     const targetAmount = (sourceRate / targetRate) * amount;
     return res.json({targetAmount})


        
    } catch (err) {
        console.error(err)
    }
})


//listern to a port
app.listen(5000, () => {
    console.log("server is running on port 5000");
})