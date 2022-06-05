import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart(props) {
  let dates = getDates(props.readings);
  let readings = getReadingsPerDevice(props.readings, props.devices, dates);

  const state = {
    labels: getTimeLabels(dates),
    datasets: getDataSets(readings),
  };
  return (
    <div>
      <Line type="line" data={state} />
    </div>
  );
}

function getDates(readings) {
  if (readings.length === 0) return [];

  let dates = [...new Set(readings.map((d) => d.created_at))];
  dates = dates.map((d) => new Date(Date.parse(d)));
  dates.sort(function (a, b) {
    return a.getTime() - b.getTime();
  });

  return dates;
}

function getReadingsPerDevice(readings, devices, dates) {
  if (readings.length === 0) return {};

  let data = {};
  for (let device of devices) {
    let deviceReadings = readings.filter(
      (reading) => reading.device_id === device
    );
    let amounts = [];
    for (let date of dates) {
      let reading = deviceReadings.find(
        (reading) => new Date(reading.created_at).getTime() === date.getTime()
      );
      reading ? amounts.push(reading.ammount) : amounts.push(null);
    }
    data[device] = amounts;
  }

  return data;
}

function getTimeLabels(dates) {
  if (dates.length === 0) return [];

  let time = dates.map((d) => d.toLocaleString("hr-HR"));
  time = formatTime(time);
  return time;
}

function formatTime(times) {
  let lastDate = getDateFromDatetime(times[0]);
  for (let i = 1; i < times.length; i++) {
    let currentDate = getDateFromDatetime(times[i]);
    if (currentDate === lastDate) times[i] = getTimeFromDatetime(times[i]);
    lastDate = currentDate;
  }
  return times;
}

function getDateFromDatetime(datettime) {
  let index = datettime.lastIndexOf(" ");
  return datettime.substring(0, --index);
}

function getTimeFromDatetime(datettime) {
  let index = datettime.lastIndexOf(" ");
  return datettime.substring(++index, datettime.length);
}

function getDataSets(data) {
  if (Object.keys(data).length === 0) return [];

  let dataSets = [];
  for (const [key, value] of Object.entries(data)) {
    let color = getColor(key);
    dataSets.push({
      label: `Device ${key}`,
      fill: false,
      spanGaps: true,
      lineTension: 0.5,
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
