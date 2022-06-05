import { Row, Col, Typography } from "antd";
import React from "react";

import "./footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <Row>
        <Col style={{ padding: 16 }} xs={8} lg={12}>
          <Typography.Title level={5}>Pantagane IoT</Typography.Title>

          <Typography.Paragraph>
            System for counting the number of people in a room implemented using
            ESP32 microcontrollers, PIR sensors, AWS IoT Core and a React Web
            App.
          </Typography.Paragraph>
        </Col>
        <Col style={{ padding: 16 }} xs={16} lg={12} xl={8}>
          <Typography.Title level={5}>Members of the team</Typography.Title>

          <Row>
            <Col span={12}>
              <li>Tonio Ercegović</li>
            </Col>
            <Col span={12}>
              <li>Nina Gnjidić</li>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <li>Andrija Grozdanović</li>
            </Col>
            <Col span={12}>
              <li>Dominik Matić</li>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <li>Nika Medić</li>
            </Col>
            <Col span={12}>
              <li>Ivan Vlahov</li>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row align="center">
        Copyright © {1900 + new Date().getYear()} Pantagane{" "}
      </Row>
    </footer>
  );
}

export default Footer;
