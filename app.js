require('dotenv').config()
const { log } = require("console");
const express = require("express");
const bodyparser = require("body-parser");
const https = require("https");
const app = express();
app.use(express.static(__dirname+"/public"));
app.use(bodyparser.urlencoded({extended: true}));



    app.set('view engine', 'ejs');
    let query = "City Name"
    let temp = "00"
    let icon = "00"
    let descripition ="00"
    let imgURL = "00"
    let windSpeed ="00"
    let humidity="00"
    let click = "height:150px;"

app.get("/",function(req, res){
    res.render("index", {click: click, windSpeed: windSpeed, humidity:humidity, temp:temp, icon:icon, descripition:descripition, imgURL: imgURL, query:query});
    
})
app.post("/",function(req, res){
    const query = req.body.City;
    const apiKey = process.env.API_KEY;
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units+"";
    https.get(url, function(response){
        console.log(response.statusCode);
            response.on("data", function(data){
                WheaterData = JSON.parse(data);
                temp = WheaterData.main.temp;
                icon = WheaterData.weather[0].icon
                descripition = WheaterData.weather[0].description;
                windSpeed = WheaterData.wind.speed;
                humidity = WheaterData.main.humidity;
                click = "height:500px;"
                imgURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
                res.render("index", {click: click,windSpeed: windSpeed,humidity:humidity, temp:temp, icon:icon, descripition:descripition, imgURL: imgURL, query:query});
            })
    
        })
    })
    

app.listen(process.env.PORT || 3000, function(){
    console.log("running on port: 3000");
})
