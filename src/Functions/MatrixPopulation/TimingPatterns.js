/**
 * Helper to draw the timingPatterns to the bitmatrix
 * @param {BitMatrix} bitMatrix
 */
export function TimingPatterns(bitMatrix) {
  const STARTPOINT = 8;
  const ENDPOINT = bitMatrix.size - 9;
  // Draw the timing pattern for its length in the bit Matrix ENDPOINT - STARTPOINT
  for (let p = STARTPOINT; p <= ENDPOINT; p++) {
    // we always start at an even space with 1 and alternate so use mod to determine even/odd
    if (p % 2 === 0) {
      bitMatrix.setBit(STARTPOINT - 2, p, true, true);
      bitMatrix.setBit(p, STARTPOINT - 2, true, true);
      // console.log('1 -> Row: ' + (STARTPOINT - 2) + ', Col: ' + p);
      // console.log('1 -> Col: ' + (STARTPOINT - 2) + ', Col: ' + p);
    } else {
      bitMatrix.setBit(STARTPOINT - 2, p, false, true);
      bitMatrix.setBit(p, STARTPOINT - 2, false, true);
      //  console.log('0 -> Row: ' + (STARTPOINT - 2) + ', Col: ' + p);
      // console.log('0 -> Col: ' + (STARTPOINT - 2) + ', Col: ' + p);
    }
  }
}
