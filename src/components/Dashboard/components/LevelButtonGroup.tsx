import type { FC } from 'react'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Button from '@mui/material/Button'
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
  const numberOfButtons = possibleLevels.length;


  const allowedLevels = useNTValue<string[]>(
    'SmartDashboard/Presets/UI/AllowedCORALLevels',
    NetworkTablesTypeInfos.kStringArray,
    ['L1', 'L4']
  )

  // Function to handle button toggle
  const handleToggle = (new_level: string) => {
      setLevel(new_level);
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <Typography variant="h3" className="mb-4">Coral Level</Typography>
      <div className="flex flex-col gap-y-2">
        {possibleLevels.map((lvl, i) => (
          <div
            key={`button-for-${i}`}
            role="button"
            className={`w-[50px] h-[50px] flex items-center justify-center text-white font-bold cursor-pointer ${
              level === lvl ? 'bg-red-500' : allowedLevels.includes(lvl) ? 'bg-blue-500' : 'bg-gray-100'
            }`}
            onClick={() => allowedLevels.includes(lvl) && handleToggle(lvl)}
          >
            {lvl}
          </div>
        ))}
      </div>
    </div>
  );
};
export default LevelButtonGroup;
