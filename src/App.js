import Container from "react-bootstrap/Container";
import Header from "./Components/Header";
import Home from "./Components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./Components/Cart";
import Moreinfo from "./Components/Moreinfo";
import Registration from "./Components/Registration";
import Login from "./Components/LoginPage";
import "./App.css";
function App() {
  return (
    <>
      <Container fluid>
        <Router>
          <Routes>
            <Route path="/" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Header/:userId" element={<Header />} />
            <Route path="/cart/:userId" element={<Cart />} />
            <Route path="/moreinfo/:id" element={<Moreinfo />} />
          </Routes>
        </Router>
      </Container>
    </>
  );
}

export default App;
