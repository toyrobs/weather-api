// JavaScript File
var weatherData = {
  city: document.querySelector("#city"),
  weather: document.querySelector("#weather"),
  temperature: document.querySelector("#temperature"),
  temperatureValue: 0,
  units: "°C"
};




function  roundTemperature (value){
  Math.round(value);
}



 function switchUnits(){
  if (weatherData.units == "°C"){
    weatherData.temperatureValue = roundTemperature(weatherData.temperatureValue * 9/5 + 32);
    weatherData.units = "°F";
  }
  else{
    weatherData.temperatureValue = roundTemperature((weatherData.temperatureValue -  32) * 5/9);
    weatherData.units = "°C";
  }

  weatherData.temperature.innerHTML = weatherData.temperatureValue + weatherData.units + ", ";      
}






function loadBackground(lat, lon, weatherTag) {
  var script_element = document.createElement('script');

  script_element.src = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=858c0bcf987323f9ed9854285e854435&lat=" + lat + "&lon=" + lon + "&accuracy=1&tags=" + weatherTag + "&sort=relevance&extras=url_l&format=json";

  document.getElementsByTagName('head')[0].appendChild(script_element);
}



function jsonFlickrApi(data){
  if (data.photos.pages > 0){
    var photo = data.photos.photo[0];
    document.querySelector("body").style.backgroundImage = "url('" + photo.url_l + "')";
    document.querySelector("#image-source").setAttribute("href", "http://www.flickr.com/photos/" + photo.owner + "/" + photo.id);
  }
  else{
    document.querySelector("body").style.backgroundImage = "url('https://fourtonfish.com/tutorials/weather-web-app/images/default.jpg')";
    document.querySelector("#image-source").setAttribute("href", "https://www.flickr.com/photos/superfamous/310185523/sizes/o/");
  }
}


function getLocationAndWeather(){
  if (window.XMLHttpRequest){
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function() {
      var response = JSON.parse(xhr.responseText);

      console.log(response);
      var position = {
        latitude: response.latitude,
        longitude: response.longitude
      };
      var cityName = response.city;

      var weatherSimpleDescription = response.weather.simple;
      var weatherDescription = response.weather.description;
      var weatherTemperature = roundTemperature(response.weather.temperature);

      weatherData.temperatureValue = weatherTemperature;

      loadBackground(position.latitude, position.longitude, weatherSimpleDescription);
      weatherData.city.innerHTML = cityName;
      weatherData.weather.innerHTML =  ", " + weatherDescription;
      weatherData.temperature.innerHTML = weatherTemperature + weatherData.units;
    }, false);

    xhr.addEventListener("error", function(err){
      alert("Could not complete the request");
    }, false);

    xhr.open("GET", "https://fourtonfish.com/tutorials/weather-web-app/getlocationandweather.php?owapikey=ce84be2c158f99365c6710a1c5209177&units=metric", true);
    xhr.send();
  }
  else{
    alert("Unable to fetch the location and weather data.");
  }           
}

 getLocationAndWeather();
