import { useContext, useEffect, useState } from "react";
import { Chess as ChessJs } from "chess.js";
import { Chessboard } from "react-chessboard";
import { Box } from "@mui/material";
import { appContext, useGoHome, useUser } from "../../common";

export const Chess = () => {
  const goHome = useGoHome();
  const { user } = useUser();
  const { room } = useContext(appContext);
  const [game, setGame] = useState(new ChessJs());

  const noAccess = !user || !room || room.members.length !== room.size;

  useEffect(() => {
    if (noAccess) {
      goHome();

      return;
    }

  }, [ user, goHome, noAccess ]);


  if (noAccess) {
    return null;
  }

  return (
    <Box width='100%' display='flex' justifyContent='center' marginTop='70px'>
      <Box width={650}>
        <Chessboard position={game.fen()} />;
      </Box>
    </Box>
  );
}