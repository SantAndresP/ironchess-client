import React from "react";

function MyMoves(props) {
  return (
    <div>
      {props.turn} {props.moves}
    </div>
  );
}

export default MyMoves;
