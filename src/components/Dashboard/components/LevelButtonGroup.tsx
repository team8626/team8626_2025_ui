import type { FC } from 'react'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import Typography from '@mui/material/Typography'
import { useNTState } from '../../../lib/ntcore-react'
import { NetworkTablesTypeInfos } from 'ntcore-ts-client'

export type Level = 'L1' | 'L2' | 'L3' | 'L4'

const LevelButtonGroup: FC = () => {
  const [level, setLevel] = useNTState<string>('SmartDashboard/Presets/UI/SelectedCORALLevel', NetworkTablesTypeInfos.kString, 'L1')

  return (
    <div className="flex flex-col gap-y-2 justify-start">
      <Typography variant="h3">Level</Typography>
      <Typography variant="h3">Current Set Level (Robot): {level}</Typography>
      <ToggleButtonGroup
        orientation="vertical"
        value={level}
        exclusive
        onChange={(_e, v) => setLevel(v, {id: 1})}
        className="w-fit"
      >
        <ToggleButton value="L1">L1</ToggleButton>
        <ToggleButton value="L2">L2</ToggleButton>
        <ToggleButton value="L3">L3</ToggleButton>
        <ToggleButton value="L4">L4</ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}
export default LevelButtonGroup
