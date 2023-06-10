/* eslint-disable */
import { FormatInfoStrings } from '../../Constants/Constants';

export const DrawFormatInfo = (dataMaskResult, errCrtnLvl) => {
    const formatString = FormatInfoStrings[errCrtnLvl + dataMaskResult[0]];
    console.log(formatString);
    const maskedBitMatrix = dataMaskResult[1];
    const size = maskedBitMatrix.size;
    let index = 0;
    let index2 = 0;
    let index3 = formatString.length - 1;
    // traverse the columns
    for (let c = 0; c < 9; c++) {
        // If we hit the corner then traverse up col 8
        if (c === 8) {
            // Traverse up col 8
            for (let r = 8; r > -1; r--) {
                // Do not overwrite the timing pattern!
                if (r !== 6) {
                    // Set the format from [8,8] => [0,8]
                    // console.log(formatString[index] + '[' + r + ',' + c + ']');
                    maskedBitMatrix.setBit(r, c, formatString[index] === '1', false);
                    index++;
                }
                // Do not overwrite the dark module!
                if (r > 1) {
                    // Set the format from [20, 8] => [13, 8]
                    // console.log(formatString[index2] + '[' + (size - (9 - r)) + ',' + c + ']')
                    maskedBitMatrix.setBit((size - (9 - r)), c, formatString[index] === '1', false);
                    index2++;
                }
            }
            // do not overwrite the timing pattern!!
        } else {
            if (c !== 6) {
                // Set the bits from [8, 0] => [8, 7]
                // console.log(formatString[index] + '[' + 8 + ',' + c + ']');
                maskedBitMatrix.setBit(8, c, formatString[index] === '1', false);
                index++;
            }
            console.log(formatString[index3] + '[' + 8 + ',' + (size - c - 1) + ']');
            // Set the bits from [8, 20] -> [8, 13]
            maskedBitMatrix.setBit(8, (size - c - 1), formatString[index] === '1', false);
            index3--;
        }
    }
};
