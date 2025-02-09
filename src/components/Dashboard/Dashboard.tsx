import { useNTState, useNTValue } from '../../lib/ntcore-react'
import { NetworkTablesTypeInfos } from 'ntcore-ts-client'
import { type FC } from 'react'
import { LevelButtonGroup, IntakeToggle, StateHistory, Hexagon, Timer, GamePieceStates} from './components'
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

  const [allianceColor] = useNTState<string>(
    '/SmartDashboard/Dashboard/AllianceColor',
    NetworkTablesTypeInfos.kString,
    'UNKNOWN'
  )

  const matchTime = useNTValue<number>(
    'SmartDashboard/Dashboard/matchTime',
    NetworkTablesTypeInfos.kInteger,
    0
  )
  const isAutonomous = useNTValue<boolean>(
    'SmartDashboard/Dashboard/isAutonomous',
    NetworkTablesTypeInfos.kBoolean,
    false
  )
  const isTeleop = useNTValue<boolean>(
    'SmartDashboard/Dashboard/isTeleop',
    NetworkTablesTypeInfos.kBoolean,
    false
  )

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
    <>
      <div className="col-span-3 md:col-start-1 md:col-span-3 flex flex-col gap-y-2">
        <Typography variant="body1">Current State: {currentState}</Typography>
        <Typography variant="body1">Desired State: {desiredState}</Typography>
        <Typography variant="body1">Control Cycle: {controlCycle}</Typography>
      </div>
      <div className="fixed bottom-0 right-0 z-50 p-4">
        <Timer matchTime={matchTime} isAuto={isAutonomous} isTeleop={isTeleop}/>
        </div>


      <div className="col-span-3">
        <StateHistory />
      </div>
      <div className="col-span-3">
        <GamePieceStates coralState={coralState} algaeState={algaeState} coralShootTime={coralShootTime} algaeShootTime={algaeShootTime}/>
      </div>
      <div className="col-start-1 col-span-2">
        <LevelButtonGroup />
      </div>
      <div className="col-start-3 col-span-8 flex justify-center items-center">
        <Hexagon allianceColor={allianceColor}/>
      </div>
      <div className="col-span-2">
        <IntakeToggle />
      </div>

    </>
  )
}
export default Dashboard
