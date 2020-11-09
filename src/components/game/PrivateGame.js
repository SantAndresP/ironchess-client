import React from "react";
import { withRouter } from "react-router-dom";
import MyEngineBoard from "../chess/MyEngineBoard";
import MyHumanBoard from "../chess/MyHumanBoard";

function PrivateGame(props) {
  return props.match.path === "/stockfish" ? (
    <MyEngineBoard />
  ) : (
    <MyHumanBoard />
  );
}

export default withRouter(PrivateGame);
