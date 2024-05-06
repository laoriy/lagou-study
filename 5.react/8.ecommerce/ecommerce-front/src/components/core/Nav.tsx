import React, { useContext, useEffect, useMemo, useState } from "react";
import { Badge, Menu, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import useRoute from "../../hooks/useRoute";
import { isAuth } from "../../helpers/auth";
import { Jwt } from "../../types/auth";
import { TotalContext } from "../../anotherStore";
import { itemCount } from "../../helpers/cart";

const items: (count: number) => MenuProps["items"] = (count: number) =>
  [
    {
      label: "首页",
      key: "/",
    },
    {
      label: "商城",
      key: "/shop",
    },
    {
      label: (
        <>
          购物车
          <Badge count={count} offset={[5, -10]} />
        </>
      ),
      key: "/cart",
    },
  ] as MenuProps["items"];

function Nav() {
  const {
    location: { pathname },
  } = useRoute();
  const auth = isAuth();
  const [count, setCount] = useContext(TotalContext);

  const menus = [...items(count)!];

  if (auth) {
    const {
      user: { role },
    } = auth as Jwt;
    menus.push(
      role === 0
        ? { label: "dashboard", key: "/user/dashboard" }
        : { label: "dashboard", key: "/admin/dashboard" }
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
  useEffect(() => {
    setCount(itemCount());
  });
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
