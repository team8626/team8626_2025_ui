import type { FC } from 'react'
import { useMeasure } from 'react-use'

interface HexagonProps {
 allianceColor: string;
}

const Hexagon: FC<HexagonProps> = ({ allianceColor }) => {
  const [ref, { width, height }] = useMeasure<HTMLDivElement>()
  const numberOfButtons = 12
  const radius = 165

  // Map allianceColor to the corresponding CSS color
  const hexagonBgColor = allianceColor === 'RED' ? 'red' : allianceColor === 'BLUE' ? 'blue' : 'gray';

  return (
    <div className="relative">
      <div className="hexagon p-6" ref={ref} style={{ 'background-color': hexagonBgColor } as React.CSSProperties} />
      {Array.from({ length: numberOfButtons }, (_, i) => {
        const angle = -( (-7 * Math.PI / 12) + (2 * Math.PI * i) / numberOfButtons)
        const x = radius * Math.cos(angle) + width / 2
        const y = radius * Math.sin(angle) + height / 2
        const letter = String.fromCharCode(65 + i); // 97 is the ASCII code for 'A'

        return (
          <div
            key={`button-for-${i}`}
            role="button"
            className="absolute w-[50px] h-[50px] bg-blue-500 rounded-full flex items-center justify-center text-white font-bold hover:bg-purple-500 cursor-pointer"
            style={{
              left: `${x}px`,
              top: `${y}px`,
            }}
            onClick={() => console.log(`Button ${letter} clicked`)}
          >
            {letter}
          </div>
        )
      })}
    </div>
  )
}
export default Hexagon
