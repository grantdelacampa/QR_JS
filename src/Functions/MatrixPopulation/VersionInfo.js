import { VersionInfoStrings } from '../../Constants/Constants';

/**
 * Draw the version info pattern.
 * - NOTE: this only fires if version is higher than 6
 * @param {BitMatrix} bitMatrix
 * @param {Number} version
 * @returns
 */
export const VersionInfo = (bitMatrix, version) => {
  const size = bitMatrix.size;
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
      // console.log(versionInfoString[index] + '[' + (size - 11 + r) + ',' + c + ']');
      bitMatrix.setBit(size - 11 + r, c, bit, false);
      // console.log(versionInfoString[index] + '[' + c + ',' + (size - 11 + r) + ']');
      // Mirror the bits
      bitMatrix.setBit(c, size - 11 + r, bit, false);
      index++;
    }
  }
};
