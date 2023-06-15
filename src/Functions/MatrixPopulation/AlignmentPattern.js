import { alignmnetPatternLocations } from '../../Constants/Constants';

/**
 * Draw alignment pattern
 * @param {BitMatrix} bitMatrix
 * @param {Number} version
 */
export function AlignmentPattern(bitMatrix, version) {
  const cordArray = [];
  // map the patternlocations to their coresponding cordinate pairs
  console.log(version);
  const alignmentPattern = alignmnetPatternLocations[version];
  console.log(alignmentPattern);
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
  console.log(cordArray);
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
