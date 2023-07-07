/**
 * QR Code Draw Format Info function.
 *
 * @link   FormatInfo
 * @file   This file contains the function used draw the Draw Format Info pattern.
 * @author Grant De La Campa.
 * @since  1.0.0
 */
import { FormatInfoStrings } from '../../Constants/Constants';

/**
 * Draw the format info into the givenBitMatrix
 * @param {Array[Number, BitMatrix]} dataMaskResult
 * @param {Char} errCrtnLvl
 */
export const DrawFormatInfo = (maskedBitMatrix, pattern, errCrtnLvl) => {
  const formatString = FormatInfoStrings[errCrtnLvl + pattern];
  const size = maskedBitMatrix.size;
  let index = 0;
  let index2 = 0;
  let index3 = formatString.length - 1;
  // traverse the columns
  for (let c = 0; c < 9; c++) {
    // If we hit the corner then traverse up col 8
    if (c === 8) {
      // Traverse up col 8
      for (let r = 8; r > -1; r--) {
        // Do not overwrite the timing pattern!
        if (r !== 6) {
          // Set the format from [8,8] => [0,8]
          // console.log(formatString[index] + '[' + r + ',' + c + ']');
          maskedBitMatrix.setBit(r, c, formatString[index] === '1', false);
          index++;
        }
        // Do not overwrite the dark module!
        if (r > 1) {
          // Set the format from [20, 8] => [13, 8]
          // console.log(formatString[index2] + '[' + (size - (9 - r)) + ',' + c + ']')
          maskedBitMatrix.setBit(
            size - (9 - r),
            c,
            formatString[index2] === '1',
            false
          );
          index2++;
        }
      }
      // do not overwrite the timing pattern!!
    } else {
      if (c !== 6) {
        // Set the bits from [8, 0] => [8, 7]
        // console.log(formatString[index] + '[' + 8 + ',' + c + ']');
        maskedBitMatrix.setBit(8, c, formatString[index] === '1', false);
        index++;
      }
      // console.log(formatString[index3] + '[' + 8 + ',' + (size - c - 1) + ']');
      // Set the bits from [8, 20] -> [8, 13]
      maskedBitMatrix.setBit(
        8,
        size - c - 1,
        formatString[index3] === '1',
        false
      );
      index3--;
    }
  }
};
