// Setup.
import React from "react";
import { Link } from "react-router-dom";

// Styles.
import Nav from "react-bootstrap/Nav";
import "../styles/MyNavbar.css";

// Rendering function.
function MyNavbar(props) {
  return (
    <Nav className="myNav">
      <Link to="/">IronChess</Link>
      {props.loggedUser ? (
        <>
          <Link onClick={props.onLogout}>Log out</Link>
          <Link to={`/private/${props.loggedUser._id}`}>
            {props.loggedUser.username}
          </Link>
        </>
      ) : (
        <>
          <Link to="/signin">Sign in</Link>
          <Link to="/signup">Sign up</Link>
        </>
      )}
    </Nav>
  );
}

export default MyNavbar;
