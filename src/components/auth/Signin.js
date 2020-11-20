/*    Sign in.    */

// Setup.
import React, { useEffect } from "react";

// Styles.
import { Button, Form } from "react-bootstrap";
import "../../styles/Auth.css";

// Main function.
function Signin(props) {
  useEffect(() => {
    return props.onUnmount;
  }, []);

  return (
    <div className="myFormContainer">
      <Form onSubmit={props.onSignin} className="myForm">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" type="text" placeholder="Enter email" />
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

export default Signin;
