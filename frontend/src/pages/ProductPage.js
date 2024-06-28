import { Dropdown } from "react-bootstrap";
import axios from "axios";
import HomeCarousel from "../components/HomeCarousel";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import ProductCardList from "./ProductCardList";
import { FaCheck } from "react-icons/fa6";

function ProductPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [filteredData, setFilteredData] = useState([]);
  const [dropdownList] = useState([
    { value: "chairs", name: "Chairs" },
    { value: "table", name: "Tables" },
    { value: "top", name: "Tops" },
  ]);

  useEffect(() => {
    setIsLoading(true);
    const loadData = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/products`
      );
      setProductList(data);
      setFilteredData(data);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const filterData = (category) => {
    if (category === "all") {
      setSelectedFilter("all");
      setFilteredData(productList);
      return;
    }
    setSelectedFilter(category);
    setFilteredData(
      productList.filter((item) => item.category.toLowerCase() === category)
    );
  };


  return (
    <div>
      <HomeCarousel />
      <div className="product-header">
        <h1>Products</h1>
        <Dropdown
          onSelect={(e) => {
            filterData(e);
          }}
        >
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Category
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey="all">All</Dropdown.Item>
            <Dropdown.Divider />
            {dropdownList.map((item, i) => (
              <Dropdown.Item
                key={i}
                eventKey={item.value}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background:
                    selectedFilter === item.value ? "aliceblue" : "unset",
                }}
              >
                {item.name}{" "}
                <FaCheck
                  color={selectedFilter === item.value ? "blue" : "black"}
                />
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div style={{ margin: "2% 10%" }}>
          <ProductCardList products={filteredData} />
        </div>
      )}
    </div>
  );
}

export default ProductPage;
