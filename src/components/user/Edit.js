/*    Edit profile.    */

// Setup.
import React from "react";

// Styles.
import { Button, Form, Spinner } from "react-bootstrap";
import "../../styles/Auth.css";

// Main function.
function Edit(props) {
  // Loading spinner.
  if (!props.loggedUser) {
    return (
      <Spinner animation="border" role="status" variant="light">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  return (
    <div className="myFormContainer">
      <Form onSubmit={props.onSubmit}>
        <Form.Group>
          <Form.File
            name="image"
            id="formBasicFile"
            label="Example file input"
          />
        </Form.Group>

        <Form.Group controlId="formBasicAbout">
          <Form.Label>About</Form.Label>
          <Form.Control
            name="about"
            type="text"
            placeholder="Enter something about yourself"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Edit;
