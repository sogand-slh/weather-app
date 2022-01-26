import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
//Import Others library
import moment from "moment";

//Import Icons
import CloudIcon from "@mui/icons-material/Cloud";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
//import styles
import "./weather.css";
//Import Colors
import { blueGrey } from "@mui/material/colors";

//Import Component
import DaysDetails from "./DaysDetails";

const Weather = () => {
  const [isCity, setIsCity] = useState("London");
  const [data, setData] = useState([]);
  var objToday = moment().format("dddd");
  var fullDay = moment().format("MMM Do YY");

  const ApiKey = "86acc6a166230cda362bdc77514e08b8";
  async function getWeather(city) {
    const api_url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${ApiKey}
  `;
    fetch(api_url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("Unable to fetch the api");
        }
      })
      .then(function (data) {
        // console.log(data, "all Data", data.city.name); //just for verification
        setData({
          city: data.city.name,
          country: data.city.country,
          temp: Math.trunc(Number(data.list[0].main.temp) - 273.15),
          isday: moment(data.dt)._d,
          feels_like: data.list[0].main.feels_like,
          temp_max: data.list[0].main.temp_max,
          temp_min: data.list[0].main.temp_min,
          pressure: data.list[0].main.pressure,
          humidity: data.list[0].main.humidity,
          days: data.list,
        });
      })
      .catch((err) => {
        console.log("Error : " + err);
      });
  }

  useEffect(() => {
    getWeather(isCity);
  }, [isCity]);

  //Get data of current

  const handleSubmit = (event) => {
    setIsCity(event.target.value);
    getWeather(isCity);
  };
  var today = new Date();
  var isDay = today.getHours() > 18 ? 0 : 1;
  return (
    <>
      <React.Fragment>
        <main className="container">
          <div className="card">
            <div>
              <div className="left_side">
                <Typography
                  variant="h5"
                  component="div"
                  className="img_info_cityName"
                  sx={{ color: blueGrey }}>
                  <LocationOnOutlinedIcon style={{ color: blueGrey }} />
                  {data.city}
                </Typography>

                <Typography
                  variant="subtitle2"
                  className="img_info_day"
                  sx={{ color: blueGrey }}>
                  <TodayOutlinedIcon
                    fontSize="10"
                    style={{ marginRight: "5px" }}
                    sx={{ color: blueGrey }}
                  />
                  {objToday},{fullDay}
                </Typography>
              </div>
              <div className="right_side">
                {" "}
                <Typography variant="h3" sx={{ color: blueGrey }}>
                  {data.temp}
                  <span className="symb_cent">°C</span>
                  {data.temp > 10 ? (
                    <WbSunnyIcon
                      style={{
                        marginBottom: "15px",
                        marginLeft: "5px",
                        color: "yellow",
                      }}
                    />
                  ) : (
                    <CloudIcon
                      style={{
                        marginBottom: "15px",
                        marginLeft: "5px",
                        color: "#0052d4",
                      }}
                    />
                  )}
                </Typography>{" "}
              </div>
            </div>

            <form className="formCity">
              <label>City: </label>
              <input
                className="inputCity"
                type="text"
                name="city"
                placeholder="City"
                value={isCity}
                defaultValue="Mashhad"
                style={{}}
                onChange={handleSubmit}
              />
              {/* <Fab size="small" aria-label="search">
                <SearchOutlinedIcon />
              </Fab> */}
            </form>
            <div className="info">
              <DaysDetails data={data.days} />
            </div>
          </div>
        </main>
      </React.Fragment>
    </>
  );
};

export default Weather;
