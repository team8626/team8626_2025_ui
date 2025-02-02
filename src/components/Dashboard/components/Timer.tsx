import type { FC } from 'react'
import Typography from '@mui/material/Typography'

interface TimerProps {
  matchTime: number;
 }

const formatTime = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const Timer: FC<TimerProps> = ({matchTime}) => {
  return (
    <div className="flex flex-col gap-y-2 justify-start">
      <Typography variant="h3">Match Time</Typography>
      <Typography variant="body1">Match Time: {formatTime(matchTime)}</Typography>
    </div>
  )
}
export default Timer
