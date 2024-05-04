import { Button, Col, Divider, Form, Input, Row, Select, Space } from "antd";
import React, { useEffect } from "react";
import ProductItem from "./ProductItem";
import { useCategoryStore } from "../../store/category";
import { useProductStore } from "../../store/product";

const Search = () => {
  const getCategories = useCategoryStore((state) => state.getCategories);
  const categories = useCategoryStore((state) => state.result);
  const search = useProductStore((state) => state.search);
  const handleSearchProduct = useProductStore(
    (state) => state.handleSearchProduct
  );

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const onFinish = (value: { category: string; search: string }) => {
    handleSearchProduct(value);
  };

  return (
    <>
      <Form
        onFinish={onFinish}
        layout="inline"
        initialValues={{ category: "All" }}
      >
        <Space.Compact>
          <Form.Item name="category">
            <Select>
              <Select.Option value="All">所有分类</Select.Option>
              {categories.map((item) => (
                <Select.Option key={item._id} value={item._id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="search">
            <Input placeholder="请输入搜索关键字" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">搜索</Button>
          </Form.Item>
        </Space.Compact>
      </Form>
      <Divider />
      <Row gutter={[16, 16]}>
        {search.map((item) => (
          <Col span="6" key={item._id}>
            <ProductItem product={item} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Search;
