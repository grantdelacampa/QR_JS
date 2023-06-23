export class Polynomial {
  #coefs = [];
  #degrees = [];

  /**
   * Constructs an array in the format a[0]+x^b[0]+...a[n]x^b[n]
   * @param {*} a
   * @param {*} b
   */
  constructor(coefs, degrees) {
    this.#coefs = coefs;
    this.#degrees = degrees;
  }

  /**
   * get the array of coefs
   * @returns Array
   */
  get coefs() {
    return this.#coefs;
  }

  coefAt(index) {
    return this.#coefs[index];
  }

  /**
   * get the array of degrees
   * @returns Array
   */
  get degrees() {
    return this.#degrees;
  }

  degreeAt(index) {
    return this.#degrees[index];
  }

  get size() {
    return this.degrees.length;
  }

  /**
   * drop the leading terms from the polynomial
   */
  shift() {
    this.#coefs.shift();
    this.#degrees.shift();
  }

  /**
   * reduce the value of each degree by dividing by x
   */
  reduceDegrees() {
    this.#degrees.forEach((deg, index) => {
      this.#degrees[index] = deg - 1;
    });
  }

  toHexString() {
    return this.#coefs.map(c => c.toString(16).padStart(2, '0'));
  }

  /**
   * Return a string representation of this polynomial
   * @returns String
   */
  toString() {
    let output = '';
    const size = this.#degrees.length;
    for (let i = 0; i < size; i++) {
      output = output + this.#coefs[i] + 'x^' + this.#degrees[i];
      if (size - 1 !== i) {
        output = output + ' + ';
      }
    }
    return output;
  }
}
