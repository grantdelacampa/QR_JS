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
