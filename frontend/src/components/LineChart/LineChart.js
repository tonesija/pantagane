import React from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";

import "chartjs-adapter-date-fns";
import { format } from "date-fns";

ChartJS.register(...registerables);

function LineChart(props) {
  let readings = getReadingsPerDevice(props.readings, props.devices);

  const state = {
    datasets: getDataSets(readings),
  };

  const options = {
    scales: {
      x: {
        type: "time",
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Line type="line" data={state} options={options} />
    </div>
  );
}

function getReadingsPerDevice(readings, devices) {
  if (readings.length === 0) return {};

  let data = {};
  for (let device of devices) {
    let deviceReadings = readings.filter(
      (reading) => reading.device_id === device
    );

    let deviceData = [];

    for (let reading of deviceReadings) {
      const timestamp = new Date(reading.created_at);

      deviceData.push({
        x: format(timestamp, "yyyy-MM-dd hh:mm:ss"),
        y: reading.ammount,
      });
    }

    deviceData.sort((a, b) => {
      return new Date(a.x.valueOf()) - new Date(b.x.valueOf());
    });

    data[device] = deviceData;
  }

  return data;
}

function getDataSets(data) {
  if (Object.keys(data).length === 0) return [];

  let dataSets = [];
  for (const [key, value] of Object.entries(data)) {
    let color = getColor(key);
    dataSets.push({
      label: `${key}`,
      fill: false,
      spanGaps: true,
      lineTension: 0.2,
      backgroundColor: color,
      borderColor: color,
      data: value,
    });
  }

  return dataSets;
}

let colors = [
  "rgb(255, 165, 0)",
  "rgb(238, 130, 238)",
  "rgb(60, 179, 113)",
  "rgb(106, 90, 205)",
  "rgb(0, 0, 255)",
  "rgb(255, 0, 0)",
];

let deviceColors = new Map();

function getColor(device) {
  if (!deviceColors.has(device)) {
    let color = colors.length > 0 ? colors.pop() : randomRGBA();
    deviceColors.set(device, color);
  }
  return deviceColors.get(device);
}

function randomRGBA() {
  let o = Math.round,
    r = Math.random,
    s = 255;
  return `rgba(${o(r() * s)}, ${o(r() * s)}, ${o(r() * s)}, ${r().toFixed(1)})`;
}

export default LineChart;
