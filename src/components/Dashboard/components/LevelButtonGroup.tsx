import type { FC } from 'react'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import Typography from '@mui/material/Typography'
import { useNTState, useNTValue } from '../../../lib/ntcore-react'
import { NetworkTablesTypeInfos } from 'ntcore-ts-client'

const LevelButtonGroup: FC = () => {
  const [level, setLevel] = useNTState<string>(
    'SmartDashboard/Presets/UI/SelectedCORALLevel',
    NetworkTablesTypeInfos.kString,
    'L1'
  )
  const possibleLevels = useNTValue<string[]>(
    'SmartDashboard/Presets/UI/PossibleCORALLevels',
    NetworkTablesTypeInfos.kStringArray,
    ['L1', 'L2', 'L3', 'L4']
  )

  const allowedLevels = useNTValue<string[]>(
    'SmartDashboard/Presets/UI/AllowedCORALLevels',
    NetworkTablesTypeInfos.kStringArray,
    ['L1', 'L4']
  )

  return (
    <div className="flex flex-col gap-y-2 justify-start">
      <Typography variant="h3">Coral Level</Typography>
      <ToggleButtonGroup
        orientation="vertical"
        value={level}
        exclusive
        onChange={(_e, v) => setLevel(v)}
        className="w-fit"
      >
        {possibleLevels?.map((level) => (
          <ToggleButton key={level} value={level} disabled={!allowedLevels.includes(level)}>
            {level}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  )
}
export default LevelButtonGroup
