import { GeneratorPolynomial } from "../Classes/GeneratorPolynomial";
import { intToAlpha } from "../Constants/Constants";
import { splitIntoGroups } from "./HelperFunctions";
import { alphaToInt } from "../Constants/Constants";
export function ErrorCorrectionCoding(finalPaddedInput, errCorrectionInfo){
    // this is the standard first polynomial used to generate the generator Polynomial
    const genisisPolynomial = new GeneratorPolynomial([0,0], [1,0]);
    // Generate the Generator Polynomial
    let generatorPolynomial = calculateGeneratorPolynomial(genisisPolynomial, errCorrectionInfo);
    // Generate a message polynomial
    const messagePolynomial = parseBinaryStreamToPolynomial(finalPaddedInput, errCorrectionInfo[1]);
    // Get the difference of the leads and multiply it in to pad the generator polynomial
    generatorPolynomial = generatorPolynomial.multiply(new GeneratorPolynomial([0],[messagePolynomial.getStdCoef()[0] - generatorPolynomial.getStdCoef()[0]]));  
    const codeWordPolynomial = performLongDivision(generatorPolynomial, messagePolynomial, errCorrectionInfo[0]); 
    const codeWords = [];
    codeWordPolynomial.getAlphaCoef().forEach((element) => {codeWords.push(alphaToInt[element])});
    return codeWords;
}

function calculateGeneratorPolynomial(genisisPolynomial, errCorrectionInfo){
    let generatorPolynomial;
    // Multiply the generatorPolynomial by x^i+a^1
    for(let i = 1; i < errCorrectionInfo[1]; i++){ 
      (i === 1) ? (generatorPolynomial = genisisPolynomial.multiply(new GeneratorPolynomial([0,i], [1,0]))) : 
      (generatorPolynomial = generatorPolynomial.multiply(new GeneratorPolynomial([0,i], [1,0])));
    }
    return generatorPolynomial;
}


function parseBinaryStreamToPolynomial(bStream, crctnCodeCnt){
    // 1st Convert binary numbers into decimal
    const converted = splitIntoGroups(bStream, 8).map((bNum)=>{return parseInt(bNum, 2)});
    // 2nd the message polynomal will be converted[0]x^converted.length-1
    // 2nd multiply the message polynomial by x^n where n is crctnCodeCnt
    // Convert the lead terms to alpha notation 
    const alphaArray  = [];
    const stdArray = [];
    converted.forEach((digit, index) => {alphaArray.push(intToAlpha[digit]); stdArray.push((converted.length-index) + crctnCodeCnt -1)})
    return new GeneratorPolynomial(alphaArray, stdArray);
  }

  function performLongDivision(generatorPolynomial, messagePolynomial, codeWordCount){
    let xorResult = new GeneratorPolynomial([],[]);
    let multiplyResult = new GeneratorPolynomial([],[]);
    // Perform the Polynomial long division
    for(let i = 0; i< codeWordCount; i ++){
        if(i === 0){
        // Step 1a α5x25 + α1x24 + α72x23 + α51x22 + α66x21 + α123x20 + α75x19 + α69x18 + α99x17 + α37x16 + α50x15
        multiplyResult = generatorPolynomial.multiply(new GeneratorPolynomial([messagePolynomial.getAlphaCoef()[0]],[0]));
        // Step 1b 89x24 + 110x23 + 114x22 + 176x21 + 183x20 + 211x19 + 98x18 + 197x17 + 10x16 + 233x15 + 17x14 + 236x13 + 17x12 + 236x11 + 17x10
        xorResult = messagePolynomial.xorPolynomial(multiplyResult);
        } else {
        generatorPolynomial.decrimentStdArry();
        // step na
        multiplyResult = generatorPolynomial.multiply(new GeneratorPolynomial([xorResult.getAlphaCoef()[0]],[0]));
        // Step nb
        xorResult = xorResult.xorPolynomial(multiplyResult);
        }
    }
    return xorResult;
  }