//api = 24a4ac1765ca469aa613c29dcbfb94c5

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

//middlewares 
app.use(express.json());  //response convert the json
app.use(cors());

//listern to a port
app.listen(5000, () => {
    console.log("server is running on port 5000");
})