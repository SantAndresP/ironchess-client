// Setup.
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Switch, Route, withRouter } from "react-router-dom";
import { API_URL } from "../config";

// Styles.
import "../styles/App.css";

// Components.
import MyNavbar from "./MyNavbar";
import Home from "./Home";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import Game from "./Game";
import PrivateProfile from "./user/PrivateProfile";

/* ---------- App. ---------- */
function App() {
  const [loggedUser, setLoggedUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // componentDidMount.
  useEffect(() => {
    if (!loggedUser) {
      axios.get(`${API_URL}/user`, { withCredentials: true }).then((res) => {
        setLoggedUser(res.data);
      });
    }
  }, []);

  // Sign up.
  const handleSignup = (e) => {
    e.preventDefault();

    const { username, email, password } = e.target;

    axios
      .post(
        `${API_URL}/signup`,
        {
          username: username.value,
          email: email.value,
          password: password.value,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setLoggedUser(res.data, () => {
          props.history.push("/");
        });
      })
      .catch((err) => {
        setErrorMsg(err.response.data.error);
      });
  };

  // Sign in.
  const handleSignin = (e) => {
    e.preventDefault();

    const { email, password } = e.target;

    axios
      .post(
        `${API_URL}/signin`,
        {
          email: email.value,
          password: password.value,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setLoggedUser(res.data, () => {
          props.history.push("/");
        });
      })
      .catch((err) => {
        setErrorMsg(err.response.data.error);
      });
  };

  // Log out.
  const handleLogout = (e) => {
    axios.post(`${API_URL}/logout`, {}, { withCredentials: true }).then(() => {
      setLoggedUser(null);
    });
  };

  // Unmounts `errorMsg`.
  const handleUnmount = () => {
    setErrorMsg(null);
  };

  return (
    <div className="myApp">
      <header>
        <MyNavbar loggedUser={loggedUser} onLogout={handleLogout} />
      </header>

      <main>
        <Switch>
          {/* Home. */}
          <Route
            exact
            path="/"
            render={() => {
              return <Home loggedUser={loggedUser} />;
            }}
          />

          {/* Sign in. */}
          <Route
            path="/signin"
            render={(routeProps) => {
              return (
                <Signin
                  onUnmount={handleUnmount}
                  errorMsg={errorMsg}
                  onSignin={handleSignin}
                  {...routeProps}
                />
              );
            }}
          />

          {/* Sign up. */}
          <Route
            path="/signup"
            render={(routeProps) => {
              return <Signup onSignup={handleSignup} {...routeProps} />;
            }}
          />

          {/* Private profile. */}
          <Route
            path="/private/:id"
            render={() => {
              return <PrivateProfile loggedUser={loggedUser} />;
            }}
          />

          {/* Public profile. */}
          <Route
            path="/public/:id"
            render={() => {
              return <PublicProfile loggedUser={loggedUser} />;
            }}
          />

          {/* Game. */}
          <Route
            path="/stockfish"
            render={(routeProps) => {
              return <Game loggedUser={loggedUser} {...routeProps} />;
            }}
          />

          <Route
            exact
            path="/game/:id/:color"
            render={(routeProps) => {
              return <Game loggedUser={loggedUser} {...routeProps} />;
            }}
          />
        </Switch>
      </main>
    </div>
  );
}

export default withRouter(App);
