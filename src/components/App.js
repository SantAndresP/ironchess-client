// Setup.
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Switch, Route, withRouter } from "react-router-dom";

// Styles.
import "../styles/App.css";

// Components
import MyNavbar from "./MyNavbar";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import PrivateProfile from "./user/PrivateProfile";
import PublicHome from "./home/PublicHome";
import PrivateHome from "./home/PrivateHome";
import PrivateGame from "./game/PrivateGame";

function App() {
  const [loggedUser, setLoggedUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");

  // componentDidMount.
  useEffect(() => {
    if (!loggedUser) {
      axios
        .get(`http://localhost:5000/api/user`, { withCredentials: true })
        .then((res) => {
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
        `http://localhost:5000/api/signup`,
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
      });
  };

  // Sign in.
  const handleSignin = (e) => {
    e.preventDefault();

    const { email, password } = e.target;

    axios
      .post(
        `http://localhost:5000/api/signin`,
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
    axios
      .post(`http://localhost:5000/api/logout`, {}, { withCredentials: true })
      .then(() => {
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
          {/* Public or Private homepage. */}
          <Route
            exact
            path="/"
            render={() => {
              return !loggedUser ? <PublicHome /> : <PrivateHome />;
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
            path="/private"
            render={() => {
              return <PrivateProfile loggedUser={loggedUser} />;
            }}
          />

          {/* Public profile. */}
          <Route
            path="/public/:id"
            render={() => {
              return <PrivateProfile loggedUser={loggedUser} />;
            }}
          />

          {/* Private game. */}
          <Route
            path="/stockfish"
            render={() => {
              return <PrivateGame loggedUser={loggedUser} />;
            }}
          />

          <Route
            path="/game"
            render={() => {
              return <PrivateGame loggedUser={loggedUser} />;
            }}
          />

          {/* Public game. */}
          <Route
            path="/game/:id"
            render={() => {
              return <PublicGame loggedUser={loggedUser} />;
            }}
          />
        </Switch>
      </main>
    </div>
  );
}

export default withRouter(App);
