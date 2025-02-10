import type { FC } from 'react'
import Typography from '@mui/material/Typography'
import { NetworkTablesTypeInfos } from 'ntcore-ts-client'
import useNTState from '../../../lib/ntcore-react/useNTState'

const GamePieceStates: FC = () => {

  const [algaeState] = useNTState<string>(
    '/SmartDashboard/Dashboard/AlgaeState',
    NetworkTablesTypeInfos.kString,
    'UNKNOWN'
  )
  const [coralState] = useNTState<string>(
    '/SmartDashboard/Dashboard/CoralState',
    NetworkTablesTypeInfos.kString,
    'UNKNOWN'
  )

  const [algaeShootTime] = useNTState<number>(
    '/SmartDashboard/Subsystems/AlgaeShooter/Last Shot in (ms)',
    NetworkTablesTypeInfos.kDouble,
    0
  )
  const [coralShootTime] = useNTState<number>(
    '/SmartDashboard/Subsystems/CoralShooter/Last Shot in (ms)',
    NetworkTablesTypeInfos.kDouble,
    0
  )

  return (
    <div className="flex flex-col items-center gap-y-4 p-4 justify-start">
      <Typography variant="h3">Game Pieces</Typography>
      <div className="flex flex-row gap-x-4">
        <div className="flex flex-col items-center bg-green-200 p-4 rounded-lg shadow-md text-black">
          <span className="text-2xl font-bold">ALGAE</span>
          <span className="text-xl font-bold">{algaeState}</span>
          <Typography variant="body1">Shoot in: {algaeShootTime}ms</Typography>
        </div>
        <div className="flex flex-col items-center bg-red-300 p-4 rounded-lg shadow-md text-black">
          <span className="text-2xl font-bold">CORAL</span>
          <span className="text-xl font-bold">{coralState}</span>
          <Typography variant="body1">Shoot in: {coralShootTime}ms</Typography>
        </div>
      </div>
    </div>
  );
}
export default GamePieceStates
