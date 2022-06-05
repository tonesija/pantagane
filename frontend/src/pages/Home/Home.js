import { Typography, Image } from "antd";
import React from "react";

import { Link } from "react-router-dom";

import arch from "./arch.jpeg";

function Home() {
  return (
    <>
      <Typography.Title level={2}>
        Welcome to Pantagane IoT Webapp
      </Typography.Title>

      <Typography.Paragraph>
        This app was made as a part of FER IoT course. We implemented a system
        which consists of sensor devices, AWS IoT Core, Web API and a Web App.
      </Typography.Paragraph>

      <Image src={arch} />

      <Typography.Paragraph>
        To start using the app, you need to <Link to="/login">Login</Link> or{" "}
        <Link to="/register">Register</Link>.
      </Typography.Paragraph>
    </>
  );
}

export default Home;
