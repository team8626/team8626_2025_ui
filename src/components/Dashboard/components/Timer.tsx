import type { FC } from 'react'
import Typography from '@mui/material/Typography'

interface TimerProps {
  matchTime: number;
  isTeleop?: boolean;
  isAuto?: boolean;
 }

const formatTime = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const Timer: FC<TimerProps> = ({matchTime, isTeleop, isAuto}) => {
    // Determine the background color based on the props
    let backgroundColor = 'lightgrey';
    let textColor = 'black';
    
    if (isTeleop && matchTime < 20) {
      backgroundColor = 'red';
      textColor = 'white';
    } else if (isTeleop) {
      backgroundColor = 'green';
      textColor = 'white';
    } else if (isAuto) {
      backgroundColor = 'blue';
      textColor = 'white';
    }
  
    return (
      <div className="flex flex-col items-center justify-center gap-y-2 p-4" style={{ backgroundColor, color: textColor }}>
        <Typography variant="h2" className="text-center">Match Time</Typography>
        <Typography variant="h3" className="text-center">{formatTime(matchTime)}</Typography>
      </div>
    );
}
export default Timer
