import { useNTState, useNTValue } from '../../lib/ntcore-react'
import { NetworkTablesTypeInfos } from 'ntcore-ts-client'
import { type FC } from 'react'
import { LevelButtonGroup, IntakeToggle, StateHistory, Hexagon, Timer, GamePieceStates, AutoPath, DTPToggle} from './components'
import { Typography } from '@mui/material'

const Dashboard: FC = () => {
  const currentState = useNTValue<string>(
    '/SmartDashboard/Commodore/Current State',
    NetworkTablesTypeInfos.kString,
    'UNKNOWN'
  )
  const [desiredState] = useNTState<string>(
    '/SmartDashboard/Commodore/Desired State',
    NetworkTablesTypeInfos.kString,
    'Setting to: UNKNOWN'
  )

  const controlCycle = useNTValue<number>(
    'SmartDashboard/swerve/controlCycleMS',
    NetworkTablesTypeInfos.kDouble,
    0.0
  )

  return (
    <>
      <div className="col-span-2 col-start-1 flex flex-col gap-y-2">
        <Typography variant="body1">Current State: {currentState}</Typography>
        <Typography variant="body1">Desired State: {desiredState}</Typography>
        <Typography variant="body1">Control Cycle: {controlCycle}</Typography>
      </div>

      <div className="col-span-7">
        <AutoPath />
      </div>

      <div className="col-span-3">
        <StateHistory />
      </div>

      <div className="col-span-2 flex flex-col gap-y-4">
        <LevelButtonGroup />
        <IntakeToggle />
        <DTPToggle />
      </div>

      <div className="col-span-7 flex justify-center items-center">
        <Hexagon />
      </div>

      <div className="col-span-3 flex flex-col gap-y-4">
        <GamePieceStates />
      </div>

      <div className="fixed bottom-0 right-0 z-50 p-4">
        <Timer />
      </div>
    </>
  );

}
export default Dashboard
