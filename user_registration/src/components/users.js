import React, { useState } from "react";
import { Button, Form, Card, Row, Col } from "react-bootstrap";
import axios from "axios";

const AddUser = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    // confirm_password,
    dateOfBirth: "",
    email: "",
    country: "",
    state: "",
    phoneNumber: "",
    mobileNumber: "",
  };

  const [formValues, setformValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });
  };

  function submitForm(e) {
    e.preventDefault();

    const newUser = {
      firstName: formValues.firstname,
      lastName: formValues.lastname,
      username: formValues.username,
      password: formValues.password,
      dateOfBirth: formValues.dateOfBirth,
      email: formValues.email,
      country: formValues.country,
      state: formValues.state,
      phoneNumber: formValues.phoneNumber,
      mobileNumber: formValues.mobileNumber
    };

    console.log(newUser);

    axios
      .post("http://localhost:5000/api/users/create-user", newUser)
      .then((res) => {
        console.log(res);
        alert("User Registered Successfully");
        e.target.reset();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="border d-flex align-items-center justify-content-center">
      <hr />
      <Card border="primary" style={{ width: "40rem", marginTop: "80px" }}>
        <Card.Body style={{ backgroundColor: "lightblue" }}>
          <Card.Title style={{ textAlign: "center" }}>
            <h3 style={{ color: "blue" }}>User Registration Form</h3>
          </Card.Title>
          <br />
          <Form className="g-2" onSubmit={submitForm}>
            <Row>
              <Col md>
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="firstname"
                    name="firstname"
                    placeholder="Enter first name"
                    value={formValues.firstname}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md>
                <Form.Group className="mb-3" controlId="formBasicLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="lastname"
                    name="lastname"
                    placeholder="Enter Last name"
                    value={formValues.lastname}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
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
                    name="password"
                    placeholder="Retype the Password"
                    required
                    // onChange={(e) => {setconfirm_password(e.target.value)}}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="formBasicdateOfBirth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="birthday"
                name="dateOfBirth"
                placeholder="Enter your birthday"
                value={formValues.dateOfBirth}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={formValues.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Row>
              <Col md>
                <Form.Group className="mb-3" controlId="formBasicCountry">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="country"
                    name="country"
                    placeholder="Enter your country"
                    value={formValues.country}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md>
                <Form.Group className="mb-3" controlId="formBasicSate">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="state"
                    name="state"
                    placeholder="Enter state"
                    value={formValues.state}
                    onChange={handleChange}
                    required
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
                    type="mobile"
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
