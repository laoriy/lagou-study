import React, { useState } from "react";
import Layout from "../core/Layout";
import { Jwt } from "../../types/auth";
import { isAuth } from "../../helpers/auth";
import { Col, Descriptions, Menu, MenuProps, Row, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCartOutlined,
  UserOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";

const items: MenuProps["items"] = [
  {
    label: "添加分类",
    key: "/create/category",
    icon: <ShoppingCartOutlined />,
  },
  {
    label: "添加产品",
    key: "/create/product",
    icon: <UserOutlined />,
  },
  {
    label: "订单列表",
    key: "/admin/orders",
    icon: <OrderedListOutlined />,
  },
];
const AdminDashboard = () => {
  const {
    user: { name, email },
  } = isAuth() as Jwt;

  const navigate = useNavigate();

  const [current, setCurrent] = useState("");
  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    navigate(e.key);
  };

  const adminLinks = () => (
    <>
      <Typography.Title level={5}>管理员链接</Typography.Title>
      <Menu items={items} onClick={onClick} selectedKeys={[current]}></Menu>
    </>
  );

  const adminInfo = () => (
    <Descriptions title="管理员信息" bordered>
      <Descriptions.Item label="昵称">{name}</Descriptions.Item>
      <Descriptions.Item label="邮件">{email}</Descriptions.Item>
      <Descriptions.Item label="角色">管理员</Descriptions.Item>
    </Descriptions>
  );

  return (
    <Layout title="管理员 Dashboard" subTitle="">
      <Row>
        <Col span="4">{adminLinks()}</Col>
        <Col span="1"></Col>
        <Col span="19">{adminInfo()}</Col>
      </Row>
    </Layout>
  );
};

export default AdminDashboard;
