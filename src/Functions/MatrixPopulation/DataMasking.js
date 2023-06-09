import { getMaskPattern } from './MaskPattern';
import { BitMatrix } from '../../Objects/BitMatrix';
import { DrawFormatInfo } from './DrawFormatInfo';
export const DataMasking = (bitMatrix, errCrtnLvl) => {
  // Get the array of maskes matricies
  const maskedMatricies = evaluateMasks(bitMatrix);
  const scores = [];
  let smallest = 0;
  // Iterate on the array and evaluate for each rule
  maskedMatricies.forEach((matrix, index) => {
    DrawFormatInfo(matrix, index, errCrtnLvl);
    const score1 = evaluateRule1(matrix);
    const score2 = evaluateRule2(matrix);
    const score3 = evaluateRule3(matrix);
    const score4 = evaluateRule4(matrix);
    // Total the rule evals
    scores[index] = score1 + score2 + score3 + score4;
    // Track the index of the lowest score
    if (scores[smallest] > scores[index]) {
      smallest = index;
    }
  });
  console.log('Total Scores: ' + scores);
  console.log('Final Mask Pattern: ' + smallest);
  // return the matrix with the smallest score
  return [smallest, maskedMatricies[smallest]];
};

/**
 * Runs the masking algo on 8 copies of the bitMatrix. Then evaluates the results to find the best pattern
 * @param {BitMatrix} bitMatrix
 */
const evaluateMasks = (bitMatrix) => {
  // Create the array of masks
  const maskedMatricies = [];
  for (let i = 0; i < 8; i++) {
    maskedMatricies.push(new BitMatrix(bitMatrix.size));
  }
  // Traverse the bitMatrix, since eveything is accessed in a non-linear way we need to use nested loops
  for (let r = 0; r < bitMatrix.size; r++) {
    for (let c = 0; c < bitMatrix.size; c++) {
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
            // console.log(bit + ": [" + r + ", " + c + "] Masked to: " + matrix.getBit(r,c) + " in mask: " + index);
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
 * @returns
 */
const evaluateRule1 = (bitMatrix) => {
  let currentColColor = bitMatrix.getBit(0, 0);
  let colCount = 0;
  let currentRowColor = bitMatrix.getBit(0, 0);
  let rowCount = 0;
  let score = 0;
  for (let i = 0; i < bitMatrix.size; i++) {
    for (let j = 0; j < bitMatrix.size; j++) {
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
 * @returns
 */
const evaluateRule2 = (bitMatrix) => {
  let score = 0;
  for (let r = 0; r < bitMatrix.size - 1; r++) {
    for (let c = 0; c < bitMatrix.size - 1; c++) {
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
 * @returns
 */
const evaluateRule3 = (bitMatrix) => {
  // Patterns to check
  const patterns = ['1,0,1,1,1,0,1,0,0,0,0', '0,0,0,0,1,0,1,1,1,0,1'];
  // Score is default 0
  let score = 0;
  // Need one counter to step all the way down or to the right
  for (let i = 0; i < bitMatrix.size; i++) {
    // Need one counter to stop 10 before the bottom or right
    for (let j = 0; j < bitMatrix.size - 10; j++) {
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
 * @returns
 */
const evaluateRule4 = (bitMatrix) => {
  let blkCnt = 0;
  // 1) Count total number of cells
  const totalCells = bitMatrix.size * bitMatrix.size;
  for (let i = 0; i < bitMatrix.size; i++) {
    for (let j = 0; j < bitMatrix.size; j++) {
      // 2 count dark modules
      if (bitMatrix.getBit(i, j)) {
        blkCnt++;
      }
    }
  }
  // 3 calculate percent of dark modules
  const percent = (blkCnt / totalCells) * 100;
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
