import { useNTState, useNTValue } from 'ntcore-react'
import { NetworkTablesTypeInfos } from 'ntcore-ts-client'
import { type FC } from 'react'
import { LevelButtonGroup, IntakeToggle, StateHistory, Hexagon } from './components'
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
      <div className="col-span-full md:col-start-1 md:col-span-12 flex flex-col gap-y-2">
        <Typography variant="body1">Current State: {currentState}</Typography>
        <Typography variant="body1">Desired State: {desiredState}</Typography>
        <Typography variant="body1">Control Cycle: {controlCycle}</Typography>
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
        <Hexagon />
      </div>
    </>
  )
}
export default Dashboard
