import { Card, Row, Col, Button, Tooltip, Progress } from "antd";
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
    setInterval(() => {
      getDevices().then((data) => {
        setDevices(data);
      });
    }, 2500);
  }, []);

  return (
    <Row gutter={8}>
      {devices.map((device) => (
        <Col key={device.device_id} xs={24} md={12} lg={6} xl={4}>
          <Card
            style={{ marginTop: "1em" }}
            title={
              <Row justify="space-between">
                <Col>{device.device_id}</Col>
                {device.counter > device.max_capacity ? (
                  <Col>
                    <WarningFilled style={{ color: "red" }}></WarningFilled>
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
            <Progress
              status={
                device.counter > device.max_capacity ? "exception" : "normal"
              }
              percent={((100 * device.counter) / device.max_capacity).toFixed(
                2
              )}
            />
            <p>{device.desc}</p>
            <p>Max interval: {device.max_interval}</p>

            <p>Max capacity: {device.max_capacity}</p>
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
