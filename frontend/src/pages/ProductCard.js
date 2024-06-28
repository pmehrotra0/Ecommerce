import { useState } from "react";
import { Form, FormControl, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../lib/slices/checkout";
import { FaTrash } from "react-icons/fa";

const IMAGEURLS = [
  "loungeChair.jpg",
  "diningChair.jpg",
  "table1.jpg",
  "table2.jpg",
  "table3.jpg",
  "top.jpg",
];
const IMAGEDESP = {
  Chairs:
    "Perfect blend of style and comfort, making every space cozy and inviting.",
  Table:
    "Explore our collection of work tables that inspire innovation and efficiency.",
  Top: "Elevate your dining room with our curated selection of stylish table tops.",
};

function ProductCard({ productDetails }) {
  const [value, setValue] = useState(1);
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.checkout);
  const [isAdded, setIsAdded] = useState(false);

  const handleInputChange = (e) => {
    const inputValue = parseInt(e.target.value);
    if (inputValue >= 1) setValue(inputValue);
  };

  const addProductForCheckout = () => {
    let prodList = [];
    if (
      productList.filter((item) => item.id === productDetails.id).length !== 0
    ) {
      prodList = productList.map((item) => {
        if (item.id === productDetails.id) {
          return { ...productDetails, quantity: value };
        } else return item;
      });
    } else {
      prodList = [...productList, { ...productDetails, quantity: value }];
    }
    dispatch(addProduct(prodList));
    setIsAdded(true);
  };

  const removeProductFromCheckout = () => {
    let prod = [];
    prod = productList.filter((item) => item.id !== productDetails.id);
    dispatch(addProduct(prod));
    setValue(1);
    setIsAdded(false);
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        className="product-card-img"
        src={`${process.env.REACT_APP_PUBLIC}/${
          IMAGEURLS[productDetails?.id - 1]
        }`}
      />
      <Card.Body>
        <Card.Title>{productDetails?.name}</Card.Title>
        <Card.Text>{IMAGEDESP[productDetails?.category]}</Card.Text>
        <Card.Text>Price: {productDetails?.price}</Card.Text>
        <Form>
          <Form.Group controlId="numberInput">
            <Form.Label>Quantity</Form.Label>
            <FormControl
              type="number"
              value={value}
              onChange={handleInputChange}
              placeholder="Enter a number"
            />
          </Form.Group>
          <Button
            onClick={() => addProductForCheckout()}
            style={{ marginTop: "20px" }}
            variant="primary"
          >
            Add To Cart
          </Button>
          {isAdded ? (
            <Button
              onClick={() => removeProductFromCheckout()}
              style={{ marginTop: "20px", marginLeft: "10px" }}
              variant="outline-dark"
            >
              <FaTrash />
            </Button>
          ) : (
            <></>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
