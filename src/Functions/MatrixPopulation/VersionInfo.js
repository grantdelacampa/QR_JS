/**
 * QR Code Verson Info Pattern function.
 *
 * @link   VersionInfo
 * @file   This file contains the function used draw the Version Info pattern.
 * @author Grant De La Campa.
 * @since  1.0.0
 */
import { VersionInfoStrings } from '../../Constants/Constants';

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
