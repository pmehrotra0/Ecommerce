import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { addUserDetails } from "../lib/slices/checkout";
import { useNavigate } from "react-router-dom";

function UserDetails() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
  });
  const [submitDisable, setSubmitDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { userDetails } = useSelector((state) => state.checkout);

  const setUserDetails = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/users`,
      userInfo
    );

    dispatch(addUserDetails(data));
    setIsLoading(false);
  };

  useEffect(() => {
    if (userDetails.id !== null) {
      nav("/checkout");
    }
  }, [userDetails, nav]);

  useEffect(() => {
    setSubmitDisabled(userInfo.name === "" || userInfo.email === "");
  }, [userInfo]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Container>
          <Row>
            <Col>
              <h2>Add Your Details</h2>
              <Form style={{ marginTop: "5%" }}>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={userInfo.name}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, name: e.target.value })
                    }
                    placeholder="Enter your name"
                  />
                </Form.Group>

                <Form.Group controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, email: e.target.value })
                    }
                    value={userInfo.email}
                    placeholder="Enter email"
                  />
                </Form.Group>

                {/* <Form.Group controlId="formAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Enter your address" />
                  </Form.Group> */}

                {/* <Form.Group controlId="formPayment">
                    <Form.Label>Payment Method</Form.Label>
                    <Form.Control as="select">
                      <option>Credit Card</option>
                      <option>Debit Card</option>
                      <option>PayPal</option>
                      <option>Bank Transfer</option>
                    </Form.Control>
                  </Form.Group> */}

                <Button
                  disabled={submitDisable}
                  style={{ marginTop: "3%", float: "right" }}
                  variant="primary"
                  type="submit"
                  onClick={(e) => {
                    setUserDetails(e);
                  }}
                >
                  Place Order
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default UserDetails;
