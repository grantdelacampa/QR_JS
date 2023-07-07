/**
 * QR Code Draw function calls.
 *
 * @link   DrawQRCode
 * @file   This file contains the function calls to populate the final BitMatrix representation of the QR code.
 * @author Grant De La Campa.
 * @since  1.0.0
 */
import { getQRSize } from '../../Helpers/HelperFunctions';
import { FinderPatter } from './FinderPattern';
import { BitMatrix } from '../../Objects/BitMatrix';
import { SeperatorPattern } from './SeperatorPattern';
import { AlignmentPattern } from './AlignmentPattern';
import { TimingPatterns } from './TimingPatterns';
import { ReserveFormatArea } from './DarkModule&ReservedAreas';
import { VersionInfoArea } from './VersionInfoArea';
import { DataPattern } from './DataPattern';
import { DataMasking } from './DataMasking';
import { VersionInfo } from './VersionInfo';

/**
 * Driver for drawing the QR code to the bitMatrix
 * @param {Number} version
 * @param {String} codeData
 * @param {String} errCrtnLvl
 */
export const DrawQRCode = (version, codeData, errCrtnLvl) => {
  const qrSize = getQRSize(version);
  const bitMatrix = new BitMatrix(qrSize);
  FinderPatter(bitMatrix, qrSize);
  SeperatorPattern(bitMatrix);
  AlignmentPattern(bitMatrix, version);
  TimingPatterns(bitMatrix);
  ReserveFormatArea(bitMatrix, version);
  VersionInfoArea(bitMatrix, version);
  DataPattern(bitMatrix, codeData);
  const dataMaskResult = DataMasking(bitMatrix, errCrtnLvl);
  VersionInfo(dataMaskResult, version);
  return dataMaskResult[1];
};
