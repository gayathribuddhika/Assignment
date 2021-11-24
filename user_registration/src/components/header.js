import React from "react";
import {Navbar, Container, Nav} from 'react-bootstrap';

const Header = () => {
  return (
    <div>
      <Navbar fixed="top" expand="top" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>User Registration</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#login">Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
