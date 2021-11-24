import React, { useState } from "react";
import { Button, Form, Card, Row, Col } from "react-bootstrap";
import axios from 'axios';

const AddUser = () => {
  
  const [ form, setForm ] = useState({});
  const [ errors, setErrors ] = useState({});

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })
    // Check and see if errors exist, and remove them from the error object:
    if ( !!errors[field] ) setErrors({
      ...errors,
      [field]: null
    })
  }

  function submitForm(e) {
    e.preventDefault();

    // // get our new errors
    // const newErrors = findFormErrors()
    // // Conditional logic:
    // if ( Object.keys(newErrors).length > 0 ) {
    //   // We got errors!
    //   setErrors(newErrors)
    // } else {
    //   // No errors! Put any logic here for the form submission!
    //   alert('Thank you for your feedback!')
    // }
    
    console.log(form);

    axios.post("http://localhost:5000/api/users/create-user", form)
    .then((res) => {
      alert("User Registered Successfully");
    }).catch((err) => {
      console.log(err);
    })
  }

  const findFormErrors = () => {
    const { username, email, password, confirm_password } = form
    const newErrors = {}
    // password errors
    if (!password.length >= 8) newErrors.password = 'Password should be minimun 8 characters long'
    else if (password !== confirm_password) newErrors.password = 'Password did not match'
    // // food errors
    // if ( !food || food === '' ) newErrors.food = 'select a food!'
    // // rating errors
    // if ( !rating || rating > 5 || rating < 1 ) newErrors.rating = 'must assign a rating between 1 and 5!'
    // // comment errors
    // if ( !comment || comment === '' ) newErrors.comment = 'cannot be blank!'
    // else if ( comment.length > 100 ) newErrors.comment = 'comment is too long!'

    return newErrors
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
                    placeholder="Enter first name"
                    onChange={(e) => setField("firstName", e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md>
                <Form.Group className="mb-3" controlId="formBasicLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="lastname"
                    placeholder="Enter Last name"
                    onChange={(e) => setField("lastName", e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="lastname"
                placeholder="Enter a username"
                onChange={(e) => setField("username", e.target.value)}
                required
              />
            </Form.Group>
            <Row>
              <Col md>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setField("password", e.target.value)}
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
            <Form.Group className="mb-3" controlId="formBasicdateOfBirth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="birthday"
                placeholder="Enter your birthday"
                onChange={(e) => setField("dateOfBirth", e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setField("email", e.target.value)}
                required
              />
            </Form.Group>
            <Row>
              <Col md>
                <Form.Group className="mb-3" controlId="formBasicCountry">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="country"
                    placeholder="Enter your country"
                    onChange={(e) => setField("country", e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md>
                <Form.Group className="mb-3" controlId="formBasicSate">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="state"
                    placeholder="Enter state"
                    onChange={(e) => setField("state", e.target.value)}
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
                    type="phone_number"
                    placeholder="Enter phone number"
                    onChange={(e) => setField("phoneNumber", e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md>
                <Form.Group className="mb-3" controlId="formBasicMobile">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="mobile"
                    placeholder="Enter mobile number"
                    onChange={(e) => setField("mobileNumber", e.target.value)}
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
};

export default AddUser;
