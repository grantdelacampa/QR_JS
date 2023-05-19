/* eslint-disabled */
import './App.css';
import { useState } from 'react';
import { decideMode } from './Functions/DataAnalysis';
import { getSmallestQRVersion, fitTotalBits } from './Functions/DataEncoding';
import { processInput } from './Functions/InputBinaryProcessing';
import { padBits, splitIntoGroups } from './Functions/HelperFunctions'
import { ModeIndicator, ModeBitLength, ErrorCorrectionCodeWordsBlock } from './Constants/Constants';
import {GeneratorPolynomial} from './Classes/GeneratorPolynomial';
import { intToAlpha } from './Constants/Constants';

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

    // Step 9 get the Error correction info
    const errCorrectionInfo = ErrorCorrectionCodeWordsBlock[capacityArray[0] + "-" + errorCorrection];

    console.log(errCorrectionInfo);
    // Step 10 get the Required number of bits for the QR code
    const totalBits = errCorrectionInfo[0] * 8;

    // Step 11 get the current binary 
    const currentBinary = modeIndicator + paddedInputLength + encodedData;

    // Step 12 pad the binary to reach the lenght of total bits
    const finalPaddedInput = fitTotalBits(totalBits, currentBinary);
    // todo use the currentBinary to calculate padding [alpha][beta]
    // todo: fix the alpha for larger generations
    const generatorPolynomial = new GeneratorPolynomial([0,0], [1,0]);

    // Multiply the generatorPolynomial by x^i+a^1
    for(let i = 1; i < errCorrectionInfo[1]; i++){
      generatorPolynomial.multiply(new GeneratorPolynomial([0,i], [1,0]));
    }

    // Generate a message polynomial
    const messagePolynomial = parseBinaryStreamToPolynomial(finalPaddedInput, errCorrectionInfo[1]);

    // Get the difference of the leads and multiply it in to pad the generator polynomial
    generatorPolynomial.multiply(new GeneratorPolynomial([0],[messagePolynomial.getStdCoef()[0] - generatorPolynomial.getStdCoef()[0]]));   

    // for(let i=0; i < errCorrectionInfo[0]; i++){
    //   generatorPolynomial.multiply(new GeneratorPolynomial([messagePolynomial.getAlphaCoef()[0]],[messagePolynomial.getStdCoef()[0]]));
    //   messagePolynomial.divied();
    // }
    //splitIntoGroups(finalPaddedInput,8).join(" ")
    setOutput(generatorPolynomial.toString());
  }

  function parseBinaryStreamToPolynomial(bStream, crctnCodeCnt){
    // 1st Convert binary numbers into decimal
    const converted = splitIntoGroups(bStream, 8).map((bNum)=>{return parseInt(bNum, 2)});
    // 2nd the message polynomal will be converted[0]x^converted.length-1
    // 2nd multiply the message polynomial by x^n where n is crctnCodeCnt
    // Convert the lead terms to alpha notation 
    const alphaArray  = [];
    const stdArray = [];
    converted.forEach((digit, index) => {alphaArray.push(intToAlpha[digit]); stdArray.push((converted.length-index) + crctnCodeCnt -1)})
    return new GeneratorPolynomial(alphaArray, stdArray);
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
