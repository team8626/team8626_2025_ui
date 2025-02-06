import { useEffect, useState, type FC } from 'react'
import Typography from '@mui/material/Typography'
import { NetworkTablesTypeInfos } from 'ntcore-ts-client'
import { useNTValue } from '../../../lib/ntcore-react'

export type Intake = 'left' | 'right'

const StateHistory: FC = () => {
  const [stateHistory] = useState<string[]>([])

  const currentState = useNTValue<string>(
    '/SmartDashboard/Commodore/Current State',
    NetworkTablesTypeInfos.kString,
    'UNKNOWN'
  )

  useEffect(() => {
    if (currentState !== stateHistory[stateHistory.length - 1]) {
      stateHistory.push(currentState)
      if (stateHistory.length > 10) stateHistory.shift()
    }
  }, [currentState])

  return (
    <div className="flex flex-col gap-y-2 justify-start">
      <Typography variant="h3">State History</Typography>
      <div className="flex flex-col gap-y-2 b-1 b-gray-300">
        {stateHistory.map((state, index) => (
          <div key={index}>{state}</div>
        ))}
      </div>
    </div>
  )
}
export default StateHistory
