
/**
 * Split a string into groups of size and return it as an array.
 * @param {String} str 
 * @param {String} size 
 * @returns 
 */
  export function splitIntoGroups(str, size) {
    const regex = new RegExp(`.{1,${size}}`, "g");
    return str.match(regex);
  }

  /**
   * Pad a binary number with padding number of 0s
   * @param {Int} padding 
   * @param {String} target 
   * @returns 
   */
  export function padBits(padding, target){
    return "0".repeat(padding) + target;
  }