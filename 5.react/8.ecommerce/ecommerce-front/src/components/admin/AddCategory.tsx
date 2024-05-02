import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";
import Layout from "../core/Layout";
import axios from "axios";
import { API } from "../../config";
import { isAuth } from "../../helpers/auth";
import { Link } from "react-router-dom";
import { Jwt } from "../../types/auth";

const AddCategory = () => {
  const { user, token } = isAuth() as Jwt;

  async function addCategory(name: string) {
    try {
      let response = await axios.post<{ name: string }>(
        `${API}/category/create/${user._id}`,
        {
          name: name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success(`[${response.data.name}] 分类添加成功`);
    } catch (error: any) {
      message.error(error.response.data.error);
    }
  }

  const onFinish = (value: { name: string }) => {
    const { name } = value;
    if (name) addCategory(name);
  };
  return (
    <Layout title="添加分类" subTitle="">
      <Form onFinish={onFinish}>
        <Form.Item name="name" label="分类名称">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            添加分类
          </Button>
        </Form.Item>
      </Form>
      <Button>
        <Link to="/admin/dashboard">返回 Dashboard</Link>
      </Button>
    </Layout>
  );
};

export default AddCategory;
