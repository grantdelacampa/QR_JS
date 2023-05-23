import { padBits, padBitsEnd, splitIntoGroups } from "./HelperFunctions"

test('Test SplitIntoGroups helper', () => {
    expect(splitIntoGroups("1111000011110000", 4)).toEqual(["1111", "0000", "1111", "0000"]);
})

test('Test padBits helper', ()=> {
    expect(padBits(3, "11111")).toBe("00011111");
})
test('Test padBitsEnd helper', ()=> {
    expect(padBitsEnd(3, "11111")).toBe("11111000");
})