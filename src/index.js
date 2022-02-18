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
  console.log(latitude);
  console.log(longitude);
}
navigator.geolocation.getCurrentPosition(showPosition);

function currentButton(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showCelTemp(event) {
  event.preventDefault();
  farLink.classList.remove("active");
  celLink.classList.add("active");
  let celciusTemp = (fahrenheitTemperature - 32) / 1.8;
  let tempurature = document.querySelector("#main-temp");
  tempurature.innerHTML = Math.round(celciusTemp);
}

function showFarTemp(event) {
  event.preventDefault();
  celLink.classList.remove("active");
  farLink.classList.add("active");
  let tempurature = document.querySelector("#main-temp");
  tempurature.innerHTML = Math.round(fahrenheitTemperature);
}

function showForecast() {
  let forecast = document.querySelector("#forecast");
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
<div class="col-2">
  <div class="weather-forecast-date">${day}</div>
  <div class="weather-forecast-img">
  <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="" width="42" />
  </div>
  <div class="weather-forecast-temps">
    <span class="weather-forecast-temps-max">18°</span>/<span class="weather-forecast-temps-min">12°</span>
      
</div>
</div>
    `;
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
console.log(now);

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

let celLink = document.querySelector("#cel");
celLink.addEventListener("click", showCelTemp);

let farLink = document.querySelector("#far");
farLink.addEventListener("click", showFarTemp);

showForecast();
