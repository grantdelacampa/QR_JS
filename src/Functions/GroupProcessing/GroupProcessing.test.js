import { Groups } from '../../Objects/Groups';
import { groupCodewords } from './GroupProcessing';

describe('GroupProcessing', () => {
  test('groupCodewords Small', () => {
    const codeWords =
      '00100000010110110000101101111000110100010111001011011100010011010100001101000000111011000001000111101100000100011110110000010001111011000001000111101100';
    const errorInfo = [19, 7, 1, 19, 19];
    const result = groupCodewords(codeWords, errorInfo);
    const expectedGroup = new Groups();
    expectedGroup.addBlock([
      '00100000',
      '01011011',
      '00001011',
      '01111000',
      '11010001',
      '01110010',
      '11011100',
      '01001101',
      '01000011',
      '01000000',
      '11101100',
      '00010001',
      '11101100',
      '00010001',
      '11101100',
      '00010001',
      '11101100',
      '00010001',
      '11101100'
    ]);
    expect(result).toStrictEqual([expectedGroup]);
  });
});
