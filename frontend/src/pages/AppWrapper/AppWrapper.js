import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { Header, Footer } from "../../components";

import { checkToken, logout } from "../../services/authService";

import {
  HomeOutlined,
  DashboardOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";

import "./appWrapper.scss";

function AppWrapper() {
  const [isLoggedIn, setIsLoggedin] = useState(false);
  const navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const response = await checkToken();

      if (response?.status !== 200) {
        logout();
        return false;
      } else {
        return true;
      }
    };

    if (localStorage.getItem("user")) {
      setIsLoggedin(fetchData());
    } else {
      if (isLoggedIn) {
        setIsLoggedin(false);
      }
    }
  }, [location]);

  const onLogout = () => {
    console.log("Logout clicked...");

    logout();
    setIsLoggedin(false);
    navigate("/");
  };

  const getUser = () => {
    return localStorage.getItem("user");
  };

  const loggedInItems = [
    {
      label: <Link to="/dashboard">Dashboard</Link>,
      icon: <DashboardOutlined />,
      key: "header-dashboard",
    },
    {
      label: <span>Logout</span>,
      icon: <LogoutOutlined />,
      key: "header-logout",
      onClick: (e) => onLogout(),
    },
    {
      label: <span>{getUser()}</span>,
      icon: <UserOutlined />,
      key: "header-user",
      className: "header-no-hover",
      style: { marginLeft: "auto" },
    },
  ];

  const loggedOutItems = [
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
  ];

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
  ];

  return (
    <div className="app-wrapper">
      <Header
        items={[
          ...headerItems,
          ...(isLoggedIn ? loggedInItems : loggedOutItems),
        ]}
      />
      <main className="main">
        <Outlet context={[isLoggedIn]} />
      </main>
      <Footer />
    </div>
  );
}

export default AppWrapper;
