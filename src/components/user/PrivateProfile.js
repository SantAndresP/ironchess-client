import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Spinner, Card, ListGroup } from "react-bootstrap";
import { API_URL } from "../../config";

function PrivateProfile() {
  const [games, setGames] = useState([]);

  // componentDidMount.
  useEffect(() => {
    axios.get(`${API_URL}/games`, { withCredentials: true }).then((res) => {
      setGames(res.data);
      console.log(games);
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
          <div>
            <p>{game.roomId}</p>
            <p>{game.white}</p>
            <p>{game.movetext}</p>
          </div>
        );
      })}
    </div>
  );
}

export default PrivateProfile;
