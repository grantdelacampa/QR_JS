import { Polynomial } from './Polynomial';
describe('Polynomial', () => {
  let polynomial;
  beforeAll(() => {
    polynomial = new Polynomial([6, 5, 4, 3, 2, 1], [5, 4, 3, 2, 1, 0]);
  });
  test('getCoef', () => {
    expect(polynomial.coefs).toStrictEqual([6, 5, 4, 3, 2, 1]);
  });
  test('coefAt', () => {
    expect(polynomial.coefAt(3)).toEqual(3);
  });
  test('getDegrees', () => {
    expect(polynomial.degrees).toStrictEqual([5, 4, 3, 2, 1, 0]);
  });
  test('coefAt', () => {
    expect(polynomial.degreeAt(3)).toEqual(2);
  });
  test('getSize', () => {
    expect(polynomial.size).toEqual(6);
  });
  test('shift', () => {
    polynomial.shift();
    expect(polynomial.coefs).toHaveLength(5);
    expect(polynomial.degrees).toHaveLength(5);
    expect(polynomial.degrees).toStrictEqual([4, 3, 2, 1, 0]);
    expect(polynomial.coefs).toStrictEqual([5, 4, 3, 2, 1]);
  });
  test('reduceDegrees', () => {
    polynomial.reduceDegrees();
    expect(polynomial.degrees).toStrictEqual([3, 2, 1, 0, -1]);
  });
});
