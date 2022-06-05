import React, { useState, useEffect } from "react";
import { Form, Select, Input, Button, Row, Col, Typography } from "antd";

import { getDevices, updateDevice } from "../../services/dataService";
import { useLocation } from "react-router-dom";

const Option = Select.Option;

function Settings() {
  const [dropdownItems, setDropdownItems] = useState([]);
  const [currentDevice, setCurrentDevice] = useState(null);

  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const [capacityForm] = Form.useForm();
  const [intervalForm] = Form.useForm();
  const [descriptionForm] = Form.useForm();
  const [counterForm] = Form.useForm();

  let location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const device = params.get("device_id");
    console.log(device);
    if (device) {
      setCurrentDevice(device);
    }
  }, [location.search]);

  const handleDeviceChange = (value) => {
    setCurrentDevice(value);
  };

  const onFinish = async (value, form) => {
    console.log(value);
    setIsAdding(true);
    const response = await updateDevice(currentDevice, value);
    setIsAdding(false);

    if (response?.status === 200) {
      setErrorMessage(null);
      setMessage("Device succesfully updated.");
      form.resetFields();
    } else {
      setMessage(null);
      setErrorMessage(response?.message);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await getDevices();

      setDropdownItems(response);
    }

    fetchData();
  }, []);

  return (
    <div>
      <Form
        labelCol={{ xs: { span: 6 }, lg: { span: 4 } }}
        labelAlign="left"
        onFinish={onFinish}
      >
        <Form.Item label="Choose a device">
          <Select
            placeholder="Choose a device"
            value={currentDevice}
            style={{ width: 160 }}
            onChange={handleDeviceChange}
          >
            {dropdownItems.map((item) => (
              <Option value={item.device_id} key={item.device_id}>
                {item.device_id}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
      <Form
        labelCol={{ xs: { span: 6 }, lg: { span: 4 } }}
        labelAlign="left"
        onFinish={(value) => onFinish(value, capacityForm)}
        form={capacityForm}
      >
        <Form.Item
          label="Max. capacity"
          name="max_capacity"
          rules={[
            {
              pattern: /^([+-]?[1-9]\d*|0)$/,
              message: "Max. capacity must be an integer.",
            },
            {
              required: true,
              message: "Max. capacity is required.",
            },
          ]}
        >
          <Row gutter={16}>
            <Col span={16}>
              <Input disabled={!currentDevice || isAdding} />
            </Col>
            <Col>
              <Button
                disabled={!currentDevice || isAdding}
                type="primary"
                htmlType="submit"
              >
                Apply
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
      <Form
        labelCol={{ xs: { span: 6 }, lg: { span: 4 } }}
        labelAlign="left"
        onFinish={(value) => onFinish(value, intervalForm)}
        form={intervalForm}
      >
        <Form.Item
          label="Max. interval"
          name="max_interval"
          rules={[
            {
              pattern: /^[1-9][0-9]*$/,
              message: "Max. interval must be a positive integer.",
            },
            {
              required: true,
              message: "Max. interval is required.",
            },
          ]}
        >
          <Row gutter={16}>
            <Col span={16}>
              <Input disabled={!currentDevice || isAdding} />
            </Col>
            <Col>
              <Button
                disabled={!currentDevice || isAdding}
                type="primary"
                htmlType="submit"
              >
                Apply
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
      <Form
        labelCol={{ xs: { span: 6 }, lg: { span: 4 } }}
        labelAlign="left"
        onFinish={(value) => onFinish(value, descriptionForm)}
        form={descriptionForm}
      >
        <Form.Item
          label="Description"
          name="desc"
          rules={[
            {
              required: true,
              message: "Description is required.",
            },
          ]}
        >
          <Row gutter={16}>
            <Col span={16}>
              <Input disabled={!currentDevice || isAdding} />
            </Col>
            <Col>
              <Button
                disabled={!currentDevice || isAdding}
                type="primary"
                htmlType="submit"
              >
                Apply
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
      <Form
        labelCol={{ xs: { span: 6 }, lg: { span: 4 } }}
        labelAlign="left"
        onFinish={(value) => onFinish(value, counterForm)}
        form={counterForm}
      >
        <Form.Item
          label="Counter"
          name="counter"
          rules={[
            {
              pattern: /^([+-]?[1-9]\d*|0)$/,
              message: "Counter must be an integer.",
            },
            {
              required: true,
              message: "Counter is required.",
            },
          ]}
        >
          <Row gutter={16}>
            <Col span={16}>
              <Input disabled={!currentDevice || isAdding} />
            </Col>
            <Col>
              <Button
                disabled={!currentDevice || isAdding}
                type="primary"
                htmlType="submit"
              >
                Apply
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>

      <Typography.Text style={{ color: "green" }}>{message}</Typography.Text>
      <Typography.Text style={{ color: "red" }}>{errorMessage}</Typography.Text>
    </div>
  );
}

export default Settings;
