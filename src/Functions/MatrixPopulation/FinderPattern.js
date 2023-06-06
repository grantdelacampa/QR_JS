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

    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (
          c === 0 ||
          c === 6 ||
          r === 0 ||
          r === 6 ||
          (c > 1 && c < 5 && r > 1 && r < 5)
        ) {
          // Set the 1 bits, and reserve this bit
          bitMatrix.setBit(row + r, col + c, true, true);
          // console.log('1: ' + (row + r) + ', ' + (col + c));
        } else {
          // set the 0 bits, and reserve this bit
          bitMatrix.setBit(row, col, false, true);
          // console.log('0: ' + (row + r) + ', ' + (col + c));
        }
      }
    }
  });
}
