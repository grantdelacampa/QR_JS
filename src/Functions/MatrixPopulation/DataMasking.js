/**
 * QR Code Data Masking functions.
 * Contains the function to apply the data masking, apply the 4 evaluation rules to each and determine the correct masked bitmatrix to return.
 *
 * @link   DataMasking
 * @file   This file contains the function used to generate, apply, and evaluate the 8 data mask patterns.
 * @author Grant De La Campa.
 * @since  1.0.0
 */
import { BitMatrix } from '../../Objects/BitMatrix';
import { DrawFormatInfo } from './DrawFormatInfo';
export const DataMasking = (bitMatrix, errCrtnLvl) => {
  // BitMatrix size will not change even when masked so just get it here once
  const matrixSize = bitMatrix.size;
  // Get the array of maskes matricies
  const maskedMatricies = evaluateMasks(bitMatrix, matrixSize);
  const scores = [];
  let smallest = 0;
  // Iterate on the array and evaluate for each rule
  maskedMatricies.forEach((matrix, index) => {
    DrawFormatInfo(matrix, index, errCrtnLvl);
    const score1 = evaluateRule1(matrix, matrixSize);
    const score2 = evaluateRule2(matrix, matrixSize - 1);
    const score3 = evaluateRule3(matrix, matrixSize);
    const score4 = evaluateRule4(matrix, matrixSize);
    // Total the rule evals
    scores[index] = score1 + score2 + score3 + score4;
    // Track the index of the lowest score
    if (scores[smallest] > scores[index]) {
      smallest = index;
    }
  });
  // return the matrix with the smallest score
  return [smallest, maskedMatricies[smallest]];
};

/**
 * Runs the masking algo on 8 copies of the bitMatrix. Then evaluates the results to find the best pattern
 * @param {BitMatrix} bitMatrix
 * @param {Number} matrixSize
 * @returns [BitMatrix]
 */
const evaluateMasks = (bitMatrix, matrixSize) => {
  // Create the array of masks
  const maskedMatricies = [];
  for (let i = 0; i < 8; i++) {
    maskedMatricies.push(new BitMatrix(bitMatrix.size));
  }
  // Traverse the bitMatrix, since eveything is accessed in a non-linear way we need to use nested loops
  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      const isReserved = bitMatrix.isReserved(r, c);
      const bit = bitMatrix.getBit(r, c);
      // Iterate on the mask bitMatricies
      maskedMatricies.forEach((matrix, index) => {
        // We always set the bit even if it is reserved
        matrix.setBit(r, c, bit, false);
        if (!isReserved) {
          // if this bit is not reserved & it needs to be masked according to the pattern then xor it with true to flip it
          if (getMaskPattern(r, c, index)) {
            matrix.xorBit(r, c, true);
          }
        }
      });
    }
  }
  return maskedMatricies;
};

/**
 * Evaluate a BitMatrix for rule 1:
 *
 * - The first rule gives the QR code a penalty for each group of five or more same-colored modules in a row (or column).
 * @param {BitMatrix} bitMatrix
 * @param {Number} matrixSize
 * @returns Number
 */
const evaluateRule1 = (bitMatrix, matrixSize) => {
  let currentColColor = bitMatrix.getBit(0, 0);
  let colCount = 0;
  let currentRowColor = bitMatrix.getBit(0, 0);
  let rowCount = 0;
  let score = 0;
  for (let i = 0; i < matrixSize; i++) {
    for (let j = 0; j < matrixSize; j++) {
      // col
      const rowBit = bitMatrix.getBit(j, i);
      // row
      const colBit = bitMatrix.getBit(i, j);
      if (rowBit !== currentRowColor) {
        currentRowColor ^= true;
        rowCount = 1;
      } else {
        rowCount++;
      }
      if (rowCount === 5) {
        score += 3;
      } else if (rowCount > 5) {
        score++;
      }
      // Preform checks on the cols
      if (colBit !== currentColColor) {
        currentColColor ^= true;
        colCount = 1;
      } else {
        colCount++;
      }
      if (colCount === 5) {
        score += 3;
      } else if (colCount > 5) {
        score++;
      }
    }
    colCount = 0;
    rowCount = 0;
    currentColColor = bitMatrix.getBit(i, 0);
    currentRowColor = bitMatrix.getBit(0, i);
  }
  return score;
};

