/**
 * QR Code Seperator Pattern function.
 *
 * @link   SeperatorPattern
 * @file   This file contains the function used draw the Seperator pattern.
 * @author Grant De La Campa.
 * @since  1.0.0
 */
/**
 * Generator for seperator pattern
 * @param {BitMatrix} bitMatrix
 */
export function SeperatorPattern(bitMatrix) {
  const seperatorPatternArray = [
    [0, 0],
    [bitMatrix.size - 8, 0],
    [0, bitMatrix.size - 8]
  ];
  seperatorPatternArray.forEach((cord, index) => {
    const row = cord[0];
    const col = cord[1];

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        switch (index) {
          case 0: {
            if ((c === 7 && r !== 7) || r === 7) {
              bitMatrix.setBit(row + r, col + c, false, true);
            }
            break;
          }
          case 1: {
            if ((c === 7 && r !== 0) || r === 0) {
              bitMatrix.setBit(row + r, col + c, false, true);
            }
            break;
          }
          case 2: {
            if ((c === 0 && r !== 7) || r === 7) {
              bitMatrix.setBit(row + r, col + c, false, true);
            }
            break;
          }
          default: {
            console.error('todo handle error - this is a failure');
          }
        }
      }
    }
  });
}
