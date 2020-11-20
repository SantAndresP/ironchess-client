/*    Navbar.    */

// Setup.
import React from "react";
import { Link } from "react-router-dom";

// Styles.
import Nav from "react-bootstrap/Nav";
import "../styles/MyNavbar.css";

// Main function.
function MyNavbar(props) {
  return (
    <Nav className="myNav">
      <Link to="/">
        <img src="https://i.imgur.com/cy6a0Hk.png" style={{ width: "200px" }} />
      </Link>
      <div className="userButtons">
        {props.loggedUser ? (
          <>
            <Link onClick={props.onLogout}>LOG OUT</Link>
            <Link to={`/private/${props.loggedUser._id}`}>
              {props.loggedUser.username.toUpperCase()}
            </Link>
          </>
        ) : (
          <>
            <Link to="/signin">SIGN IN</Link>
            <Link to="/signup">SIGN UP</Link>
          </>
        )}
      </div>
    </Nav>
  );
}

export default MyNavbar;
