/**
 * QR Code Verson Info Pattern function.
 *
 * @link   VersionInfo
 * @file   This file contains the functions used to reserve and draw the Version Info pattern.
 * @author Grant De La Campa.
 * @since  1.0.0
 */
import { VersionInfoStrings } from '../../Constants/Constants';

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

/**
 * Draw the version info pattern.
 * - NOTE: this returns and does nothing if version is less than 6
 * @param {BitMatrix} bitMatrix
 * @param {Number} version
 * @returns
 */
export const VersionInfo = (dataMaskResult, version) => {
  const maskedBitMatrix = dataMaskResult[1];
  const size = maskedBitMatrix.size;
  if (version < 7) {
    return;
  }
  const versionInfoString = VersionInfoStrings[version];
  let index = versionInfoString.length - 1;
  /*
    Draws the following pattern in the bottom left and mirrors it across the diagnal TL to BR
    1-4-7-10-13-16
    2-5-8-11-14-17
    3-6-9-12-15-18
  */
  for (let c = 0; c < 6; c++) {
    for (let r = 0; r < 3; r++) {
      const bit = versionInfoString[index] === '1';
      const upperBound = size - 11 + r;
      maskedBitMatrix.setBit(upperBound, c, bit, false);
      // Mirror the bits
      maskedBitMatrix.setBit(c, upperBound, bit, false);
      index--;
    }
  }
};
