/* eslint-disable */
const drawSeperator = (ctx) => {
  ctx.fillStyle = '#FFF';
  ctx.fillRect(0, 0, 8, 8);
};

export const drawSeperators = (ctx, qrSize) => {
  ctx.save();
  ctx.translate(0, 0);
  drawSeperator(ctx);
  ctx.restore();
  ctx.save();
  ctx.translate(0, qrSize - 8);
  drawSeperator(ctx);
  ctx.restore();
  ctx.save();
  ctx.translate(qrSize - 8, 0);
  drawSeperator(ctx);
  ctx.restore();
};
