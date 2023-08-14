import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { auth, database } from "../Config/firebase"; // Assuming you have imported firebase properly
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { Link, useNavigate } from "react-router-dom";
const Registration = () => {
  const navigate = useNavigate();
  //form value
  const [firstName, setfirstName] = useState("");
  const [secondName, setsecondName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      await passwordAuth();
    }
    setValidated(true);
  };

  const validateGmail = (email) => {
    let pattern = /^[a-zA-Z0-9._%+-]+@gmail.com$/;

    if (pattern.test(email)) {
      return true;
    } else {
      return false;
    }
  };

  const passwordAuth = async () => {
    try {
      if (password.length < 8) {
        alert("Make your Password Strength(Enter 8 Character)");
        return;
      }

      if (validateGmail(email)) {
        await createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user.uid;
            set(ref(database, "users/" + user), {
              firstName,
              secondName,
              email,
              address,
              city,
              state,
              phoneNumber,
              password,
            });
            alert("Successfully Registered");
            navigate("/login");
          })
          .catch((error) => console.log("error", error));
      } else {
        alert("Invalid Email");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <div className="d-flex align-items-center mt-5 flex-column">
        <h1 className="text-dark">Registration Page</h1>
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          style={{
            width: "750px",
            display: "flex",
            padding: "25px",
            flexDirection: "column",
            backgroundColor: "lightGrey",
            borderRadius: "12px",
            marginTop: "45px",
          }}
          id="form"
        >
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>First name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setfirstName(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Last name"
                value={secondName}
                onChange={(e) => setsecondName(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="6" controlId="validationCustomEmail">
              <Form.Label>Email</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="email"
                  aria-describedby="inputGroupPrepend"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a username.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustomAddress">
              <Form.Label>Address</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Address"
                  aria-describedby="inputGroupPrepend"
                  value={address}
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
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option>Select your City</option>
                <option value="Kanyakumari">Kanyakumari</option>
                <option value="Coimbatore">Coimbatore</option>
                <option value="Thirunelveli">Thirunelveli</option>
                <option value=">Chennai">Chennai</option>
                <option value="Goa">Thenkasi</option>
                <option value="Kerala">Tuticorin</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom04">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="State"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
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
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Phone Number.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom06">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter an 8-character password."
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Phone Number.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mt-2">
            <Link to="/login" className="text-decoration-none text-success">
              Already Login
            </Link>
          </Row>
          <Form.Group as={Col} md="12" controlId="validationCustom07">
            <Button type="submit" className="mt-2">
              Submit form
            </Button>
          </Form.Group>
        </Form>
      </div>
    </>
  );
};

export default Registration;
