var currentWeather = document.querySelector("current-weather");
var location = document.querySelector("loc")

var city = document.getElementById("#city");
var date = document.getElementById("#date");
var icon = document.getElementById("#image");
var temp = document.getElementById("#temp");
var desc = document.getElementById("#desc");
var wind = document.getElementById("#wind");
var humidity = document.getElementById("#humidity");
var uv = document.getElementById("#uv");

var dt = (moment().format("MMMM Do YYYY"));

var btn = document.getElementById("#btn");
var cityInput = document.getElementById("#search");


var key = "34942108e12e5ea45cbb0f0e600464a6";
cityArr = []




function searchCity(event) {
    event.preventDefault();
    var selectedCity = cityInput.value;
    
    console.log(selectedCity);

    // if (!selectedCity) {
    //   alert("You need to enter a city");
    //   return false;
    // } else {
    //     cityArr.push(selectedCity);
    //     localStorage.setItem(selectedCity, JSON.stringify(cityArr));
     
      
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
            // var iconId = data.weather[0].icon;
            // city.innerHTML = ;
            // icon.innerHTML = ``;
            // desc.innerHTML = ;
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            location.innerHTML = `<h2 id="#city">${data.name} + ", " + ${data.sys.country}</h2>`;
        let apiTwo = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}`;
        fetch(apiTwo)
        .then(function(response){
            let data = response.json();
            console.log(data);
            return data;
        })
        .then(function(data){
        //    date.innerHTML = dt
        //    temp.innerHTML = ;
        //    wind.innerHTML = 
        //    humidity.innerHTML = ;
        //    uv.innerHTML = ;


        
            currentWeather.innerHTML =
           `
            
            <p id="#desc">${data.weather[0].description}</p>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png"/>
            <p id="#temp">Temperature: ${data.current.temp}</p>
            <p id="#wind">Wind Speed: ${data.current.wind_speed}</p>
            <p id="#humidity">Humidity: ${data.current.humidity}</p>
            <p id="#uv">UV Index: ${data.current.uvi}</p>`;

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