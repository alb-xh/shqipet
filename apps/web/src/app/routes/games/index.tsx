import { Box } from "@mui/material"

import { GameBoard } from "./game-board.component";

export const Games = () => {
  return (
    <Box
      width='100%'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      marginTop='70px'
    >
      <GameBoard />
    </Box>
  )
};