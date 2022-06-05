import React, { useEffect } from "react";

import { Menu, Typography } from "antd";

import {
  Outlet,
  Link,
  useOutletContext,
  useNavigate,
  useLocation,
} from "react-router-dom";

import "./dashboard.scss";

function Dashboard() {
  let location = useLocation();

  const { isLoggedIn } = useOutletContext();
  const navigate = useNavigate();

  const getSelectedKey = () => {
    const key = location.pathname.split("/")[2] || "devices";
    return key;
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Typography.Title level={2}>Dashboard</Typography.Title>

      <Menu
        mode="horizontal"
        selectedKeys={[`dashboard-${getSelectedKey()}`]}
        items={[
          {
            label: <Link to="/dashboard/devices">Devices</Link>,
            key: "dashboard-devices",
          },
          {
            label: <Link to="/dashboard/history">History</Link>,
            key: "dashboard-history",
          },
          {
            label: <Link to="/dashboard/settings">Settings</Link>,
            key: "dashboard-settings",
          },
          {
            label: <Link to="/dashboard/add-device">Add Device</Link>,
            key: "dashboard-add-device",
          },
        ]}
      />
      <div className="dashboard-outlet">
        <Outlet />
      </div>
    </>
  );
}

export default Dashboard;
