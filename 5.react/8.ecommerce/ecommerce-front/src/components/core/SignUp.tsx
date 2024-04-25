import React, { useEffect } from "react";
import Layout from "./Layout";
import { Button, Form, Input, Result } from "antd";
import { SignupPayload, useSignupStore } from "../../store/auth";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [form] = Form.useForm();
  const singupState = useSignupStore();
  const resetSignup = useSignupStore((state) => state.resetSignup);

  // 2. 注册成功 显示成功的提示信息
  const showSuccess = () => {
    if (singupState.loaded && singupState.success) {
      return (
        <Result
          status="success"
          title="注册成功"
          extra={[
            <Button type="primary">
              <Link to="/signin">登录</Link>
            </Button>,
          ]}
        />
      );
    }
  };
  // 3. 注册失败 显示失败的提示信息
  const showError = () => {
    if (singupState.loaded && !singupState.success) {
      return (
        <Result
          status="warning"
          title="注册失败"
          subTitle={singupState.message}
        />
      );
    }
  };
  // 4. 离开页面之前 重置状态
  useEffect(() => {
    return () => {
      resetSignup();
    };
  }, [resetSignup]);

  // 注册表单提交
  const onFinish = async (value: SignupPayload) => {
    // 发送注册请求
    const isSuccess = await singupState.signup(value);
    // 1. 注册成功 清空表单
    if (isSuccess) {
      form.resetFields();
    }
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
      {showSuccess()}
      {showError()}
      {signupForm()}
    </Layout>
  );
};

export default SignUp;
