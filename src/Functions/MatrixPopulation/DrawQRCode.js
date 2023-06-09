/* eslint-disable */
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

/**
 * Driver for drawing the QR code to the bitMatrix
 * @param {Number} version
 * @param {String} codeData
 */
export const DrawQRCode = (version, codeData) => {
  const qrSize = getQRSize(version);
  const bitMatrix = new BitMatrix(qrSize);
  FinderPatter(bitMatrix, qrSize);
  SeperatorPattern(bitMatrix);
  AlignmentPattern(bitMatrix, version);
  TimingPatterns(bitMatrix);
  ReserveFormatArea(bitMatrix, version);
  VersionInfoArea(bitMatrix, version);
  DataPattern(bitMatrix, codeData);
  return DataMasking(bitMatrix);
};
