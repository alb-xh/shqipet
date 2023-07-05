import { useEffect, useState } from "react";
import { Chess as ChessJs } from "chess.js";
import { Chessboard } from "react-chessboard";
import { Box } from "@mui/material";
import { isEqual } from 'lodash';
import { WsEvent, delay } from "@shqipet/common";

import { wsSocket, useGoHome, useUser, useAlerts, useRoom } from "../../common";

export const Chess = () => {
  const goHome = useGoHome();
  const { successAlert, errorAlert } = useAlerts();
  const { user } = useUser();
  const { room } = useRoom();

  const [fen, setFen] = useState(new ChessJs().fen());
  const [moveFrom, setMoveFrom] = useState(null);
  const [promoteSquare, setPromoteSquare] = useState(null);
  const [optionSquares, setOptionSquares] = useState({});

  const noAccess = !user || !room || room.members.length !== room.size;

  const game = new ChessJs(fen);
  const isGameOver = game.isGameOver();
  const myColor = isEqual(room?.members[0], user) ? 'white' : 'black';
  const myTurn = myColor.startsWith(game.turn());

  useEffect(() => {
    if (noAccess) {
      goHome();

      return;
    }

    if (isGameOver) {
      const winner = myTurn ? false : true;

      if (winner) {
        successAlert('You won!');
      } else {
        errorAlert('You lost!');
      }

      delay(5000).then(() => {
        goHome();
      });

      return;
    }

    if (!wsSocket.listeners(WsEvent.BroadcastToRoom).length) {
      wsSocket.on(WsEvent.BroadcastToRoom, setFen);
    }

    return () => {
      wsSocket.off(WsEvent.BroadcastToRoom);
    };
  }, [ user, room, fen ]);

  if (noAccess) {
    return null;
  }

  const getMoves = (square) => game.moves({ square, verbose: true })
  const hasMoves = (square) => getMoves(square).length > 0;

  const clearMoves = () => {
    setMoveFrom(null);
    setOptionSquares({});
  };

  const openMoves = (square) => {
    const newSquares = {};

    if (!hasMoves(square)) {
      clearMoves();

      return;
    }

    for (const move of getMoves(square)) {
      newSquares[move.to] = {
        background:
          game.get(move.to) &&
          game.get(move.to).color !== game.get(square).color
            ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)"
            : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
        borderRadius: "50%",
      };
    }

    newSquares[square] = {
      background: "rgba(255, 255, 0, 0.4)",
    };

    setMoveFrom(square);
    setOptionSquares(newSquares);
  }

  const move = (from: string, to: string, promotion?: string) => {
    game.move({ from, to, promotion });

    const newFen = game.fen();

    setFen(newFen);
    clearMoves();

    wsSocket.emit(WsEvent.SendToRoom, { id: room.id, state: newFen });
  }

  const onSquareClick = (square: string) => {
    if (!myTurn) {
      return;
    }

    if (!moveFrom) {
      if (hasMoves(square)) {
        openMoves(square);
      }

      return;
    }

    setOptionSquares({});

    const moves = getMoves(moveFrom);
    const completedMove = moves.some((m) => m.from === moveFrom && m.to === square);

    if (!completedMove) {
      openMoves(square);
      return;
    }

    const isPromotionMove = (myColor === 'white' && square[1] === "8") || (myColor === 'black' && square[1] === "1");

    if (isPromotionMove && !promoteSquare) {
      setPromoteSquare(square);

      return;
    }

    move(moveFrom, square);
  };

  const onPromotionPieceSelect = (piece: string) => {
    move(moveFrom, promoteSquare, piece[1].toLowerCase());
    setPromoteSquare(null);

    return true;
  };

  return (
    <Box width='100%' display='flex' justifyContent='center' marginTop='70px'>
      <Box width={650}>
        <Chessboard
          animationDuration={200}
          arePiecesDraggable={false}
          areArrowsAllowed={false}
          boardOrientation={myColor}
          position={fen}
          showPromotionDialog={!!promoteSquare}
          onSquareClick={onSquareClick}
          onPromotionPieceSelect={onPromotionPieceSelect}
          customBoardStyle={{
            borderRadius: "4px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
          }}
          customSquareStyles={{ ...optionSquares }}
        />;
      </Box>
    </Box>
  );
}