/*    Sign up.    */
import React from "react";

// Rendering function.
function Signup(props) {
  return (
    <form onSubmit={props.onSignup}>
      <div className="form-group">
        <label>Username</label>
        <input name="username" type="text" />
      </div>

      <div className="form-group">
        <label>Email address</label>
        <input name="email" type="text" />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input name="password" type="password" />
      </div>

      <button type="submit">Submit</button>

      {/*    In case of error.    */}
      {props.errorMessage ? (
        <p style={{ color: "red" }}>{props.errorMessage}</p>
      ) : null}
    </form>
  );
}

export default Signup;
