import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { auth } from "../Config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const Navigate = useNavigate();
  //form value
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    EmailAuth();
    setValidated(true);
  };

  const EmailAuth = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user.uid;
        console.log(user);
        alert("Login Sucessfully");
        Navigate(`/Header/${user}`);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Login Failed");
      });
  };

  return (
    <div className="d-flex align-items-center mt-5 flex-column">
      <h2>Login Page</h2>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        style={{
          width: "500px",
          display: "flex",
          padding: " 12px 25px",
          flexDirection: "column",
          backgroundColor: "lightcyan",
          borderRadius: "12px",
          marginTop: "45px",
        }}
        id="login"
      >
        <Row>
          <Form.Group as={Col} md="12" controlId="validationCustomEmail">
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
                Please choose a Email.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md="12" controlId="validationCustom06">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Phone Number.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Form.Group as={Col} md="12" controlId="validationCustom07">
          <Button type="submit" className="m-3 mx-1">
            Login Page
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Login;
