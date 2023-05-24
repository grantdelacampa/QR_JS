import { processInput } from "./InputBinaryProcessing"

test('Process Input Failure', () =>{
    expect(processInput("noMode")).toBe("ERROR");
})

/*=======================================================================
    Numeric Processing Tests
========================================================================*/
describe('Process Numeric Input', () => {
    test('Single digit', ()=> {
        const results = processInput('numeric', "4");
        expect(results).toBe("0100");
    })
    
    test('Two digits', ()=> {
        const results = processInput('numeric', "12");
        expect(results).toBe("0001100");
    })
    
    test('Three digits', ()=>{
        const results = processInput('numeric', "123");
        expect(results).toBe("0001111011");
    })
    
    test("Four digits", () => {
        const results = processInput('numeric', "1234");
        expect(results).toBe("00011110110100")
    })
    
    test("Six digits w/zeros", () => {
        const results = processInput('numeric', "123004");
        expect(results).toBe("00011110110100")
    })
    
    test('Input w/ leading 0', ()=>{
        const results = processInput('numeric', "012");
        expect(results).toBe("0001100");
    })
    
    test('Input w/2 leading 0s', () =>{
        const results = processInput('numeric', "001");
        expect(results).toBe("0001");
        expect(results).toHaveLength(4);
    })
});


/*=======================================================================
    AlphaNumeric Processing Tests
========================================================================*/

describe('Process AlphaNumeric Input', () => {
    test('Two letters', () => {
        const results = processInput('alphanumeric', "HE");
        expect(results).toBe("01100001011");
    })
    
    test('Empty', () => {
        const results = processInput('alphanumeric', "");
        expect(results).toBe("");
    })
    
    test('One letter', () => {
        const results = processInput('alphanumeric', "H")
        expect(results).toBe("010001");
    })
});


/*=======================================================================
    Byte Processing Tests
    - Convert each byte into an 8 bit binary string padding the left with 0
========================================================================*/
// describe('Process Byte Input',() => {
//     test('Empty', ()=>{
//         const results = processInput('byte', "");
//         expect(results).toBe("");
//     })
//     test('Output is divisable by 8', () => {
//         const results = processInput('byte', "ndandpoe34ods");
//         expect(results % 8).toEqual(0);
//     })
//     test('Single letter Input', () => {
//         const results = processInput('byte', "H");
//         expect(results).toBe("01001000");
//     })
//     test('Full Input', () => {
//         const results = processInput('byte', "Hello, World!");
//         expect(results).toBe("01001000011001010110110001101100011011110010110000100000011101110110111101110010011011000110010000100001");
//     })
// });

/*=======================================================================
    Kanji Processing Tests
========================================================================*/
