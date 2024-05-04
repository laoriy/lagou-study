import { Button, Card, Col, Image, Row, Typography } from "antd";
import moment from "moment";
import React, { FC } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { API } from "../../config";
import { addItem } from "../../helpers/cart";
import { Product } from "../../types/product";
import useRoute from "../../hooks/useRoute";

const { Title, Paragraph } = Typography;

interface Props {
  product: Product;
  showViewProduct?: boolean;
  showCartBtn?: boolean;
}

const ProductItem: FC<Props> = ({
  product,
  showViewProduct = true,
  showCartBtn = true,
}) => {
  const navigate = useNavigate();

  const addToCart = () => {
    addItem(product, () => {
      navigate("/cart");
    });
  };

  const showButtons = () => {
    let buttonArray = [];
    if (showViewProduct)
      buttonArray.push(
        <Button type="link">
          <Link to={`/product/${product._id}`}>查看详情</Link>
        </Button>
      );
    if (showCartBtn) {
      buttonArray.push(
        <Button type="link" onClick={addToCart}>
          加入购物车
        </Button>
      );
    }
    return buttonArray;
  };

  return (
    <Card
      cover={
        <Image src={`${API}/product/photo/${product._id}`} alt={product.name} />
      }
      actions={showButtons()}
    >
      <Title level={5}>{product.name}</Title>
      <Paragraph ellipsis={{ rows: 2 }}>{product.description}</Paragraph>
      <Row>
        <Col span="12">销量: {product.sold}</Col>
        <Col span="12" style={{ textAlign: "right" }}>
          价格: {product.price}
        </Col>
      </Row>
      <Row>
        <Col span="12">
          上架时间: {moment(product.createdAt).format("YYYY-MM-DD")}
        </Col>
        <Col span="12" style={{ textAlign: "right" }}>
          所属分类: {product.category.name}
        </Col>
      </Row>
    </Card>
  );
};

export default ProductItem;
