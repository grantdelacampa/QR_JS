import { getQRSize, getScaleFactor } from '../../Helpers/HelperFunctions';
import { drawSeperators } from './Separators';
import { drawFinderPatterns } from './FinderPatterns';
import { drawAlignmnetPatterns } from './AlignmentPatterns';

/**
 * draw on the canvas
 * @param {*} canvas
 * @param {*} version
 * @param {*} size
 * @deprecated
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes
 */
export const drawOnCanvas = (canvas, version, size) => {
  // Get the size of the QR code
  const qrSize = getQRSize(version);
  const scaleFactor = getScaleFactor(qrSize, size);
  console.log('QR Size: ' + qrSize);
  console.log('version: ' + version);
  console.log('ScaleFactor: ' + scaleFactor);
  const ctx = canvas.current.getContext('2d');
  ctx.fillStyle = '#777';
  // Setup scale and grey background
  ctx.scale(scaleFactor, scaleFactor);
  ctx.fillRect(0, 0, qrSize, qrSize);
  // Draw the pre-stages
  drawSeperators(ctx, qrSize);
  drawFinderPatterns(ctx, qrSize);
  drawAlignmnetPatterns(ctx, version, qrSize);
};
