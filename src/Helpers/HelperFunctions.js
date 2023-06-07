/**
 * Split a string into groups of size and return it as an array.
 * @param {String} str
 * @param {String} size
 * @returns
 */
export function splitIntoGroups(str, size) {
  const regex = new RegExp(`.{1,${size}}`, 'g');
  return str.match(regex);
}

/**
 * Pad a binary number with padding number of 0s
 * @param {Int} padding
 * @param {String} target
 * @returns
 */
export function padBits(padding, target) {
  return '0'.repeat(padding) + target;
}

export function padBitsEnd(padding, target) {
  return target + '0'.repeat(padding);
}

export function getQRSize(version) {
  return (version - 1) * 4 + 21;
}

export function getCorner(version) {
  return (version - 1) * 4 + 21 - 7;
}

export const getScaleFactor = (qrSize, canvasSize) => {
  let diff = 0;
  // Scaling Up
  if (qrSize < canvasSize) {
    diff = canvasSize / qrSize;
  }
  return diff;
};

export function getDarkModule(version) {
  return [4 * version + 9, 8];
}
