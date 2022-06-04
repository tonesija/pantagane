import React, { useEffect, useState } from "react";

import { Menu, Typography, Select } from "antd";

import {
  Outlet,
  Link,
  useOutletContext,
  useNavigate,
  useLocation,
} from "react-router-dom";

import "./dashboard.scss";

const { Option } = Select;

function Dashboard() {
  const [dropdownItems, setDropdownItems] = useState([]);
  const [currentDevice, setCurrentDevice] = useState(null);

  let location = useLocation();

  const { isLoggedIn } = useOutletContext();
  const navigate = useNavigate();

  const handleDeviceChange = (e) => {
    setCurrentDevice(e.target.innerText);
  };

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

  useEffect(() => {
    async function fetchData() {
      // TODO
      // dohvati uredaje iz baze

      let deviceData = [
        { device_id: "t8_thang", desc: "thingito" },
        { device_id: "t8_thang2", desc: "thangarang" },
      ];

      setDropdownItems(
        deviceData.map((item) => ({
          label: <div onClick={handleDeviceChange}>{item.device_id}</div>,
          key: item.device_id,
        }))
      );
    }

    fetchData();
  }, []);

  return (
    <>
      <Typography.Title level={2}>Dashboard</Typography.Title>

      <Select
        placeholder="Choose a device"
        style={{ width: 160 }}
        onChange={(e) => console.log(e)}
      >
        {dropdownItems.map((item) => (
          <Option value={item.key} key={item.key}>
            {item.label}
          </Option>
        ))}
      </Select>

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
        <Outlet context={[currentDevice]} />
      </div>
    </>
  );
}

export default Dashboard;
