import { useState } from "react";
import "./App.css";
import NoCity from "./components/NoCity";
    
function App() {
  const [city, setCity] = useState("");
  const [cityTempData, setCityTempData] = useState({});
  const [noCity, setNoCity] = useState(false);

  const cities = [
    { id: 1, name: "تهران", temp: 25, desc: "تقریبا ابری - احتمال بارش" },
    { id: 2, name: "تبریز", temp: 23, desc: "کاملا ابری - بارش باران" },
    { id: 3, name: "مشهد", temp: 18, desc: "کاملا صاف" },
    { id: 4, name: "شیراز", temp: 21, desc: "احتمال بارش" },
    { id: 5, name: "یزد", temp: 9, desc: "بارش برف" },
  ];

  const showTempHandler = () => {
    const cityTemp = cities.find((item) => item.name === city);

    if (cityTemp) {
      setCityTempData(cityTemp);
      setNoCity(false);
    } else {
      setCityTempData(null);
      setNoCity(true);
    }
  };

  return (
    <>
      <article id="weather-card">
        <header className="" id="weather-card.header">
          <div id="city-name">
            ایران، {cityTempData?.name ? cityTempData?.name : cities[0].name}
          </div>
          <div className="temp-parent">
            <span id="symbol"> C </span>
            <span id="temperature">
              {" "}
              {cityTempData?.temp ? cityTempData?.temp : cities[0].temp}{" "}
            </span>
          </div>
          <div id="desc">
            {cityTempData?.desc ? cityTempData?.desc : cities[0].desc}
          </div>
          <div id="search-field">
            <input
              value={city}
              onChange={(event) => setCity(event.target.value)}
              type="text"
              placeholder="نام شهر خود را جستجو کنید ..."
              id="search-input"
              className="w-full h-10 bg-black"
            />
            <button id="search-btn" onClick={showTempHandler}>
              جستجو
            </button>
          </div>
        </header>
        <main>
          <div id="in-hours">
            <article className="hourly-card">
              <p className="hour">16:00</p>
              <img src="./public/images/sunny.png" />
              <p className="hour-temp">27C</p>
            </article>
            <article className="hourly-card">
              <p className="hour">16:00</p>
              <img src="./public/images/rainy.png" />
              <p className="hour-temp">27C</p>
            </article>
            <article className="hourly-card">
              <p className="hour">16:00</p>
              <img src="./public/images/sunny.png" />
              <p className="hour-temp">27C</p>
            </article>
            <article className="hourly-card">
              <p className="hour">16:00</p>
              <img src="./public/images/sunny.png" />
              <p className="hour-temp">27C</p>
            </article>
          </div>
        </main>
        <footer id="daily-section">
          <article className="daily-card">
            <p className="daily-date">07/12</p>
            <p className="dayly-day">TUE</p>
            <img src="./public/images/rainy.png" alt="Weather" />
            <p className="daily-temp">32C</p>
          </article>
          <article className="daily-card">
            <p className="daily-date">07/12</p>
            <p className="dayly-day">TUE</p>
            <img src="./public/images/rainy.png" alt="Weather" />
            <p className="daily-temp">32C</p>
          </article>
          <article className="daily-card">
            <p className="daily-date">07/12</p>
            <p className="dayly-day">TUE</p>
            <img src="./public/images/rainy.png" alt="Weather" />
            <p className="daily-temp">32C</p>
          </article>
          <article className="daily-card">
            <p className="daily-date">07/12</p>
            <p className="dayly-day">TUE</p>
            <img src="./public/images/rainy.png" alt="Weather" />
            <p className="daily-temp">32C</p>
          </article>
        </footer>
      </article>

      {noCity && (
        <NoCity
          onClose={() => {
            setNoCity(false);
            setCity("");
          }}
        />
      )}
    </>
  );
}

export default App;
