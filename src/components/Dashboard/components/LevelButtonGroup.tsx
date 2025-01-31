import { useState, type FC } from 'react'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import Typography from '@mui/material/Typography'

export type Level = 'l1' | 'l2' | 'l3' | 'l4'

const LevelButtonGroup: FC = () => {
  const [level, setLevel] = useState<Level>('l1')

  return (
    <div className="flex flex-col gap-y-2 justify-start">
      <Typography variant="h3">Level</Typography>
      <ToggleButtonGroup
        orientation="vertical"
        value={level}
        exclusive
        onChange={(_e, v) => setLevel(v)}
        className="w-fit"
      >
        <ToggleButton value="l1">L1</ToggleButton>
        <ToggleButton value="l2">L2</ToggleButton>
        <ToggleButton value="l3">L3</ToggleButton>
        <ToggleButton value="l4">L4</ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}
export default LevelButtonGroup
