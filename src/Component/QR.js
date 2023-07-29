/* eslint-disable */
import { useEffect } from 'react';
import { useRef } from 'react';
import { QRCodeGenerator } from '../Driver/QRCodeGenerator';

/**
 * Handles drawing a QR code BitMatrix into a <canvas> element
 * @param {*} param0
 * @returns
 * @See https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas
 */
export const QR = ({
  id = 'QR',
  size = 100,
  data = 'thonky.com',
  errorCorrection = 'Q'
}) => {
  const canvasRef = useRef();
  useEffect(() => {
    const finalMessage = QRCodeGenerator(data, errorCorrection);
    const ctx = canvasRef.current.getContext('2d');
    // Create a temp canvas to render the QR code larger than needed
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext('2d');
    // Calculate an even size that will end with the pixels being a factor of the messageSize
    const tempSize = 1000 + ((finalMessage.size + 8) - (1000 % (finalMessage.size + 8)));
    // Set the tempSize
    tempCanvas.width = tempSize;
    tempCanvas.height = tempSize;

    // 1) Get the scale factor:
    const scale = getScale(finalMessage.size, tempSize);
    // 2) Get the size of each of the "pixels";
    const symbolSize = Math.floor((finalMessage.size + 4 * 2) * scale);
    // 3) Get the scaledMargin (there is 4 pixel quite zone around the code)
    const scaledMargin = 4 * scale;
    // 4) Create the image data with the size of this canvas (size)
    const imagedata = tempCtx.createImageData(tempSize, tempSize);
    const imgData = imagedata.data;

    // Iterate the size of the QR code and use the scale factors too translate from QRData to imgData
    for (let i = 0; i < tempSize; i++) {
      for (let j = 0; j < tempSize; j++) {
        let scaledPos = (i * symbolSize + j) * 4;
        let color = 255;
        if (
          i >= scaledMargin &&
          j >= scaledMargin &&
          i < symbolSize - scaledMargin &&
          j < symbolSize - scaledMargin
        ) {
          const deScaledCol = Math.floor((i - scaledMargin) / scale);
          const descaledRow = Math.floor((j - scaledMargin) / scale);
          color = finalMessage.getBit(deScaledCol, descaledRow) ? 0 : 255;
        }
        imgData[scaledPos++] = color;
        imgData[scaledPos++] = color;
        imgData[scaledPos++] = color;
        imgData[scaledPos] = 255;
      }
    }
    // Create the temp QR code as an image
    tempCtx.putImageData(imagedata, 0, 0);
    // Draw the temp QR code to the canvas
    ctx.drawImage(tempCanvas, 0, 0, tempCanvas.height, tempCanvas.width, 0,0,size,size);
  });
  return <canvas id={id} height={size} width={size} ref={canvasRef} />;
};

/**
 * Calcualte the scaling factor to size the QR Code pixels to the size of the canvas
 * @param {Number} qrSize
 * @param {Number} canvasSize
 * @returns
 */
const getScale = (qrSize, canvasSize) => {
  return canvasSize && canvasSize >= qrSize + 4 * 2
    ? canvasSize / (qrSize + 4 * 2)
    : 4;
};
