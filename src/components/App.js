// Setup.
import React, { Component } from "react";
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

// Rendering function.
class App extends Component {
  state = {
    loggedUser: null,
    errorMessage: null,
  };

  componentDidMount() {
    if (!this.state.loggedUser) {
      axios
        .get(`http://localhost:5000/api/user`, { withCredentials: true })
        .then((res) => {
          this.setState({
            loggedUser: res.data,
          });
        });
    }
  }

  // Sign up.
  handleSignup = (e) => {
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
        this.setState(
          {
            loggedUser: res.data,
          },
          () => {
            this.props.history.push("/");
          }
        );
      });
  };

  // Sign in.
  handleSignin = (e) => {
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
        this.setState(
          {
            loggedUser: res.data,
          },
          () => {
            this.props.history.push("/");
          }
        );
      })
      .catch((err) => {
        console.log(err.response.data);
        this.setState({
          errorMessage: err.response.data.error,
        });
      });
  };

  // Log out.
  handleLogout = (e) => {
    axios
      .post(`http://localhost:5000/api/logout`, {}, { withCredentials: true })
      .then(() => {
        this.setState({
          loggedUser: null,
        });
      });
  };

  // Unmounts error message.
  handleUnmount = () => {
    this.setState({
      errorMessage: null,
    });
  };

  render() {
    const { loggedUser, errorMessage } = this.state;

    return (
      <div className="myApp">
        <header>
          <MyNavbar loggedUser={loggedUser} onLogout={this.handleLogout} />
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
                    onUnmount={this.handleUnmount}
                    errorMessage={errorMessage}
                    onSignin={this.handleSignin}
                    {...routeProps}
                  />
                );
              }}
            />

            {/* Sign up. */}
            <Route
              path="/signup"
              render={(routeProps) => {
                return <Signup onSignup={this.handleSignup} {...routeProps} />;
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
              path="/game/:id"
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
}

export default withRouter(App);
