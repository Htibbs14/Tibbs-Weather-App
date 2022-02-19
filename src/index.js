function cityTemp(response) {
  console.log(response);
  let apiTemp = Math.round(response.data.main.temp);
  let location = response.data.name;
  let feelTemp = Math.round(response.data.main.feels_like);
  let hum = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let description = response.data.weather[0].description;
  let icon = response.data.weather[0].icon;
  let city = document.querySelector("#location");
  city.innerHTML = `${location}`;
  let temperature = document.querySelector("#main-temp");
  temperature.innerHTML = `${apiTemp}`;
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = `${feelTemp}`;
  let humid = document.querySelector("#humidity");
  humid.innerHTML = `${hum}`;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `${wind}`;
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = `${description}`;
  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  fahrenheitTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function getForecast(coordinates) {
  let apiKey = "c176156c8c25cae90d4b83c175b81e5f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showForecast);
}

function cityInput(event) {
  event.preventDefault();
  let enterCity = document.querySelector("#type-city");
  let h1 = document.querySelector("h1");
  h1.innerHTML = enterCity.value;
  let apiKey = "c176156c8c25cae90d4b83c175b81e5f";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${enterCity.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(cityTemp);
}
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "c176156c8c25cae90d4b83c175b81e5f";
  let units = "imperial";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(cityTemp);
}
navigator.geolocation.getCurrentPosition(showPosition);

function currentButton(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function showForecast(response) {
  let forecastRes = response.data.daily;
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecastRes.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
<div class="col-2">
  <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
  <div class="weather-forecast-img">
  <img src="http://openweathermap.org/img/wn/${
    forecastDay.weather[0].icon
  }@2x.png" alt="" width="42" />
  </div>
  <div class="weather-forecast-temps">
    <span class="weather-forecast-temps-max" id="max">${Math.round(
      forecastDay.temp.max
    )}°</span>/<span class="weather-forecast-temps-min" id="min">${Math.round(
          forecastDay.temp.min
        )}°</span>
      
</div>
</div>
    `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

let fahrenheitTemperature = null;

let button = document.querySelector("button");
button.addEventListener("click", currentButton);

let search = document.querySelector("form");
search.addEventListener("submit", cityInput);

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let h2 = document.querySelector("h2");
h2.innerHTML = `${day} ${hour}:${minutes}`;
