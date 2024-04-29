import React, { useState } from "react";
import { Menu, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import useRoute from "../../hooks/useRoute";
import { isAuth } from "../../helpers/auth";
import { Jwt } from "../../types/auth";

const items: MenuProps["items"] = [
  {
    label: "首页",
    key: "/",
  },
  {
    label: "购物车",
    key: "/shop",
  },
];

function Nav() {
  const {
    location: { pathname },
  } = useRoute();
  const auth = isAuth();
  const menus = [...items!];

  if (auth) {
    const {
      user: { role },
    } = auth as Jwt;
    menus.push(
      role === 0
        ? { label: "dashboard", key: "/user/dashboard" }
        : { label: "dashboard", key: "/user/dashboard" }
    );
  } else {
    menus.push(
      {
        label: "登录",
        key: "/signin",
      },
      {
        label: "注册",
        key: "/signup",
      }
    );
  }

  const navigate = useNavigate();
  const [current, setCurrent] = useState(pathname);
  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    navigate(e.key);
  };
  return (
    <Menu
      mode="horizontal"
      onClick={onClick}
      selectedKeys={[current]}
      items={menus}
    ></Menu>
  );
}

export default Nav;
