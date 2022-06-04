import React, { useState } from "react";
import { Form, Typography, Button, Input } from "antd";

import { register } from "../../services/authService";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);

  const onFinish = async (formData) => {
    const userData = {
      username: formData.username,
      password: formData.password,
    };

    const response = await register(userData);

    if (response?.status === 200) {
      navigate("/login");
    } else {
      setErrorMessage(response?.message);
    }
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
          rules={[
            { required: true, message: "Please enter your username!" },
            {
              pattern: /^[A-Za-z0-9]{1,24}$/,
              message:
                "Username must consist of uppercase or lowercase letters, or numbers, and must be between 1 and 24 characters.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please enter your password!" },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/,
              message:
                "Password must contain a lowercase letter, an uppercase letter, a number, and must be between 8 and 24 characters.",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Repeat password"
          name="password-repeat"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please repeat your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 16 }}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>

      <Typography.Text style={{ color: "red" }}>{errorMessage}</Typography.Text>
    </div>
  );
}

export default Register;
