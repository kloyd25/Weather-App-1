document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city');
    
    cityInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            getWeather();
        }
    });
});

function getWeather() {
    const apiKey = '95b1ff2993ca0a5b66f62078f05f0742';
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            displayError(error.message);
        });
}

function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');

    weatherInfoDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    document.body.style.backgroundImage = 'none';

    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    const temperatureHTML = `<p>${temperature}°C</p>`;
    const weatherHtml = `<p>${cityName}</p><p>${description}</p>`;

    tempDivInfo.innerHTML = temperatureHTML;
    weatherInfoDiv.innerHTML = weatherHtml;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;

    if (description.includes("rain")) {
        document.body.style.backgroundImage = "url('image11.jpg')";
    } else if (description.includes("clear") || description.includes("sunny")) {
        document.body.style.backgroundImage = "url('image8.jpg')";
    } else if (description.includes("cloud") || description.includes("overcast")) {
        document.body.style.backgroundImage = "url('image10.jpg')";
    } else {
        document.body.style.backgroundImage = 'none';
    }

    showImage();
}

function displayError(message) {
    const weatherInfoDiv = document.getElementById('weather-info');
    weatherInfoDiv.innerHTML = `<p>${message}</p>`;
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
}