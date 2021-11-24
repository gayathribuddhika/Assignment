import React from "react";
import {Navbar, Container, Nav} from 'react-bootstrap';

const Header = () => {
  return (
    <div>
      <Navbar fixed="top" bg="dark" variant="dark">
        <Container>
          {/* <Navbar.Brand>User Registration</Navbar.Brand> */}
          <Nav className="me-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br/>
      
    </div>
  );
}

export default Header;
