/*    Game room.    */

// Setup.
import React from "react";
import ChatBox from "./ChatBox";
import MyEngineBoard from "./chess/MyEngineBoard";
import MyHumanBoard from "./chess/MyHumanBoard";

function Game(props) {
  if (!props.loggedUser) {
    //show loading screen or
    return null;
  }

  return props.match.path === "/stockfish" ? (
    <>
      <MyEngineBoard />
    </>
  ) : (
    <>
      <ChatBox loggedUser={props.loggedUser} {...props} />
      <MyHumanBoard loggedUser={props.loggedUser} {...props} />
    </>
  );
}

export default Game;
