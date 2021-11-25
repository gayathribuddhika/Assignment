import React, { useState } from "react";
import { Button, Form, Card, Row, Col } from "react-bootstrap";
import axios from 'axios';

const AddUser = () => {
  
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  // const [confirm_password, setconfirm_password] = useState("")
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [email, setemail] = useState("");
  const [country, setcountry] = useState("");
  const [state, setstate] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [mobileNumber, setmobileNumber] = useState("");

  
  // function passwordHandler(e) {
  //   if(password.length < 8) {
  //     setpasswordErr(true)
  //   } else if (password !== confirm_password) {
  //     setpasswordErr(true)
  //   }
  // }

  function submitForm(e) {
    e.preventDefault();

    const newUser = {
      firstName,
      lastName,
      username,
      password,
      // confirm_password,
      dateOfBirth,
      email,
      country,
      state,
      contactNumber: {phoneNumber, mobileNumber}
    }
   
    console.log(newUser);

    axios.post("http://localhost:5000/api/users/create-user", newUser)
    .then(() => {
      alert("User Registered Successfully");
      e.target.reset();
      // console.log(res.data.msg);
    }).catch((err) => {
      console.log(err);
    })
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
                    onChange={(e) => {setfirstName(e.target.value)}}
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
                    onChange={(e) => {setlastName(e.target.value)}}
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
                onChange={(e) => {setusername(e.target.value)}}
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
                    onChange={(e) => {setpassword(e.target.value)}}
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
                onChange={(e) => {setdateOfBirth(e.target.value)}}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => {setemail(e.target.value)}}
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
                    onChange={(e) => {setcountry(e.target.value)}}
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
                    onChange={(e) => {setstate(e.target.value)}}
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
                    onChange={(e) => {setphoneNumber(e.target.value)}}
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
                    onChange={(e) => {setmobileNumber(e.target.value)}}
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
