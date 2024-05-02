import React from "react";
import Layout from "./Layout";
import { Button, Form, Input, Result } from "antd";
import { SigninPayload, useSigninStore } from "../../store/auth";
import { isAuth } from "../../helpers/auth";
import { Jwt } from "../../types/auth";
import { Navigate } from "react-router-dom";

const SignIn = () => {
  const signinState = useSigninStore();
  // 2. 登录失败 显示错误信息
  const showError = () => {
    if (signinState.loaded && !signinState.success) {
      return (
        <Result
          status="warning"
          title="登录失败"
          subTitle={signinState.message}
        />
      );
    }
  };

  // 3. 登录成功 根据角色跳转到对应的管理页面
  const redirectToDashboard = () => {
    const auth = isAuth();
    if (auth) {
      const {
        user: { role },
      } = auth as Jwt;

      if (role === 0) {
        // 注册用户
        return <Navigate replace to="/user/dashboard" />;
      } else {
        // 管理员
        return <Navigate replace to="/admin/dashboard" />;
      }
    }
  };
  const onFinish = async (value: SigninPayload) => {
    // 发送登录请求
    await signinState.signin(value);
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
      {showError()}
      {redirectToDashboard()}
      {signinForm()}
    </Layout>
  );
};

export default SignIn;
