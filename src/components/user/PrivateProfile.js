/*    Public profile.    */

// Setup.
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../../config";

// Styles.
import { Spinner, Card, ListGroup, Button } from "react-bootstrap";
import "../../styles/Profile.css";

// Main function.
function PrivateProfile(props) {
  const [games, setGames] = useState([]);

  // componentDidMount.
  useEffect(() => {
    axios.get(`${API_URL}/games`, { withCredentials: true }).then((res) => {
      setGames(res.data);
      console.log(res.data);
    });
  }, []);

  // Loading spinner.
  if (!games.length) {
    return (
      <Spinner animation="border" role="status" variant="light">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  return (
    <div className="myProfile">
      <Card style={{ width: "400px" }}>
        <Card.Img variant="top" src={props.loggedUser.image} />
        <Card.Body>
          <Card.Title>{props.loggedUser.username}</Card.Title>
          <Card.Text>{props.loggedUser.about}</Card.Text>
          <Link to="/edit">
            <Button variant="primary">Edit</Button>
          </Link>
        </Card.Body>
      </Card>

      <div className="myGamesList">
        {games.map((game) => {
          return (
            <div className="myGameInfoContainer">
              <ListGroup>
                <ListGroup.Item>
                  <div className="myGameInfo">
                    <p>
                      <b>Id:</b> {game.roomId}
                    </p>
                    <p>
                      <b>White:</b> {game.white}
                    </p>
                    <p>
                      <b>Black:</b> {game.black ? game.black : "N/A"}
                    </p>
                    <p>
                      <b>Moves:</b> {game.movetext}
                    </p>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PrivateProfile;
