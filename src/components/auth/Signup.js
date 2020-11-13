/*    Sign up.    */
import React from "react";
import { Alert, Button, Form } from "react-bootstrap";

// Rendering function.
function Signup(props) {
  return (
    <div className="myFormContainer">
      <Form onSubmit={props.onSignup} className="myForm">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" type="text" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            type="text"
            placeholder="Enter username"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>

        {props.errorMsg ? (
          <Alert variant="danger">{props.errorMsg}</Alert>
        ) : null}
      </Form>
    </div>
  );
}

export default Signup;
