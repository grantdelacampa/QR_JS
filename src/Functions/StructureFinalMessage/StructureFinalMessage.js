import { Groups } from "../../Objects/Groups";
import { GenerateErrorCode } from "../ErrorCorrectionCoding/ErrorCorrectionCoding";
export function StructureFinalMessage(dataCodeWordGroups, errorCorrectionInfo){
    let response = "";
    const errorCodewordGroups = generateErrorCodeWords(dataCodeWordGroups, errorCorrectionInfo);
    // This is the best possible case for complexity
    if(errorCorrectionInfo.length < 6 && errorCorrectionInfo[2] === 1){
        // No interleaving is necessary place the error correction codewords after the data codewords
        response = dataCodeWordGroups[0].blocks[0].join('') + errorCodewordGroups[0].blocks[0].join('');
    } else {
        /*
        take the first data codeword from the first block
        followed by the first data codeword from the second block
        followed by the first data codeword from the third block
        followed by the first data codeword from the fourth block
        followed by the second data codeword from the first block
        */
       const interlevenCodeWords = [];
       
    }
    return response;
}

/**
 * Break down the groups -> blocks and generate the errorCode blocks required
 * @param {[]} dataCodeWordGroups 
 * @param {[]} errCorrectionInfo 
 * @returns 
 */
function generateErrorCodeWords(dataCodeWordGroups, errCorrectionInfo){
    // Find the group count
    const errorCodeGroups = dataCodeWordGroups.length > 1 ? [new Groups(), new Groups()] : [new Groups()];
    const errorCodesPerBlock = errCorrectionInfo[1];
    // Find the blocks per group
    // Find the error codes per block
    // For each block use the dataCodeWordsGroups coresponding to that block to generate the codewords
    errorCodeGroups.forEach((group, index) => {
        // Block counts are the same and we need the block data anyways
        const blocksInGroup = dataCodeWordGroups[index].blocks;
        // Generate the error codes for each block
        blocksInGroup.forEach((codeWordBlock, index) => {
            const errBlock = GenerateErrorCode(codeWordBlock, errorCodesPerBlock);
            group.addBlock(errBlock);
        });
    });
    return errorCodeGroups;
}