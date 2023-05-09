/* eslint-disabled */
import './App.css';
import { useState } from 'react';
import { decideMode } from './Functions/DataAnalysis';
import { getSmallestQRVersion,getModeIndicator, getBitLength } from './Functions/DataEncoding';

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
    const modeIndicator = getModeIndicator(mode);

    // Step 5 Get the bitLength
    const bitLength = getBitLength(mode, capacityArray[0])

    // Step 6 Get length in binary
    const binaryInputLength = inputSize.toString(2);

    // TODO:
    // pad binaryInputLength to match the bitLength value 
    // ex bitLength 9 and binaryInputLength is 1011 pad 00000
    const paddedInputLength = padBits(bitLength - binaryInputLength.length, binaryInputLength)
    
    const processedInput = processInput(mode, text);
    setOutput(processedInput);
  }

  /* ==========================================================================================
      Data Input Processing
  =========================================================================================== */

  function processInput(mode, input){
      switch(mode){
        case "numeric":
          return processNumeric(input);
        case "alphanumeric":
          return processAlphaNumeric(input);
        case "byte":
          return "TODO";
        case "kanji":
          return "TODO";
      }
  }

  /**
   * processNumeric
   *  process Numeric input and return a binary format for QR Generation
   * @param {String} inputValue 
   * @returns 
   */
  function processNumeric(inputValue){
    const groups = splitIntoGroups(inputValue, 3);
    let binary = "";
    groups.forEach(element => {
      let groupBinary = Number(element).toString(2);
      binary = binary + groupBinary;
    });
    return binary;
  }

  /**
   * processAlphaNumeric
   *  process AlphaNumeric input and return a binary format for QR Generation
   * @param {String} inputValue 
   * @returns 
   */
  function processAlphaNumeric(inputValue){
    const groups = splitIntoGroups(inputValue, 2);
    let binary = "";
    groups.forEach(element => {
      if(element.length === 2){
        binary = binary + ((getNumericValue(element[0]) * 45) + getNumericValue(element[1])).toString(2);
      } else {
        const toPad = getNumericValue(element[0]).toString(2);
        binary = binary + padBits(6 - toPad.length, toPad);
      }
    })
    return binary;
  }

  // TODO: Fix this code in the other chars section.
  function getNumericValue(char) {
    // Check if the input is a letter
    if (/[a-zA-Z]/.test(char)) {
      // Convert the letter to uppercase and subtract 64 to get its position in the alphabet
      return (char.toUpperCase().charCodeAt(0) - 64) + 9;
    } else if (/\d/.test(char)) {
      // If the input is a digit, convert it to a number and return it
      return parseInt(char, 10);
      // TODO: Fix for other chars!
    } else if (/\s/.test(char)) {
      // If the input is not alphanumeric, return NaN
      const data = {
        " ": "36",
        "$": "37",
        "%": "38",
        "*": "39",
        "+": "40",
        "-": "41",
        ".": "42",
        "/": "43",
        ":": "44"
      }
      console.log(data[char]);
      return data[char];
    }
  }
  

  /**
   * splitIntoGroups
   *  Helper function to split a string (STR) into groups of (size)
   */
  function splitIntoGroups(str, size) {
    const regex = new RegExp(`.{1,${size}}`, "g");
    return str.match(regex);
  }

  /**
   *  padBits
   *  Helper function to pad bits on a binary represented by a string.
   * @param {Integer} padding 
   * @param {String} target 
   * @returns 
   */
  function padBits(padding, target){
    return "0".repeat(padding) + target;
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
