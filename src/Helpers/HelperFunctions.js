/**
 * Helper functions.
 * Contains the functions used throughout the codebase for things like padding binary.
 *
 * @link   HelperFunctions
 * @file   This file contains the helper functions used accross the code base.
 * @author Grant De La Campa.
 * @since  1.0.0
 */
/**
 * Split a string into groups of size and return it as an array.
 * @param {String} str
 * @param {Number} size
 * @returns
 */
export function splitIntoGroups(str, size) {
  const regex = new RegExp(`.{1,${size}}`, 'g');
  return str.match(regex);
}

/**
 * Pad the front of a binary number with padding number of 0s
 * @param {Int} padding
 * @param {String} target
 * @returns
 */
export function padBits(padding, target) {
  return '0'.repeat(padding) + target;
}

/**
 * Pad the back of a binary number with padding number of 0s
 * @param {Int} padding
 * @param {String} target
 * @returns
 */
export function padBitsEnd(padding, target) {
  return target + '0'.repeat(padding);
}

/**
 * Find the scale number to fit qrSize to canvasSize
 * @param {Number} qrSize
 * @param {Number} canvasSize
 * @returns
 */
export const getScaleFactor = (qrSize, canvasSize) => {
  let diff = 0;
  // Scaling Up
  if (qrSize < canvasSize) {
    diff = canvasSize / qrSize;
  }
  return diff;
};
