require("dotenv").config();
const express = require("express");
const cors = require("cors");

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