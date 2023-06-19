import { ImageList } from "@mui/material"

import chessImg from '../../../assets/chess.jpg';
import jokerImg from '../../../assets/joker.jpg';
import { GameItem } from "./game-item.component";
import { Games } from "../../constants";

export const GameBoard = () => (
  <ImageList sx={{ width: 400, height: 330 }} cols={2} rowHeight={300} gap={20}>
    <GameItem title={Games.Chess} players={2} img={chessImg} />
    <GameItem title={Games.Murlan} players={4} img={jokerImg} disable />
  </ImageList>
);
