import { GeneratorPolynomial } from "../../Objects/GeneratorPolynomial";
import { intToAlpha } from "../../Constants/Constants";
import { splitIntoGroups } from "../../Helpers/HelperFunctions";
import { alphaToInt } from "../../Constants/Constants";

/**
 * Generate a block of errCodecnt number of error codes using the seed array blockInput.
 * @param {[]} blockInput 
 * @param {Integer} errCodeCnt 
 * @returns []
 */
export function GenerateErrorCode(blockInput, errCodeCnt) {
  // this is the standard first polynomial used to generate the generator Polynomial
  const genisisPolynomial = new GeneratorPolynomial([0, 0], [1, 0]);
  // Generate the Generator Polynomial
  let generatorPolynomial = calculateGeneratorPolynomial(genisisPolynomial, errCodeCnt);
  // Generate the MessengerPolynomial
  const messagePolynomial = parseArrayToPolynomial(blockInput, errCodeCnt);
  console.log("Message Polynomial: " + messagePolynomial.toDecString());
  // Get the difference of the leads and multiply it in to pad the generator polynomial
  generatorPolynomial = generatorPolynomial.multiply(new GeneratorPolynomial([0], [messagePolynomial.getStdCoef()[0] - generatorPolynomial.getStdCoef()[0]]));
  console.log("Generator Polynomial: " + generatorPolynomial.toDecString());

  // TOOD: Look into this failing
  const codeWordPolynomial = performLongDivision(generatorPolynomial, messagePolynomial, errCodeCnt);
  const codeWords = [];
  codeWordPolynomial.getAlphaCoef().forEach((element) => { codeWords.push(alphaToInt[element]) });
  return codeWords;
}


/**
 * Generate a Generator Polynomial of length errCodecnt. Seeded by genisisPolynomials.
 * @param {GeneratorPolynomial} genisisPolynomial 
 * @param {Integer} errCodeCnt 
 * @returns 
 */
function calculateGeneratorPolynomial(genisisPolynomial, errCodeCnt) {
  let generatorPolynomial;
  // Multiply the generatorPolynomial by x^i+a^1
  for (let i = 1; i < errCodeCnt; i++) {
    (i === 1) ? (generatorPolynomial = genisisPolynomial.multiply(new GeneratorPolynomial([0, i], [1, 0]))) :
      (generatorPolynomial = generatorPolynomial.multiply(new GeneratorPolynomial([0, i], [1, 0])));
  }
  return generatorPolynomial;
}

/**
 * Maps an array into a Polynomial 
 * [y1, y2, y3] => y1x^3 + y2x^2 + y3x^1
 * @param {[]} binaryBlock 
 * @returns GeneratorPolynomial
 */
function parseArrayToPolynomial(binaryBlock, crctnCodeCnt) {
  // 1st Convert binary numbers into decimal
  const converted = binaryBlock.map((bNum) => { return parseInt(bNum, 2) });
  // 2nd the message polynomal will be converted[0]x^converted.length-1
  // 2nd multiply the message polynomial by x^n where n is crctnCodeCnt
  // Convert the lead terms to alpha notation 
  const alphaArray = [];
  const stdArray = [];
  // Create an alphaArray of the binaryBlock values (as int), create a std array of X^n...X^n-(binaryBlock.length)
  converted.forEach((digit, index) => { alphaArray.push(intToAlpha[digit]); stdArray.push((converted.length - index) + crctnCodeCnt - 1) })
  return new GeneratorPolynomial(alphaArray, stdArray);
}

/**
 * Perform Polynomial long division with Galos Field taken into account
 * @param {GeneratorPolynomial} generatorPolynomial 
 * @param {GeneratorPolynomial} messagePolynomial 
 * @param {Integer} codeWordCount 
 * @returns GeneratorPolynomial
 */
function performLongDivision(generatorPolynomial, messagePolynomial, codeWordCount) {
  let xorResult = new GeneratorPolynomial([], []);
  let multiplyResult = new GeneratorPolynomial([], []);
  // Perform the Polynomial long division
  for (let i = 0; i < codeWordCount; i++) {
    if (i === 0) {
      multiplyResult = generatorPolynomial.multiply(new GeneratorPolynomial([messagePolynomial.getAlphaCoef()[0]], [0]));
      xorResult = messagePolynomial.xorPolynomial(multiplyResult);
    } else {
      generatorPolynomial.decrimentStdArry();
      // step na
      multiplyResult = generatorPolynomial.multiply(new GeneratorPolynomial([xorResult.getAlphaCoef()[0]], [0]));
      // Step nb
      xorResult = xorResult.xorPolynomial(multiplyResult);
    }
  }
  return xorResult;
}

/*================================================================================
  Depricated Code
================================================================================*/

/**
* Generate ErrorCorrectionCodes
* @param {*} finalPaddedInput 
* @param {*} errCorrectionInfo 
* @returns 
* @depricated
*/
export function ErrorCorrectionCoding(finalPaddedInput, errCorrectionInfo) {
  // this is the standard first polynomial used to generate the generator Polynomial
  const genisisPolynomial = new GeneratorPolynomial([0, 0], [1, 0]);
  // Generate the Generator Polynomial
  let generatorPolynomial = calculateGeneratorPolynomial(genisisPolynomial, errCorrectionInfo);
  // Generate a message polynomial
  const messagePolynomial = parseBinaryStreamToPolynomial(finalPaddedInput, errCorrectionInfo[1]);
  // Get the difference of the leads and multiply it in to pad the generator polynomial
  generatorPolynomial = generatorPolynomial.multiply(new GeneratorPolynomial([0], [messagePolynomial.getStdCoef()[0] - generatorPolynomial.getStdCoef()[0]]));
  const codeWordPolynomial = performLongDivision(generatorPolynomial, messagePolynomial, errCorrectionInfo[0]);
  const codeWords = [];
  codeWordPolynomial.getAlphaCoef().forEach((element) => { codeWords.push(alphaToInt[element]) });
  return codeWords;
}

/**
 * Parse a binary string with length of 8^n into a GeneratorPolynomial
 * @param {String} binaryBlock 
 * @returns GeneratorPolynomial
 * @deprecated
 */
function parseBinaryStreamToPolynomial(bStream, crctnCodeCnt) {
  // 1st Convert binary numbers into decimal
  const converted = splitIntoGroups(bStream, 8).map((bNum) => { return parseInt(bNum, 2) });
  // 2nd the message polynomal will be converted[0]x^converted.length-1
  // 2nd multiply the message polynomial by x^n where n is crctnCodeCnt
  // Convert the lead terms to alpha notation 
  const alphaArray = [];
  const stdArray = [];
  converted.forEach((digit, index) => { alphaArray.push(intToAlpha[digit]); stdArray.push((converted.length - index) + crctnCodeCnt - 1) })
  return new GeneratorPolynomial(alphaArray, stdArray);
}