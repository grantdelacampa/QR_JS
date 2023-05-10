/* eslint-disabled */
import './App.css';
import { useState } from 'react';
import { decideMode } from './Functions/DataAnalysis';
import { getSmallestQRVersion } from './Functions/DataEncoding';
import { processInput } from './Functions/InputBinaryProcessing';
import { padBits } from './Functions/HelperFunctions'
import { ModeIndicator, ModeBitLength, ErrorCorrectionCodeWordsBlock } from './Constants/Constants';

function App() {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");

  
  // For now set error correction at 7%
  // todo: set this dynamically
  const errorCorrection = "L"

  function generate(){
    // Step 1 Decide the mode based on input
    const mode = decideMode(text);

    // Step 2 get inputSize
    const inputSize = text.length;

    // Step 3 Get the smallest size [version, size]
    const capacityArray = getSmallestQRVersion(inputSize, mode, errorCorrection);

    // Step 4 Get the modeIndicator binary
    const modeIndicator = ModeIndicator[mode];

    // Step 5 Get the bitLength
    const bitLength = ModeBitLength[mode] + (Math.floor(capacityArray[0] / 10) * 2);

    // Step 6 Get length in binary
    const binaryInputLength = inputSize.toString(2);

    // Step 7 pad binaryInputLength to match the bitLength value 
    // ex bitLength 9 and binaryInputLength is 1011 pad 00000
    const paddedInputLength = padBits(bitLength - binaryInputLength.length, binaryInputLength)
    
    // Step 8 get the input as binary
    const encodedData = processInput(mode, text);

    // Step 9 get the Error correction info
    const errCorrectionInfo = ErrorCorrectionCodeWordsBlock[capacityArray[0] + "-" + errorCorrection];

    // Step 10 get the Required number of bits for the QR code
    const totalBits = errCorrectionInfo[0] * 8;

    // Step 11 get the current binary 
    const currentBinary = modeIndicator + binaryInputLength + encodedData;

    // todo use the currentBinary to calculate padding
    setOutput(currentBinary);
  }


  const handleClick = (e) => {
    e.preventDefault();
    generate(text);
  } 
  return (
    <div className="App">
      <header className="App-header">
        <p>{output}</p>
        <input type="text" value={text} onInput={e => setText(e.target.value)}/>
        <button type='button' onClick={handleClick}>Generate</button>
      </header>
    </div>
  );
}

export default App;
