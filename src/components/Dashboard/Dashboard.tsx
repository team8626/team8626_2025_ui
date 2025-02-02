import { useNTState, useNTValue } from 'ntcore-react'
import { NetworkTablesTypeInfos } from 'ntcore-ts-client'
import { type FC } from 'react'
import { LevelButtonGroup, IntakeToggle, StateHistory, Hexagon, Timer} from './components'
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

  return (
    <>
      <div className="col-span-8 md:col-start-1 md:col-span-8 flex flex-col gap-y-2">
        <Typography variant="body1">Current State: {currentState}</Typography>
        <Typography variant="body1">Desired State: {desiredState}</Typography>
        <Typography variant="body1">Control Cycle: {controlCycle}</Typography>
        <Typography variant="body1">Match Time: {matchTime}</Typography>

      </div>
      <div className="col-span-4">
        <Timer matchTime={matchTime}/>
        </div>
      <div className="col-span-4">
        <LevelButtonGroup />
      </div>
      <div className="col-span-4">
        <IntakeToggle />
      </div>
      <div className="col-span-4">
        <StateHistory />
      </div>
      <div className="col-start-4 col-span-4">
        <Hexagon allianceColor={allianceColor}/>
      </div>

    </>
  )
}
export default Dashboard
