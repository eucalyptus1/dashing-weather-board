//weather API

var iconElement = document.querySelector(".image");
var tempElement = document.querySelector(".temp p");
var descElement = document.querySelector(".desc p");
var locationElement = document.querySelector(".city p");

var key = "7f9364bc4336da280bffe6dfb0be17b2";

const weather = {};

//convert temperature to celcius
var KELVIN = 273;

weather.temperature = {
    unit : "celsius"
}

function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}




//geomapping for getting users locations
navigator.geolocation.getCurrentPosition(setPosition);


function setPosition(position){
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    
    getWeather(lat, lon);
}

//call for openweather api
function getWeather(lat, lon){
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}

// display function
function displayWeather(){
    iconElement.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather.iconId}@4x.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}`;
}
//end weather api