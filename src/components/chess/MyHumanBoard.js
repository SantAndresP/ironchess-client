/*    Human vs. Human    */

// Setup.
import React, { useState, useEffect } from "react";
import Chess from "chess.js";
import Chessboard from "chessboardjsx";
import MyMoves from "./MyMoves";
import io from "socket.io-client";
import { URL } from "../../config";

// Styles.
import "../../styles/MyBoard.css";
import { Button, Spinner } from "react-bootstrap";

// Variables.
let roomId;
let socket;
let game;
let playerColor;
const CONNECTION_PORT = `${URL}`;

function HumanVsHuman(props) {
  // Hooks.
  const [fen, setFen] = useState("start");
  const [dropSquareStyle, setDropSquareStyle] = useState({});
  const [squareStyles, setSquareStyles] = useState({});
  const [pieceSquare, setPieceSquare] = useState("");
  const [history, setHistory] = useState([]);
  const [movesPGN, setMovesPGN] = useState("");
  const [turn, setTurn] = useState("w");
  const [orientation, setOrientation] = useState("");
  const [white, setWhite] = useState("");
  const [black, setBlack] = useState("");
  const [spectator, setSpectator] = useState([]);

  // componentDidMount.
  useEffect(() => {
    game = Chess();
    socket = io(CONNECTION_PORT);
    roomId = props.match.params.id;
    playerColor = props.match.params.color;

    if (playerColor === "w" && white.length === 0) {
      setOrientation("white");
      setWhite(props.loggedUser_id);
      socket.emit("join_game", { roomId, white: props.loggedUser._id });
    } else if (playerColor === "b" && black.length === 0) {
      setOrientation("black");
      setBlack(props.loggedUser_id);
      socket.emit("join_game", { roomId, black: props.loggedUser._id });
    } else {
      spectator.push(props.loggedUser._id);
    }
  }, []);

  // componentDidUpdate.
  useEffect(() => {
    socket.on("receive_info", (data) => {
      console.log("Information received.", data);

      setFen(data.position);
      setMovesPGN(data.moves);
      setTurn(data.turn);
      game.load_pgn(data.moves);
    });
  });

  // Keeps clicked square style and removes hint squares.
  const removeHighlightSquare = () => {
    setSquareStyles(squareStyling({ pieceSquare, history }));
  };

  // Shows possible moves.
  const highlightSquare = (sourceSquare, squaresToHighlight) => {
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
            history: history,
            pieceSquare: pieceSquare,
          }),
        };
      },
      {}
    );

    setSquareStyles({ ...squareStyles, ...highlightStyles });
  };

  const handleDrop = ({ sourceSquare, targetSquare }) => {
    if (playerColor !== game.turn()) {
      return;
    }

    let move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // Always promotes to a queen.
    });

    if (move === null) return;

    setFen(game.fen());
    setHistory(game.history({ verbose: true }));
    setMovesPGN(game.pgn());
    setTurn(game.turn());
    setSquareStyles(squareStyling({ pieceSquare, history }));

    socket.emit("send_game_info", {
      room: roomId,
      moves: game.pgn(),
      position: game.fen(),
      turn: game.turn(),
    });
  };

  const handleMouseOverSquare = (square) => {
    // Gets list of possible moves for this square.
    let moves = game.moves({
      square: square,
      verbose: true,
    });

    // Exits if there are no moves available for this square.
    if (moves.length === 0) return;

    let squaresToHighlight = [];

    for (var i = 0; i < moves.length; i++) {
      squaresToHighlight.push(moves[i].to);
    }

    highlightSquare(square, squaresToHighlight);
  };

  const handleMouseOutSquare = (square) => removeHighlightSquare(square);

  // Central squares get diferents `dropSquareStyles`.
  const handleDragOverSquare = (square) => {
    setDropSquareStyle(
      square === "e4" || square === "d4" || square === "e5" || square === "d5"
        ? { backgroundColor: "cornFlowerBlue" }
        : { boxShadow: "inset 0 0 1px 4px rgb(255, 255, 0)" }
    );
  };

  const handleSquareRightClick = (square) =>
    setSquareStyles({ [square]: { backgroundColor: "deepPink" } });

  // Loading spinner.
  if (!props.loggedUser) {
    return (
      <Spinner animation="border" role="status" variant="light">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  return props.children({
    position: fen,
    handleMouseOverSquare,
    handleMouseOutSquare,
    handleDrop,
    handleSquareRightClick,
    handleDragOverSquare,
    dropSquareStyle,
    squareStyles,
    moves: movesPGN,
    turn,
    orientation,
  });
}

function MyHumanBoard(props) {
  return (
    <HumanVsHuman {...props}>
      {({
        position,
        handleDrop,
        handleMouseOverSquare,
        handleMouseOutSquare,
        handleDragOverSquare,
        handleSquareRightClick,
        squareStyles,
        dropSquareStyle,
        moves,
        turn,
        orientation,
      }) => (
        <div className="myChessboard">
          <Chessboard
            id="HumanVsHuman"
            width={550}
            orientation={orientation}
            position={position}
            onDrop={handleDrop}
            onMouseOverSquare={handleMouseOverSquare}
            onMouseOutSquare={handleMouseOutSquare}
            onSquareRightClick={handleSquareRightClick}
            onDragOverSquare={handleDragOverSquare}
            squareStyles={squareStyles}
            dropSquareStyle={dropSquareStyle}
            boardStyle={{
              borderRadius: "5px",
              boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`,
            }}
          />

          <div className="movesAndButton">
            <MyMoves moves={moves} turn={turn}></MyMoves>
            <Button>Resign</Button>
          </div>
        </div>
      )}
    </HumanVsHuman>
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

export default MyHumanBoard;
