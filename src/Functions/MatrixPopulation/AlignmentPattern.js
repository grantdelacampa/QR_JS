/**
 * QR Code Alignment Pattern function
 *
 * @link   AlignmentPattern
 * @file   This file contains the function used to draw the Alignment pattern into a Bitmatrix.
 * @author Grant De La Campa.
 * @since  1.0.0
 */
import { alignmnetPatternLocations } from '../../Constants/Constants';

/**
 * Draw alignment pattern
 * @param {BitMatrix} bitMatrix
 * @param {Number} version
 */
export function AlignmentPattern(bitMatrix, version) {
  const cordArray = [];
  // map the patternlocations to their coresponding cordinate pairs
  const alignmentPattern = alignmnetPatternLocations[version];
  const alignmentPatternLength = alignmentPattern.length;
  for (let i = 0; i < alignmentPatternLength; i++) {
    for (let j = 0; j < alignmentPatternLength; j++) {
      const col = alignmentPattern[i];
      const row = alignmentPattern[j];
      // Don't overlap the Seperator/Finder Pattern
      if (
        !(
          bitMatrix.isReserved(row - 2, col - 2) ||
          bitMatrix.isReserved(row + 2, col - 2) ||
          bitMatrix.isReserved(row - 2, col + 2) ||
          bitMatrix.isReserved(row + 2, col + 2)
        )
      ) {
        cordArray.push([alignmentPattern[i], alignmentPattern[j]]);
      }
    }
  }
  // Iterate on the found cords and 'draw' them into the matrix
  cordArray.forEach((cord) => {
    const row = cord[0];
    const col = cord[1];
    for (let r = -2; r < 3; r++) {
      for (let c = -2; c < 3; c++) {
        if (
          r === -2 ||
          r === 2 ||
          ((c === -2 || c === 2) && (r > -2 || r < 2)) ||
          (r === 0 && c === 0)
        ) {
          bitMatrix.setBit(row + r, col + c, true, true);
        } else {
          bitMatrix.setBit(row + r, col + c, false, true);
        }
      }
    }
  });
}
