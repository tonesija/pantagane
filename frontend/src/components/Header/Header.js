import React from "react";

import { Menu } from "antd";

import "./header.scss";

function Header({ items }) {
  return (
    <header className="header">
      <Menu mode="horizontal" title="Pantagane" theme="dark" items={items} />
    </header>
  );
}

export default Header;
