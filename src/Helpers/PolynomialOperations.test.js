import { Polynomial } from '../Objects/Polynomial';
import { multiply, xorPolynomial } from './PolynomialOperations';

describe('Polynomial Operations', () => {
  test('Multiplication', () => {
    const poly1 = new Polynomial([1, 1], [1, 0]);
    const poly2 = new Polynomial([1, 2], [1, 0]);
    const result = multiply(poly1, poly2);
    expect(result.coefs).toStrictEqual([1, 3, 2]);
    expect(result.degrees).toStrictEqual([2, 1, 0]);
  });
  test('XOR', () => {
    const poly1 = new Polynomial(
      [
        32, 91, 11, 120, 209, 114, 220, 77, 67, 64, 236, 17, 236, 17, 236, 17
      ],
      [25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10]
    );
    const poly2 = new Polynomial(
      [32, 2, 101, 10, 97, 197, 15, 47, 134, 74, 5],
      [25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15]
    );
    const result = xorPolynomial(poly1, poly2);
    expect(result.coefs).toStrictEqual([
      89, 110, 114, 176, 183, 211, 98, 197, 10, 233, 17, 236, 17, 236, 17
    ]);
    expect(result.degrees).toStrictEqual([
      24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10
    ]);
  });
});
