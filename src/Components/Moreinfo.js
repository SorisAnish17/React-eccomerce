import { useParams } from "react-router-dom";
import { CartState } from "../Context/Context";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
const Moreinfo = () => {
  const { id } = useParams();
  const { state, dispatch } = CartState();

  const product = state.products.find((p) => p.id === id);

  if (!product) {
    return <div>Product not found.</div>;
  }
  return (
    <div className="d-flex justify-content-center mt-2">
      <Card style={{ width: "25rem" }}>
        <Card.Img variant="top" src={product.image} width={"25px"} />
        <Card.Body>
          <Card.Title>
            <div className="p-5">
              <h5 className="p-1">
                Product Name:<span> {product.name}</span>
              </h5>
              <h4 className="p-1">
                Product Price:<span>{product.price}</span>
              </h4>
              <h5 className="p-1">Product instock:{product.inStock}</h5>
              <h5>Rating:{product.ratings}</h5>
            </div>
          </Card.Title>
          {state.cart.some((c) => c.id === product.id) ? (
            <Button
              variant="danger"
              onClick={() =>
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: product.id,
                })
              }
            >
              Remove from Cart
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() =>
                dispatch({
                  type: "ADD_TO_CART",
                  payload: product,
                })
              }
            >
              Add to Cart
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Moreinfo;
