let today = new Date();
let day = today.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let hour = today.getHours();
let minutes = (today.getMinutes() < 10 ? "0" : "") + today.getMinutes();
let dayTime = document.querySelector("#currentdate");
let currentday = `${days[day]} ${hour}:${minutes}`;
dayTime.innerHTML = currentday;
let celseuisTemperature = null;
function showTemperature(response) {
  celseuisTemperature = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let humidity = document.querySelector("#humidity");
  let humid = response.data.main.humidity;
  humidity.innerHTML = `Humidity : ${humid}`;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let icon = response.data.weather[0].icon;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${icon}@2x.png`
  );
}

function displayForecast(day) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Tue", "Thu", "Fri", "Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="row">
      <div class="col-2">
      <div class="weather-forecast-date">${day} </div>
    <img src="https://openweathermap.org/img/wn/50d@2x.png" alt="" width="42">
    <div class="weather-forecast-temperatures">
      <span class="weather-forecast-tempeature-max> 18 </span>
      <span class="weather-forecast-tempeature-min> 18 </span>
      </div>
      </div>
    </div>`;
  });
  forecastHTML = forecastHTML + "</div>";
  forecastElement.innerHTML = forecastHTML;
}

function search(city) {
  let Apikey = "17ad6e67aa629189f73b053634668b20";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Apikey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#town");
  search(cityInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function displayFahreinheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let fareinheit = Math.round((celseuisTemperature * 9) / 5 + 32);
  temperature.innerHTML = fareinheit;
}

let fahreinheiLink = document.querySelector("#fahrenheit");
fahreinheiLink.addEventListener("click", displayFahreinheit);

function displayCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = celseuisTemperature;
}

let celsuisLink = document.querySelector("#celsius");
celsuisLink.addEventListener("click", displayCelsius);
displayForecast();
