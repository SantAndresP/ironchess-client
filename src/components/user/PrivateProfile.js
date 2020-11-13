import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner, Card, ListGroup } from "react-bootstrap";
import { API_URL } from "../../config";

import "../../styles/Profile.css";

function PrivateProfile() {
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
  );
}

export default PrivateProfile;
