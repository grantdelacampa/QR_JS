import { Groups } from "./Groups";

describe('Polynomial', () => {
    let groups;
    beforeAll(() => {
        groups = new Groups()});
    test('addAndGetBlocks', () => {
        groups.addBlock([1,2,3,4]);
        groups.addBlock([5,6,7,8]);
        const blocks = groups.blocks;
        expect(blocks).toStrictEqual([[1,2,3,4],[5,6,7,8]]);
    });
    test('getBlockAtIndex', () => {
        const block = groups.getBlockAtIndex(1);
        expect(block).toStrictEqual([5,6,7,8]);
    });
});