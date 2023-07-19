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
  // get the alignment pattern location list
  const alignmentPattern = alignmnetPatternLocations[version];
  const alignmentPatternLength = alignmentPattern.length;
  // Check if the alignments will hit any reserved spots
  for (let i = 0; i < alignmentPatternLength; i++) {
    for (let j = 0; j < alignmentPatternLength; j++) {
      const col = alignmentPattern[i];
      const row = alignmentPattern[j];
      const upperRowBnd = row + 2;
      const lowerRowBnd = row - 2;
      const upperColBnd = col + 2;
      const lowerColBnd = col - 2;
      // Don't overlap the Seperator/Finder Pattern
      if (
        !(
          bitMatrix.isReserved(lowerRowBnd, lowerColBnd) ||
          bitMatrix.isReserved(upperRowBnd, lowerColBnd) ||
          bitMatrix.isReserved(lowerRowBnd, upperColBnd) ||
          bitMatrix.isReserved(upperRowBnd, upperColBnd)
        )
      ) {
        // If no reserved bits are found write the pattern cords 
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
