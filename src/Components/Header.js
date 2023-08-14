import React, { useState, useEffect } from "react";
import {
  Navbar,
  Container,
  Form,
  DropdownButton,
  Dropdown,
  Button,
  Modal,
  Badge,
  Row,
  InputGroup,
  Col,
  Image,
} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { AiOutlineShoppingCart, AiFillDelete } from "react-icons/ai";
import { CartState } from "../Context/Context";
import { Link, useParams } from "react-router-dom";
import ImageOne from "../images/store1.png";
import { database } from "../Config/firebase";
import { ref, onValue, update } from "firebase/database";
import { auth } from "../Config/firebase";
import { deleteUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Home from "./Home";

const Header = () => {
  const {
    state: { cart },
    dispatch,
    productsDispatch,
  } = CartState();

  const { userId } = useParams();
  const navigate = useNavigate();
  const [getUserData, setGetUserData] = useState({});
  const [show, setShow] = useState(false);

  useEffect(() => {
    const profile = async () => {
      try {
        const starCountRef = ref(database, "users/" + userId);
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setGetUserData(data);
          } else {
            navigate("/");
          }
        });
      } catch (error) {
        console.log("error");
      }
    };
    profile();
  }, [userId]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = async () => {
    let updatedData = {
      firstName: firstName !== "" ? firstName : getUserData.firstName,
      secondName: secondName !== "" ? secondName : getUserData.secondName,
      city: city !== "" ? city : getUserData.city,
      state: state !== "" ? state : getUserData.state,
      phoneNumber: phoneNumber !== "" ? phoneNumber : getUserData.phoneNumber,
    };
    if (window.confirm("Are you sure to update Your Data?")) {
      await update(ref(database, "users/" + userId), updatedData);
      alert("Successfully updated");
    }
  };

  const handleDelete = async () => {
    try {
      if (window.confirm("Are you sure want to delete your account")) {
        let deletedData = {
          firstName: null,
          secondName: null,
          email: null,
          address: null,
          city: null,
          state: null,
          phoneNumber: null,
          password: null,
        };
        await update(ref(database, "users/" + userId), deletedData);
        await EmailDelete();
        window.location.reload();
      }
    } catch (error) {
      console.log("error");
    }
  };

  const EmailDelete = async () => {
    const user = auth.currentUser;

    await deleteUser(user)
      .then(() => {
        // User deleted.
      })
      .catch((error) => {
        // An error ocurred
        // ...
      });
  };

  // Input Field States
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <>
      <div>
        <Navbar bg="light" className="px-5 fixed-top">
          <Container fluid>
            <Navbar.Brand href="/" style={{ color: "white" }}>
              <img
                src={ImageOne}
                style={{ width: "100px" }}
                className="header-image"
              />
            </Navbar.Brand>
            <Form className="d-flex w-50">
              <Form.Control
                type="search"
                id="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) =>
                  productsDispatch({
                    type: "FILTER_BY_SEARCH",
                    payload: e.target.value,
                  })
                }
              />
            </Form>
            <DropdownButton
              drop="start"
              variant="primary"
              title={
                <>
                  <AiOutlineShoppingCart />
                  <Badge>{cart.length}</Badge>
                </>
              }
            >
              <Dropdown.Item style={{ width: 500 }} id="dropdown">
                {cart.map((c) => (
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
                          <div>{c.price}</div>
                        </Col>
                        <Col className="text-center">
                          <AiFillDelete
                            className="text-danger"
                            style={{ fontSize: "30px" }}
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
                ))}
                <Row>
                  <Link to={`/cart/${userId}`} className="btn btn-primary">
                    Go to Cart
                  </Link>
                </Row>
              </Dropdown.Item>
            </DropdownButton>
          </Container>
          <Button variant="primary" onClick={handleShow}>
            Profile
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form className="p-5">
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      defaultValue={getUserData.firstName}
                      placeholder="First name"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationCustom02">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      defaultValue={getUserData.secondName}
                      placeholder="Last name"
                      onChange={(e) => setSecondName(e.target.value)}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} md="6" controlId="validationCustomEmail">
                    <Form.Label>Email</Form.Label>
                    <InputGroup hasValidation>
                      <InputGroup.Text id="inputGroupPrepend">
                        @
                      </InputGroup.Text>
                      <Form.Control
                        type="email"
                        placeholder="email"
                        defaultValue={getUserData.email}
                        aria-describedby="inputGroupPrepend"
                        readOnly={true}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please choose a username.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="6"
                    controlId="validationCustomAddress"
                  >
                    <Form.Label>Address</Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        type="text"
                        placeholder="Address"
                        defaultValue={getUserData.address}
                        aria-describedby="inputGroupPrepend"
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please choose a username.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom03">
                    <Form.Label>Select City</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      defaultValue={getUserData.city}
                      onChange={(e) => setCity(e.target.value)}
                    >
                      <option>Select your City</option>
                      <option value="Kanyakumari">Kanyakumari</option>
                      <option value="Coimbatore">Coimbatore</option>
                      <option value="Thirunelveli">Thirunelveli</option>
                      <option value=">Chennai">Chennai</option>
                      <option value="Goa">Thensaki</option>
                      <option value="Kerala">Tuticorin</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationCustom04">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="State"
                      defaultValue={getUserData.state}
                      onChange={(e) => setState(e.target.value)}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid state.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} md="6" controlId="validationCustom05">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="Number"
                      placeholder="Phone Number"
                      defaultValue={getUserData.phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Phone Number.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationCustom06">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      defaultValue={getUserData.password}
                      readOnly={true}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Phone Number.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Save Changes
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete Account
              </Button>
            </Modal.Footer>
          </Modal>
        </Navbar>
      </div>
      <Home />
    </>
  );
};

export default Header;
