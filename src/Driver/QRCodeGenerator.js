/**
 * This driver function contains the various steps required to generate the final Bitmatrix representation of a QR code.
 *
 * @link   QRCodeGenerator
 * @file   This files defines the driver functions for QR code data generation.
 * @author Grant De La Campa.
 * @since  1.0.0
 */
import { decideMode } from '../Functions/DataAnalysis/DataAnalysis';
import {
  getSmallestQRVersion,
  fitTotalBits,
  getModeBitLength
} from '../Functions/DataEncoding/DataEncoding';
import {
  ModeIndicator,
  ErrorCorrectionCodeWordsBlock,
  remainderBitsByVersion
} from '../Constants/Constants';
import { padBits } from '../Helpers/HelperFunctions';
import { processInput } from '../Functions/InputBinaryProcessing/InputBinaryProcessing';
import { groupCodewords } from '../Functions/GroupProcessing/GroupProcessing';
import { StructureFinalMessage } from '../Functions/StructureFinalMessage/StructureFinalMessage';
import { DrawQRCode } from '../Functions/MatrixPopulation/DrawQRCode';

/**
 * Runs the given text through the various steps of QR encoding.
 * @param {String} text
 * @param {Char} errorCorrection
 * @returns
 */
export const QRCodeGenerator = (text, errorCorrection) => {
  // Step 1 Decide the mode based on input
  let mode = decideMode(text);
  // Step 8 get the input as binary
  const encodedData = processInput(mode, text);
  // Step 2 get inputSize
  const inputSize = Math.round(encodedData.length / 8);
  mode = mode === 'kanji' ? 'byte' : mode;
  // Step 3 Get the smallest size [version, size]
  const capacityArray = getSmallestQRVersion(inputSize, mode, errorCorrection);
  // Step 4 Get the modeIndicator binary
  const modeIndicator = ModeIndicator[mode];
  // Step 5 Get the bitLength  + Math.floor(capacityArray[0] / 10) * 2
  const bitLength = getModeBitLength(capacityArray[0], mode);
  // Step 6 Get length in binary
  const binaryInputLength = inputSize.toString(2);
  // Step 7 pad binaryInputLength to match the bitLength value
  // ex bitLength 9 and binaryInputLength is 1011 pad 00000
  const paddedInputLength = padBits(
    bitLength - binaryInputLength.length,
    binaryInputLength
  );
  // Step 9 get the Error correction info [total#words, EC/block, #BlocksG1, #wordsG1Block, #blocksG2, #wordsG2Block]
  const errCorrectionInfo =
    ErrorCorrectionCodeWordsBlock[capacityArray[0] + '-' + errorCorrection]; // Step 10 get the Required number of bits for the QR code
  const totalBits = errCorrectionInfo[0] * 8;
  // Step 11 get the current binary
  const currentBinary = modeIndicator + paddedInputLength + encodedData;
  // Step 12 pad the binary to reach the length of total bits
  const codededInput = fitTotalBits(totalBits, currentBinary);
  // Step 13 format the dataCodeWords into groups
  const dataCodeWordGroups = groupCodewords(codededInput, errCorrectionInfo);
  // Step 14 Generate the final message
  const finalMessage = StructureFinalMessage(
    dataCodeWordGroups,
    errCorrectionInfo,
    remainderBitsByVersion[capacityArray[0]]
  );
  // Step 15 Draw the code
  const finalMatrix = DrawQRCode(
    capacityArray[0],
    finalMessage,
    errorCorrection
  );
  return finalMatrix;
};
