import { useState, type FC } from 'react'
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

  const [clicked, setClicked] = useState<string | null>(null);

  // Function to handle button toggle
  const handleToggle = (new_level: string) => {
    setLevel(new_level);
    setClicked(new_level);
    setTimeout(() => setClicked(null), 500); // Reset the clicked state after 500ms
  }

  return (
    <div className="flex flex-col items-center gap-y-2 p-4 justify-start">
      <Typography variant="h4" className="mb-4">Coral Level</Typography>
      <div className="flex flex-col gap-y-2">
      {possibleLevels.slice().reverse().map((lvl, i) => (
          <div
            key={`button-for-${i}`}
            role="button"
            className={`w-[50px] h-[50px] flex items-center justify-center font-bold cursor-pointer transition-all duration-400 ease-in-out transform ${
              level === lvl ? 'bg-red-500 text-white scale-110' : allowedLevels.includes(lvl) ? 'bg-white text-black' : 'bg-gray-800 text-gray-700'}
              ${clicked === lvl ? 'scale-120' : ''}`
            }
            onClick={() => allowedLevels.includes(lvl) && handleToggle(lvl)}
          >
            <span className="text-2xl">{lvl}</span>
            </div>
        ))}
      </div>
    </div>
  
  );
};
export default LevelButtonGroup;
