/**
 * QR Code Data Pattern function.
 *
 * @link   DataPattern
 * @file   This file contains the function used draw the Data Pattern.
 * @author Grant De La Campa.
 * @since  1.0.0
 */
import { splitIntoGroups } from '../../Helpers/HelperFunctions';

/**
 * Draw the final processed data codewords into the given bitmatrix
 * @param {BitMatrix} bitMatrix
 * @param {[]} data
 */
export const DataPattern = (bitMatrix, data) => {
  const matrixSize = bitMatrix.size;
  const boundedMatrixSize = matrixSize - 1;
  const bitArray = splitIntoGroups(data, 1);
  let dir = true;
  // Traverse each column
  for (let c = boundedMatrixSize; c > -1; c--) {
    // skip timing pattern (always at 6)
    if (c === 6) {
      continue;
    }

    // if dir then traverse the column upwards by row
    if (dir) {
      for (let r = boundedMatrixSize; r > -1; r--) {
        if (!bitMatrix.isReserved(r, c)) {
          // pop the first bit off the array this has to be here otherwise we will loose bits
          const bit = bitArray.shift();
          bitMatrix.setBit(r, c, bit === '1');
        }
        if (!bitMatrix.isReserved(r, c - 1)) {
          const bit = bitArray.shift();
          bitMatrix.setBit(r, c - 1, bit === '1');
        }
      }
      // flip the direction
      dir = false;
      // Account for the extra col check
      c--;
      // else then traverse the column downwards by row
    } else {
      for (let r = 0; r < matrixSize; r++) {
        if (!bitMatrix.isReserved(r, c)) {
          const bit = bitArray.shift();
          bitMatrix.setBit(r, c, bit === '1');
        }
        if (!bitMatrix.isReserved(r, c - 1)) {
          const bit = bitArray.shift();
          bitMatrix.setBit(r, c - 1, bit === '1');
        }
      }
      // flip the direction
      dir = true;
      // Account for the extra col check
      c--;
    }
  }
};