/**
 * Evaluate a BitMatrix for rule 2:
 *
 * - The second rule gives the QR code a penalty for each 2x2 area of same-colored modules in the matrix.
 * - NOTE: The QR code specification says that for a solid-color block of size m × n, the penalty score is 3 × (m - 1) × (n - 1). However, the QR code specification does not specify how to calculate the penalty when there are multiple ways of dividing up the solid-color blocks.
 * - Therefore, rather than looking for solid-color blocks larger than 2x2, simply add 3 to the penalty score for every 2x2 block of the same color in the QR code, making sure to count overlapping 2x2 blocks. For example, a 3x2 block of the same color should be counted as two 2x2 blocks, one overlapping the other.
 * @param {BitMatrix} bitMatrix
 * @param {Number} matrixSize
 * @returns Number
 */
const evaluateRule2 = (bitMatrix, matrixSize) => {
  let score = 0;
  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      const bitr1 = bitMatrix.getBit(r, c);
      const bitr2 = bitMatrix.getBit(r + 1, c);
      const bitr3 = bitMatrix.getBit(r, c + 1);
      const bitr4 = bitMatrix.getBit(r + 1, c + 1);
      if (bitr1 === bitr2 && bitr2 === bitr3 && bitr3 === bitr4) {
        score += 3;
      }
    }
  }
  return score;
};

/**
 * Evaluate a BitMatrix for rule 3:
 *
 * - The third rule gives the QR code a large penalty if there are patterns that look similar to the finder patterns.
 * @param {BitMatrix} bitMatrix
 * @param {Number} matrixSize
 * @returns Number
 */
const evaluateRule3 = (bitMatrix, matrixSize) => {
  // Patterns to check
  const patterns = ['1,0,1,1,1,0,1,0,0,0,0', '0,0,0,0,1,0,1,1,1,0,1'];
  // Score is default 0
  let score = 0;
  // Need one counter to step all the way down or to the right
  for (let i = 0; i < matrixSize; i++) {
    // Need one counter to stop 10 before the bottom or right
    for (let j = 0; j < matrixSize - 10; j++) {
      const rowPattern = [];
      const colPattern = [];
      // Generate the pattern to validate against the patterns
      for (let k = 0; k < 11; k++) {
        rowPattern.push(bitMatrix.getBit(i, j + k));
        colPattern.push(bitMatrix.getBit(j + k, i));
      }
      // Check both row and col for both patterns matching
      patterns.forEach((pattern) => {
        if (rowPattern.toString() === pattern) {
          score += 40;
        } else if (colPattern.toString() === pattern) {
          score += 40;
        }
      });
    }
  }
  return score;
};

/**
 * Evaluate a BitMatrix for rule 4:
 *
 * - The fourth rule gives the QR code a penalty if more than half of the modules are dark or light, with a larger penalty for a larger difference.
 * @param {BitMatrix} bitMatrix
 * @param {Number} matrixSize
 * @returns Number
 */
const evaluateRule4 = (bitMatrix, matrixSize) => {
  let blkCnt = 0;
  for (let i = 0; i < matrixSize; i++) {
    for (let j = 0; j < matrixSize; j++) {
      // 2 count dark modules
      if (bitMatrix.getBit(i, j)) {
        blkCnt++;
      }
    }
  }
  // 3 calculate percent of dark modules
  const percent = (blkCnt / (matrixSize * matrixSize)) * 100;
  // 4. Determine the prev and next multiple of 5 for this percent
  const floor = percent - (percent % 5);
  const ceiling = percent + (5 - (percent % 5));
  // 5 subtract 50 from each && 6 divide by 5
  const proccessedFloor = Math.abs(floor - 50) / 5;
  const processedCeiling = Math.abs(ceiling - 50) / 5;
  // 7 take the smallest and * by 10
  if (proccessedFloor < processedCeiling) {
    return proccessedFloor * 10;
  } else {
    return processedCeiling * 10;
  }
};

/**
 * Check if a [r,c] needs to be fliped based on the maskNo
 * @param {Number} r
 * @param {Number} c
 * @param {Number} maskNo
 * @returns Boolean
 */
const getMaskPattern = (r, c, maskNo) => {
  switch (maskNo) {
    case 0: {
      return (r + c) % 2 === 0;
    }
    case 1: {
      return r % 2 === 0;
    }
    case 2: {
      return c % 3 === 0;
    }
    case 3: {
      return (r + c) % 3 === 0;
    }
    case 4: {
      return (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0;
    }
    case 5: {
      return ((r * c) % 2) + ((r * c) % 3) === 0;
    }
    case 6: {
      return (((r * c) % 2) + ((r * c) % 3)) % 2 === 0;
    }
    case 7: {
      return (((r + c) % 2) + ((r * c) % 3)) % 2 === 0;
    }
    default: {
      throw new Error('Unknown mask');
    }
  }
};
