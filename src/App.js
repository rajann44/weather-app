import { useState } from "react";
import defaultBackground from "./assets/weather.jpg";
import temp_below10 from "./assets/below10.jpg";
import temp_between10_20 from "./assets/10_20.jpg";
import temp_between20_30 from "./assets/20_30.jpg";
import temp_between30_40 from "./assets/30_40.jpg";
import temp_above_40 from "./assets/above_40.jpg";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const [background, setBackground] = useState(defaultBackground);

  const checkWeatherAndChangeBG = (number) => {
    switch (true) {
      case number < 10:
        setBackground(temp_below10);
        break;
      case number >= 10 && number < 20:
        setBackground(temp_between10_20);
        break;
      case number >= 20 && number < 30:
        setBackground(temp_between20_30);
        break;
      case number >= 30 && number < 40:
        setBackground(temp_between30_40);
        break;
      case number >= 40 && number < 60:
        setBackground(temp_above_40);
        break;
      default:
        setBackground(defaultBackground);
        break;
    }
  };

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`;

  const searchLocation = async (event) => {
    if (event.key === "Enter") {
      let weatherResponse = await fetch(url);
      let jsonFormatted = await weatherResponse.json();
      console.log(jsonFormatted);
      setData(jsonFormatted);
      checkWeatherAndChangeBG(jsonFormatted.main.temp.toFixed());
      setLocation("");
    }
  };

  return (
    <div
      className="app"
      style={{
        background: `url(${background}) no-repeat center center/cover`,
      }}
    >
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} Mt./Sec</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
