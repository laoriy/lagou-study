import React from "react";
import Layout from "./Layout";
import { Button, Form, Input } from "antd";
import { SignupPayload, useSignupStore } from "../../store/auth";

const SignUp = () => {
  const [form] = Form.useForm();
  const singupState = useSignupStore();

  // 注册表单提交
  const onFinish = (value: SignupPayload) => {
    // 发送注册请求
    singupState.signup(value);
  };
  const signupForm = () => (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name="name" label="昵称">
        <Input />
      </Form.Item>
      <Form.Item name="password" label="密码">
        <Input.Password />
      </Form.Item>
      <Form.Item name="email" label="邮箱">
        <Input />
      </Form.Item>
      <Form.Item name="email">
        <Button type="primary" htmlType="submit">
          注册
        </Button>
      </Form.Item>
    </Form>
  );
  return (
    <Layout title="注册" subTitle="还没有账号? 注册一个吧.">
      {signupForm()}
    </Layout>
  );
};

export default SignUp;
