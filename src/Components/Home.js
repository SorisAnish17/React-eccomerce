import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Filter from "./Filter";
import SingleProduct from "./SingleProduct";
import { CartState } from "../Context/Context";
import Carousel from "react-bootstrap/Carousel";
import imageOne from "../images/image-one.jpg";
import imageTwo from "../images/image-two.jpg";
import imageThree from "../images/image-three.jpg";
const Home = () => {
  //   console.log(CartState());
  const {
    state: { products },
    productsState: { byStock, byQuickDelivery, byRating, searchQuery, sort },
  } = CartState();

  const transformProducts = () => {
    let newProducts = products;
    if (searchQuery) {
      newProducts = newProducts.filter((p) =>
        p.name.toLowerCase().includes(searchQuery)
      );
    }

    if (byQuickDelivery) {
      newProducts = newProducts.filter(
        (p) => p.quickDelivery === byQuickDelivery
      );
    }

    if (sort) {
      newProducts = newProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (!byStock) {
      newProducts = newProducts.filter((prod) => prod.inStock);
    }

    if (byRating) {
      newProducts = newProducts.filter((prod) => prod.ratings == byRating);
    }

    return newProducts;
  };
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img
            className="w-100"
            src={imageOne}
            style={{
              height: "700px",
              backgroundPosition: "center",
              backgroundImage: "cover",
            }}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={imageTwo}
            style={{
              height: "700px",
              backgroundPosition: "center",
              backgroundImage: "cover",
            }}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={imageThree}
            style={{
              height: "700px",
              backgroundPosition: "center",
              backgroundImage: "cover",
            }}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
      <Row className="mt-2">
        <Col md={12}>
          <Filter />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={12}>
          <Row className="g-3 cards">
            {transformProducts().map((product) => (
              <SingleProduct product={product} key={product.id} />
            ))}
          </Row>
        </Col>
        <Row className="text-center bg-warning p-2 mt-5">
          <div className="footer-content">
            <p>© 2023 Anish Store. All rights reserved.</p>
          </div>
        </Row>
      </Row>
    </>
  );
};

export default Home;
