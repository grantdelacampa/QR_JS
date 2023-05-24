
/*=======================================================================
    Numeric Processing Tests
========================================================================*/

import { fitTotalBits, getSmallestQRVersion } from "./DataEncoding"

describe('GetSmallestQRVersion', () => {
    test('Empty', () => {
        const result = getSmallestQRVersion();
        expect(result).toStrictEqual([1,17]);
    })

    test('Input: 400, mode: numeric, level: L', () => {
        const result = getSmallestQRVersion(400, "numeric", "L");
        expect(result).toStrictEqual([8,461]);
    });

    test('Input: 400, mode: alphanumeric, level: M', () => {
        const result = getSmallestQRVersion(400, "alphanumeric", "M");
        expect(result).toStrictEqual([12,419]);
    });

    test('Input: 400, mode: byte, level: Q', () => {
        const result = getSmallestQRVersion(400, "byte", "Q");
        expect(result).toStrictEqual([19,442]);
    });
});

describe('FitTotalBits', () => {
    test('Zero', () => {
        const result = fitTotalBits();
        expect(result).toBe("");
    })

    test('Difference of three', () => {
        const result = fitTotalBits(8, "11111");
        expect(result).toHaveLength(8);
        expect(result).toBe("11111000");
    })

    test('Difference of five', () => {
        const result = fitTotalBits(16, "1");
        expect(result).toHaveLength(16);
        expect(result).toBe("1000000011101100");
    })

    test('Difference of four', () => {
        const result = fitTotalBits(8, "1111");
        expect(result).toHaveLength(8);
        expect(result).toBe("11110000")
    })
})