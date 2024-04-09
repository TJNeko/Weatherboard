const APIKey = '81c674ff5daceef92a9bd3af1d49ddd4';
const weatherDataKey = 'weatherData';
const weatherInfoContainer = document.getElementById('weatherNow')

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const cityInput = document.getElementById('cityInput').value;
    let city = cityInput;
    const weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

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
        <p>Description: ${weatherData.weather[0].description}</p>
    `;
    
    weatherInfoContainer.appendChild(weatherDataElement);
}

function displayWeatherFromLocalStorage() {
    const storedWeatherData = localStorage.getItem(weatherDataKey);
    if (storedWeatherData) {
        const weatherData = JSON.parse(storedWeatherData);
        displayWeather(weatherData);
    } else {
        console.log('No weather data found in local storage.');
    }
}
