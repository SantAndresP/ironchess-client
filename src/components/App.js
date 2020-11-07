// Setup.
import React, { Component } from "react";
import axios from "axios";
import { Switch, Route, withRouter } from "react-router-dom";

// Components
import MyNavbar from "./MyNavbar";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import GameView from "./GameView";
import Private from "./user/Private";

// import { API_URL } from "./config";

class App extends Component {
  state = {
    loggedInUser: null,
    errorMessage: null,
  };

  componentDidMount() {
    if (!this.state.loggedInUser) {
      axios
        .get(`http://localhost:5000/api/user`, { withCredentials: true })
        .then((res) => {
          this.setState({
            loggedInUser: res.data,
          });
        });
    }

    axios.get(`http://localhost:5000/api/todos`).then((response) => {
      this.setState({
        todos: response.data,
      });
    });
  }

  handleAdd = (e) => {
    e.preventDefault();
    const { name, description, image } = e.target;
    const imageFile = image.files[0];

    const uploadForm = new FormData();
    uploadForm.append("imageUrl", imageFile);

    axios.post(`http://localhost:5000/api/upload`, uploadForm).then((res) => {
      console.log(res.data);

      const newTodo = {
        name: name.value,
        description: description.value,
        completed: false,
        image: res.data.image,
      };

      axios
        .post(`http://localhost:5000/api/create`, newTodo)
        .then((response) => {
          this.setState(
            {
              todos: [response.data, ...this.state.todos],
            },
            () => {
              this.props.history.push("/");
            }
          );
        });
    });
  };

  handleDelete = (todoId) => {
    axios.delete(`http://localhost:5000/api/todos/${todoId}`).then(() => {
      let filteredTodos = this.state.todos.filter((todo) => {
        return todo._id !== todoId;
      });

      this.setState(
        {
          todos: filteredTodos,
        },
        () => {
          this.props.history.push("/");
        }
      );
    });
  };

  handleEdit = (todo) => {
    axios
      .patch(`http://localhost:5000/api/todos/${todo._id}`, {
        name: todo.name,
        description: todo.description,
        completed: todo.completed,
      })
      .then(() => {
        let updatedTodos = this.state.todos.map((myTodo) => {
          if (myTodo._id == todo._id) {
            myTodo = todo;
          }
          return myTodo;
        });

        this.setState(
          {
            todos: updatedTodos,
          },
          () => {
            this.props.history.push("/");
          }
        );
      });
  };

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
            loggedInUser: res.data,
          },
          () => {
            this.props.history.push("/");
          }
        );
      });
  };

  handleSignin = (e) => {
    e.preventDefault();

    const { email, password } = e.target;

    axios
      .post(
        `http://localhost:5000/api/Signin`,
        {
          email: email.value,
          password: password.value,
        },
        { withCredentials: true }
      )
      .then((res) => {
        this.setState(
          {
            loggedInUser: res.data,
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

  handleLogOut = (e) => {
    axios
      .post(`http://localhost:5000/api/logout`, {}, { withCredentials: true })
      .then(() => {
        this.setState({
          loggedInUser: null,
        });
      });
  };

  handleUnmount = () => {
    this.setState({
      errorMessage: null,
    });
  };

  render() {
    const { loggedInUser, errorMessage } = this.state;

    return (
      <div className="myApp">
        <header>
          <MyNavbar loggedInUser={loggedInUser} onLogout={this.handleLogOut} />
        </header>

        <main>
          {loggedInUser ? <UserCard loggedInUser={loggedInUser} /> : null}

          {/* Chessboard. */}
          <GameView />

          <button>Look for a game.</button>
          <button>1 min</button>
          <button>3 min</button>
          <button>5 min</button>
          <button>10 min</button>
          <button>15 min</button>
          <button>60 min</button>

          <Switch>
            {/* Sign in. */}
            <Route
              path="/sign-in"
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
              path="/sign-up"
              render={(routeProps) => {
                return <Signup onSignUp={this.handleSignUp} {...routeProps} />;
              }}
            />

            {/* Private profile. */}
            <Route
              path="/private-profile"
              render={() => {
                return <Private loggedInUser={loggedInUser} />;
              }}
            />
          </Switch>
        </main>
      </div>
    );
  }
}

export default withRouter(App);
