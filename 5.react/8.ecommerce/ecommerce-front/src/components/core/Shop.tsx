import { Button, Col, Empty, Row, Space } from "antd";
import React, { useState, useEffect } from "react";
import Checkbox from "./CheckBox";
import Layout from "./Layout";
import RadioBox from "./RadioBox";
import ProductItem from "./ProductItem";
import { useProductStore } from "../../store/product";

const Shop = () => {
  const [skip, setSkip] = useState<number>(0);
  const filter = useProductStore((state) => state.filter);
  const handleFilterProduct = useProductStore(
    (state) => state.handleFilterProduct
  );

  const [myFilters, setMyFilter] = useState<{
    category: string[];
    price: number[];
  }>({ category: [], price: [] });

  useEffect(() => {
    setSkip(0);
  }, [myFilters]);

  useEffect(() => {
    handleFilterProduct({ filters: myFilters, skip });
  }, [myFilters, skip, handleFilterProduct]);

  const filterDOM = () => (
    <Space size="middle" direction="vertical">
      <Checkbox
        handleFilter={(filters: string[]) => {
          setMyFilter({ ...myFilters, category: filters });
        }}
      />
      <RadioBox
        handleFilter={(filters: number[]) => {
          setMyFilter({ ...myFilters, price: filters });
        }}
      />
    </Space>
  );

  const productDOM = () => (
    <Row gutter={[16, 16]}>
      {filter.result.data.map((item) => (
        <Col key={item._id} span="6">
          <ProductItem product={item} />
        </Col>
      ))}
    </Row>
  );

  const loadMoreButton = () => {
    return (
      <Row>
        {filter.result.size >= 4 && (
          <Button onClick={loadMore}>加载更多</Button>
        )}
      </Row>
    );
  };

  const loadMore = () => {
    setSkip(skip + 4);
  };

  const noData = () => {
    return <Row>{filter.result.size === 0 && <Empty />}</Row>;
  };

  return (
    <Layout title="拉勾商城" subTitle="挑选你喜欢的商品吧">
      <Row>
        <Col span="4">{filterDOM()}</Col>
        <Col span="20">
          {productDOM()}
          {loadMoreButton()} {noData()}
        </Col>
      </Row>
    </Layout>
  );
};

export default Shop;
