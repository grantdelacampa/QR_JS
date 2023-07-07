/**
 * QR Code Dark Module and Reserved Areas functions.
 * Note: Dark module is drawn here rather than on its own.
 *
 * @link   DarkModule&ReservedAreas
 * @file   This file contains the function used to draw the Dark Module and Reserved Areas pattern(s) into a Bitmatrix.
 * @author Grant De La Campa.
 * @since  1.0.0
 */
import { getDarkModule } from '../../Helpers/HelperFunctions';

/**
 * Draw the reserve format area
 * @param {BitMatrix} bitMatrix
 * @param {Number} version
 */
export const ReserveFormatArea = (bitMatrix, version) => {
  // Draw bottom left
  // Get the start point [row, col]
  const startPoint = getDarkModule(version);
  const row = startPoint[0];
  const col = startPoint[1];
  // Since we get it here set the darkModule as well
  bitMatrix.setBit(row, col, true, true);
  // Traverse down the col
  for (let i = row; i < bitMatrix.size; i++) {
    // skip the dark module bit
    if (i !== row) {
      bitMatrix.setBit(i, col, false, true);
      // console.log('Bottom Left: ' + i + ', ' + col);
    }
    bitMatrix.setBit(col, i, false, true);
    // console.log('Top Right: ' + col + ', ' + i);
  }

  const basePoint = 8;
  for (let j = basePoint; j >= 0; j--) {
    if (j === basePoint) {
      bitMatrix.setBit(basePoint, basePoint, false, true);
      // Skip the timing pattern
    } else if (j !== 6) {
      bitMatrix.setBit(basePoint, j, false, true);
      // console.log('One: ' + basePoint + ', ' + j);
      bitMatrix.setBit(j, basePoint, false, true);
      // console.log('Two: ' + j + ', ' + basePoint);
    }
  }
};
