const API_KEY = "f3cf2cf7db9ea11e892481bb852ffba6";

export const getFormattedWeatherData = async (city, units) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;
  const response = await fetch(URL);
  if(!response.ok){
    return null;
  }
  const data = await response.json();

  const {
    weather,
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    wind: { speed },
    sys: { country },
    name,
  } = data;

  const { description, icon } = weather[0];

  return {
    description,
    icon,
    name,
    country,
    speed,
    temp,
    feels_like,
    temp_min,
    temp_max,
    pressure,
    humidity,
  };
};
