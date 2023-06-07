/**
 * Draw the version info area blocks if the version is larger than 7
 * @param {BitMatrix} bitMatrix 
 * @param {Number} version 
 */
export const VersionInfoArea = (bitMatrix, version) => {
  if (version > 6) {
    // For version 7 and higher draw two 6x3 blocks
    const col = bitMatrix.size - 10;
    const row = 0;

    // Draw the 3x6 blocks
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 3; c++) {
        bitMatrix.setBit(row + r, col + c, true, true);
        bitMatrix.setBit(col + c, row + r, true, true);
        // console.log('1: ' + (row + r) + ', ' + (col + c));
        // console.log('1: ' + (col + c) + ', ' + (row + r));
      }
    }
  }
};
