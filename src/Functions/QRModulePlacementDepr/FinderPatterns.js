/* eslint-disable */

/**
 * Draws a finder pattern starting at 0,0
 * @param {Context} ctx
 * @deprecated
 */
const drawFinderPatter = (ctx) => {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, 7, 7);
  ctx.fillStyle = '#FFF';
  ctx.fillRect(1, 1, 5, 5);
  ctx.fillStyle = '#000';
  ctx.fillRect(2, 2, 3, 3);
};

/**
 * Draws the three finder patterns in the top two and bottom left corners.
 * This is constant for all QR sizes.
 * @param {context} ctx
 * @param {Integer} qrSize
 * @deprecated
 */
export const drawFinderPatterns = (ctx, qrSize) => {
  ctx.save();
  ctx.translate(0, 0);
  drawFinderPatter(ctx);
  ctx.restore();
  ctx.save();
  ctx.translate(0, qrSize - 7);
  drawFinderPatter(ctx);
  ctx.restore();
  ctx.save();
  ctx.translate(qrSize - 7, 0);
  drawFinderPatter(ctx);
  ctx.restore();
};
