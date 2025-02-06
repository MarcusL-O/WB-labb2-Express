require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app =express();
const PORT = process.env.PORT || 3000; 

app.use(cors()); // enable CORS, allows communication 
app.use(express.json());
app.use(express.static("public"));

//Default route
app.get("/", (req, res) => {
    res.send("Express API is running smoooth")
});

//Start and listens to PORT 
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});

//.net api URL
const DOTNET_API_URL = "https://mlsnusapi.azurewebsites.net/snus";

//Get all snus from API
app.get("/snus", async (req, res) => {
    try {
        const response =await axios.get(DOTNET_API_URL);
        res.json(response.data);
    }
    catch (error) {
        console.error(error.message);
    }
});

//Get a snus by id
app.get("/snus/:id", async (req, res) => {
    try {
        const response = await axios.get(`${DOTNET_API_URL}/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        console.error(error.message)
        res.status(500).json({error: "server error"})
    }
});

//Create new snus 
app.post ("/snus", async (req, res) => {
    try {
        const response = await axios.post(DOTNET_API_URL, req.body, {
            headers: {"Content-Type": "application/json"}
        });
        res.status(201).json(response.data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: "Server error"})
    }
});

//Update snus 
app.put("/snus/:id", async (req, res) => {
    try {
        const response = await axios.put(`${DOTNET_API_URL}/${req.params.id}`, req.body, {
            headers: { "Content-Type": "application/json" }
        });
        res.json({ message: "Snus updated" });

    } catch (error) {
        if(error.response && error.response.status === 404){
            res.status(404).json({error: "snus not found"});
        }
        console.error("Error updating snus", error.message);
        res.status(500).json ({error: "server error"})
    }
});

// Deleta snus 
app.delete("/snus/:id", async (req, res) => {
    try {
        await axios.delete(`${DOTNET_API_URL}/${req.params.id}`);
        res.json({message: "Snus deleted"});

    } catch (error) {
        if (error.response && error.response.status === 404) {
            return res.status(404).json ({error: "Snus not found"});
        }
        console.error("Error deleting snus:", error.message);
        res.status(500).json({ error: "Server error" });
    }
});