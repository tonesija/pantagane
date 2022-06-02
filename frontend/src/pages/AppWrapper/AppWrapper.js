import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Header, Footer } from "../../components";

import {
  HomeOutlined,
  DashboardOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

import "./appWrapper.scss";

function AppWrapper() {
  const onLogout = () => {
    console.log("Logout clicked...");
  };

  const headerItems = [
    {
      label: (
        <span
          onClick={(e) => console.log("Easter egg...")}
          className="header-title"
        >
          Pantagane IoT
        </span>
      ),
      key: "header-title",
    },
    {
      label: <Link to="/">Home</Link>,
      icon: <HomeOutlined />,
      key: "header-home",
    },
    {
      label: <Link to="/dashboard">Dashboard</Link>,
      icon: <DashboardOutlined />,
      key: "header-dashboard",
    },
    {
      label: <Link to="/login">Login</Link>,
      icon: <LoginOutlined />,
      key: "header-login",
    },
    {
      label: <Link to="/register">Register</Link>,
      icon: <UserAddOutlined />,
      key: "header-register",
    },
    {
      label: <span onClick={onLogout}>Logout</span>,
      icon: <LogoutOutlined />,
      key: "header-logout",
    },
  ];

  return (
    <div className="app-wrapper">
      <Header items={headerItems} />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppWrapper;
