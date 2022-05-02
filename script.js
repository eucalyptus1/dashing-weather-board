var city = document.getElementById("#city");
var date = document.getElementById("#date");
var icon = document.getElementById("#image");
var temp = document.getElementById("#temp");
var desc = document.getElementById("#desc");
var wind = document.getElementById("#wind");
var humidity = document.getElementById("#humidity");
var uv = document.getElementById("#uv");

var dt = $("#currentDay").text(moment().format("MMMM Do YYYY, h:mm:ss a"));

var btn = document.getElementById("#btn");
var cityInput = document.getElementById("#search");


var key = "7f9364bc4336da280bffe6dfb0be17b2";
cityArr = []




function searchCity(event) {
    event.preventDefault();
    var selectedCity = cityInput.value;
    
    console.log(selectedCity);

    if (!selectedCity) {
      alert("You need to enter a city");
      return false;
    } else {
        cityArray.push(selectedCity);
        localStorage.setItem(selectedCity, JSON.stringify(cityArr));
     
      
    }
  
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
            var iconId = data.weather[0].icon;
            city.innerHTML = data.name + ", " + data.sys.country;
            icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconId}@4x.png"/>`;
            desc.innerHTML = data.weather[0].description;
            var lat = data.coord.lat;
            var lon = data.coord.lon;
        let apiTwo = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}`;
        fetch(apiTwo)
        .then(function(response){
            let data = response.json();
            console.log(data);
            return data;
        })
        .then(function(data){
           date.innerHTML = dt
           temp.innerHTML = data.current.temp;
           wind.innerHTML = data.current.wind_speed;
           humidity.innerHTML = data.current.humidity;
           uv.innerHTML = data.uvi;
        })
        // .then(function(){
        //     displayWeather();
        // });

        // function fiveDay(lat, lon){
        })

        
    }

// display function
// function displayWeather(){
//     locationElement.innerHTML = `${weather.city},${weather.country}`;
//     dateElement.innerHTML = `${weather.date}`;
//     iconElement.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather.iconId}@4x.png"/>`;
//     tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
//     descElement.innerHTML = `${weather.description}`;
//     windElement.innerHTML = `${weather.wind}`;
//     humElement.innerHTML = `${weather.humidity}`;
//     uvElement.innerHTML = `${weather.uv}`;
//     }




btn.addEventListener("click", searchCity);