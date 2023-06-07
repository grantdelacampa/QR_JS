const alignmnetPatternLocations = [
  [],
  [],
  [6, 18],
  [6, 22],
  [6, 30],
  [6, 34],
  [6, 22, 38],
  [6, 24, 42],
  [6, 26, 46],
  [6, 28, 50],
  [6, 30, 54],
  [6, 32, 58],
  [6, 34, 62],
  [6, 26, 46, 66],
  [6, 26, 48, 70],
  [6, 26, 50, 74],
  [6, 30, 54, 78],
  [6, 30, 56, 82],
  [6, 30, 58, 86],
  [6, 30, 62, 90],
  [6, 28, 50, 72, 94],
  [6, 26, 50, 74, 98],
  [6, 30, 54, 78, 102],
  [6, 28, 54, 80, 106],
  [6, 32, 58, 84, 110],
  [6, 30, 58, 86, 114],
  [6, 34, 62, 90, 118],
  [6, 26, 50, 74, 98, 122],
  [6, 30, 54, 78, 102, 126],
  [6, 26, 52, 78, 104, 130],
  [6, 30, 56, 82, 108, 134],
  [6, 34, 60, 86, 112, 138],
  [6, 30, 58, 86, 114, 142],
  [6, 34, 62, 90, 118, 146],
  [6, 30, 54, 78, 102, 126, 150],
  [6, 24, 50, 76, 102, 128, 154],
  [6, 28, 54, 80, 106, 132, 158],
  [6, 32, 58, 84, 110, 136, 162],
  [6, 26, 54, 82, 110, 138, 166],
  [6, 30, 58, 86, 114, 142, 170]
];

/**
 * Draw alignment pattern
 * @param {BitMatrix} bitMatrix 
 * @param {Number} version 
 */
export function AlignmentPattern(bitMatrix, version) {
  const cordArray = [];
  // map the patternlocations to their coresponding cordinate pairs
  const alignmentPattern = alignmnetPatternLocations[version];
  for (let i = 0; i < alignmentPattern.length; i++) {
    for (let j = 0; j < alignmentPattern.length; j++) {
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
          // console.log('1: ' + (row + r) + ', ' + (col + c));
        } else {
          bitMatrix.setBit(row + r, col + c, false, true);
          // console.log('0: ' + (row + r) + ', ' + (col + c));
        }
      }
    }
  });
}
