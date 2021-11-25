import React, { useState } from "react";
import { Button, Form, Card, Row, Col } from "react-bootstrap";
// import axios from 'axios';

function AddUser() {
  const inititalValues = {
    username: "",
    password: "",
    // email: "",
    phoneNumber: "",
    mobileNumber: "",
  };
  const [formValues, setformValues] = useState(inititalValues);
  // console.log(formValues);

  const handleChange = (e) => {
    //  console.log(e.target)
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newUser = {
        username: formValues.username,
        password: formValues.password,
        // email: formValues.email,
        phoneNumber: formValues.phoneNumber,
        mobileNumber: formValues.mobileNumber
    }

    console.log(newUser);

    // const data = {
    //   username: "",
    //   password: "",
    //   email: "",
    //   contactNumber: {
    //     phoneNumber: "",
    //     mobileNumber: "",
    //   },
    // };

    // data.username = formvalues.username;
    // data.contactNumber.phoneNumber = formvalues.phoneNumber;
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
                    name="phoneNumber"
                    placeholder="Enter phone number"
                    value={formValues.phoneNumber}
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
                    value={formValues.mobileNumber}
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
