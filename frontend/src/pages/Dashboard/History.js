import React from "react";
import { useOutletContext } from "react-router-dom";

function History() {
  const [currentDevice] = useOutletContext();

  return <div>History: {currentDevice || "No device chosen."}</div>;
}

export default History;
