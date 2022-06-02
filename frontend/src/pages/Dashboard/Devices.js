import { Card, Row, Col, Button, Tooltip } from "antd";
import {
  CheckCircleFilled,
  EditOutlined,
  SelectOutlined,
  WarningFilled,
} from "@ant-design/icons";

import React, { useEffect, useState } from "react";
import { getDevices } from "../../services/dataService";

function Devices() {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    getDevices().then((data) => {
      setDevices(data);
    });
  }, []);

  return (
    <Row gutter={16}>
      {devices.map((device) => (
        <Col span={6}>
          <Card
            title={
              <Row justify="space-between">
                <Col>{device.device_id}</Col>
                {device.counter > device.max_capacity ? (
                  <Col>
                    <WarningFilled style={{ color: "yellow" }}></WarningFilled>
                  </Col>
                ) : (
                  <Col>
                    <CheckCircleFilled
                      style={{ color: "green" }}
                    ></CheckCircleFilled>
                  </Col>
                )}
              </Row>
            }
            hoverable
            cover={
              <img
                alt="example"
                src="https://cdn-icons-png.flaticon.com/512/2752/2752860.png"
              />
            }
          >
            <p>{device.desc}</p>
            <p>Max capacity: {device.max_capacity}</p>
            <p>Max interval: {device.max_interval}</p>
            <p>People inside: {device.counter}</p>
            <Row justify="end">
              <Col>
                <Tooltip title="Edit device settings.">
                  <Button
                    type="link"
                    icon={<EditOutlined />}
                    onClick={() => {
                      console.log(device);
                    }}
                  />
                </Tooltip>
              </Col>
              <Col offset={1}>
                <Tooltip title="View devices history.">
                  <Button
                    type="primary"
                    icon={<SelectOutlined />}
                    onClick={() => {
                      console.log(device);
                    }}
                  />
                </Tooltip>
              </Col>
            </Row>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Devices;
