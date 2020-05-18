/**
 * Weather App
 * DONE: Complete getWeatherData() to return json response Promise
 * DONE: Complete searchCity() to get user input and get data using getWeatherData()
 * DONE: Complete showWeatherData() to set the data in the the html file from response
 */

// API_KEY for maps api
let API_KEY = "a8e71c9932b20c4ceb0aed183e6a83bb";

/**
 * Retrieve weather data from openweathermap
 * HINT: Use fetch()
 * HINT: URL should look like this:
 * https://api.openweathermap.org/data/2.5/weather?q=detroit&appid=a8e71c9932b20c4ceb0aed183e6a83bb&units=imperial
 */
getWeatherData = (city) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
  //HINT: Use template literals to create a url with input and an API key

  //CODE GOES HERE
  const api = fetch(URL);

  return api.then((res) => {
    return res.json();
  });
};
/**
 * Retrieve city input and get the weather data
 * HINT: Use the promise returned from getWeatherData()
 */
searchCity = () => {
  const city = document.getElementById("city-input").value;
  // CODE GOES HERE
  return getWeatherData(city)
    .then((resData) => {
      return resData;
    })
    .then((weatherData) => {
      return showWeatherData(weatherData);
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * Show the weather data in HTML
 * HINT: make sure to console log the weatherData to see how the data looks like
 */
showWeatherData = (weatherData) => {
  //CODE GOES HERE
  let cityName = document.getElementById("city-name");
  let weatherType = document.getElementById("weather-type");
  let tempElm = document.getElementById("temp");
  let minTempElm = document.getElementById("min-temp");
  let maxTempElm = document.getElementById("max-temp");

  let { name } = weatherData;
  let { temp, temp_min, temp_max } = weatherData.main;

  tempTemplate = (tempData) => {
    const celciusTemp = tempData - 273.15;
    return Math.floor(celciusTemp) + " °C";
  };

  cityName.innerText = name;
  weatherType.innerText = weatherData.weather[0].main;
  tempElm.innerText = tempTemplate(temp);
  minTempElm.innerText = tempTemplate(temp_min);
  maxTempElm.innerText = tempTemplate(temp_max);
};

enterPress = (e) => {
  if (e.key === "Enter") {
    searchCity();
  }
};

document.addEventListener("keydown", enterPress);
