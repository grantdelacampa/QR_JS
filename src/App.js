/* eslint-disabled */
import './App.css';
import { useState } from 'react';
import { decideMode } from './Functions/DataAnalysis';
import { getSmallestQRVersion, fitTotalBits } from './Functions/DataEncoding';
import { processInput } from './Functions/InputBinaryProcessing';
import { padBits, splitIntoGroups } from './Functions/HelperFunctions'
import { ModeIndicator, ModeBitLength, ErrorCorrectionCodeWordsBlock, alphaToInt } from './Constants/Constants';
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

    // Step 10 get the Required number of bits for the QR code
    const totalBits = errCorrectionInfo[0] * 8;

    // Step 11 get the current binary 
    const currentBinary = modeIndicator + paddedInputLength + encodedData;

    // Step 12 pad the binary to reach the lenght of total bits
    const finalPaddedInput = fitTotalBits(totalBits, currentBinary);
    // todo use the currentBinary to calculate padding [alpha][beta]
    // todo: fix the alpha for larger generations
    const genisisPolynomial = new GeneratorPolynomial([0,0], [1,0]);

    let generatorPolynomial;
    // Multiply the generatorPolynomial by x^i+a^1
    for(let i = 1; i < errCorrectionInfo[1]; i++){ 
      (i === 1) ? (generatorPolynomial = genisisPolynomial.multiply(new GeneratorPolynomial([0,i], [1,0]))) : 
      (generatorPolynomial = generatorPolynomial.multiply(new GeneratorPolynomial([0,i], [1,0])));
    }

    // Generate a message polynomial
    //32x25 + 91x24 + 11x23 + 120x22 + 209x21 + 114x20 + 220x19 + 77x18 + 67x17 + 64x16 + 236x15 + 17x14 + 236x13 + 17x12 + 236x11 + 17x10
    const messagePolynomial = parseBinaryStreamToPolynomial(finalPaddedInput, errCorrectionInfo[1]);

    // Get the difference of the leads and multiply it in to pad the generator polynomial
    generatorPolynomial = generatorPolynomial.multiply(new GeneratorPolynomial([0],[messagePolynomial.getStdCoef()[0] - generatorPolynomial.getStdCoef()[0]]));   

    let xorResult = new GeneratorPolynomial([],[]);
    let multiplyResult = new GeneratorPolynomial([],[]);

    // Perform the Polynomial logn division
    for(let i = 0; i< 16; i ++){
      if(i === 0){
        // Step 1a α5x25 + α1x24 + α72x23 + α51x22 + α66x21 + α123x20 + α75x19 + α69x18 + α99x17 + α37x16 + α50x15
        multiplyResult = generatorPolynomial.multiply(new GeneratorPolynomial([messagePolynomial.getAlphaCoef()[0]],[0]));
        // Step 1b 89x24 + 110x23 + 114x22 + 176x21 + 183x20 + 211x19 + 98x18 + 197x17 + 10x16 + 233x15 + 17x14 + 236x13 + 17x12 + 236x11 + 17x10
        xorResult = messagePolynomial.xorPolynomial(multiplyResult);
      } else {
        generatorPolynomial.decrimentStdArry();
        // step na
        multiplyResult = generatorPolynomial.multiply(new GeneratorPolynomial([xorResult.getAlphaCoef()[0]],[0]));
        // Step nb
        xorResult = xorResult.xorPolynomial(multiplyResult);
      }
    }
    setOutput(xorResult.toDecString());
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
