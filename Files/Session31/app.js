const BASE_URL = 
"https://api.openweathermap.org/data/2.5";
const API_KEY = "246c8d0b9afbcb000c283fec71f61afd";


const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");
const weatherContianer = document.getElementById("weather");
const forecastContianer = document.getElementById("forecast");
const locationIcon = document.getElementById("Location");

const getCuurentWeatherByName = async (city) =>{
    const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
    
}


const getCuurentWeatherByCoordinates = async (lat, lon) =>{
     const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
}




const getForecastWeatherByName = async (city) =>{
    const url = `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
}


const getForecastWeatherByCoornidates = async (lat, lon) =>{
     const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
}



const renderCurrentWeather = data =>{
    console.log(data);

    const weatherJSX  = `
    <h1>${data.name}, ${data.sys.country}</h1>
    <div id="main">
      <img alt="weather icon" src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" />
      <span>${data.weather[0].main}</span>
      <p>${Math.round(data.main.temp)} °C</p>
    </div>

    <div id= "info">
      <p>Humidity : <span>${data.main.humidity} %</span></p>
      <p>Wind Speed : <span>${data.wind.speed} m</span></p>
    </div>
    `;

    weatherContianer.innerHTML = weatherJSX;
};

const DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const getweekday = (date) =>{
    return DAYS[new Date(date * 1000 ).getDay()];
}
const renderforecastweather = (data) =>{
    forecastContianer.innerHTML ="";
    data = data.list.filter((obj) => obj.dt_txt.endsWith("12:00:00"));
    console.log(data);
    data.forEach(i => {
        const forecastJSX = `
        <div>
          <img alt="weather icon" src="https://openweathermap.org/img/w/${i.weather[0].icon}.png" />
          <h3>${getweekday(i.dt)}</h3>
          <p>${Math.round(i.main.temp)} °C </p>
          <span>${i.weather[0].main}</span>
        </div>
        `
        forecastContianer.innerHTML += forecastJSX;   
    });
}

const searchHandler = async() => {
    const cityName = searchInput.value;

    if(!cityName)
    {
        alert("Please Enter City Name");
    }

    const currentData = await getCuurentWeatherByName(cityName);
    renderCurrentWeather(currentData);
    const forecastData = await getForecastWeatherByName(cityName);
    renderforecastweather(forecastData);
}

const positionCallback = async(position) => {
    const { latitude, longitude } = position.coords;

    const currentData = await getCuurentWeatherByCoordinates(latitude, longitude);
    renderCurrentWeather(currentData);

    const forecastData = await getForecastWeatherByCoornidates(latitude, longitude);
    renderforecastweather(forecastData);
};



const errorCallback = (error) => {
    console.log(error.message);
}

const locationHandler = () =>{
   
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(positionCallback, errorCallback);
    }

    else
    {
        alert("your browser does not support geolocation");
    }
}

searchButton.addEventListener("click",searchHandler)
locationIcon.addEventListener("click",locationHandler);
