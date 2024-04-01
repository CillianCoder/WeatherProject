const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res) {

    const query = req.body.city;
    const apiCode = "f35c4fa567912477f43dd17388c86d60";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiCode + "&units=" + unit + ""

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data)
            const temperature = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imgURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write(`<h1>The temperature in ${query} is ${temperature} degrees Celsius.</h1>`);
            res.write("<img src=" + imgURL + ">");

            res.send()
        })
    })
})

app.listen(3000, function () {
    console.log("Server running port 3000!");
})