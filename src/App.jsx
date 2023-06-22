import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

function App() {
  const [heartRate, setHeartRate] = useState([]);
  const [rateChart, setRateChart] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        name: "series-1",
        data: [],
      },
    ],
  });

  useEffect(() => {
    fetch("https://red-violet-ladybug-wrap.cyclic.app/getrate")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setHeartRate(result);
      });

    fetch("https://red-violet-ladybug-wrap.cyclic.app/getrate_chart")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setRateChart({
          options: {
            chart: {
              id: "basic-bar",
            },
            xaxis: {
              categories: result.time,
            },
          },
          series: [
            {
              name: "ราคา",
              data: result.heartRate,
            },
          ],
        });
      });
  }, []);

  return (
    <div>
      <h1>Heartrate Plotter</h1>
      <ul>
        {petPrices.map((rate) => (
          <li key={rate.id}>
            {rate.time} {rate.heartrate}
          </li>
        ))}
      </ul>
      <Chart
        options={rateChart.options}
        series={rateChart.series}
        type="bar"
        width="500"
      />
    </div>
  );
}

export default App;
