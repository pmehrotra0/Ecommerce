import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const OrderPlaced = ({ orderId, totalAmount }) => {
  const nav = useNavigate();
  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="text-center">
            <Card.Header as="h2">Order Successfully Placed</Card.Header>
            <Card.Body>
              <Card.Text>
                Your order with ID {orderId} has been successfully placed!
              </Card.Text>
              <Card.Text>Total Amount: ${totalAmount}</Card.Text>
              <Button variant="primary" onClick={() => nav("/home")}>
                Continue Shopping
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderPlaced;
