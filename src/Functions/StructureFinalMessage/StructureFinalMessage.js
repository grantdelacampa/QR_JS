/**
 * QR Code Structure Final message function.
 * Contains the functions to process the input into the error and data codewords. Then perform the interleavening
 *
 * @link   StructureFinalMessage
 * @file   This file contains the function used to generate the error and data codewords then structure them to be place into the bitmatrix
 * @author Grant De La Campa.
 * @since  1.0.0
 */
import { Groups } from '../../Objects/Groups';
import { GenerateErrorCode } from '../ErrorCorrectionCoding/ErrorCorrectionCoding';
import { padBitsEnd } from '../../Helpers/HelperFunctions';
export function StructureFinalMessage(
  dataCodeWordGroups,
  errorCorrectionInfo,
  remainderBits
) {
  let response;
  const errorCodewordGroups = generateErrorCodeWords(
    dataCodeWordGroups,
    errorCorrectionInfo
  );
  // This is the best possible case for complexity
  if (errorCorrectionInfo.length < 6 && errorCorrectionInfo[2] === 1) {
    // No interleaving is necessary place the error correction codewords after the data codewords
    response =
      dataCodeWordGroups[0].blocks[0].join('') +
      errorCodewordGroups[0].blocks[0].join('');
  } else {
    // Create an array of codeword blocks (this makes it easier to iterate on)
    const dataCodeWordBlocks = getFlattenedGroups(
      dataCodeWordGroups,
      errorCorrectionInfo.length
    );
    // Create an array of Error codeword blocks (this makes it easier to iterate on)
    const errorCodeWordBlocks = getFlattenedGroups(
      errorCodewordGroups,
      errorCorrectionInfo.length
    );
    const interleavenedDataCodes = interleavenCodes(
      dataCodeWordBlocks,
      errorCorrectionInfo[0]
    );
    const interleavenedErrCodes = interleavenCodes(
      errorCodeWordBlocks,
      getTotalErrorCodeWords(errorCorrectionInfo)
    );
    response = [...interleavenedDataCodes, ...interleavenedErrCodes].join('');
  }
  return padBitsEnd(remainderBits, response);
}

/**
 * Interleven blocks of varying lengths stopping when the interleven array is of length totalCodes.
 *
 * Example:
 *  - Block 1: [1 , 2, 3, 4, 5];
 *  - Block 2: [6, 7, 8, 9, 10];
 *  - totalCodes: 9;
 *  - Result: [1, 6, 3, 7, 3, 8, 4, 9, 5, 10];
 * @param {Array} blocks
 * @param {Number} totalCodes
 * @returns
 */
function interleavenCodes(blocks, totalCodes) {
  const interleavenedCodes = [];
  let index = 0;
  do {
    blocks.forEach((block) => {
      if (block[index]) {
        interleavenedCodes.push(block[index]);
      }
    });
    index++;
  } while (interleavenedCodes.length < totalCodes);
  return interleavenedCodes;
}

/**
 * Extract the total error correction codes needed from the errorCorrectionInfo array. Which is derived from the const file.
 * @param {Array} errCorrectionInfo
 * @returns
 */
function getTotalErrorCodeWords(errCorrectionInfo) {
  // calculate the total number of error correction words
  let totalErrorCodes = errCorrectionInfo[1] * errCorrectionInfo[2];
  if (errCorrectionInfo.length > 6) {
    totalErrorCodes += errCorrectionInfo[1] * errCorrectionInfo[4];
  }
  return totalErrorCodes;
}

/**
 * Pull blocks from a list of 1 or 2 groups and combine those blocks into a single array
 * @param {Array} groupList
 * @param {Number} errCorrectionInfoLength
 * @returns
 */
function getFlattenedGroups(groupList, errCorrectionInfoLength) {
  if (errCorrectionInfoLength < 6) {
    return groupList[0].blocks;
  } else {
    return [...groupList[0].blocks, ...groupList[1].blocks];
  }
}

/**
 * Break down the groups -> blocks and generate the errorCode blocks required
 * @param {Array} dataCodeWordGroups
 * @param {Array} errCorrectionInfo
 * @returns
 */
function generateErrorCodeWords(dataCodeWordGroups, errCorrectionInfo) {
  // Find the group count
  const errorCodeGroups =
    dataCodeWordGroups.length > 1
      ? [new Groups(), new Groups()]
      : [new Groups()];
  const errorCodesPerBlock = errCorrectionInfo[1];
  // Find the blocks per group
  // Find the error codes per block
  // For each block use the dataCodeWordsGroups coresponding to that block to generate the codewords
  errorCodeGroups.forEach((group, index) => {
    // Block counts are the same and we need the block data anyways
    const blocksInGroup = dataCodeWordGroups[index].blocks;
    // Generate the error codes for each block
    blocksInGroup.forEach((codeWordBlock) => {
      const errBlock = GenerateErrorCode(codeWordBlock, errorCodesPerBlock);
      group.addBlock(errBlock);
    });
  });
  return errorCodeGroups;
}
