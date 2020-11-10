import React from "react";
import MyEngineBoard from "../chess/MyEngineBoard";
import MyHumanBoard from "../chess/MyHumanBoard";

function PrivateGame(props) {
  console.log(props);
  return props.match.path === "/stockfish" ? (
    <MyEngineBoard />
  ) : (
    <MyHumanBoard {...props} />
  );
}

export default PrivateGame;
