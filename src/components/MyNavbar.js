// Setup.
import React from "react";
import { Link } from "react-router-dom";
import "../styles/MyNavbar.css";

// Rendering function.
function MyNavbar(props) {
  return (
    <div className="myNav">
      <Link to="/">IronChess</Link>
      {props.loggedInUser ? (
        <>
          <Link onClick={props.onLogout}>Logout</Link>
          <Link to="/private-profile">{props.loggedInUser.username}</Link>
        </>
      ) : (
        <>
          <Link to="/sign-in">Sign in</Link>
          <Link to="/sign-up">Sign up</Link>
        </>
      )}
    </div>
  );
}

export default MyNavbar;
