import React from "react";
import { Form, Typography, Button, Input } from "antd";

function Register() {
  const onFinish = (formData) => {
    console.log(formData);
  };

  return (
    <div className="register">
      <Typography.Title level={2}>Register</Typography.Title>
      <Form
        name="basic"
        labelCol={{ xs: { span: 6 }, lg: { span: 4 } }}
        labelAlign="left"
        wrapperCol={{ span: 8 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Repeat password"
          name="password-repeat"
          rules={[{ required: true, message: "Please repeat your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 16 }}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register;
