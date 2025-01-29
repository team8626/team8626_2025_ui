import type { FC } from 'react'

const NotConnected: FC = () => {
  return (
    <div className="flex h-full text-center items-center justify-center">
      <h1 className="font-black text-8xl text-red-500 tracking-wide">No Connection...</h1>
    </div>
  )
}
export default NotConnected
