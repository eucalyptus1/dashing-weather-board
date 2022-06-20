var btn = document.getElementById("#btn");
var cityInput = document.getElementById("#search");
var historyList = document.getElementById("#history");
var clear = document.getElementById("#clear");

var key = "34942108e12e5ea45cbb0f0e600464a6";
cityArr = []

var currentDate = moment().format("MM/DD/YYYY")

function searchCity(event) {
    event.preventDefault();
    var selectedCity = cityInput.value;

    var cityStore = JSON.stringify(selectedCity);
        localStorage.setItem("cityArr", cityStore);

    if (!selectedCity) {
      alert("You need to enter a city");
      return false;
    } else {
       var historyItem = document.createElement("li");
       var cityBtn = document.createElement("button");
       cityBtn.innerHTML = selectedCity;
       historyItem.appendChild(cityBtn);
       historyList.appendChild(historyItem);
        cityBtn.addEventListener("click", function() {
            getWeather(selectedCity);
        })
    }
  
    getWeather(selectedCity);
  };

  
    clear.addEventListener("click", function() {
    historyList.innerHTML = "";
    });

//call for openweather api
    function getWeather(selectedCity){   
        let api = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&units=imperial&appid=${key}`;
        fetch(api)
        .then(function(response){
            let data = response.json();
            console.log(data);
            return data;
        })
        // Get latitude and longitude for onecall API
        .then(function(data){
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            cityTitle = data.name;
            country = data.sys.country;
            temp = Math.round(data.main.temp)

        let apiTwo = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`;
        fetch(apiTwo)
        .then(function(response){
            let data2 = response.json();
            console.log(data2);
            return data2;
        })
        .then(function(data2){

            var uv = data2.current.uvi;
                
            if (uv <= 2) {
                uv.className = "favourable";
            } else if (uv >= 3 && uv <= 7) {
                uv.className = "moderate";
            } else {
                uv.className = "severe";
            };

            currentWeather  = 
            `<div>
            <p>${currentDate}</p>
            <h2>${cityTitle}, ${country}</h2>
            <p>${data2.current.weather[0].description}</p>
            <img src="https://openweathermap.org/img/wn/${data2.current.weather[0].icon}@4x.png"/>
            <p>Temperature: ${temp}°C</p>
            <p>Wind Speed: ${data2.current.wind_speed} mph</p>
            <p>Humidity: ${data2.current.humidity}</p>
            <p id="#uv">UV Index: ${uv}</p>
            </div>`;
            document.getElementById('current-weather').innerHTML = currentWeather;
        })
        let apiThree = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;
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



btn.addEventListener("click", searchCity);