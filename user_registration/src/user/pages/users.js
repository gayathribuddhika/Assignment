import React, {useState} from "react";
import { Button, Form, Card } from "react-bootstrap";

const NewUser = () => {
  const [user, setUser] = useState({});
  // const [formError, setformError] = useState({});

  function submit() {
    
  }

  return (
    <div className="border d-flex align-items-center justify-content-center">
      <hr />
      <Card border="primary" style={{ width: "40rem", marginTop: "80px"}}>
        <Card.Body>
        <Card.Title style={{textAlign:"center"}}><h3>User Registration Form</h3></Card.Title>
          
          <Form>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="firstname" placeholder="Enter first name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="lastname" placeholder="Enter Last name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="lastname" placeholder="Enter a username" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="confirnm_password" placeholder="Retype the Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control type="country" placeholder="Enter your country" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicSate">
              <Form.Label>State</Form.Label>
              <Form.Control type="state" placeholder="Enter state" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="phone_number" placeholder="Enter phone number" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicMobile">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control type="mobile" placeholder="Enter mobile number" />
            </Form.Group>
            
            <Button variant="primary" type="submit" onClick={submit}>
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NewUser;
