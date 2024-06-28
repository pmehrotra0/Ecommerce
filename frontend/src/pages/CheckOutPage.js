import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetCheckout } from "../lib/slices/checkout";

import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OrderPlaced from "./OrderPlaces";
import ProductCheckout from "./ProductCheckOut";

function CheckOutPage() {
  const dispatch = useDispatch();
  const { productList, userDetails } = useSelector((state) => state.checkout);
  const [finalOrderPrice, setFinalOrderPrice] = useState(0);
  const nav = useNavigate();

  const totalPrice = productList.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const navigateToAddNewUser = () => {
    nav("/newUser");
  };

  const [orderId, setOrderId] = useState(null);

  const placeOrder = async () => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/orders`,
      {
        amount: totalPrice,
        id: userDetails.id,
        productDetails: productList,
      }
    );
    setOrderId(data.OrderId);
    setFinalOrderPrice(totalPrice);
    dispatch(resetCheckout());
  };

  return (
    <>
      {orderId ? (
        <OrderPlaced orderId={orderId} totalAmount={finalOrderPrice} />
      ) : (
        <Container>
          <Row>
            <Col>
              <h2>Checkout</h2>
            </Col>
          </Row>
          <Row>
            <Col md={14}>
              {productList.length === 0 ? (
                <Container className="mt-4">
                  <Row className="justify-content-center">
                    <Col md={6}>
                      <Card className="text-center">
                        <Card.Header as="h2">Your Cart is Empty</Card.Header>
                        <Card.Body>
                          <Card.Text>
                            You haven't added any items to your cart yet.
                          </Card.Text>
                          <Button
                            variant="primary"
                            onClick={() => nav("/home")}
                          >
                            Go Shopping
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Container>
              ) : (
                <>
                  {productList.map((product) => (
                    <div key={product.id}>
                      <ProductCheckout product={product} />
                    </div>
                  ))}
                  <Col md={8}></Col>
                  <Col md={4}>
                    <Card>
                      <Card.Body>
                        <Card.Text className="text-right">
                          <strong>Total:</strong> ${totalPrice}
                        </Card.Text>
                        {userDetails.id === null ? (
                          <Button
                            variant="primary"
                            onClick={() => navigateToAddNewUser()}
                          >
                            Place Order
                          </Button>
                        ) : (
                          <Button
                            variant="primary"
                            onClick={() => placeOrder()}
                          >
                            Place Order
                          </Button>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                </>
              )}
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default CheckOutPage;
