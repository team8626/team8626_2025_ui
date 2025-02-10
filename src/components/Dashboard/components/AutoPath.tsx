import type { FC } from 'react'
import Typography from '@mui/material/Typography'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import useNTValue from '../../../lib/ntcore-react/useNTValue'
import { NetworkTablesTypeInfos } from 'ntcore-ts-client'
import { useState, useEffect } from 'react'
import useNTState from '../../../lib/ntcore-react/useNTState'

const AutoPath: FC = () => {
  const autoPaths = useNTValue<string[]>(
    '/SmartDashboard/Auto Path/options',
    NetworkTablesTypeInfos.kStringArray,
    ['__ERROR__']
  )
  const defaultPath = useNTValue<string>(
    '/SmartDashboard/Auto Path/default',
    NetworkTablesTypeInfos.kString,
    'None'
  )
  const [selectedPath, setSelectedPath] = useNTState<string>(
    '/SmartDashboard/Auto Path/selected',
    NetworkTablesTypeInfos.kString,
    defaultPath
  )

  const [currentPath, setCurrentPath] = useState<string>(selectedPath)

  useEffect(() => {
    setSelectedPath(defaultPath)
  }, [defaultPath, setSelectedPath])

  const handleChange = (event: SelectChangeEvent<string>) => {
    console.log(event.target.value)
    setCurrentPath(event.target.value as string)
    setSelectedPath(event.target.value as string)
  }

  return (
    <div className="flex flex-col gap-y-2 justify-start">
      <Typography variant="h4">AutoPath</Typography>
      <Select
        value={currentPath}
        variant="outlined"
        onChange={handleChange}
        className="w-full bg-white text-black"
      >
        {autoPaths.map((path, index) => (
          <MenuItem key={index} value={path}>
            {path}
          </MenuItem>
        ))}
      </Select>
    </div>
  )
}

export default AutoPath
