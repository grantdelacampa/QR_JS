/* eslint-disable */
import { getQRSize } from '../../Helpers/HelperFunctions';
import { FinderPatter } from './FinderPattern';
import { BitMatrix } from '../../Objects/BitMatrix';
import { SeperatorPattern } from './SeperatorPattern';
import { AlignmentPattern } from './AlignmentPattern';
import { TimingPatterns } from './TimingPatterns';
import { ReserveFormatArea } from './DarkModule&ReservedAreas';
import { VersionInfoArea } from './VersionInfoArea';
import { DataPattern } from './DataPattern';
import { getMaskPattern } from './MaskPattern';

/**
 * Driver for drawing the QR code to the bitMatrix
 * @param {Number} version
 * @param {String} codeData
 */
export const DrawQRCode = (version, codeData) => {
  const qrSize = getQRSize(version);
  const bitMatrix = new BitMatrix(qrSize);
  FinderPatter(bitMatrix, qrSize);
  SeperatorPattern(bitMatrix);
  AlignmentPattern(bitMatrix, version);
  TimingPatterns(bitMatrix);
  ReserveFormatArea(bitMatrix, version);
  VersionInfoArea(bitMatrix, version);
  DataPattern(bitMatrix, codeData);
  evaluateMasks(bitMatrix);
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
  const score1 = evaluateRule1(maskedMatricies[0]);
  const score2 = evaluateRule2(maskedMatricies[0]);
  const score3 = evaluateRule3(maskedMatricies[0]);
  console.log(score1);
  console.log(score2);
  console.log(score3);
};

/**
 * Evaluate a BitMatrix for rule 1:
 *
 * - The first rule gives the QR code a penalty for each group of five or more same-colored modules in a row (or column).
 * @param {BitMatrix} bitMatrix
 * @returns
 */
const evaluateRule1 = (bitMatrix) => {
  // Evaluate row by row
  // Evaluate col by col
  let currentColColor = bitMatrix.getBit(0, 0);
  let colCount = 1;
  let currentRowColor = bitMatrix.getBit(0, 0);
  let rowCount = 1;
  let score = 0;
  for (let i = 0; i < bitMatrix.size; i++) {
    // console.log("===========New Check!================");
    for (let j = 0; j < bitMatrix.size; j++) {
      let rowBit = bitMatrix.getBit(j, i);
      let colBit = bitMatrix.getBit(i, j);
      // console.log("Col => [" + i + "," + j + "] bit: " + colBit + " cur: " + currentColColor);
      // console.log("Row => [" + j + "," + i + "] bit: " + rowBit + " cur: " + currentRowColor);
      // If we changed the bit type on rows then reset the count and switch the focus bit
      if (rowBit !== currentRowColor) {
        currentRowColor ^ true;
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
    colCount = 1;
    rowCount = 1;
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
      let bit1 = bitMatrix.getBit(r, c);
      let bit2 = bitMatrix.getBit(r + 1, c);
      let bit3 = bitMatrix.getBit(r, c + 1);
      let bit4 = bitMatrix.getBit(r + 1, c + 1);
      if (bit1 && bit2 && bit3 && bit4) {
        // console.log("topL => [" + r + "," + c + "] bit: " + bit1);
        // console.log("btmL => [" + (r+1) + "," + c + "] bit: " + bit2);
        // console.log("topR => [" + r + "," + (c+1) + "] bit: " + bit3);
        // console.log("btmR => [" + (r+1) + "," + (c+1) + "] bit: " + bit4);
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
  const patterns = [
    [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1]
  ];
  let rowIndex = [0, 0];
  let colIndex = [0, 0];
  // Current evaluations
  let score = 0;
  for (let i = 0; i < bitMatrix.size; i++) {
    for (let j = 0; j < bitMatrix.size; j++) {
      let rowBit = bitMatrix.getBit(j, i);
      let colBit = bitMatrix.getBit(i, j);
      // console.log("["+ i + "," + j + "]");
      patterns.forEach((pattern, index) => {
        // Check for row matching
        if (rowBit === pattern[rowIndex[index]]) {
          rowIndex[index] += 1;
          // console.log("Current row Matched bit: " + rowBit + " at count: " + rowIndex[index] + " for pattern: " + index);
        } else {
          rowIndex[index] = 0;
        }

        // Check for col matching
        if (colBit === pattern[colIndex[index]]) {
          colIndex[index] += 1;
          // console.log("Current col Matched bit: " + colBit + " at count: " + colIndex[index] + " for pattern: " + index);
        } else {
          colIndex[index] = 0;
        }

        // check if the row has reached the correct count to add 40 pts
        if (pattern.length - 1 === rowIndex[index]) {
          // console.log("Adding row score! " + rowIndex[index]);
          score += 40;
          rowIndex[index] = 0;
        }
        if (pattern.length - 1 === colIndex[index]) {
          // console.log("Adding col score!" + colIndex[index]);
          score += 40;
          colIndex[index] = 0;
        }
      });
    }
    // Zero after each row/col traversed
    // console.log("=========RESET=========");
    rowIndex = [0, 0];
    colIndex = [0, 0];
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
  return;
};
