import { Groups } from "../../Objects/Groups";
import { GenerateErrorCode } from "../ErrorCorrectionCoding/ErrorCorrectionCoding";
export function StructureFinalMessage(dataCodeWordGroups, errorCorrectionInfo){
    let response = "";
    // This is the best possible case for complexity
    const errorCodewordGroups = generateCodeWords(dataCodeWordGroups, errorCorrectionInfo);
    if(errorCorrectionInfo.length < 6 && errorCorrectionInfo[2] === 1){
        // No interleaving is necessary place the error correction codewords after the data codewords
        // TODO: Process the error codewords to binary
        response = dataCodeWordGroups[0].blocks[0].join('') + errorCodewordGroups[0].blocks[0].join('');
    } else {
        // TODO:
        // Interleave the data to form the final message
        // iterate on groups => blocks => codewords/block
    }
    return response;
}

function generateCodeWords(dataCodeWordGroups, errCorrectionInfo){
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