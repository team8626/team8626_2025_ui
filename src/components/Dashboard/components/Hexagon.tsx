import { FC, useState } from 'react';
import { useMeasure } from 'react-use';
import { NetworkTablesTypeInfos } from 'ntcore-ts-client'
import useNTState from '../../../lib/ntcore-react/useNTState';


interface HexagonProps {
  allianceColor: string;
}

const Hexagon: FC<HexagonProps> = ({ allianceColor }) => {
  const [ref, { width, height }] = useMeasure<HTMLDivElement>();
  const numberOfButtons = 12;
  const radius = 350; // Adjust the radius to fit the new size
  const circleSize = 100; // Adjust the circle size to fit the new size

  // Map allianceColor to the corresponding CSS color
  const hexagonBgColor = allianceColor === 'RED' ? 'red' : allianceColor === 'BLUE' ? 'blue' : 'gray';

  // State to manage the selected button index
  const [selectedButton, setSelectedButton] = useNTState<string>(
     'SmartDashboard/Presets/UI/SelectedReefBranch',
    NetworkTablesTypeInfos.kString,
    ''
  );

  const [clicked, setClicked] = useState<string | null>(null);

  // Function to handle button toggle
  const handleToggle = (index: number) => {
    const letter = String.fromCharCode(65 + index); // Convert index to corresponding letter
    if(selectedButton === letter) {
      setSelectedButton('');
    } else { 
      setSelectedButton(letter);
    };
    setClicked(letter);
    setTimeout(() => setClicked(null), 500); // Reset the clicked state after 500ms

  }

  return (
    <div className="relative">
      <div
        className="hexagon p-6"
        ref={ref}
        style={{ backgroundColor: hexagonBgColor }}
      />
      {Array.from({ length: numberOfButtons }, (_, i) => {
        const angle = -((-7 * Math.PI / 12) + (2 * Math.PI * i) / numberOfButtons);
        const x = (radius * Math.cos(angle) + width / 2) - (circleSize / 4);
        const y = (radius * Math.sin(angle) + height / 2) - (circleSize / 4);
        const letter = String.fromCharCode(65 + i); // 65 is the ASCII code for 'A'

        return (
          <div
            key={`button-for-${i}`}
            role="button"
            className={`absolute w-[${circleSize}px] h-[${circleSize}px] rounded-full flex items-center justify-center text-white font-bold transition-all duration-400 ease-in-out transform cursor-pointer ${
              selectedButton === letter ? 'bg-red-500' : 'border-10 border-white'
            } ${clicked === letter ? 'scale-110' : ''}`}
            style={{
              left: `${x}px`,
              top: `${y}px`,
            }}
            onClick={() => handleToggle(i)}
          >
            <span className="text-3xl">{letter}</span> {/* Change the font size here */}
          
          </div>
        );
      })}
    </div>
  );
};

export default Hexagon;