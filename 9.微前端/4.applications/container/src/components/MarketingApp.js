import React, { useEffect, useRef } from "react";
import { mount } from "marketing/MarketingApp";
import { useHistory } from "react-router-dom"

export default function MarketingApp() {
  const ref = useRef();
  const history = useHistory()
  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      onNavgate({ pathname: nextPathname }) { // 微应用路由跳转，通知主应用进行页面路由变化
        const pathname = history.location.pathname;
        if (nextPathname !== pathname) {
          history.push(nextPathname);
        }
      },
    });

    if (onParentNavigate) history.listen(onParentNavigate)
  }, []);
  return <div ref={ref}></div>;
}
