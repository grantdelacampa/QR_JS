import { padBits, padBitsEnd, splitIntoGroups } from './HelperFunctions';

test('SplitIntoGroups even', () => {
  expect(splitIntoGroups('1111000011110000', 4)).toEqual([
    '1111',
    '0000',
    '1111',
    '0000'
  ]);
});

test('SplitIntoGroups odd', () => {
  expect(splitIntoGroups('11110000111100001', 4)).toEqual([
    '1111',
    '0000',
    '1111',
    '0000',
    '1'
  ]);
});

test('SplitIntoGroups zero case', () => {
  expect(splitIntoGroups('1111', 4)).toEqual(['1111']);
});

test('SplitIntoGroups null case', () => {
  expect(splitIntoGroups('', 4)).toBeNull();
});

test('padBits non zero', () => {
  expect(padBits(3, '11111')).toBe('00011111');
});

test('padBits zero', () => {
  expect(padBits(0, '11111')).toBe('11111');
});

test('padBits empty', () => {
  expect(padBits(0, '')).toBe('');
});

test('padBitsEnd non zero', () => {
  expect(padBitsEnd(3, '11111')).toBe('11111000');
});

test('padBitsEnd zero', () => {
  expect(padBitsEnd(0, '11111')).toBe('11111');
});

test('padBitsEnd empty', () => {
  expect(padBitsEnd(0, '')).toBe('');
});
