/**
 * QR Code Version Info Reserve Pattern function.
 *
 * @link   VersionInfoArea
 * @file   This file contains the function used to reserve the Version info pattern area.
 * @author Grant De La Campa.
 * @since  1.0.0
 */
/**
 * Draw the version info area blocks if the version is larger than 7 to reserve these bits
 * @param {BitMatrix} bitMatrix
 * @param {Number} version
 */
export const VersionInfoArea = (bitMatrix, version) => {
  if (version > 6) {
    // For version 7 and higher draw two 6x3 blocks
    const col = bitMatrix.size - 11;
    const row = 0;

    // Draw the 3x6 blocks
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 3; c++) {
        bitMatrix.setBit(row + r, col + c, false, true);
        bitMatrix.setBit(col + c, row + r, false, true);
      }
    }
  }
};
