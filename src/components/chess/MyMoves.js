/*    Table of moves component.    */

// Setup.
import React from "react";

// Styles.
import { ListGroup } from "react-bootstrap";
import "../../styles/MyMoves.css";

// Main function.
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
