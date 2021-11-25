import React, { useState } from "react";
import { Button, Form, Card, Row, Col } from "react-bootstrap";
// import axios from 'axios';

function AddUser() {
  const [formValues, setformValues] = useState({
    username: "",
    password: "",
    // email: "",
    contactNumber: {
      phoneNumber: "",
      mobileNumber: "",
    },
  });
// console.log(formValues);

 const handleChange = (e) => {
    const { data, value } = e.target;
    console.log(value);
    setformValues({ ...formValues, [data]: value });
    console.log(formValues);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <div className="border d-flex align-items-center justify-content-center">
      <hr />
      <Card border="primary" style={{ width: "40rem", marginTop: "80px" }}>
        <Card.Body style={{ backgroundColor: "lightblue" }}>
          <Card.Title style={{ textAlign: "center" }}>
            <h3 style={{ color: "blue" }}>User Registration Form</h3>
          </Card.Title>
          <br />
          <Form className="g-2" onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter a username"
                value={formValues.username}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Row>
              <Col md>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formValues.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicConfirmPassword"
                >
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Retype the Password"
                    required
                    // onChange={(e) => {setconfirm_password(e.target.value)}}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md>
                <Form.Group className="mb-3" controlId="formBasicPhone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="phoneNumber"
                    name="contactNumber[phoneNumber]"
                    placeholder="Enter phone number"
                    value={formValues.contactNumber.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md>
                <Form.Group className="mb-3" controlId="formBasicMobile">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="mobileNumber"
                    name="mobileNumber"
                    placeholder="Enter mobile number"
                    value={formValues.contactNumber.mobileNumber}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AddUser;
