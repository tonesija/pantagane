import React, { useEffect, useState } from "react";
import { Form, Button, Input, Typography } from "antd";

import { login } from "../../services/authService";
import { useNavigate, useOutletContext } from "react-router-dom";

function Login() {
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();
  const [isLoggedIn] = useOutletContext();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  const onFinish = async (formData) => {
    const response = await login(formData);

    // provjeri response i ovisno o njemu navigiraj
    if (response?.status === 200) {
      navigate("/dashboard");
    } else {
      setErrorMessage(response?.message);
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
          rules={[{ required: true, message: "Please enter your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 16 }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>

      <Typography.Text style={{ color: "red" }}>{errorMessage}</Typography.Text>
    </div>
  );
}

export default Login;
