import React, { useEffect } from "react";
import Layout from "./Layout";
import { Button, Form, Input, Result } from "antd";
import { SigninPayload, useSigninStore } from "../../store/auth";
import { isAuth } from "../../helpers/auth";
import { Jwt } from "../../types/auth";
import { redirect, useNavigate } from "react-router-dom";

const SignIn = () => {
  const signinState = useSigninStore();
  const navigate = useNavigate();
  const auth = isAuth();
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

  useEffect(() => {
    // 3. 登录成功 根据角色跳转到对应的管理页面
    if (auth) {
      const {
        user: { role },
      } = auth as Jwt;
      if (role === 0) {
        // 注册用户
        navigate("/user/dashboard");
      } else {
        // 管理员
        navigate("/admin/dashboard");
      }
    }
  });
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

  return auth ? null : (
    <Layout title="登录" subTitle="嘿, 小伙伴, 立即登录到拉钩电商系统吧">
      {showError()}
      {signinForm()}
    </Layout>
  );
};

export default SignIn;
