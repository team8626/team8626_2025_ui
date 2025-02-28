import { useState, useEffect, type FC } from 'react'
import Typography from '@mui/material/Typography'
import { useNTState } from '../../../lib/ntcore-react'
import { NetworkTablesTypeInfos } from 'ntcore-ts-client'

export type DTPState = 'Enabled' | 'Disabled'

const dtpToggle: FC = () => {
  const [dtpEnabled, setDtpEnabled] = useNTState<string>(
    'SmartDashboard/Presets/UI/SelectedDTPEnabled',
    NetworkTablesTypeInfos.kString,
    ''
  )

  const [clicked, setClicked] = useState<string | null>(null);

  // Function to handle button toggle
  const handleToggle = (newState: string) => {
    setDtpEnabled(newState);
    setClicked(newState);
    setTimeout(() => setClicked(null), 500); // Reset the clicked state after 500ms
  }

  // Init Values
  useEffect(() => {
    // handleToggle(dtpEnabled);
  }, [])

  return (
    <div className="flex flex-col items-center gap-y-2 p-4 justify-start">
    <Typography variant="h4" className="mb-4">DTP</Typography>
    <div className="flex flex gap-x-2">
    <div
        key="button_off"
        role="button"
        className={`w-[150px] h-[50px] flex items-center justify-center font-bold cursor-pointer transition-all duration-400 ease-in-out transform ${
          dtpEnabled === 'OFF' ? 'bg-red-500 text-white scale-110 shadow-box z-10' : 'bg-white text-black'}
          ${clicked === 'OFF' ? 'scale-120' : ''}`
        }
        onClick={() => handleToggle('OFF')}
      >
        <span className="text-2xl">OFF</span>
      </div>
      <div
        key="buttom_on"
        role="button"
        className={`w-[150px] h-[50px] flex items-center justify-center font-bold cursor-pointer transition-all duration-400 ease-in-out transform ${
          dtpEnabled === 'ON' ? 'bg-red-500 text-white scale-110 shadow-box z-10' : 'bg-white text-black'}
          ${clicked === 'ON' ? 'scale-120' : ''}`
        }
        onClick={() => handleToggle('ON')}
      >
        <span className="text-2xl">ON</span>
      </div>
    </div>
  </div>
  );
};
export default dtpToggle;
