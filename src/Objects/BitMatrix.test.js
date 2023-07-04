import { BitMatrix } from "./BitMatrix";

describe('BitMatrix', () => {
    let bitMatrix;
    beforeAll(() => {
    bitMatrix = new BitMatrix(21);
    // Generate a checkered pattern
    for(let i = 0; i < 21; i++){
        for(let j = 0; j < 21; j++){
            const value = ((i % 2) === 1);
            bitMatrix.setBit(i,j, value, !value);
        }
    }
    });
    test('getBit', () => {
        for(let i = 0; i < 21; i++){
            for(let j = 0; j < 21; j++){
                const bit = bitMatrix.getBit(i,j);
                expect(bit).toEqual(((i % 2) ? 1: 0));
            }
        }
    });
    test('isReserved', () => {
        expect(bitMatrix.isReserved(0,0)).toEqual(1);
        expect(bitMatrix.isReserved(1,0)).toEqual(0);
    });
    test('xorBit', () => {
        const startBit = bitMatrix.getBit(0,0);
        bitMatrix.xorBit(0,0,1);
        expect(bitMatrix.getBit(0,0)).not.toEqual(startBit);
    });
});