import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const search = async () => {
    if (!city) return;
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`,);
    const result = await res.json();
    console.log(data)
    setData(result.results?.[0]);
  };
  return (
    <div className="app">
      <h1> Weather App</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={search}>Search</button>
      </div>
      {data && (
        <div className="card">
          <h2>📍 {data.name}</h2>
          <p>
            {data.name}, {data.admin1}, {data.country}
          </p>
          <hr />
          <h3> Location Details</h3>
          <div className="details">
            <p>Country : {data.country}</p>
            <p>State : {data.admin1}</p>
            <p>District : {data.admin2 || "N/A"}</p>
            <p>City : {data.admin3 || "N/A"}</p>
            <p>Population : {data.population?.toLocaleString() || "N/A"}</p>
            <p>Country Code : {data.country_code}</p>
            <p>Elevation : {data.elevation} m</p>
            <p>Latitude : {data.latitude}</p>
            <p>Longitude : {data.longitude}</p>
            <p>Timezone : {data.timezone}</p>
            <p>Feature Code : {data.feature_code}</p>
            <p>ID : {data.id}</p>
          </div>
          <div className="info">
            ⓘ Location data fetched from Open-Meteo Geocoding API
          </div>
        </div>
      )}
    </div>
  );
}
export default App;