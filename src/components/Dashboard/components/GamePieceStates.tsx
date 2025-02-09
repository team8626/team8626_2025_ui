import type { FC } from 'react'
import Typography from '@mui/material/Typography'

interface GamePieceStates {
  algaeState: string;
  coralState: string;
 }


const GamePieceStates: FC<GamePieceStates> = ({algaeState, coralState}) => {
  return (
    <div className="flex flex-col gap-y-2 justify-start">
      <Typography variant="h3">Game Pieces</Typography>
      <Typography variant="body1">ALGAE: {algaeState}</Typography>
      <Typography variant="body1">CORAL: {coralState}</Typography>
    </div>
  )
}
export default GamePieceStates
