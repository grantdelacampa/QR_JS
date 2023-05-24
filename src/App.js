/* eslint-disabled */
import './App.css';
import { useState } from 'react';
import { decideMode } from './Functions/DataAnalysis/DataAnalysis';
import { getSmallestQRVersion, fitTotalBits } from './Functions/DataEncoding/DataEncoding';
import { processInput } from './Functions/InputBinaryProcessing/InputBinaryProcessing';
import { padBits } from './Helpers/HelperFunctions'
import { ModeIndicator, ModeBitLength, ErrorCorrectionCodeWordsBlock } from './Constants/Constants';
import { ErrorCorrectionCoding } from './Functions/ErrorCorrectionCoding/ErrorCorrectionCoding';
import { groupCodewords } from './Functions/GroupProcessing/GroupProcessing';

function App() {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");

  
  // todo: set this dynamically
  const errorCorrection = "M"

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

    // Step 9 get the Error correction info [total#words, EC/block, #BlocksG1, #wordsG1Block, #blocksG2, #wordsG2Block]
    const errCorrectionInfo = ErrorCorrectionCodeWordsBlock[capacityArray[0] + "-" + errorCorrection];
    console.log(capacityArray[0] + "-" + errorCorrection);

    // Step 10 get the Required number of bits for the QR code
    const totalBits = errCorrectionInfo[0] * 8;

    // Step 11 get the current binary 
    const currentBinary = modeIndicator + paddedInputLength + encodedData;

    // Step 12 pad the binary to reach the length of total bits
    const finalPaddedInput = fitTotalBits(totalBits, currentBinary);

    //======================================== In Progress ===========================================

    // Step 13 get the codewords
    const codewords = ErrorCorrectionCoding(finalPaddedInput, errCorrectionInfo);

    const dataCodeWordGroups = groupCodewords(finalPaddedInput, errCorrectionInfo);
    setOutput(codewords);
  }


  const handleClick = (e) => {
    e.preventDefault();
    generate(text);
  } 
  return (
    <div className="App">
      <header className="App-header">
        <p style={{ wordBreak: 'break-all' }}>{output}</p>
        <input type="text" value={text} onInput={e => setText(e.target.value)}/>
        <button type='button' onClick={handleClick}>Generate</button>
      </header>
    </div>
  );
}

export default App;
