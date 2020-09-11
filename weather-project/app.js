const dotenv = require('dotenv').config()

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
const app_id = process.env.APP_ID;

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {

    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

    const key = req.body.cityName;
    const appid = app_id;
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + key + "&appid=" + appid +"&units=" + unit + "";
    
    https.get(url, function(response) {
        console.log(response.statusCode);

    response.on("data", function(data) {

    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const description = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const imageUrl = " http://openweathermap.org/img/wn/" + icon + "@2x.png"; 
    
    res.write("<h1>The temperature in " + key + " is " + temp + " degrees Celcius.</h1>");
    res.write("<p>The weather is currently " + description + ".</p>");
    res.write("<img src=" + imageUrl + ">");
    res.send();
    });
    });
})



app.listen(3000, function() {
    console.log("Server is running on port 3000.");
});
