/**
 * BitMatrix object to hold the qr matrix data in a flat array
 *
 * @example
 *  BitMatrix.data = 0010100101011111
 *  BitMatrix.size = 4
 *  represents:
 *      0010
 *      1001
 *      0101
 *      1111
 */
export class BitMatrix {
  size;
  data;
  reservedBit;
  /**
   *
   * @param {Integer} size
   */
  constructor(size) {
    this.size = size;
    this.data = new Uint8Array(size * size);
    this.reservedBit = new Uint8Array(size * size);
  }

  /**
   * helper to set a bit at a given r and c. Also can handle setting reserved bit since the data is stored in a
   * flat array we want to check r * this.size + col
   *
   * @param {Integer} r
   * @param {Integer} c
   * @param {Boolean} v
   * @param {Boolean} res
   */
  setBit(r, c, v, res) {
    this.data[r * this.size + c] = v;
    if (res) {
      this.reservedBit[r * this.size + c] = true;
    }
  }

  /**
   * helper to return a bit located at r and c since the data is stored in a
   * flat array we want to check r * this.size + col
   * @param {Integer} r
   * @param {Integer} c
   * @returns Boolean
   */
  getBit(r, c) {
    return this.data[r * this.size + c];
  }

  /**
   * xor a bit at a r and c with v
   * @param {Integer} r
   * @param {Integer} c
   * @param {Boolean} v
   */
  xorBit(r, c, v) {
    this.data[r * this.size + c] ^= v;
  }

  /**
   * Check if the given r and c are reserved bits
   * @param {Integer} r
   * @param {Integer} c
   * @returns Boolean
   */
  isReserved(r, c) {
    return this.reservedBit[r * this.size + c];
  }

  toString() {
    let string = '';
    for (let c = 0; c < this.size; c++) {
      for (let r = 0; r < this.size; r++) {
        string = string + (this.getBit(c, r) ? '\u{25A0}' : '\u{25A1}');
      }
      string = string + '\n';
    }
    return string;
  }
}
