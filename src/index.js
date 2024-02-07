function refreshWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#current-city");
  let conditionElement = document.querySelector("#current-condition");
  let humidityElement = document.querySelector("#current-humidity");
  let windElement = document.querySelector("#current-wind");
  let timeElement = document.querySelector("#current-time");
  let date = new Date(response.data.time * 1000);
  let lucetteElement = document.querySelector("#lucette-img");

  let temperatureDegree = temperaturePerceived(temperature);

  lucetteElement.innerHTML = `<img src="img/${response.data.condition.icon}-${temperatureDegree}.png" 
  alt="Lucette the frog" />`;

  cityElement.innerHTML = response.data.city;
  conditionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  timeElement.innerHTML = formatDate(date);
  temperatureElement.innerHTML = Math.round(temperature);
}
function temperaturePerceived(temp) {
  if (temp < 10) {
    return "cold";
  }
  if (temp < 25) {
    return "norm";
  } else {
    return "hot";
  }
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
function searchCity(city) {
  let apiKey = `974f7528a7fe8f1a738ftd6eob928053`;
  let units = `metric`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(refreshWeather);
}
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}
function displayForecast() {
  let days = ["Wed", "Thu", "Fri", "Sat", "Sun"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml += `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${day}</div>
          <div class="weather-forecast-temp">
            <span class="weather-forecast-min">12º</span>
              <span class="weather-forecast-max">15º</span>
          </div>
        </div>
      </div>
    `;
  });
  let forecastElement = document.querySelector("#forecast");

  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Valencia");
displayForecast();
