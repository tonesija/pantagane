import React, { useEffect } from "react";
import { Form, Button, Input, Typography } from "antd";

import { login } from "../../services/authService";
import { useNavigate, useOutletContext } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [isLoggedIn] = useOutletContext();

  useEffect(() => {
    console.log(isLoggedIn);
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  const onFinish = async (formData) => {
    const response = await login(formData);

    // provjeri response i ovisno o njemu navigiraj
    if (response?.status === 200) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="login">
      <Typography.Title level={2}>Login</Typography.Title>
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

        <Form.Item wrapperCol={{ span: 16 }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
