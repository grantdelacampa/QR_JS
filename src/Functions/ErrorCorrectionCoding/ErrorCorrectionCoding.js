/**
 * QR Code Error Correction Coding functions
 *
 * @link   ErrorCorrection
 * @file   This file contains the functions used for rror Correction Coding in QR code generation
 * @author Grant De La Campa.
 * @since  1.0.0
 */
import { alphaToInt } from '../../Constants/Constants';
import { padBits } from '../../Helpers/HelperFunctions';
import { Polynomial } from '../../Objects/Polynomial';
import {
  multiply,
  reducePolynomial,
  xorPolynomial
} from '../../Helpers/PolynomialOperations';
/**
 * Generate a block of errCodecnt number of error codes using the seed array blockInput.
 * @param {[]} blockInput
 * @param {Integer} errCodeCnt
 * @returns []
 */
export function GenerateErrorCode(blockInput, errCodeCnt) {
  // this is the standard first polynomial used to generate the generator Polynomial
  const genisisPolynomial = new Polynomial([1, 1], [1, 0]);
  // Generate the Generator Polynomial
  let generatorPolynomial = calculateGeneratorPolynomial(
    genisisPolynomial,
    errCodeCnt
  );
  // Generate the MessengerPolynomial
  const messagePolynomial = parseArrayToPolynomial(blockInput, errCodeCnt);
  // console.log('messagePolynomial: ', messagePolynomial.toString());
  // Get the difference of the leads and multiply it in to pad the generator polynomial
  generatorPolynomial = multiply(
    generatorPolynomial,
    new Polynomial(
      [1],
      [messagePolynomial.degreeAt(0) - generatorPolynomial.degreeAt(0)]
    )
  );
  // Perform the long division steps
  const codeWordPolynomial = performLongDivision(
    generatorPolynomial,
    messagePolynomial,
    errCodeCnt
  );
  const codeWords = [];
  codeWordPolynomial.coefs.forEach((element) => {
    const newBinary = element.toString(2);
    codeWords.push(padBits(8 - newBinary.length, newBinary));
  });
  // Handle padding the front in case the generated err codes are too short
  // this will balance the agressive whitespace removal in the xor steps
  while (codeWords.length < errCodeCnt) {
    codeWords.unshift('00000000');
  }
  return codeWords;
}

/**
 * Generate a Generator Polynomial of length errCodecnt. Seeded by genisisPolynomials.
 * @param {Polynomial} genisisPolynomial
 * @param {Integer} errCodeCnt
 * @returns Polynomial
 */
function calculateGeneratorPolynomial(genisisPolynomial, errCodeCnt) {
  let generatorPolynomial;
  // Multiply the generatorPolynomial by x^i+a^1
  for (let i = 1; i < errCodeCnt; i++) {
    i === 1
      ? (generatorPolynomial = multiply(
          genisisPolynomial,
          new Polynomial([0, alphaToInt[i]], [1, 0])
        ))
      : (generatorPolynomial = multiply(
          generatorPolynomial,
          new Polynomial([0, alphaToInt[i]], [1, 0])
        ));
  }
  return generatorPolynomial;
}

/**
 * Maps an array into a Polynomial
 * [y1, y2, y3] => y1x^3 + y2x^2 + y3x^1
 * @param {Array} binaryBlock
 * @returns GeneratorPolynomial
 */
function parseArrayToPolynomial(binaryBlock, crctnCodeCnt) {
  // 1st Convert binary numbers into decimal
  const converted = binaryBlock.map((bNum) => {
    return parseInt(bNum, 2);
  });
  // 2nd the message polynomal will be converted[0]x^converted.length-1
  // 2nd multiply the message polynomial by x^n where n is crctnCodeCnt
  // Convert the lead terms to alpha notation
  const coefArray = [];
  const degArray = [];
  // Create an coefArray of the binaryBlock values (as int), create a std array of X^n...X^n-(binaryBlock.length)
  converted.forEach((digit, index) => {
    coefArray.push(digit);
    degArray.push(converted.length - index + crctnCodeCnt - 1);
  });
  return new Polynomial(coefArray, degArray);
}

/**
 * Perform Polynomial long division with Galos Field taken into account
 * @param {Polynomial} generatorPolynomial
 * @param {Polynomial} messagePolynomial
 * @returns GeneratorPolynomial
 */
function performLongDivision(generatorPolynomial, messagePolynomial) {
  let xorResult = new Polynomial([], []);
  let multiplyResult = new Polynomial([], []);
  const stepsNeeded = messagePolynomial.size;
  // Perform the Polynomial long division
  for (let i = 0; i < stepsNeeded; i++) {
    if (i === 0) {
      // Step 1a
      multiplyResult = multiply(
        generatorPolynomial,
        new Polynomial([messagePolynomial.coefAt(0)], [0])
      );
      // Step 2a
      xorResult = xorPolynomial(messagePolynomial, multiplyResult);
      reducePolynomial(xorResult);
    } else {
      generatorPolynomial.reduceDegrees();
      // step na
      multiplyResult = multiply(
        generatorPolynomial,
        new Polynomial([xorResult.coefAt(0)], [0])
      );
      // Step nb
      xorResult = xorPolynomial(xorResult, multiplyResult);
      const reductionResult = reducePolynomial(xorResult);
      for (let i = 0; i < reductionResult; i++) {
        generatorPolynomial.reduceDegrees();
      }
      i = i + reductionResult;
    }
  }
  return xorResult;
}
