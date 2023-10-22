import hotBg from "./assets/hot.jpg";
import coldBg from "./assets/cold.jpg";
import Description from "./components/Description";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./weatherService";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("tokyo");
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(hotBg);

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      //13 is code of enter key
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  const unitsChangeHandler = (e) => {
    const button = e.currentTarget;
    const tempUnit = button.innerText.slice(1);
    setUnits(tempUnit === "F" ? "imperial" : "metric");
    button.innerText = tempUnit === "F" ? "°C" : "°F";
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      if (data === null) {
        window.alert("Could not fetch data with " + city);
        return;
      }
      const tempThreshold = units === "metric" ? 20 : 68;

      if (data.temp <= tempThreshold) {
        setBg(coldBg);
      } else {
        setBg(hotBg);
      }

      setWeather(data);
    };

    fetchWeatherData();
  }, [city, units]);
  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__input">
              <input
                type="text"
                name="city"
                placeholder="Enter City..."
                onKeyDown={enterKeyPressed}
              ></input>
              <button onClick={unitsChangeHandler}>°F</button>
            </div>

            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                  alt="weather icon"
                />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} ${
                  units === "metric" ? "°C" : "°F"
                }`}</h1>
              </div>
            </div>

            {/* bottom description */}
            <Description weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
