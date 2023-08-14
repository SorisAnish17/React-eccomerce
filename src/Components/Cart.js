import React, { useEffect, useState } from "react";
import { Row, Col, Card, Image, Form, Button, Modal } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { CartState } from "../Context/Context";
import { Link, useParams } from "react-router-dom";
import ImageOne from "../images/empty.jpg";
const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const [total, setTotal] = useState(0);
  const { userId } = useParams();
  console.log(userId);
  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  const [showModal, setShowModal] = useState(false);

  const handleCheckout = () => {
    dispatch({ type: "CLEAR_CART" });
    setShowModal(true);
  };

  return (
    <div className="cart">
      <Row>
        <h2>Cart list</h2>
        <Col sm={8}>
          {cart.length > 0 ? (
            cart.map((c) => (
              <Card className="my-2" key={c.id}>
                <Card.Body>
                  <Row className="d-flex justify-content-center align-items-center">
                    <Col>
                      <Image
                        src={c.image}
                        roundedCircle
                        height={75}
                        width={75}
                      />
                    </Col>
                    <Col>
                      <div>{c.name}</div>
                      <div>{`Rs. ${c.price}`}</div>
                    </Col>
                    <Col>{c.ratings}</Col>
                    <Col>
                      <Form.Select
                        value={c.qty}
                        onChange={(e) =>
                          dispatch({
                            type: "CHANGE_CART_QTY",
                            payload: {
                              id: c.id,
                              qty: e.target.value,
                            },
                          })
                        }
                      >
                        {console.log([...Array(c.inStock).keys()])}
                        {[...Array(c.inStock).keys()].map((val) => (
                          <option key={val + 1}>{val + 1}</option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col className="text-center">
                      <AiFillDelete
                        className="text-danger"
                        style={{ fontSize: "30px", cursor: "pointer" }}
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: c.id,
                          })
                        }
                      />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))
          ) : (
            <div className="text-center">
              <div>
                <h2 className="text-danger">Your cart is empty.</h2>
                <img
                  src={ImageOne}
                  style={{ width: "400px", height: "400px" }}
                />
              </div>
              <Link to={`/Header/${userId}`} className="text-decoration-none">
                <Button> Back to shop</Button>
              </Link>
            </div>
          )}
        </Col>
        <Col className="bg-warning" style={{ borderRadius: "12px" }}>
          <h3 sm={4}>Cart Product Pricing</h3>
          <div
            className="d-flex flex-column justify-content-around"
            style={{ minHeight: "150px" }}
          >
            <div>Subtotal: {cart.length} items</div>
            <div>Total: Rs. {total}</div>
            {cart.length > 0 && (
              <Button type="button" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            )}

            {/* Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Thank You!</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Thanks for your purchase! Your order has been placed
                successfully.
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={() => setShowModal(false)}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
