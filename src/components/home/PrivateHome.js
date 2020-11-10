import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

// Styles.
import { Button } from "react-bootstrap";

// Rendering function.
function PrivateHome(props) {
  return (
    <div className="myPrivateHome">
      {/* Select time control */}
      <h1>Create a game</h1>

      <div className="myTimeButtons">
        <Button size="lg" variant="dark">
          <Link to="/stockfish">Stockfish</Link>
        </Button>

        <Button size="lg" variant="light">
          <Link to={`/game/${uuidv4()}/${color}`}>Timeless</Link>
        </Button>

        <Button size="lg" variant="danger">
          1 min
        </Button>

        <Button size="lg" variant="warning">
          3 min
        </Button>

        <Button size="lg" variant="warning">
          5 min
        </Button>

        <Button size="lg" variant="primary">
          10 min
        </Button>

        <Button size="lg" variant="primary">
          15 min
        </Button>

        <Button size="lg" variant="success">
          60 min
        </Button>
      </div>
    </div>
  );
}

export default PrivateHome;
