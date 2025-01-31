import { useState, type FC } from 'react'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import Typography from '@mui/material/Typography'

export type Intake = 'left' | 'right'

const IntakeToggle: FC = () => {
  const [intake, setIntake] = useState<Intake>('left')

  return (
    <div className="flex flex-col gap-y-2 justify-start">
      <Typography variant="h3">Intake</Typography>
      <ToggleButtonGroup
        orientation="horizontal"
        value={intake}
        exclusive
        onChange={(_e, v) => setIntake(v)}
        className="w-fit"
      >
        <ToggleButton value="left">Left</ToggleButton>
        <ToggleButton value="right">Right</ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}
export default IntakeToggle
