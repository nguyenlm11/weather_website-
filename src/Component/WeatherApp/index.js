import React, { useState } from "react";
import styles from "./WeatherApp.module.scss";
import classNames from "classnames/bind";
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const cx = classNames.bind(styles);

function Weather() {
    const [search, setSearch] = useState("");
    const [weather, setWeather] = useState({});
    // const [currentDate, setCurrentDate] = useState("");

    const api = {
        key: "007cf204140d10428e6bb2309755869b",
        base: "https://api.openweathermap.org/data/2.5/",
    };

    const handleSearch = () => {
        fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
            .then(res => res.json())
            .then((result) => {
                setWeather(result);
                console.log(result);
            });
    };

    // const handleClearSearch = () => {
    //     setSearch("");
    // };

    const getCurrentDate = () => {
        const date = new Date();
        const options = { weekday: "long" };
        return date.toLocaleDateString("en-US", options);
    };

    return (
        <div className={cx("container")}>
            <h1>Weather App</h1>
            <div className={cx("search-container")}>
                <input
                    className={cx("search-bar")}
                    type="text"
                    placeholder="Enter Location..."
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button className={cx("search-btn")} onClick={handleSearch}>
                    <SearchIcon />
                </button>
            </div>

            {typeof weather.main !== "undefined" ? (
                <div className={cx("result-container")}>
                    <div className={cx("weather")}>
                        <div className={cx("city")}>{weather.name}</div>
                        <hr />
                        <div className={cx("day")}>
                            <p><LocationOnIcon /> {weather.sys.country}, {weather.name}</p>
                            <p><CalendarTodayIcon /> DateTime | {getCurrentDate()}</p>
                        </div>
                        <div className={cx("wheather")}>
                            <h1>{weather.main.temp}°C | {(weather.main.temp * 1.8 + 32).toFixed(1)}°F</h1>
                            <img
                                className={cx("img")}
                                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                alt={weather.weather[0].description}
                            />
                        </div>
                        <div className={cx("description")}>{weather.weather[0].main} ({weather.weather[0].description})</div>
                        <div className={cx("humidity")}>Humidity: {weather.main.humidity}%</div>
                        <div className={cx("wind")}>Wind Speed: {weather.wind.speed} km/h</div>
                    </div>
                </div>
            ) : (
                <div className={cx("result-container")}>
                    <p>No weather data available</p>
                </div>
            )}
        </div>
    );
}

export default Weather;
