import { useNTConnected } from 'ntcore-react'
import type { FC } from 'react'
import NotConnected from '../NotConnected'
import Dashboard from '../Dashboard'

const App: FC = () => {
  const connected = useNTConnected()

  return (
    <main className="h-[100vh] grid grid-cols-4 gap-6 mx-auto px-6 py-2 md:grid-cols-12 w-full">
      {connected ? <Dashboard /> : <NotConnected />}
      <div className="absolute bottom-0 left-0 flex flex-row gap-x-2 p-4 items-center">
        <span className="font-medium">NT Connection Status: {connected}</span>
        <div
          className={`h-6 w-6 rounded-full ml-2 ${connected ? 'bg-indigo-500 shadow-[0_0_1px_#fff,inset_0_0_1px_#fff,0_0_5px_#08f,0_0_5px_#08f,0_0_20px_#08f]' : 'bg-red-500 shadow-[0_0_1px_#f10,inset_0_0_1px_#f10,0_0_5px_#f10,0_0_5px_#f10,0_0_20px_#f10]'}`}
        />
      </div>
    </main>
  )
}
export default App
