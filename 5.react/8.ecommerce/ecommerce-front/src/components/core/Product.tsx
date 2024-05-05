import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "./Layout";
import ProductItem from "./ProductItem";
import { useProductStore } from "../../store/product";

const Product = () => {
  const product = useProductStore((state) => state.product);
  const handleGetProductById = useProductStore(
    (state) => state.handleGetProductById
  );

  const { productId } = useParams<{ productId: string }>();
  useEffect(() => {
    handleGetProductById(productId!);
  }, [handleGetProductById, productId]);
  return (
    <Layout title="商品名称" subTitle="商品描述">
      <Row gutter={36}>
        <Col span="18">
          <ProductItem showViewProduct={false} product={product.result} />
        </Col>
        <Col span="6">right</Col>
      </Row>
    </Layout>
  );
};

export default Product;
