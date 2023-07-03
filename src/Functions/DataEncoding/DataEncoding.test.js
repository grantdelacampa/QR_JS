/* =======================================================================
    Numeric Processing Tests
======================================================================== */

import { fitTotalBits, getModeBitLength, getSmallestQRVersion } from './DataEncoding';

describe('GetSmallestQRVersion', () => {
  test('Empty', () => {
    const result = getSmallestQRVersion();
    expect(result).toStrictEqual([1, 17]);
  });

  test('Input: 400, mode: numeric, level: L', () => {
    const result = getSmallestQRVersion(400, 'numeric', 'L');
    expect(result).toStrictEqual([8, 461]);
  });

  test('Input: 400, mode: alphanumeric, level: M', () => {
    const result = getSmallestQRVersion(400, 'alphanumeric', 'M');
    expect(result).toStrictEqual([12, 419]);
  });

  test('Input: 400, mode: byte, level: Q', () => {
    const result = getSmallestQRVersion(400, 'byte', 'Q');
    expect(result).toStrictEqual([19, 442]);
  });
});

describe('getModeBitLength', () => {
  test('1-9 Numeric', () => {
    for(let i = 0; i < 10; i++){
      const modeBitLength = getModeBitLength(i, 'numeric');
      expect(modeBitLength).toEqual(10);
    }
  });
  test('10-26 Numeric', () => {
    for(let i = 10; i < 27; i++){
      const modeBitLength = getModeBitLength(i, 'numeric');
      expect(modeBitLength).toEqual(12);
    }});
  test('27-40 Numeric', () => {
    for(let i = 27; i < 41; i++){
      const modeBitLength = getModeBitLength(i, 'numeric');
      expect(modeBitLength).toEqual(14);
    }});
  test('1-9 AlphaNumeric', () => {
    for(let i = 0; i < 10; i++){
      const modeBitLength = getModeBitLength(i, 'alphanumeric');
      expect(modeBitLength).toEqual(9);
    }});
  test('10-26 AlphaNumeric', () => {
    for(let i = 10; i < 27; i++){
      const modeBitLength = getModeBitLength(i, 'alphanumeric');
      expect(modeBitLength).toEqual(11);
    }});
  test('27-40 AlphaNumeric', () => {
    for(let i = 27; i < 41; i++){
      const modeBitLength = getModeBitLength(i, 'alphanumeric');
      expect(modeBitLength).toEqual(13);
    }});
  test('1-9 Byte', () => {
    for(let i = 0; i < 10; i++){
      const modeBitLength = getModeBitLength(i, 'byte');
      expect(modeBitLength).toEqual(8);
    }});
  test('10-26 Byte', () => {
    for(let i = 10; i < 27; i++){
      const modeBitLength = getModeBitLength(i, 'byte');
      expect(modeBitLength).toEqual(16);
    }});
  test('27-40 Byte', () => {
    for(let i = 27; i < 41; i++){
      const modeBitLength = getModeBitLength(i, 'byte');
      expect(modeBitLength).toEqual(16);
    }});
    test('1-9 Kanji', () => {
      for(let i = 0; i < 10; i++){
        const modeBitLength = getModeBitLength(i, 'kanji');
        expect(modeBitLength).toEqual(8);
      }});
    test('10-26 Kanji', () => {
      for(let i = 10; i < 27; i++){
        const modeBitLength = getModeBitLength(i, 'kanji');
        expect(modeBitLength).toEqual(10);
      }});
    test('27-40 Kanji', () => {
      for(let i = 27; i < 41; i++){
        const modeBitLength = getModeBitLength(i, 'kanji');
        expect(modeBitLength).toEqual(12);
      }});
    test('Error', () => {
      expect(() => {getModeBitLength(50, 'test')}).toThrowError("Unknown Version");
    })
})

describe('FitTotalBits', () => {
  test('Zero', () => {
    const result = fitTotalBits();
    expect(result).toBe('');
  });

  test('Difference of three', () => {
    const result = fitTotalBits(8, '11111');
    expect(result).toHaveLength(8);
    expect(result).toBe('11111000');
  });

  test('Difference of five', () => {
    const result = fitTotalBits(16, '1');
    expect(result).toHaveLength(16);
    expect(result).toBe('1000000011101100');
  });

  test('Difference of four', () => {
    const result = fitTotalBits(8, '1111');
    expect(result).toHaveLength(8);
    expect(result).toBe('11110000');
  });
});
