var locationElement = document.querySelector(".city p");
var dateElement = document.querySelector(".date p");
var iconElement = document.querySelector(".image");
var tempElement = document.querySelector(".temp p");
var descElement = document.querySelector(".desc p");
var windElement = document.querySelector(".wind p");
var humElement = document.querySelector(".humidity p");
var uvElement = document.querySelector(".uv p");

var citySubmit = document.querySelector("#city-submit");


var key = "7f9364bc4336da280bffe6dfb0be17b2";

const weather = {};




//geomapping for getting users locations
// navigator.geolocation.getCurrentPosition(setPosition);


// function setPosition(position){
//     let lat = position.coords.latitude;
//     let lon = position.coords.longitude;
    
//     getWeather(lat, lon);
// };

var searchCity = function(event) {
    event.preventDefault();
    var selectedCity = document.querySelector("#search-input").value;
    
    //console.logs for testing
    console.log(selectedCity);
  
    // if (!selectedCity) {
    //   alert("You need to enter a city");
    //   return false;
    // } else {
    //  
      
    // }
  
    getWeather(selectedCity);
  };

//call for openweather api

    function getWeather(selectedCity){   
        let api = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&units=imperial&appid=${key}`;
    fetch(api)
        .then(function(response){
            let data = response.json();
            console.log(data);
            return data;
            
        })
        .then(function(data){
            weather.temperature = data.main.temp;
            weather.date = data.dt;
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
            weather.humidity = data.humidity;
            weather.uv = data.uvi;
            weather.wind = data.wind.speed;
        })
        .then(function(){
            displayWeather();
        });
    }

// display function
function displayWeather(){
    locationElement.innerHTML = `${weather.city},${weather.country}`;
    dateElement.innerHTML = `${weather.date}`;
    iconElement.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather.iconId}@4x.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = `${weather.description}`;
    windElement.innerHTML = `${weather.wind}`;
    humElement.innerHTML = `${weather.humidity}`;
    uvElement.innerHTML = `${weather.uv}`;
    }


    citySubmit.addEventListener("click", searchCity);