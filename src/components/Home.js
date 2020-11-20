/*    Home.    */

// Setup.
import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

// Styles.
import { Button } from "react-bootstrap";
import "../styles/Home.css";

// Main function.
function Home(props) {
  let color = "w";

  return (
    <div className="myHome">
      <div className="selectButtons">
        <Link to="/stockfish">
          <Button size="lg" variant="danger" className="vsButton">
            <img src="https://i.imgur.com/Vg9707Z.png" />
          </Button>
        </Link>

        <Link to={`/game/${uuidv4()}/${color}`}>
          <Button size="lg" variant="primary" className="vsButton">
            <img src="https://i.imgur.com/Z8tiVGJ.png" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
