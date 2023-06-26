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

function displayTown(event) {
  event.preventDefault();
  let input = document.querySelector("#town");
  input.innerHTML = input.value;
  let cityweather = document.querySelector("#city");
  cityweather.innerHTML = input.value;
  let apiKey = "17ad6e67aa629189f73b053634668b20";
  let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&appid=${apiKey}`;
  axios.get(urlApi).then(showTemperature);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", displayTown);

function showTemperature(response) {
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let humidity = document.querySelector("#humidity");
  let humid = response.data.main.humidity;
  humidity.innerHTML = `Humidity : ${humid}`;
}
