import { FC } from 'react';
import { useMeasure } from 'react-use';
import { NetworkTablesTypeInfos } from 'ntcore-ts-client'
import useNTState from '../../../lib/ntcore-react/useNTState';


interface HexagonProps {
  allianceColor: string;
}

const Hexagon: FC<HexagonProps> = ({ allianceColor }) => {
  const [ref, { width, height }] = useMeasure<HTMLDivElement>();
  const numberOfButtons = 12;
  const radius = 200; // Adjust the radius to fit the new size

  // Map allianceColor to the corresponding CSS color
  const hexagonBgColor = allianceColor === 'RED' ? 'red' : allianceColor === 'BLUE' ? 'blue' : 'gray';

  // State to manage the selected button index
  const [selectedButton, setSelectedButton] = useNTState<string>(
     'SmartDashboard/Presets/UI/SelectedReefBranch',
    NetworkTablesTypeInfos.kString,
    ''
  );

  // Function to handle button toggle
  const handleToggle = (index: number) => {
    if(selectedButton === String.fromCharCode(index)) {
      setSelectedButton('');
    } else { 
      setSelectedButton(String.fromCharCode(index));
    };
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
        const x = radius * Math.cos(angle) + width / 2;
        const y = radius * Math.sin(angle) + height / 2;
        const letter = String.fromCharCode(65 + i); // 65 is the ASCII code for 'A'

        return (
          <div
            key={`button-for-${i}`}
            role="button"
            className={`absolute w-[50px] h-[50px] rounded-full flex items-center justify-center text-white font-bold cursor-pointer ${
              selectedButton === letter ? 'bg-red-500' : 'bg-blue-500'
            }`}
            style={{
              left: `${x}px`,
              top: `${y}px`,
            }}
            onClick={() => handleToggle(65+i)}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
};

export default Hexagon;