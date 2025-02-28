import { FC, useState } from 'react';
import { useMeasure } from 'react-use';
import { NetworkTablesTypeInfos } from 'ntcore-ts-client'
import useNTState from '../../../lib/ntcore-react/useNTState';

const Hexagon: FC = ( ) => {
  const [ref, { width, height }] = useMeasure<HTMLDivElement>();
  const numberOfCoral = 12;
  const numberOfAlgae = 6;
  const radiusCoral = 250; // Adjust the radius to fit the new size
  const radiusAlgae = 150; // Adjust the radius to fit the new size
  const circleSizeCoral = 100; // Adjust the circle size to fit the new size
  //const circleSizeAlgae = 140; // Adjust the circle size to fit the new size

  const [allianceColor] = useNTState<string>(
    'SmartDashboard/Dashboard/AllianceColor',
    NetworkTablesTypeInfos.kString,
    'UNKNOWN'
  )
  // Map allianceColor to the corresponding CSS color
  const hexagonBgColor = allianceColor === 'RED' ? 'red' : allianceColor === 'BLUE' ? 'blue' : 'gray';


  // State to manage the selected button index
  const [selectedCoral, setSelectedCoral] = useNTState<string>(
    'SmartDashboard/Presets/UI/SelectedCoralBranch',
    NetworkTablesTypeInfos.kString,
    ''
  );

    // State to manage the selected button index
    // const [selectedCoralID, setSelectedCoralID] = useNTState<number>(
    //   'SmartDashboard/Presets/UI/SelectedCoralBranchID',
    //   NetworkTablesTypeInfos.kInteger,
    //   0
    // );

  // State to manage the selected button index
  const [selectedAlgae, setSelectedAlgae] = useNTState<string>(
    'SmartDashboard/Presets/UI/SelectedAlgaeFace',
    NetworkTablesTypeInfos.kString,
    ''
  );

  const [clickedCoral, setClickedCoral] = useState<string | null>(null);
  const [clickedAlgae, setClickedAlgae] = useState<string | null>(null);

  // Function to handle button toggle
  const handleToggleCoral = (index: number) => {
    const letter = String.fromCharCode(65 + index); // Convert index to corresponding letter
    if(selectedCoral === letter) {
      setSelectedCoral('');
    } else { 
      setSelectedCoral(letter);
      // setSelectedCoralID(index);
    };
    setClickedCoral(letter);
    setTimeout(() => setClickedCoral(null), 500); // Reset the clicked state after 500ms
  }

    // Function to handle button toggle
    const handleToggleAlgae = (index: number) => {
      // console.log('ALGAE - index', index)
      const algaeBranch = String.fromCharCode(65 + index)+String.fromCharCode(65 + index+1); // Convert index to corresponding letter
      // console.log('ALGAE - algaeBranch', algaeBranch)
      if(selectedAlgae === algaeBranch) {
        setSelectedAlgae('');
      } else { 
        setSelectedAlgae(algaeBranch);
      };
      setClickedAlgae(algaeBranch);
      setTimeout(() => setClickedAlgae(null), 500); // Reset the clicked state after 500ms
    }

  return (
    <div className="relative">
      {/* Hexagon */}
      <div
        className="hexagon p-6"
        ref={ref}
        style={{ backgroundColor: hexagonBgColor }}
      />

      {/* Center Lines */}
      <div className="w-full h-full flex items-center justify-center">
        <div className="absolute w-[8px] h-full transform bg-gray-800 origin-center" style={{transform: 'translateY(-50%) rotate(30deg)' }} />
        <div className="absolute w-[8px] h-full transform bg-gray-800 origin-center" style={{transform: 'translateY(-50%) rotate(90deg)' }} />
        <div className="absolute w-[8px] h-full transform bg-gray-800 origin-center" style={{transform: 'translateY(-50%) rotate(150deg)' }} />
      </div>

      {/* CORAL Buttons */}
      {Array.from({ length: numberOfCoral }, (_, i) => {
        const angle = -((-7 * Math.PI / numberOfCoral) + (2 * Math.PI * i) / numberOfCoral);
        const x = (radiusCoral * Math.cos(angle) + width / 2) - (circleSizeCoral / 4);
        const y = (radiusCoral * Math.sin(angle) + height / 2) - (circleSizeCoral / 4);
        const letter = String.fromCharCode(65 + i); // 65 is the ASCII code for 'A'

        return (
          <div
            key={`button-for-${i}`}
            role="button"
            className={`absolute w-[100px] h-[100px] rounded-full flex items-center justify-center text-white font-bold transition-all duration-400 ease-in-out transform cursor-pointer ${
              selectedCoral === letter ? 'bg-red-500' : 'border-10 border-red-300'
            } ${clickedCoral === letter ? 'scale-110' : ''}`}
            style={{
              left: `${x}px`,
              top: `${y}px`,
            }}
            onClick={() => handleToggleCoral(i)}
          >
            <span className="text-2xl">{letter}</span> {/* Change the font size here */}
          
          </div>
        );
      })}
    
      {/* ALGAE Buttons */}
      {Array.from({ length: numberOfAlgae }, (_, i) => {
              const angle = -((-3 * Math.PI / numberOfAlgae) + (2 * Math.PI * i) / numberOfAlgae);
              const x = (radiusAlgae * Math.cos(angle) + width / 2) -50;
              const y = (radiusAlgae * Math.sin(angle) + height / 2) -50;
              const algaeBranch = String.fromCharCode(65 + i*2)+ String.fromCharCode(65 + (i*2)+1) // 65 is the ASCII code for 'A'

        return (
          <div
            key={`aglae_button-for-${i}`}
            role="button"
            className={`absolute w-[140px] h-[140px] rounded-full flex items-center justify-center text-white font-bold transition-all duration-400 ease-in-out transform cursor-pointer ${
              selectedAlgae === algaeBranch ? 'algae-light-reflection-selected' : 'algae-light-reflection'
            } ${clickedAlgae === algaeBranch ? 'scale-110' : ''}`}
            style={{
              left: `${x}px`,
              top: `${y}px`,
              zIndex: 30
            }}
            onClick={() => handleToggleAlgae(i*2)}
          >
            <span className="text-2xl">{algaeBranch}</span> {/* Change the font size here */}
          
          </div>
        );
      })} 
    </div>
  );
};

export default Hexagon;