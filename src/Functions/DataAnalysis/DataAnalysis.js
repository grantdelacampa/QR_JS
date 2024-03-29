/**
 * QR Code Data Analysis functions
 *
 * @link   DataAnalysis
 * @file   This file contains the functions used for DataAnalysis in QR code generation
 * @author Grant De La Campa.
 * @since  1.0.0
 */
import { IS_ALPHANUMERIC, IS_NUMERIC } from '../../Constants/Constants';

/**
 *    Determine the encoding mode for the QRCode based on the input value
 * @param {String} input
 * @returns
 */
export function decideMode(input) {
  // Mode 1: numeric
  if (IS_NUMERIC.test(input)) {
    return 'numeric';
    // Mode 2: alphanumeric
  } else if (IS_ALPHANUMERIC.test(input)) {
    return 'alphanumeric';
    // Mode 3: byte mode
  } else if (isISO88591(input)) {
    return 'byte';
    // Mode 4: Shift JIS Kanji mode
  } else if (isShiftJIS(input)) {
    return 'kanji';
  }
  throw new Error('Failed to find correct encoding mode');
}

/**
 *  Parse through a string to determine if all characters fall in the ISO encoding
 * @param {String} str
 * @returns
 */
function isISO88591(str) {
  const strLength = str.length;
  for (let i = 0; i < strLength; i++) {
    if (str.charCodeAt(i) > 255) {
      return false;
    }
  }
  return true;
}

/**
 * isShiftJIS
 *    Parse through a string to determine if all characters fall in the SHIFTJS encoding
 * @param {String} str
 * @returns
 */
function isShiftJIS(str) {
  const strLength = str.length;
  for (let i = 0; i <= strLength; i++) {
    const charCode = str.charCodeAt(i);
    if (charCode > 12288 && charCode < 40879) {
      return true;
    }
  }
  return false;
}
