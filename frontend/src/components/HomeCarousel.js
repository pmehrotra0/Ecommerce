import Carousel from "react-bootstrap/Carousel";

function HomeCarousel() {
  return (
    <Carousel data-bs-theme="dark" style={{ marginTop: "10px" }}>
      <Carousel.Item>
        <img
          className="d-block cover"
          src={`${process.env.REACT_APP_PUBLIC}/loungeChair.jpg`}
          alt="First slide"
        />
        <Carousel.Caption className="carousel-caption-custom">
          <h5>Chairs</h5>
          <p>
            Perfect blend of style and comfort, making every space cozy and
            inviting.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block cover"
          src={`${process.env.REACT_APP_PUBLIC}/table1.jpg`}
          alt="Second slide"
        />
        <Carousel.Caption className="carousel-caption-custom">
          <h5>Tables</h5>
          <p>
            Explore our collection of work tables that inspire innovation and
            efficiency.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block cover"
          src={`${process.env.REACT_APP_PUBLIC}/top.jpg`}
          alt="Third slide"
        />
        <Carousel.Caption className="carousel-caption-custom">
          <h5>Tops</h5>
          <p>
            Elevate your dining room with our curated selection of stylish table
            tops.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeCarousel;
