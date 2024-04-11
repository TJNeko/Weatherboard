const APIKey = '81c674ff5daceef92a9bd3af1d49ddd4';
const weatherDataKey = 'weatherData';
const forecastDataKey = 'forecastData';
const weatherInfoContainer = document.getElementById('weatherNow');

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const cityInput = document.getElementById('cityInput').value;
    let city = cityInput;

    const weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
    const forecastURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}`;

    fetch(weatherURL)
        .then(response => response.json())
        .then(data => {
            localStorage.setItem(weatherDataKey, JSON.stringify(data));
            console.log('weather stuff', data);
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
        
    fetch(forecastURL)
        .then(response => response.json())
        .then(data => {
            localStorage.setItem(forecastDataKey, JSON.stringify(data));
            console.log('Forecast data:', data);
            displayForecast(data);
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
        });
});

function enterSearch(city) {
    document.getElementById('cityInput').value = city;
    document.querySelector('#searchForm input[type="submit"]').click();
}

function displayWeather(weatherData) {
    weatherInfoContainer.innerHTML = '';
    const weatherDataElement = document.createElement('div');
    weatherDataElement.classList.add('weather-data');

    const tempCelsius = weatherData.main.temp - 273.15;
    const tempFahrenheit = (weatherData.main.temp - 273.15) * 9/5 + 32;
    
    weatherDataElement.innerHTML = `
        <h3>${weatherData.name}</h3>
        <p>Temperature: ${tempCelsius.toFixed(2)}°C / ${tempFahrenheit.toFixed(2)}°F</p>
        <p>Weather: ${weatherData.weather[0].main}</p>
        <p>Wind: ${weatherData.wind.speed} MPH</p>
        <p>Humidity: ${weatherData.main.humidity}%</p>
    `;
    
    weatherInfoContainer.appendChild(weatherDataElement);
}

function displayForecast(forecastData) {
    const forecastInfoContainer = document.getElementById('forecast');
    forecastInfoContainer.innerHTML = '';
    const forecastList = forecastData.list;
    for (let i = 0; i < forecastList.length; i += 8) {
        const forecast = forecastList[i];
        const forecastDate = new Date(forecast.dt * 1000);
        const tempCelsius = forecast.main.temp - 273.15;
        const tempFahrenheit = (forecast.main.temp - 273.15) * 9/5 + 32;
        
        const forecastElement = document.createElement('div');
        forecastElement.classList.add('forecast-item');
        forecastElement.innerHTML = `
            <p>Date: ${forecastDate.toDateString()}</p>
            <p>Temperature: ${tempCelsius.toFixed(2)}°C / ${tempFahrenheit.toFixed(2)}°F</p>
            <p>Weather: ${forecast.weather[0].main}</p>
            <p>Wind: ${forecast.wind.speed} MPH</p>
            <p>Humidity: ${forecast.main.humidity}%</p>
        `;
        forecastInfoContainer.appendChild(forecastElement);
    }
}

function displayWeatherFromLocalStorage() {
    const storedWeatherData = localStorage.getItem(weatherDataKey);
    if (storedWeatherData) {
        const weatherData = JSON.parse(storedWeatherData);
        displayWeather(weatherData);
    } else {
        console.log('No weather data found in local storage.');
    }
    const storedForecastData = localStorage.getItem(forecastDataKey);
    if (storedForecastData) {
        const forecastData = JSON.parse(storedForecastData);
        displayForecast(forecastData);
    } else {
        console.log('No forecast data found in local storage.');
    }
}

