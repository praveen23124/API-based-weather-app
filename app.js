const express = require("express");

const https = require("https");

const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){

  res.sendFile(__dirname+"/index.html");

})

app.post("/", function(req,res){

  const query = req.body.cityName;
  const apikey = "63eebd44fc04a0dcbc2360ea4a9d9282";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+units;
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data) {
      const WeatherData = JSON.parse(data);
      console.log(WeatherData);
      const temp = WeatherData.main.temp;
      const weatherDescription =WeatherData.weather[0].description;
      const icon = WeatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<p>The climate is currently "+ weatherDescription+"</p>");
      res.write("<h1>The temperature in "+query +" "+ temp + " degree celcius</h1>");
      res.write("<img src = "+imageURL+">");
      res.send()
    })
  });
})



app.listen(3000, function() {
  console.log("Server is running on port 3000: ");
})
