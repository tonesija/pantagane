import React from "react";
import { useOutletContext } from "react-router-dom";

function SetDeviceValues() {
  const [currentDevice] = useOutletContext();
  return <div>SetDeviceValues: {currentDevice || "No device chosen."}</div>;
}

export default SetDeviceValues;
