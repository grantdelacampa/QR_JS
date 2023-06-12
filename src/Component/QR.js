/* eslint-disable */
import { useEffect } from 'react';
import { useRef } from 'react';
import { QRCodeGenerator } from '../Driver/QRCodeGenerator';
import { isEditable } from '@testing-library/user-event/dist/utils';

export const QR = ({
  id = 'QR',
  size = 100,
  data = 'HELLO WORLD',
  errorCorrection = 'M'
}) => {
  const canvasRef = useRef();
  useEffect(() => {
    const finalMessage = QRCodeGenerator(data, errorCorrection);
    console.log(finalMessage.toString());
    const ctx = canvasRef.current.getContext('2d');

    // 1) Get the scale factor: 
    const scale = getScale(finalMessage.size, size);
    // 2) Get the size of each of the "pixels";
    const symbolSize = Math.floor((finalMessage.size + 4 * 2) * scale);
    // Get the scaledMargin (there is 4 pixel quite zone around the code)
    const scaledMargin = 4 * scale;
    const imagedata = ctx.createImageData(size, size);
    const imgData = imagedata.data

    console.log("Canvas Size: " + size);
    console.log("Data size: " + finalMessage.size);
    console.log("Margin size: " + scaledMargin);
    console.log("Scaled: " + scale);

    let color = 0;


    for(let i = 0; i < size; i++){
      for(let j = 0; j < size; j++){
        let posDist = (i * symbolSize + j) * 4;
        let color = 255;
        if (i >= scaledMargin && j >= scaledMargin &&
          i < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
          const iSrc = Math.floor((i - scaledMargin) / scale);
          const jSrc = Math.floor((j - scaledMargin) / scale);
          // pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0]
          color = finalMessage.getBit(iSrc, jSrc) ? 0 : 255;
        }
        imgData[posDist++] = color;
        imgData[posDist++] = color;
        imgData[posDist++] = color;
        imgData[posDist] = 255;
      }

    }
    // for(let i = 0; i< finalMessage.size; i++){
    //   for(let j = 0; j < finalMessage.size; j++){
    //     const bit = finalMessage.getBit(i, j);
    //     const offset = ((i*finalMessage.size)+j) * 4;
    //     if(bit === 1){
    //       imgData[offset] = 0;
    //       imgData[offset + 1] = 0;
    //       imgData[offset + 2] = 0;
    //       imgData[offset + 3] = 255;
    //     } else {
    //       imgData[offset] = 255;
    //       imgData[offset + 1] = 255;
    //       imgData[offset + 2] = 255;
    //       imgData[offset + 3] = 255;
    //     }
    //   }
    // S\
    ctx.putImageData(imagedata, 0, 0);
  });
  return <canvas id={id} height={size} width={size} ref={canvasRef} />;
};

const getScale = (qrSize, canvasSize) => {
  return canvasSize && canvasSize >= qrSize + 4 * 2 ? canvasSize / (qrSize + 4 * 2) : 4;
} 
