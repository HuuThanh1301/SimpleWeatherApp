import React from "react";
import { FaArrowDown, FaArrowUp, FaWind } from "react-icons/fa";
import { BiHappy } from "react-icons/bi";
import { MdCompress, MdOutlineWaterDrop } from "react-icons/md";
import "./Description.css";

function Description({ weather, units }) {
  const tempUnit = units === 'metric' ? '°C' : '°F';
  const windUnit= units === 'metric' ? 'm/s' : 'm/h';
  const cards = [
    {
      id: 1,
      icon: <FaArrowDown />,
      title: "Min",
      data: weather.temp_min.toFixed(),
      unit: tempUnit,
    },
    {
      id: 2,
      icon: <FaArrowUp />,
      title: "Max",
      data: weather.temp_max.toFixed(),
      unit: tempUnit,
    },
    {
      id: 3,
      icon: <FaWind />,
      title: "Wind speed",
      data: weather.speed.toFixed(),
      unit: windUnit,
    },
    {
      id: 4,
      icon: <BiHappy />,
      title: "Feels like",
      data: weather.feels_like.toFixed(),
      unit: tempUnit,
    },
    {
      id: 5,
      icon: <MdCompress />,
      title: "Pressure",
      data: weather.pressure,
      unit: "hPa",
    },
    {
      id: 6,
      icon: <MdOutlineWaterDrop />,
      title: "Humidity",
      data: weather.humidity,
      unit: "%",
    },
  ];

  return (
    <div className="section section__description">
      {cards.map((item) => (
        <div className="card" key={item.id}>
          <div className="description__card-icon">
            {item.icon}
            <span>{item.title}</span>
          </div>
          <h2>{`${item.data} ${item.unit}`}</h2>
        </div>
      ))}
    </div>
  );
}

export default Description;
