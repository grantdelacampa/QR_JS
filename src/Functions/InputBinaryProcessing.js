import { alpanumericTable } from '../Constants/Constants';
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
            const toPad = ((alpanumericTable.indexOf(element[0]) * 45) + alpanumericTable.indexOf(element[1])).toString(2);
            binary = binary + padBits(11 - toPad.length, toPad);
          } else {
            const toPad = alpanumericTable.indexOf(element[0]).toString(2);
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
          let binary = "";
          utf8.forEach(element => {
            let thisBinary = element.toString(2);
            binary = binary +  padBits(8 - thisBinary.length,thisBinary);
          })
          return binary;
      }
