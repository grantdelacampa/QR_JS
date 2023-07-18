/**
 * Polynomial Operations.
 * Contains the functions used throughout the codebase for operations on Polynomials such as multiply.
 *
 * @link   PolynomialOperations
 * @file   This file contains the helper functions used for Polynomial operations.
 * @author Grant De La Campa.
 * @since  1.0.0
 * @see Polynomial
 */
import { Polynomial } from '../Objects/Polynomial';
import { intToAlpha, alphaToInt } from '../Constants/Constants';

/**
 * Multiply two polynomials accounting for galos field reduction when the coef as an alpha value is greater than 255.
 * @param {Polynomial} multiplicand
 * @param {Polynomial} multiplier
 * @returns {Polynomial}
 */
export const multiply = (multiplicand, multiplier) => {
  // Store the final coefs to build the new Polynomial
  const finalCoefs = [];
  // Store the final degrees to build the new Polynomial
  const finalDegrees = [];
  // Store the visited coefs as [{element0 : index},...{elementN : index}]
  const visitedDegrees = [];

  // Iterate through the multiplicand coefs
  for (let i = 0; i < multiplicand.size; i++) {
    // Iterate through the multiplier coefs
    for (let j = 0; j < multiplier.size; j++) {
      // Get the added degrees and push them to the final array
      const degResult = multiplicand.degreeAt(i) + multiplier.degreeAt(j);
      // Get the added coef as an alpha value
      const coefAlphaResult =
        intToAlpha[multiplicand.coefAt(i)] + intToAlpha[multiplier.coefAt(j)];
      // perform the galosreduction as needed
      const coefResult =
        coefAlphaResult > 255
          ? galosExponetReduction(coefAlphaResult)
          : coefAlphaResult;

      // Check if the degree has been seen before
      const existingIndex = visitedDegrees.findIndex((obj) => {
        return Object.hasOwn(obj, degResult);
      });

      // If existingIndex < 0 then element is 0 or newly visited so add it either way
      if (existingIndex < 0) {
        // push the int value to the coefs array
        finalCoefs.push(alphaToInt[coefResult]);
        // Push the added degreees to the final array
        finalDegrees.push(degResult);
        // add the coef to the visited array (note never update this since we always want to shift like terms to the left)
        visitedDegrees.push({ [degResult]: finalCoefs.length - 1 });
      } else {
        // get the first time we seen this coef
        const originialDegreeIndex = visitedDegrees[existingIndex][degResult];
        // calculate the newCoef
        const newCoef =
          finalCoefs[originialDegreeIndex] ^ alphaToInt[coefResult];
        // set the result
        finalCoefs[originialDegreeIndex] = newCoef;
      }
    }
  }
  return new Polynomial(finalCoefs, finalDegrees);
};

/**
 * xor two polynimials with like leading terms
 * @param {Polynomial} expressionOne
 * @param {Polynomial} expressionTwo
 * @returns Polynomial
 */
export const xorPolynomial = (expressionOne, expressionTwo) => {
  const newCoef = [];
  const newDegrees = [];
  // Find the largest expression
  const largest =
    expressionOne.size >= expressionTwo.size
      ? expressionOne.size
      : expressionTwo.size;
  // Get the leading coef
  const leadingCoef = expressionOne.degreeAt(0);
  // Iterate the length of the largest expression
  for (let i = 0; i < largest; i++) {
    // if undefined set it to 0
    const coef1 = expressionOne.coefAt(i) || 0;
    const coef2 = expressionTwo.coefAt(i) || 0;
    // push the new values to their respective arrays
    newCoef.push(coef1 ^ coef2);
    newDegrees.push(leadingCoef - i);
  }
  // if the leading coef is 0 remove it and the respective degreee
  return new Polynomial(newCoef, newDegrees);
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

/**
 * Reduce a polynomial by removing leading terms that are 0
 * @param {Polynomial} polynomial
 * @returns Array
 */
export const reducePolynomial = (polynomial) => {
  let terms = -1;
  while (polynomial.coefAt(0) === 0) {
    polynomial.shift();
    terms++;
  }
  return terms;
};
