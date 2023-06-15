import { useState } from "react";
import { Chess as ChessJs } from "chess.js";
import { Chessboard } from "react-chessboard";
import { Box } from "@mui/material";

export const Chess = () => {
  const [game, setGame] = useState(new ChessJs());

  return (
    <Box width='100%' display='flex' justifyContent='center' marginTop='70px'>
      <Box width={900}>
        <Chessboard position={game.fen()} />;
      </Box>
    </Box>
  );
}