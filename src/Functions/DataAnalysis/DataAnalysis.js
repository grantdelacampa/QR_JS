import { IS_ALPHANUMERIC, IS_NUMERIC } from '../../Constants/Constants';

/**
 *    Determine the encoding mode for the QRCode based on the input value
 *    todo: Fix SHIFT JIS
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
  for (let i = 0; i < str.length; i++) {
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
  for (let i = 0; i <= str.length; i++) {
    const charCode = str.charCodeAt(i);
    if (charCode > 12288 && charCode < 40879) {
      return true;
    }
  }
  return false;
}
