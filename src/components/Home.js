/*      Home.     */

import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

// Styles.
import { Button } from "react-bootstrap";
import "../styles/Home.css";

// Rendering function.
function Home(props) {
  let color = "w";

  return (
    <div className="myHome">
      {/* Select time control */}
      <h1 className="myTitle">New game</h1>

      <div className="selectButtons">
        <Link to="/stockfish">
          <Button size="lg" variant="dark">
            <img src="https://i.imgur.com/jyTRjkY.png" />
          </Button>
        </Link>

        <Link to={`/game/${uuidv4()}/${color}`}>
          <Button size="lg" variant="light">
            <img src="https://i.imgur.com/PBtKjOl.png" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
