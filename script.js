var btn = document.getElementById("#btn");
var cityInput = document.getElementById("#search");

var key = "34942108e12e5ea45cbb0f0e600464a6";
cityArr = []



var currentDate = moment().format("MM/DD/YYYY")

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
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            cityTitle = data.name;
            country = data.sys.country;

        let apiTwo = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}`;
        fetch(apiTwo)
        .then(function(response){
            let data2 = response.json();
            console.log(data2);
            return data2;
        })
        .then(function(data2){
            currentWeather  = 
            `<div>
            <p>${currentDate}</p>
            <h2>${cityTitle}, ${country}</h2>
            <p>${data2.current.weather[0].description}</p>
            <img src="https://openweathermap.org/img/wn/${data2.current.weather[0].icon}@4x.png"/>
            <p>Temperature: ${data2.current.temp}°C</p>
            <p>Wind Speed: ${data2.current.wind_speed} mph</p>
            <p>Humidity: ${data2.current.humidity}</p>
            <p id="#uv">UV Index: ${data2.current.uvi}</p>
            </div>`;
            document.getElementById('current-weather').innerHTML = currentWeather;
        })
        let apiThree = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}`;
        fetch(apiThree)
        .then(function(response){
            let data3 = response.json();
            console.log(data3);
            return data3;
        })
        .then(function(data3){
            document.getElementById('five-day').innerHTML = ""
            
            for (var i = 0; i < 5; i++) {
            var weekDates = moment().add(i, "d").format("M/D/YYYY");
            var fiveDay = document.getElementById('five-day');
            var five = document.createElement('div');
            five.innerHTML = 
            `<div>
            <h3 class="date">${weekDates}</h3>
            <img src="https://openweathermap.org/img/wn/${data3.daily[i].weather[0].icon}@2x.png"/>
            <p>Temperature: ${data3.daily[i].temp.max}°C</p>
            <p>Humidity: ${data3.daily[i].humidity}</p>
            <p>Wind Speed: ${data3.daily[i].wind_speed} mph</p>
            </div>`;
            fiveDay.appendChild(five);
            };

        });
    })

        
    };

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