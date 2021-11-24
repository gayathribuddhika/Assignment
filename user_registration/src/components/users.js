import React, { useState } from "react";
import { Button, Form, Card, Row, Col } from "react-bootstrap";

const NewUser = () => {
  const [user, setUser] = useState({});
  // const [formError, setformError] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;

    switch (name) {
      case "firstName":
        setUser({ ...user, firstName: value });
        break;
      case "lastName":
        setUser({ ...user, lastName: value });
        break;
      case "username":
        setUser({ ...user, username: value });
        break;
      case "password":
        setUser({ ...user, password: value });
        break;
      case "confirm_password":
        setUser({ ...user, confirm_password: value });
        break;
      case "password":
        setUser({ ...user, password: value });
        break;
      case "email":
        setUser({ ...user, email: value });
        break;
      case "country":
        setUser({ ...user, country: value });
        break;
      case "state":
        setUser({ ...user, state: value });
        break;
      case "phone":
        setUser({ ...user, phone: value });
        break;
      case "mobile":
        setUser({ ...user, mobile: value });
        break;
      default:
        break;
    }
  }

  function submit() {}

  return (
    <div className="border d-flex align-items-center justify-content-center">
      <hr />
      <Card border="primary" style={{ width: "40rem", marginTop: "80px" }}>
        <Card.Body style={{ backgroundColor: "lightblue" }}>
          <Card.Title style={{ textAlign: "center" }}>
            <h3 style={{ color: "blue" }}>User Registration Form</h3>
          </Card.Title>
          <br />
          <Form className="g-2">
            <Row>
              <Col md>
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="firstname"
                    placeholder="Enter first name"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md>
                <Form.Group className="mb-3" controlId="formBasicLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="lastname"
                    placeholder="Enter Last name"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="lastname"
                placeholder="Enter a username"
                onChange={handleChange}
              />
            </Form.Group>
            <Row>
              <Col md>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
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
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={handleChange}
              />
            </Form.Group>
            <Row>
              <Col md>
                <Form.Group className="mb-3" controlId="formBasicCountry">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="country"
                    placeholder="Enter your country"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md>
                <Form.Group className="mb-3" controlId="formBasicSate">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="state"
                    placeholder="Enter state"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md>
                <Form.Group className="mb-3" controlId="formBasicPhone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="phone_number"
                    placeholder="Enter phone number"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md>
                <Form.Group className="mb-3" controlId="formBasicMobile">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="mobile"
                    placeholder="Enter mobile number"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
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
