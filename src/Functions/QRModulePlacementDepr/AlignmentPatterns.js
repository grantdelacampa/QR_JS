const alignmnetPatternLocations = [
  [],
  [],
  [6, 18],
  [6, 22],
  [6, 30],
  [6, 34],
  [6, 22, 38],
  [6, 24, 42],
  [6, 26, 46],
  [6, 28, 50],
  [6, 30, 54],
  [6, 32, 58],
  [6, 34, 62],
  [6, 26, 46, 66],
  [6, 26, 48, 70],
  [6, 26, 50, 74],
  [6, 30, 54, 78],
  [6, 30, 56, 82],
  [6, 30, 58, 86],
  [6, 30, 62, 90],
  [6, 28, 50, 72, 94],
  [6, 26, 50, 74, 98],
  [6, 30, 54, 78, 102],
  [6, 28, 54, 80, 106],
  [6, 32, 58, 84, 110],
  [6, 30, 58, 86, 114],
  [6, 34, 62, 90, 118],
  [6, 26, 50, 74, 98, 122],
  [6, 30, 54, 78, 102, 126],
  [6, 26, 52, 78, 104, 130],
  [6, 30, 56, 82, 108, 134],
  [6, 34, 60, 86, 112, 138],
  [6, 30, 58, 86, 114, 142],
  [6, 34, 62, 90, 118, 146],
  [6, 30, 54, 78, 102, 126, 150],
  [6, 24, 50, 76, 102, 128, 154],
  [6, 28, 54, 80, 106, 132, 158],
  [6, 32, 58, 84, 110, 136, 162],
  [6, 26, 54, 82, 110, 138, 166],
  [6, 30, 58, 86, 114, 142, 170]
];

/**
 *
 * @param {*} ctx
 * @param {*} version
 * @param {*} qrSize
 * @deprecated
 */
export const drawAlignmnetPatterns = (ctx, version, qrSize) => {
  const alignmentPattern = alignmnetPatternLocations[version];
  const qrOffset = qrSize - 9;
  for (let i = 0; i < alignmentPattern.length; i++) {
    for (let j = 0; j < alignmentPattern.length; j++) {
      const x = alignmentPattern[i] - 2;
      const y = alignmentPattern[j] - 2;
      if (!inSeparatorBounds(x, y, qrOffset)) {
        console.log('Writing alignment to: ' + x + ', ' + y);
        drawAlignmentPattern(ctx, x, y);
      }
    }
  }
};

/**
 *Test if something will fall into the separatorBounds
 * If any of the following are true return true:
 * - if x or y is less than 9
 * - if x is greater than qrSize - 8 and y is less than 9
 * - if x is less than 9 and y is greater than qrSize - 8
 * @param {Int} x
 * @param {Int} y
 * @returns
 * @deprecated
 */
const inSeparatorBounds = (x, y, qrOffset) => {
  return (
    (x < 9 && y < 9) || (x >= qrOffset && y < 9) || (x < 9 && y >= qrOffset)
  );
};

/**
 * Draws an alignment pattern starting at 0,0
 * @param {canvas.context} ctx
 * @param {Int} x
 * @param {Int} y
 * @deprecated
 */
const drawAlignmentPattern = (ctx, x, y) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, 5, 5);
  ctx.fillStyle = '#FFF';
  ctx.fillRect(1, 1, 3, 3);
  ctx.fillStyle = '#000';
  ctx.fillRect(2, 2, 1, 1);
  ctx.restore();
};
