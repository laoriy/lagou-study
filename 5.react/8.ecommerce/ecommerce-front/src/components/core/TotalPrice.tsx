import React, { FC, useCallback, useEffect } from "react";
import { CartItem } from "../../helpers/cart";
import { Typography } from "antd";

const { Title } = Typography;

interface Props {
  cart: CartItem[];
  setTotalPrice: (price: number) => void;
}

const TotalPrice: FC<Props> = ({ cart, setTotalPrice }) => {
  const getTotalPrice = useCallback(() => {
    return cart
      .reduce((currentValue, nextValue) => {
        return (currentValue += nextValue.price * nextValue.count);
      }, 0)
      .toFixed(2);
  }, [cart]);

  useEffect(() => {
    setTotalPrice(parseFloat(getTotalPrice()));
  }, [cart, setTotalPrice, getTotalPrice]);

  return <Title level={5}>商品总价: {getTotalPrice()}</Title>;
};

export default TotalPrice;
