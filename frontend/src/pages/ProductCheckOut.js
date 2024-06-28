import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../lib/slices/checkout";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

const IMAGEURLS = [
  "loungeChair.jpg",
  "diningChair.jpg",
  "table1.jpg",
  "table2.jpg",
  "table3.jpg",
  "top.jpg",
];
function ProductCheckout({ product }) {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.checkout);
  const [value, setValue] = useState(product.quantity); 

  useEffect(() => {
    setValue(product.quantity);
  }, [product]);

  const removeProductFromCheckout = () => {
    let prod = [];
    prod = productList.filter((item) => item.id !== product.id);
    dispatch(addProduct(prod));
  };

  const handleInputChange = (e) => {
    const inputValue = parseInt(e.target.value);
    if (inputValue < 1) {
      return;
    }
    setValue(inputValue);
    let prodList = [];
    prodList = productList.map((item) => {
      if (item.id === product.id) {
        return { ...product, quantity: inputValue };
      } else return item;
    });
    dispatch(addProduct(prodList));
  };

  return (
    <div>
      <Card key={product.id} className="mb-3">
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Img
            variant="left"
            className="checkout-img"
            src={`${process.env.REACT_APP_PUBLIC}/${
              IMAGEURLS[product?.id - 1]
            }`}
          />
          <Card.Text className="checkout-details">
            Price: ${product.price} each
          </Card.Text>
          {window.location.pathname === "/order" ? (
            <Card.Text className="checkout-details">
              Quantity: {product.quantity}
            </Card.Text>
          ) : (
            <Card.Text>
              Quantity:{" "}
              <input
                aria-label="Quantity"
                type="number"
                value={value}
                onChange={handleInputChange}
                placeholder="Enter a number"
              />
            </Card.Text>
          )}

          <Card.Text className="checkout-details">
            Total: ${product.price * value}
          </Card.Text>
          {window.location.pathname === "/order" ? (
            <> </>
          ) : (
            <Button
              onClick={() => removeProductFromCheckout()}
              style={{ marginTop: "20px", marginLeft: "10px" }}
              variant="outline-dark"
            >
              <FaTrash />
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProductCheckout;
