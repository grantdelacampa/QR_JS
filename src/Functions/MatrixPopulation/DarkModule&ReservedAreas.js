/**
 * QR Code Dark Module and Reserved Areas functions.
 * Note: Dark module is drawn here rather than on its own.
 *
 * @link   DarkModule&ReservedAreas
 * @file   This file contains the function used to draw the Dark Module and Reserved Areas pattern(s) into a Bitmatrix.
 * @author Grant De La Campa.
 * @since  1.0.0
 */
/**
 * Draw the reserve format area
 * @param {BitMatrix} bitMatrix
 * @param {Number} version
 */
export const ReserveFormatArea = (bitMatrix, version) => {
  // Draw bottom left
  // Get the start point [row, col]
  const startPoint = [4 * version + 9, 8];
  const row = startPoint[0];
  const col = startPoint[1];
  const matrixSize = bitMatrix.size;
  // Since we get it here set the darkModule as well
  bitMatrix.setBit(row, col, true, true);
  // Traverse down the col
  for (let i = row; i < matrixSize; i++) {
    // skip the dark module bit
    if (i !== row) {
      bitMatrix.setBit(i, col, false, true);
    }
    bitMatrix.setBit(col, i, false, true);
  }

  const basePoint = 8;
  for (let j = basePoint; j >= 0; j--) {
    if (j === basePoint) {
      bitMatrix.setBit(basePoint, basePoint, false, true);
      // Skip the timing pattern
    } else if (j !== 6) {
      bitMatrix.setBit(basePoint, j, false, true);
      bitMatrix.setBit(j, basePoint, false, true);
    }
  }
};
