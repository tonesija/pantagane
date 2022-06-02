import React from "react";
import { useOutletContext } from "react-router-dom";

function Settings() {
  const [currentDevice] = useOutletContext();
  return <div>Settings: {currentDevice || "No device chosen."}</div>;
}

export default Settings;
