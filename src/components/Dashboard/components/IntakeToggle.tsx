import { useState, type FC } from 'react'
import Typography from '@mui/material/Typography'
import { useNTState } from '../../../lib/ntcore-react'
import { NetworkTablesTypeInfos } from 'ntcore-ts-client'

export type Intake = 'left' | 'right'


const IntakeToggle: FC = () => {
  const [intakeSide, setIntakeSide] = useNTState<string>(
    'SmartDashboard/Presets/UI/IntakeSide',
    NetworkTablesTypeInfos.kString,
    'right'
  )
  const [clicked, setClicked] = useState<string | null>(null);

  // Function to handle button toggle
  const handleToggle = (newSide: string) => {
    if (intakeSide === newSide) {
      setIntakeSide(''); // Unselect if the same button is clicked
    } else {
      setIntakeSide(newSide);
    }
    setClicked(newSide);
    setTimeout(() => setClicked(null), 500); // Reset the clicked state after 500ms
  }

  return (
    <div className="flex flex-col items-center gap-y-2 p-4 justify-start">
    <Typography variant="h4" className="mb-4">Intake Side</Typography>
    <div className="flex flex gap-x-2">
    <div
        key="button_left"
        role="button"
        className={`w-[150px] h-[50px] flex items-center justify-center font-bold cursor-pointer transition-all duration-400 ease-in-out transform ${
          intakeSide === 'left' ? 'bg-red-500 text-white scale-110 shadow-box z-10' : 'bg-white text-black'}`
        }
        onClick={() => handleToggle('left')}
      >
        <span className="text-2xl">LEFT</span>
      </div>
      <div
        key="buttom_right"
        role="button"
        className={`w-[150px] h-[50px] flex items-center justify-center font-bold cursor-pointer transition-all duration-400 ease-in-out transform ${
          intakeSide === 'right' ? 'bg-red-500 text-white scale-110 shadow-box z-10' : 'bg-white text-black'}`
        }
        onClick={() => handleToggle('right')}
      >
        <span className="text-2xl">RIGHT</span>
      </div>
    </div>
  </div>

  
  );
};
export default IntakeToggle;
