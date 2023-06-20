import { useContext, useEffect, useState } from "react";
import { Chess as ChessJs } from "chess.js";
import { Chessboard } from "react-chessboard";
import { Box } from "@mui/material";
import { isEqual } from 'lodash';
import { WsEvent, delay } from "@shqipet/common";

import { wsSocket, appContext, useGoHome, useUser, useAlerts } from "../../common";

export const Chess = () => {
  const goHome = useGoHome();
  const { successAlert, errorAlert } = useAlerts();
  const { user } = useUser();
  const { room } = useContext(appContext);
  const [fen, setFen] =  useState(new ChessJs().fen());

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
        setFen(new ChessJs().fen());
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

  const onDrop = (from, to) => {
    if (!myTurn || isGameOver) {
      return false;
    }

    try {
      game.move({ from, to, promotion: "q" });
      const newFen = game.fen();

      setFen(newFen);
      wsSocket.emit(WsEvent.SendToRoom, { id: room.id, state: newFen });

      return true;
    } catch {
      return false;
    }
  };

  return (
    <Box width='100%' display='flex' justifyContent='center' marginTop='70px'>
      <Box width={650}>
        <Chessboard
          position={fen}
          onPieceDrop={onDrop}
          boardOrientation={myColor}
        />;
      </Box>
    </Box>
  );
}