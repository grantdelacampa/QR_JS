import { splitIntoGroups } from '../../Helpers/HelperFunctions';
import { Groups } from '../../Objects/Groups';
export function groupCodewords(processedCodeWords, errCorrectionInfo) {
  // break the codewords into an array of 8 bit binary strings
  const splitCodeWords = splitIntoGroups(processedCodeWords, 8);
  // Create the list to hold the groups w/first group there will always be at least one

  const codewordGroups = [new Groups()];

  // Determine if there is another group
  if (errCorrectionInfo.length > 5) {
    codewordGroups.push(new Groups());
  }
  // Create a counter to hold out place in the codewords
  let totalCount = 0;
  // now populate each group (may be one or more)
  codewordGroups.forEach((group, index) => {
    // if index == 0 we want to check 2 if index is 1 we want to check 4
    const blocksPerGroup = errCorrectionInfo[(index + 1) * 2];
    // if index == 0 we want to check 3 if index is 1 we want to check 5
    const wordsPerblock = errCorrectionInfo[(index + 1) * 2 + 1];
    // Create each block in the group
    for (let i = 0; i < blocksPerGroup; i++) {
      // push the slice from the previous slice to the previous+wordsPerBlock needed
      group.addBlock(
        splitCodeWords.slice(totalCount, totalCount + wordsPerblock)
      );
      totalCount += wordsPerblock;
    }
  });
  return codewordGroups;
}
