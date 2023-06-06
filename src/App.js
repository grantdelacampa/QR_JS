/* eslint-disable */
import './App.css';
import React, { useRef, useState } from 'react';
import { decideMode } from './Functions/DataAnalysis/DataAnalysis';
import {
  getSmallestQRVersion,
  fitTotalBits
} from './Functions/DataEncoding/DataEncoding';
import { processInput } from './Functions/InputBinaryProcessing/InputBinaryProcessing';
import { padBits, getCorner, getQRSize } from './Helpers/HelperFunctions';
import {
  ModeIndicator,
  ModeBitLength,
  ErrorCorrectionCodeWordsBlock,
  remainderBitsByVersion
} from './Constants/Constants';
import { groupCodewords } from './Functions/GroupProcessing/GroupProcessing';
import { StructureFinalMessage } from './Functions/StructureFinalMessage/StructureFinalMessage';
import { BitMatrix } from './Objects/BitMatrix';
import { FinderPatter } from './Functions/MatrixPopulation/FinderPattern';
import { SeperatorPattern } from './Functions/MatrixPopulation/SeperatorPattern';
import { AlignmentPattern } from './Functions/MatrixPopulation/AlignmentPattern';
function App() {
  const [text, setText] = useState('');
  const [output, setOutput] = useState('');
  const canvas = useRef();

  // todo: set this dynamically
  const errorCorrection = 'M';
  const size = 200;

  function generate() {
    // Step 1 Decide the mode based on input
    const mode = decideMode(text);

    // Step 2 get inputSize
    const inputSize = text.length;

    // Step 3 Get the smallest size [version, size]
    const capacityArray = getSmallestQRVersion(
      inputSize,
      mode,
      errorCorrection
    );

    // Step 4 Get the modeIndicator binary
    const modeIndicator = ModeIndicator[mode];

    // Step 5 Get the bitLength
    const bitLength =
      ModeBitLength[mode] + Math.floor(capacityArray[0] / 10) * 2;

    // Step 6 Get length in binary
    const binaryInputLength = inputSize.toString(2);

    // Step 7 pad binaryInputLength to match the bitLength value
    // ex bitLength 9 and binaryInputLength is 1011 pad 00000
    const paddedInputLength = padBits(
      bitLength - binaryInputLength.length,
      binaryInputLength
    );

    // Step 8 get the input as binary
    const encodedData = processInput(mode, text);

    // Step 9 get the Error correction info [total#words, EC/block, #BlocksG1, #wordsG1Block, #blocksG2, #wordsG2Block]
    const errCorrectionInfo =
      ErrorCorrectionCodeWordsBlock[capacityArray[0] + '-' + errorCorrection];

    // Step 10 get the Required number of bits for the QR code
    const totalBits = errCorrectionInfo[0] * 8;

    // Step 11 get the current binary
    const currentBinary = modeIndicator + paddedInputLength + encodedData;

    // Step 12 pad the binary to reach the length of total bits
    const codededInput = fitTotalBits(totalBits, currentBinary);

    // Step 13 format the dataCodeWords into groups
    const dataCodeWordGroups = groupCodewords(codededInput, errCorrectionInfo);

    // Step 14 Generate the final message
    const finalMessage = StructureFinalMessage(
      dataCodeWordGroups,
      errCorrectionInfo,
      remainderBitsByVersion[capacityArray[0]]
    );

    const qrSize = getQRSize(capacityArray[0]);
    // Step 15 create the bitArrayToHold the matrix
    const bitMatrix = new BitMatrix(qrSize);
    // <====================== DRAW Finder Pattern Array!
    FinderPatter(bitMatrix, qrSize);
    SeperatorPattern(bitMatrix);
    AlignmentPattern(bitMatrix, capacityArray[0]);

    setOutput(finalMessage);
  }

  const handleClick = (e) => {
    e.preventDefault();
    generate(text);
  };
  return (
    <div className="App">
      <header className="App-header">
        <canvas height={size} width={size} ref={canvas}></canvas>
        <p style={{ wordBreak: 'break-all' }}>{output}</p>
        <input
          type="text"
          value={text}
          onInput={(e) => setText(e.target.value)}
        />
        <button type="button" onClick={handleClick}>
          Generate
        </button>
        <button
          type="button"
          onClick={() => {
            setText('HELLO WORLD');
          }}
        >
          HELLO WORLD
        </button>
        <button
          type="button"
          onClick={() => {
            setText('HELLO WORLDHELLO WORLDHELLO WORLD');
          }}
        >
          Version 2
        </button>
        <button
          type="button"
          onClick={() => {
            setText(
              'HELLO SSSS WORLDHELLO WORLD HELLO HELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDWORLDHELLO WORLDLLO HELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDWORLDHELLO WORLD'
            );
          }}
        >
          Version 8
        </button>
        <button
          type="button"
          onClick={() => {
            setText(
              'HELLO WORLDHELLO WORLDHELLO WORLDWORLDHELLO WORLDHELLO WORLD HELLO HELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDWORLDHELLO WORLDLLO HELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDWORLDHELLO WORLD'
            );
          }}
        >
          GENERATES ERROR!
        </button>
        <button
          type="button"
          onClick={() => {
            window.location.reload();
          }}
        >
          Clear
        </button>
      </header>
    </div>
  );
}

export default App;
