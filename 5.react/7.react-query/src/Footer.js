import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useTodos } from "./hooks/useTodos";

function Footer() {
  const { data } = useTodos();
  const checkedCount = data?.filter((v) => v.completed).length;
  return <div>{checkedCount} items chedked</div>;
}

export default Footer;
