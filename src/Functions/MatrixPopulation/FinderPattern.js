/**
 * QR Code Finder Pattern.
 *
 * @link   FinderPattern
 * @file   This file contains the function calls to draw the Finder Pattern.
 * @author Grant De La Campa.
 * @since  1.0.0
 */
/**
 * Populate the FinderPattern in the given bit matrix also populate the separators
 * @param {BitMatrix} bitMatrix
 */
export function FinderPatter(bitMatrix) {
  const finderPatternArray = [
    [0, 0],
    [bitMatrix.size - 7, 0],
    [0, bitMatrix.size - 7]
  ];
  // For each finder pattern we need to draw a 7 * 7 square starting at cord
  finderPatternArray.forEach((cord) => {
    const col = cord[0];
    const row = cord[1];
    const boundArray = [0, 6];
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (boundArray.includes(c) || boundArray.includes(r) ||
          (c > 1 && c < 5 && r > 1 && r < 5)
        ) {
          // Set the 1 bits, and reserve this bit
          bitMatrix.setBit(row + r, col + c, true, true);
        } else {
          // set the 0 bits, and reserve this bit
          bitMatrix.setBit(row + r, col + c, false, true);
        }
      }
    }
  });
}
