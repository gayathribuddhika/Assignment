import React from "react";
import {Navbar, Container} from 'react-bootstrap';

const Header = () => {
  return (
    <div>
      <Navbar fixed="top" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>User Registration</Navbar.Brand>
        </Container>
      </Navbar>
      <br/>
      
    </div>
  );
}

export default Header;
