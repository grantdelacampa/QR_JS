import { VersionInfoStrings } from '../../Constants/Constants';

/**
 * Draw the version info pattern.
 * - NOTE: this only fires if version is higher than 6
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
  let index = 0;
  /*
    Draws the following pattern in the bottom left and mirrors it across the diagnal TL to BR
    1-4-7-10-13-16
    2-5-8-11-14-17
    3-6-9-12-15-18
  */
  for (let c = 0; c < 6; c++) {
    for (let r = 0; r < 3; r++) {
      const bit = versionInfoString[index] === '1';
      maskedBitMatrix.setBit(size - 11 + r, c, bit, false);
      // Mirror the bits
      maskedBitMatrix.setBit(c, size - 11 + r, bit, false);
      index++;
    }
  }
};
