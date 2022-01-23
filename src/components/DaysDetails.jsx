import React from "react";
import Typography from "@mui/material/Typography";
import { Card, CardContent, CardActionArea } from "@mui/material";

//Import Others library
import moment from "moment";

//import Css
import "./weather.css";
import { blueGrey } from "@mui/material/colors";

const DaysDetails = (data) => {
  let uniqDaysData;
  const chrt = data?.data;
  const days = chrt?.map((item) => item.dt_txt.split(" ").[0]);
  const uniqDay = [...new Set(days)];

 uniqDaysData =uniqDay?.map((item)=>
chrt.filter(x=>x.dt_txt.split(" ").[0]=== item)?.[0]);


  
  console.log(uniqDaysData );
  return (
    <React.Fragment>
      {" "}
      {uniqDaysData?.map((x) => (
        
          <div>
            <Typography
              variant="h6"
              style={{
                color: blueGrey[800],
                display: "flex",
                justifyContent: "center",
              }}
              component="div">
              {Math.trunc(Number((x.main.temp- 273.15)))}
              <span style={{ fontSize: "12px" }}>°C</span>
              <img
                style={{ width: "35px", height: "35px" }}
                alt={x?.day?.condition?.text}
                src={x?.day?.condition?.icon}
              />
            </Typography>
            <div>
              <Typography
                style={{
                  color: blueGrey[800],
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                }}
                component="div"
                variant="body1">
                {moment(x.dt_txt.split(" ").[0]).format("dddd")}
              </Typography>
              <Typography
                style={{
                  color: blueGrey[800],
                  fontSize: "12px",
                  display: "flex",
                  justifyContent: "center",
                }}
                component="div">
                {/* {x?.day?.condition?.text} */}
              </Typography>
            </div>
          </div>
        
      ))}
    </React.Fragment>
  );
};

export default DaysDetails;
