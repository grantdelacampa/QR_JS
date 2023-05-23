import { processInput } from "./InputBinaryProcessing"

test('Process Input Failure', () =>{
    expect(processInput("noMode")).toBe("ERROR");
})

/*=======================================================================
    Numeric Processing Tests
========================================================================*/

test('Numeric Input 1 digits', ()=> {
    const results = processInput('numeric', "4");
    expect(results).toBe("0100");
})

test('Numeric Input 2 digits', ()=> {
    const results = processInput('numeric', "12");
    expect(results).toBe("0001100");
})

test('Numeric Input 3 digits', ()=>{
    const results = processInput('numeric', "123");
    expect(results).toBe("0001111011");
})

test("Numeric Input 4 digits", () => {
    const results = processInput('numeric', "1234");
    expect(results).toBe("00011110110100")
})

test("Numeric Input 6 digits w/zeros", () => {
    const results = processInput('numeric', "123004");
    expect(results).toBe("00011110110100")
})

test('Numeric Input w/ leading 0', ()=>{
    const results = processInput('numeric', "012");
    expect(results).toBe("0001100");
})

test('Numeric Input w/2 leading 0s', () =>{
    const results = processInput('numeric', "001");
    expect(results).toBe("0001");
    expect(results).toHaveLength(4);
})

/*=======================================================================
    AlphaNumeric Processing Tests
========================================================================*/

test('AlphaNumeric HE', () => {
    const results = processInput('alphanumeric', "HE");
    expect(results).toBe("01100001011");
})

// TODO OTHER TESTS!

/*=======================================================================
    Byte Processing Tests
========================================================================*/

/*=======================================================================
    Kanji Processing Tests
========================================================================*/
