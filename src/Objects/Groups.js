/**
 * Groups Class.
 *
 * @link   Groups
 * @file   This file contains a class to represent a group of codeword blocks.
 * @author Grant De La Campa.
 * @since  1.0.0
 */
export class Groups {
  #blocks = [];

  get blocks() {
    return this.#blocks;
  }

  addBlock(block) {
    this.#blocks.push(block);
  }

  getBlockAtIndex(index) {
    return this.#blocks[index];
  }

  toString() {
    let output = '';
    this.#blocks.forEach((block, index) => {
      output = output + 'Block ' + index + ': ' + block.toString();
    });
    return output;
  }
}
