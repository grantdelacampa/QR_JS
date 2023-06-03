/* eslint-disable */
import { alignmnetPatternLocations } from '../../Constants/Constants';
import { getQRSize } from '../../Helpers/HelperFunctions';
// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes
export const drawOnCanvas = (canvas, version, size) => {
    // Get the size of the QR code
  const qrSize = getQRSize(version);
    const scaleFactor = getScaleFactor(qrSize, size);
    const ctx = canvas.current.getContext('2d');
    ctx.fillStyle = '#777';
    ctx.scale(scaleFactor, scaleFactor);
    ctx.fillRect(0, 0, qrSize, qrSize);
    drawFinderPatterns(ctx, qrSize);
    drawAlignmnetPatterns(ctx, version);
};

const drawAlignmnetPatterns = (ctx, version) => {
    const alignmentPattern = alignmnetPatternLocations[version];
    for(let i = 0; i < alignmentPattern.length; i++){
        for(let j = 0; j < alignmentPattern.length; j++){
            console.log(alignmentPattern[i] + ", " + alignmentPattern[j]);
            drawAlignmentPattern(ctx, alignmentPattern[i]-2, alignmentPattern[j]-2);
        }
    }
}

const drawAlignmentPattern = (ctx, x, y) =>{
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, 5, 5);
    ctx.fillStyle = '#FFF';
    ctx.fillRect(1, 1, 3, 3);
    ctx.fillStyle = '#000';
    ctx.fillRect(2, 2, 1, 1);
    ctx.restore();
}

const drawFinderPatter = (ctx) => {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, 7, 7);
    ctx.fillStyle = '#FFF';
    ctx.fillRect(1, 1, 5, 5);
    ctx.fillStyle = '#000';
    ctx.fillRect(2, 2, 3, 3);
};

const getScaleFactor = (qrSize, canvasSize) => {
    let diff = 0;
    // Scaling Up
    if (qrSize < canvasSize) {
        diff = canvasSize / qrSize;
    }
    return diff;
};

const drawFinderPatterns = (ctx, qrSize) => {
    for (let i = 0; i <= 2; i++) {
        ctx.save();
        switch (i) {
            case 0: {
                ctx.translate(0, 0);
                break;
            }
            case 1: {
                ctx.translate(0, qrSize - 7);
                break;
            }
            case 2: {
                ctx.translate(qrSize - 7, 0);
                break;
            }
        }
        drawFinderPatter(ctx);
        ctx.restore();
    };
};
