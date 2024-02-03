function searchSubmit(event) {
  event.preventDefault();
  let searchCityElement = document.querySelector(".city-input");
  let newCity = searchCityElement.value;
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = newCity;
  let apiKey = `974f7528a7fe8f1a738ftd6eob928053`;
  let units = `metric`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${newCity}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(weatherForecast);
}

function weatherForecast(response) {
  let currentTemp = response.data.temperature.current;
  let currentHumidity = response.data.temperature.humidity;
  let currentWind = response.data.wind.speed;
  let currentCondition = response.data.condition.description;
  console.log(currentHumidity);
  let currentTempValue = document.querySelector("#current-temperature");
  currentTempValue.innerHTML = Math.round(currentTemp);
  let currentHumidityValue = document.querySelector("#current-humidity");
  currentHumidityValue.innerHTML = currentHumidity;
  let currentWindValue = document.querySelector("#current-wind");
  currentWindValue.innerHTML = Math.round(currentWind);
  let currentConditionDescription =
    document.querySelector("#current-condition");
  currentConditionDescription.innerHTML = currentCondition;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchEngine = document.querySelector(".search-engine");
searchEngine.addEventListener("submit", searchSubmit);
console.log(searchEngine);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

//currentDateELement.innerHTML = formatDate(currentDate);
