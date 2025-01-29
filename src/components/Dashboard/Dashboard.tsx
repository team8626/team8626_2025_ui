import { useNTState, useNTValue } from 'ntcore-react'
import { NetworkTablesTypeInfos } from 'ntcore-ts-client'
import type { FC } from 'react'

const Dashboard: FC = () => {
  const currentState = useNTValue<string>(
    '/SmartDashboard/Commodore/Current State',
    NetworkTablesTypeInfos.kInteger,
    'UNKNOWN'
  )
  const [desiredState] = useNTState<string>(
    '/SmartDashboard/Commodore/Desired State',
    NetworkTablesTypeInfos.kInteger,
    'Setting to: UNKNOWN'
  )

  const controlCycle = useNTValue<number>(
    'SmartDashboard/swerve/controlCycleMS',
    NetworkTablesTypeInfos.kDouble,
    0.0
  )

  return (
    <div className="col-span-full md:col-start-1 md:col-span-12">
      <div className="flex flex-col gap-y-2">
        <div>Current State: {currentState}</div>
        <div>Desired State: {desiredState}</div>
        <div>Control Cycle: {controlCycle}</div>
      </div>
      <div className="hexagon my-6"></div>
    </div>
  )
}
export default Dashboard
