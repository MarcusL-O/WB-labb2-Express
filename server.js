require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app =express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // enable CORS, allows communication 
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Express API is running smoooth")
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});

//byt ut mot .net api URL
const DOTNET_API_URL = "url här";

//Get all snus from API
app.get("/snus", async (req, res) => {
    try {
        const response =await axios.get(DOTNET_API_URL);
        res.join(response.data);
    }
    catch (error) {
        console.error(error.message);
    }
});