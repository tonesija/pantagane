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
            Sustav za brojanje ljudi u prostoriji ostvaren korištenjem ESP32
            mikrokontrolera, PIR senzora, AWS IoT Corea te korisničke aplikacije
            u Reactu.
          </Typography.Paragraph>
        </Col>
        <Col style={{ padding: 16 }} xs={16} lg={12} xl={8}>
          <Typography.Title level={5}>Članovi tima</Typography.Title>

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
