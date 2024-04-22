import React, { useState } from "react";
import { Menu, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import useRoute from "../../hooks/useRoute";

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
      items={items}
    ></Menu>
  );
}

export default Nav;
