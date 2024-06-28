import ProductCard from "./ProductCard";

function ProductCardList({ products }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "50px",
        justifyContent: "space-around",
      }}
    >
      {products?.map((product) => {
        return (
          <div key={product.id}>
            <ProductCard productDetails={product} />
          </div>
        );
      })}
    </div>
  );
}

export default ProductCardList;
