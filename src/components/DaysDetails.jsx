import { Box } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
//Import Others library
import moment from "moment";
import React from "react";
//import Css
import "./weather.css";

const DaysDetails = (data) => {
  let uniqDaysData;
  const _data = data?.data;
  const days = _data?.map((item) => item.dt_txt.split(" ")?.[0]);
  const uniqDay = [...new Set(days)];

  uniqDaysData = uniqDay?.map(
    (item) => _data.filter((x) => x.dt_txt.split(" ")?.[0] === item)?.[0]
  );
  // console.log(uniqDaysData,"uniqDaysData");
  uniqDaysData.shift();

  var today = new Date();
  var isDay = today.getHours() > 18 ? 0 : 1;

  return (
    <React.Fragment>
      {" "}
      {uniqDaysData?.map((x) => (
        <div>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              p: 1,
              m: 1,
              bgcolor: `#c9fbff70`,
              width: 100,
              height: 100,
              borderRadius: 2,
            }}>
            <Typography
              variant="h6"
              style={{
                color: `${isDay ? blueGrey[800] : blueGrey[100]}`,
                display: "flex",
                justifyContent: "center",
              }}
              component="div">
              {Math.trunc(Number(x.main.temp - 273.15))}
              <span style={{ fontSize: "12px" }}>°C</span>

              <img
                style={{ width: "35px", height: "35px" }}
                alt=""
                src={`http://openweathermap.org/img/w/${x?.weather?.[0]?.icon}.png`}
              />
            </Typography>
            <div>
              <Typography
                style={{
                  color: `${isDay ? blueGrey[800] : blueGrey[100]}`,
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                }}
                component="div"
                variant="body1">
                {moment(x.dt_txt.split(" ")?.[0]).format("dddd")}
              </Typography>
              <Typography
                style={{
                  color: `${isDay ? blueGrey[800] : blueGrey[100]}`,
                  fontSize: "12px",
                  display: "flex",
                  justifyContent: "center",
                }}
                component="div">
                {x?.weather?.[0]?.main}
              </Typography>
            </div>
          </Box>
        </div>
      ))}
    </React.Fragment>
  );
};

export default DaysDetails;
