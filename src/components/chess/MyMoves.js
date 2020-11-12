// Setup.
import React from "react";
import { ListGroup } from "react-bootstrap";

// Styles.
import "../../styles/MyMoves.css";

// Rendering function.
function MyMoves(props) {
  return (
    <ListGroup className="myListGroup">
      {props.turn === "w" ? (
        <ListGroup.Item variant="light">White to move.</ListGroup.Item>
      ) : (
        <ListGroup.Item variant="dark">Black to move.</ListGroup.Item>
      )}
      <ListGroup.Item variant="info" className="myMovesList">
        {props.moves}
      </ListGroup.Item>
    </ListGroup>
  );
}

export default MyMoves;
