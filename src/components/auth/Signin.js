/*    Sign in.    */
import React, { useEffect } from "react";

// Rendering function.
function Signin(props) {
  useEffect(() => {
    return props.onUnmount;
  }, []);

  return (
    <form onSubmit={props.onSignin}>
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

export default Signin;
