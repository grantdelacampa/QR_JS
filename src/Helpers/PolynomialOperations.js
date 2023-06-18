import { Polynomial } from '../Objects/Polynomial';
import { intToAlpha, alphaToInt } from '../Constants/Constants';
export const multiply = (multiplicand, multiplier) => {
  console.log(multiplicand, multiplier);
  // Store the final coefs to build the new Polynomial
  const finalCoefs = [];
  // Store the final degrees to build the new Polynomial
  const finalDegrees = [];
  // Store the visited coefs
  // const visitedCoefs = [];

  // Iterate through the multiplicand coefs
  for (let i = 0; i < multiplicand.size; i++) {
    // Iterate through the mutiplier coefs
    for (let j = 0; j < multiplier.size; j++) {
      // let existingIndex = -2;
      // Get the added coef as an alpha value
      const coefAlphaResult =
        intToAlpha[multiplicand.coefAt(i)] + intToAlpha[multiplier.coefAt(j)];
      // perform the galosreduction is needed
      const coefResult =
        coefAlphaResult > 255
          ? galosExponetReduction(coefAlphaResult)
          : coefAlphaResult;
      // push the int value to the coefs array
      finalCoefs.push(alphaToInt[coefResult]);
      // Get the added degrees and push them to the final array
      const degResult = multiplicand.degreeAt(i) + multiplier.degreeAt(j);
      finalDegrees.push(degResult);
      // set the existing index
    }
  }
  return new Polynomial(finalCoefs, finalDegrees);
};

/**
 * Takes the given value and performs the following
 * (e % 256) + Math.floor(e / 256)
 * @param {Integer} exponent
 * @returns Integer
 */
const galosExponetReduction = (exponent) => {
  return (exponent % 256) + Math.floor(exponent / 256);
};
