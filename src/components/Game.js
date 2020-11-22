/*    Game room.    */

// Setup.
import React from "react";
import ChatBox from "./ChatBox";
import MyEngineBoard from "./chess/MyEngineBoard";
import MyHumanBoard from "./chess/MyHumanBoard";

// Styles.
import "../styles/Game.css";

// Main function.
function Game(props) {
  // Loading spinner.
  if (!props.loggedUser) {
    return (
      <Spinner animation="border" role="status" variant="light">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  return props.match.path === "/stockfish" ? (
    <div>
      <MyEngineBoard />
    </div>
  ) : (
    <div className="myGame">
      <ChatBox loggedUser={props.loggedUser} {...props} />
      <MyHumanBoard loggedUser={props.loggedUser} {...props} />
    </div>
  );
}

export default Game;
