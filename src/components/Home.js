/*      Home.     */

import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

// Styles.
import { Button } from "react-bootstrap";

// Rendering function.
function Home(props) {
  let color = "w";

  return (
    <div className="myHome">
      {/* Select time control */}
      <h1>Create a new game</h1>

      <div className="myTimeButtons">
        <Button size="lg" variant="dark">
          <Link to="/stockfish">Stockfish</Link>
        </Button>

        <Button size="lg" variant="light">
          <Link to={`/game/${uuidv4()}/${color}`}>Human</Link>
        </Button>
      </div>
    </div>
  );
}

export default Home;
