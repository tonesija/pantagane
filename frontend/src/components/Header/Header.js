import React from "react";

import { Menu } from "antd";

import "./header.scss";
import { useLocation } from "react-router-dom";

function Header({ items }) {
  let location = useLocation();

  const getKeys = () => {
    const key = location.pathname.split("/")[1] || "home";
    return key;
  };

  return (
    <header className="header">
      <Menu
        mode="horizontal"
        title="Pantagane"
        theme="dark"
        items={items}
        selectedKeys={[`header-${getKeys()}`]}
      />
    </header>
  );
}

export default Header;
