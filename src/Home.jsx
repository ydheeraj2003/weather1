
import React, { useState } from 'react';
import axios from 'axios';
import "./style.css";

const Home = () => {
  const [data, setData] = useState({
    celcius: 10,
    name: "London",
    humidity: 2,
    wind: 5,
    image: "/Images/cloud5.webp"
  });

  const [name, setName] = useState("");

  const submitHandler = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=9dfcc15e09b792259d1d94e4bc6ad3cc&units=metric`;

      axios.get(apiUrl)
        .then(res => {
          console.log(res.data);
          let imagePath = '';
          switch (res.data.weather[0].main) {
            case "Clouds":
              imagePath = "/Images/cloud5.webp";
              break;
            case "Clear":
              imagePath = "/Images/sun5.jpg";
              break;
            case "Rain":
              imagePath = "/Images/rain5.jpg";
              break;
            case "Drizzle":
              imagePath = "/Images/drizzle5.jfif";
              break;
            case "Mist":
              imagePath = "/Images/mist5.jfif";
              break;
            default:
              imagePath = "/Images/clouds5.webp";
          }
          setData({
            ...data,
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            wind: res.data.wind.speed,
            image: imagePath
          });
        })
        .catch(err => {
          console.error(err);
          alert("City not found. Please enter a valid city name.");
          setData({
            celcius: 0,
            name: "Error",
            humidity: 0,
            wind: 0,
            image: "/Images/cloud5.webp"
          });
        });
    } else {
      alert("Please enter a city name.");
    }
  };

  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input
            type="text"
            placeholder="Enter city name"
            onChange={e => setName(e.target.value)}
          />
          <button onClick={submitHandler}>
            <img src="/Images/search.png" alt="Search" />
          </button>
        </div>
        <div className="winfo">
          <img src={data.image} alt="Weather" />
          <h1>{data.celcius}°C</h1>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col hum">
              <img src="/Images/humidity.webp" alt="Humidity" />
              <div className="humidity">
                <strong>{data.humidity}%</strong>
                <strong>Humidity</strong>
              </div>
            </div>
            <div className="col">
              <img src="/Images/wind.jpg" alt="Wind" />
              <div className="wind">
                <strong>{data.wind} km/hr</strong>
                <strong>Wind</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
