import { Form, Typography, Input, Button } from "antd";
import React, { useState } from "react";

import { addDevice } from "../../services/dataService";

function AddDevice() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const [form] = Form.useForm();

  const onFinish = async (formData) => {
    setIsAdding(true);
    const response = await addDevice(formData);
    setIsAdding(false);

    if (response?.status === 200) {
      setMessage("Device successfully added.");
    } else {
      setErrorMessage(response?.message || "Something went wrong.");
    }

    form.resetFields();
  };

  return (
    <div>
      <Typography.Title level={5}>Add Device</Typography.Title>
      <Form
        labelCol={{ xs: { span: 6 }, lg: { span: 4 } }}
        labelAlign="left"
        wrapperCol={{ span: 8 }}
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          label="Device ID"
          name="device_id"
          rules={[
            {
              required: true,
              message: "Device ID is required.",
            },
          ]}
        >
          <Input />
        </Form.Item>
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
          <Input />
        </Form.Item>
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
          <Input />
        </Form.Item>
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
          <Input />
        </Form.Item>
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
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={isAdding}>
            Submit
          </Button>
        </Form.Item>
      </Form>

      <Typography.Text style={{ color: "green" }}>{message}</Typography.Text>
      <Typography.Text style={{ color: "red" }}>{errorMessage}</Typography.Text>
    </div>
  );
}

export default AddDevice;
