import {padBits, splitIntoGroups} from './HelperFunctions';

/**
 * processInput
 *  Entry function for inputBinary processing.
 * @param {String} mode 
 * @param {String} input 
 * @returns String
 */
export function processInput(mode, input){
    switch(mode){
      case "numeric":
        return processNumeric(input);
      case "alphanumeric":
        return processAlphaNumeric(input);
      case "byte":
        return processByte(input);
      case "kanji":
        return "TODO";
      default:
        return "ERROR";
    }
}


  /**
   * processNumeric
   *  process Numeric input and return a binary format for QR Generation
   * @param {String} inputValue 
   * @returns String
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
   * @returns String
   */
    function processAlphaNumeric(inputValue){
        const groups = splitIntoGroups(inputValue, 2);
        let binary = "";
        groups.forEach(element => {
          if(element.length === 2){
            const toPad = ((getNumericValue(element[0]) * 45) + getNumericValue(element[1])).toString(2);
            binary = binary + padBits(11 - toPad.length, toPad);
          } else {
            const toPad = getNumericValue(element[0]).toString(2);
            binary = binary + padBits(6 - toPad.length, toPad);
          }
        })
        return binary;
      }

      /**
       * Takes a Byte mode input and translates it to a utf-8 array and then translates the elements to 8 bit binary values
       * @param {String} inputValue 
       * @returns String
       */
      function processByte(inputValue){
        // Instantiate text encoder
        const textEncoder = new TextEncoder();
        const utf8 = new Uint8Array(inputValue.length);

        const encodedResults = textEncoder.encodeInto(inputValue, utf8);
        console.log(
          `Bytes read: ${encodedResults.read}` +
          ` | Bytes written: ${encodedResults.written}` +
          ` | Encoded result: ${utf8}`);

          let binary = "";
          utf8.forEach(element => {
            let thisBinary = element.toString(2);
            binary = binary +  padBits(8 - thisBinary.length,thisBinary);
          })
          return binary;
      }

      

  /**
   * getNumericValue
   *    Takes a char and returns its numeric representation (in terms of the QR Alphanumeric table)
   * @param {String} char 
   * @returns Int
   */
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
        " ": 36,
        "$": 37,
        "%": 38,
        "*": 39,
        "+": 40,
        "-": 41,
        ".": 42,
        "/": 43,
        ":": 44
      }
      return data[char];
    }
  }