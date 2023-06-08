/* eslint-disable */
import { splitIntoGroups } from '../../Helpers/HelperFunctions';

export const DataPattern = (bitMatrix, data) => {
  const bitArray = splitIntoGroups(data, 1);
  let dir = true;
  // Traverse each column
  for (let c = bitMatrix.size - 1; c > -1; c--) {
    // skip timing pattern (always at 6)
    if (c === 6) {
      continue;
    }

    // if dir then traverse the column upwards by row
    if (dir) {
      for (let r = bitMatrix.size - 1; r > -1; r--) {
        if (!bitMatrix.isReserved(r, c)) {
          // pop the first bit off the array
          const bit = bitArray.shift();
          // console.log("Writting bit: " + bit + " at ["+ r + ", " + c + "]");
        }
        if (!bitMatrix.isReserved(r, c - 1)) {
          const bit = bitArray.shift();
          // console.log("Writting bit: " + bit + " at ["+ r + ", " + (c-1) + "]");
        }
      }
      // flip the directiom
      dir = false;
      // Account for the extra col check
      c--;
      // else then traverse the column downwards by row
    } else {
      for (let r = 0; r < bitMatrix.size; r++) {
        if (!bitMatrix.isReserved(r, c)) {
          const bit = bitArray.shift();
          // console.log("Writting bit: " + bit + " at ["+ r + ", " + c + "]");
        }
        if (!bitMatrix.isReserved(r, c - 1)) {
          const bit = bitArray.shift();
          // console.log("Writting bit: " + bit + " at ["+ r + ", " + (c-1) + "]");
        }
      }
      // flip the direction
      dir = true;
      // Account for the extra col check
      c--;
    }
  }
};
