import { useEffect, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { BsCart3 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function NavigationBar() {
  const nav = useNavigate();
  const { productList } = useSelector((state) => state.checkout);
  const [quantity, setQuantity] = useState(0);
  
  useEffect(() => {
    if (productList.length !== 0) {
      let total = productList.reduce((total, item) => total + item.quantity, 0);
      setQuantity(total);
    } else {
      setQuantity(0);
    }
  }, [productList]);

  return (
    <div>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand
            onClick={() => nav("/home")}
            style={{ cursor: "pointer" }}
          >
            Furniture Ecommerce
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => nav("/home")}>Home</Nav.Link>
              <Nav.Link onClick={() => nav("/order")}>Order Details</Nav.Link>
            </Nav>
            <Nav className="justify-content-end">
              <Nav.Link
                className="highlighted-button"
                onClick={() => nav("/checkout")}
              >
                <BsCart3 />
                <span style={{ paddingLeft: "10px" }}>
                  Checkout{quantity !== 0 ? `(${quantity})` : ""}
                </span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <Button variant="primary">Primary Button</Button> */}
    </div>
  );
}

export default NavigationBar;
