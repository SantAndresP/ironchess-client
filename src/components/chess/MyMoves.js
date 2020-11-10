import React from "react";
import { ListGroup } from "react-bootstrap";

function MyMoves(props) {
  return (
    <ListGroup>
      {props.turn === "w" ? (
        <ListGroup.Item variant="light">White to move.</ListGroup.Item>
      ) : (
        <ListGroup.Item variant="dark">Black to move.</ListGroup.Item>
      )}
      <ListGroup.Item variant="info">{props.moves}</ListGroup.Item>
    </ListGroup>
  );
}

export default MyMoves;
