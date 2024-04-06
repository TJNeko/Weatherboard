const APIKey = '81c674ff5daceef92a9bd3af1d49ddd4';
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const cityInput = document.getElementById('cityInput').value;
    let city = cityInput;
    const weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

    fetch(weatherURL)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
});

function enterSearch(city) {
    document.getElementById('cityInput').value = city;
    document.querySelector('#searchForm input[type="submit"]').click();
}