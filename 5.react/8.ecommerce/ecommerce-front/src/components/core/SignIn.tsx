import React from "react";
import Layout from "./Layout";
import { Button, Form, Input } from "antd";

const SignIn = () => {
  const onFinish = () => {
    // 发送登录请求
  };
  const signinForm = () => (
    <Form onFinish={onFinish}>
      <Form.Item name="email" label="邮箱">
        <Input />
      </Form.Item>
      <Form.Item name="password" label="密码">
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <Layout title="登录" subTitle="嘿, 小伙伴, 立即登录到拉钩电商系统吧">
      {signinForm()}
    </Layout>
  );
};

export default SignIn;
