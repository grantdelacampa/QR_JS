import { alphaToInt, intToAlpha } from '../Constants/Constants';

/**
 * A class to represent polynomials for QR code generation
 */
export class GeneratorPolynomial {
  alphaCoef = [];
  stdCoef = [];

  /**
     * Constructs an array in the format a^a[0]+x^b[0]+...a^[n]b^[n]
     * @param {*} a
     * @param {*} b
     */
  constructor (a, b) {
    // a
    this.alphaCoef = a;
    // x
    this.stdCoef = b;
  }

  /**
     * Performs the following: (a^a+x^b) * (a^a+x^b) and saves the result to polynomial 1
     * @param {GeneratorPolynomial} polynomial
     * @returns
     */
  multiply (polynomial) {
    const alphaMultiplier = polynomial.getAlphaCoef();
    const stdMultiplier = polynomial.getStdCoef();
    const finalAlpha = [];
    const finalStd = [];
    for (let i = 0; i < this.alphaCoef.length; i++) {
      for (let j = 0; j < alphaMultiplier.length; j++) {
        // If the added is larger than 255 then % 255 it
        const addedAlpha = this.alphaCoef[i] + alphaMultiplier[j];
        finalAlpha.push(addedAlpha > 255 ? this.galosExponetReduction(addedAlpha) : addedAlpha);
        finalStd.push(this.stdCoef[i] + stdMultiplier[j]);
      }
    }
    return this.simplify(finalAlpha, finalStd);
  }

  xorPolynomial (polynomial) {
    // Check which is longer alpha or std
    const newAlpha = [];
    let newStd = [];
    const iteratorAlpha = this.alphaCoef.slice(0);
    const multiplierAlpha = polynomial.getAlphaCoef().slice(0);
    const difference = polynomial.getAlphaCoef().length - this.alphaCoef.length;
    if (difference > 0) {
      newStd = polynomial.getStdCoef();
      for (let i = 0; i < difference; i++) {
        iteratorAlpha.push(-1);
      }
    } else {
      newStd = this.stdCoef;
      for (let i = 0; i < Math.abs(difference); i++) {
        multiplierAlpha.push(-1);
      }
    }
    // Iterate on this alphaCoef
    iteratorAlpha.forEach((element, index) => {
      let firstNum = parseInt(alphaToInt[element]);
      let secondNum = parseInt(alphaToInt[multiplierAlpha[index]]);
      if (!firstNum) {
        firstNum = 0;
      }
      if (!secondNum) {
        secondNum = 0;
      }
      const xorTest = firstNum ^ secondNum;
      newAlpha.push(intToAlpha[xorTest]);
    });
    newAlpha.shift();
    newStd.shift();
    // this.setAlphaCoef(newAlpha);
    // this.setStdCoef(newStd);
    return new GeneratorPolynomial(newAlpha, newStd);
  }

  simplify (alphaCoef, stdCoef) {
    const newAlpha = [];
    const newStdCoef = [];
    // [{element0 : index},...{elementN : index}]
    const vistied = [];
    stdCoef.forEach((element, index) => {
      // Set the existingIndex to an imposible number so we know if element is 0
      let existingIndex = -2;
      // If the element is not 0 we need the index
      if (element !== 0) {
        existingIndex = vistied.findIndex((obj) => { return Object.hasOwn(obj, element); });
      }
      // If existingIndex < 0 then element is 0 or newly visited so add it either way
      if (existingIndex < 0) {
        newAlpha.push(alphaCoef[index]);
        newStdCoef.push(stdCoef[index]);
      }
      // If existingIndex === -1 then add the element to the visitedArray
      if (existingIndex === -1) {
        // Store the first time we both visited and wrote this element respectivly
        vistied.push({ [element]: [index, newStdCoef.length - 1] });
      }
      // If 0 or more this has been visited
      if (existingIndex >= 0) {
        // Get the array with the visited and writted index
        const indexArray = vistied[existingIndex][element];
        const newStdIndex = indexArray[1];
        const stdCoefIndex = indexArray[0];
        // NOTE: We dont care about adding the stds because x^2 + x^2 = x^2]
        // Add the Alphas using the correct value based on the QR
        newAlpha[newStdIndex] = this.addAlphaToAlpha(alphaCoef[stdCoefIndex], alphaCoef[index]);
      }
    });

    // this.setAlphaCoef(newAlpha);
    // this.setStdCoef(newStdCoef);
    return new GeneratorPolynomial(newAlpha, newStdCoef);
  }

  decrimentStdArry () {
    this.stdCoef.forEach((element, index) => {
      this.stdCoef[index] = element - 1;
    });
  }

  /**
     * Takes the given value and performs the following
     * (e % 256) + Math.floor(e / 256)
     * @param {Integer} exponent
     * @returns Integer
     */
  galosExponetReduction (exponent) {
    return (exponent % 256) + Math.floor(exponent / 256);
  }

  /**
     * Performs the following operation n = a1 ^ a2
     * then looks up its int value for a^n from the intToAlpha lookup table
     * @param {Integer} alpha1
     * @param {Integer} alpha2
     * @returns Integer
     */
  addAlphaToAlpha (alpha1, alpha2) {
    const dec1 = alphaToInt[alpha1];
    const dec2 = alphaToInt[alpha2];
    const xored = dec1 ^ dec2;
    return intToAlpha[xored];
  }

  /**
     * get the array of Alpha Coef
     * @returns Array
     */
  getAlphaCoef () {
    return this.alphaCoef;
  }

  /**
     * Override the current Alpha array
     * @param {Array} newAlphaCoefs
     */
  setAlphaCoef (newAlphaCoefs) {
    this.alphaCoef = newAlphaCoefs;
  }

  /**
     * get the array of StdCoef
     * @returns Array
     */
  getStdCoef () {
    return this.stdCoef;
  }

  /**
     * Overrride the current Std array
     * @param {Array} newStdCoef
     */
  setStdCoef (newStdCoef) {
    this.stdCoef = newStdCoef;
  }

  /**
     * Return a string representation of this polynomial
     * @returns String
     */
  toString () {
    let output = '';
    const size = this.alphaCoef.length;
    for (let i = 0; i < size; i++) {
      output = output + 'a^' + this.alphaCoef[i] + 'x^' + this.stdCoef[i];
      if (size - 1 !== i) {
        output = output + ' + ';
      }
    }
    return output;
  }

  toDecString () {
    let output = '';
    const size = this.alphaCoef.length;
    for (let i = 0; i < size; i++) {
      output = output + alphaToInt[this.alphaCoef[i]] + 'x^' + this.stdCoef[i];
      if (size - 1 !== i) {
        output = output + ' + ';
      }
    }
    return output;
  }
}
