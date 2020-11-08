/*    Human vs. Human    */

// Setup.
import React, { Component } from "react";
import PropTypes from "prop-types";
import Chess from "chess.js";

import Chessboard from "chessboardjsx";
import MyMoves from "./MyMoves";

// Styles.
import "../../styles/MyBoard.css";

// Move validation class.
class HumanVsHuman extends Component {
  static propTypes = { children: PropTypes.func };

  state = {
    // Starting position.
    fen: "start",
    // Square styles for active drop square.
    dropSquareStyle: {},
    // Custom square styles.
    squareStyles: {},
    // Square with the currently clicked piece.
    pieceSquare: "",
    // Currently clicked square.
    square: "",
    // Array of past game moves.
    history: [],
    // Moves in PNG format.
    moves: "",
    // Turn.
    turn: "",
  };

  componentDidMount() {
    this.game = new Chess();
  }

  componentDidUpdate() {
    this.moves = this.game.pgn();

    if (this.game.turn() === "w") {
      this.turn = "White to move.";
    } else {
      this.turn = "Black to move.";
    }
  }

  // Keeps clicked square style and removes hint squares.
  removeHighlightSquare = () => {
    this.setState(({ pieceSquare, history }) => ({
      squareStyles: squareStyling({ pieceSquare, history }),
    }));
  };

  // Shows possible moves.
  highlightSquare = (sourceSquare, squaresToHighlight) => {
    const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
      (a, c) => {
        return {
          ...a,
          ...{
            [c]: {
              background:
                "radial-gradient(circle, #fffc00 36%, transparent 40%)",
              borderRadius: "50%",
            },
          },
          ...squareStyling({
            history: this.state.history,
            pieceSquare: this.state.pieceSquare,
          }),
        };
      },
      {}
    );

    this.setState(({ squareStyles }) => ({
      squareStyles: { ...squareStyles, ...highlightStyles },
    }));
  };

  onDrop = ({ sourceSquare, targetSquare }) => {
    // Sees if the move is legal.
    let move = this.game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // Always promotes to a queen.
    });

    // Illegal move.
    if (move === null) return;
    this.setState(({ history, pieceSquare }) => ({
      fen: this.game.fen(),
      history: this.game.history({ verbose: true }),
      squareStyles: squareStyling({ pieceSquare, history }),
    }));
  };

  onMouseOverSquare = (square) => {
    // Gets list of possible moves for this square.
    let moves = this.game.moves({
      square: square,
      verbose: true,
    });

    // Exits if there are no moves available for this square.
    if (moves.length === 0) return;

    let squaresToHighlight = [];
    for (var i = 0; i < moves.length; i++) {
      squaresToHighlight.push(moves[i].to);
    }

    this.highlightSquare(square, squaresToHighlight);
  };

  onMouseOutSquare = (square) => this.removeHighlightSquare(square);

  // Central squares get diff `dropSquareStyles`.
  onDragOverSquare = (square) => {
    this.setState({
      dropSquareStyle:
        square === "e4" || square === "d4" || square === "e5" || square === "d5"
          ? { backgroundColor: "cornFlowerBlue" }
          : { boxShadow: "inset 0 0 1px 4px rgb(255, 255, 0)" },
    });
  };

  onSquareClick = (square) => {
    this.setState(({ history }) => ({
      squareStyles: squareStyling({ pieceSquare: square, history }),
      pieceSquare: square,
    }));

    let move = this.game.move({
      from: this.state.pieceSquare,
      to: square,
      promotion: "q", // Always promotes to a queen.
    });

    // Illegal move.
    if (move === null) return;

    this.setState({
      fen: this.game.fen(),
      history: this.game.history({ verbose: true }),
      pieceSquare: "",
    });
  };

  onSquareRightClick = (square) =>
    this.setState({
      squareStyles: { [square]: { backgroundColor: "deepPink" } },
    });

  render() {
    const { fen, dropSquareStyle, squareStyles } = this.state;

    return this.props.children({
      squareStyles,
      position: fen,
      onMouseOverSquare: this.onMouseOverSquare,
      onMouseOutSquare: this.onMouseOutSquare,
      onDrop: this.onDrop,
      dropSquareStyle,
      onDragOverSquare: this.onDragOverSquare,
      onSquareClick: this.onSquareClick,
      onSquareRightClick: this.onSquareRightClick,
      moves: this.moves,
      turn: this.turn,
    });
  }
}

export default function MyChessboard() {
  return (
    <div className="myGamespace">
      <HumanVsHuman>
        {({
          position,
          onDrop,
          onMouseOverSquare,
          onMouseOutSquare,
          squareStyles,
          dropSquareStyle,
          onDragOverSquare,
          onSquareClick,
          onSquareRightClick,
          moves,
          turn,
        }) => (
          <div className="myChessboard">
            <Chessboard
              id="humanVsHuman"
              width={550}
              position={position}
              onDrop={onDrop}
              onMouseOverSquare={onMouseOverSquare}
              onMouseOutSquare={onMouseOutSquare}
              boardStyle={{
                borderRadius: "5px",
                boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`,
              }}
              squareStyles={squareStyles}
              dropSquareStyle={dropSquareStyle}
              onDragOverSquare={onDragOverSquare}
              onSquareClick={onSquareClick}
              onSquareRightClick={onSquareRightClick}
            />

            <MyMoves moves={moves} turn={turn}></MyMoves>
          </div>
        )}
      </HumanVsHuman>

      <div className="myButtons">
        <button>Resign</button>
        <button>Offer draw</button>
      </div>
    </div>
  );
}

// Square styling.
const squareStyling = ({ pieceSquare, history }) => {
  const sourceSquare = history.length && history[history.length - 1].from;
  const targetSquare = history.length && history[history.length - 1].to;

  return {
    [pieceSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
    ...(history.length && {
      [sourceSquare]: {
        backgroundColor: "rgba(255, 255, 0, 0.4)",
      },
    }),
    ...(history.length && {
      [targetSquare]: {
        backgroundColor: "rgba(255, 255, 0, 0.4)",
      },
    }),
  };
};
