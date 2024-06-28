import axios from "axios";
import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import Loader from "../components/Loader";
import ProductCheckout from "./ProductCheckOut";

const OrderDetailsPage = () => {
  const [orderId, setOrderId] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = () => {
    setIsLoading(true);
    const loadData = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/orders/${orderId}`
      );
      if (data.id) {
        setOrderDetails(data);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
      setIsLoading(false);
    };
    if (orderId !== "") loadData();
  };

  return (
    <Container className="mt-4">
      <Row style={{ marginTop: "2%" }}>
        <center>
          <b>Search for order details</b>
        </center>
      </Row>
      <Row className="justify-content-center" style={{ marginTop: "2%" }}>
        <Col md={8}>
          <Form style={{ display: "flex", gap: "20px" }}>
            <Form.Group
              controlId="orderIdInput"
              style={{ display: "flex", flex: 1, alignItems: "baseline" }}
            >
              {/* <Form.Label style={{ flex: 1 }}>Enter Order ID</Form.Label> */}
              <Form.Control
                style={{ display: "flex", flex: 6 }}
                type="text"
                placeholder="Enter order ID"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
            </Form.Group>
            <Button
              disabled={orderId === ""}
              variant="primary"
              onClick={handleSearch}
            >
              Search
            </Button>
          </Form>
        </Col>
      </Row>
      {orderDetails && !notFound ? (
        <>
          <Row className="justify-content-center" style={{ marginTop: "5%" }}>
            <Col md={8}>
              <Card>
                <Card.Header as="h2">Order Details</Card.Header>
                <Card.Body>
                  <Card.Text>
                    <strong>Order ID:</strong> {orderDetails.id}
                  </Card.Text>
                  <Card.Text>
                    <strong>Amount:</strong> ${orderDetails.amount}
                  </Card.Text>
                  <Card.Text>
                    <strong>Created At:</strong>{" "}
                    {new Date(orderDetails.created_at).toLocaleString()}
                  </Card.Text>
                  <Card.Text>
                    <strong>User ID:</strong> {orderDetails.user_id}
                  </Card.Text>
                  <Card.Text>
                    <strong>User Name:</strong> {orderDetails.name}
                  </Card.Text>
                  <Card.Text>
                    <strong>User Email:</strong> {orderDetails.email}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="justify-content-center" style={{ marginTop: "5%" }}>
            <Col md={8}>
              <Card.Header as="h2" style={{ marginBottom: "2%" }}>
                Products Ordered
              </Card.Header>
              {orderDetails?.products?.map((product) => (
                <div key={product.id}>
                  <ProductCheckout product={product} />
                </div>
              ))}
            </Col>
          </Row>
        </>
      ) : (
        <></>
      )}
      {isLoading && <Loader />}
      {notFound && (
        <center style={{ marginTop: "2%" }}>
          <h2>No Orders Found!</h2>
        </center>
      )}
    </Container>
  );
};

export default OrderDetailsPage;
