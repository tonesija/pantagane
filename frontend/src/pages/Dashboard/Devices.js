import { Card, Row, Col, Button, Tooltip, Progress } from "antd";
import {
  CheckCircleFilled,
  EditOutlined,
  SelectOutlined,
  WarningFilled,
} from "@ant-design/icons";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getDevices } from "../../services/dataService";

const REFRESH_TIMER = 2500;

function Devices() {
  const [devices, setDevices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getDevices().then((data) => {
      setDevices(data);
    });

    const getDeviceInterval = setInterval(() => {
      console.log("eloo");
      getDevices().then((data) => {
        setDevices(data);
      });
    }, REFRESH_TIMER);

    // doesnt work ?
    return () => clearInterval(getDeviceInterval);
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
                      navigate(
                        "/dashboard/settings?device_id=" + device.device_id
                      );
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
                      navigate(
                        "/dashboard/history?device_id=" + device.device_id
                      );
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
