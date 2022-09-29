const express = require("express");
const axios = require("axios").default;
const app = express();
const path = require("path");
const API_URL = "https://www.googleapis.com/webfonts/v1/webfonts?key=";
const API_KEY = process.env.API_KEY;

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "public") });
});

app.get("/api", async (req, res) => {
    const url = `${API_URL}${API_KEY}`;
    const response = await axios.get(url);

    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,OPTIONS,PATCH,DELETE,POST,PUT"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );
    return res.json({ data: response.data });
});

app.listen(process.env.PORT || 3000);

module.exports = app;
