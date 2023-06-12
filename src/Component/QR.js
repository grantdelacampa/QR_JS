/* eslint-disable */
import { useEffect } from 'react';
import { useRef } from 'react';
import { QRCodeGenerator } from '../Driver/QRCodeGenerator';

export const QR = ({
  id = 'QR',
  size = 100,
  data = 'HELLO WORLD',
  errorCorrection = 'M'
}) => {
  const canvasRef = useRef();
  useEffect(() => {
    const finalMessage = QRCodeGenerator(data, errorCorrection);
    const ctx = canvasRef.current.getContext('2d');
    const imagedata = ctx.createImageData(21, 21);
    const imgData = imagedata.data;
    for(let i = 0; i< finalMessage.size; i++){
      for(let j = 0; j < finalMessage.size; j++){
        const bit = finalMessage.getBit(i, j);
        const offset = ((i*finalMessage.size)+j) * 4;
        if(bit === 1){
          imgData[offset] = 0;
          imgData[offset + 1] = 0;
          imgData[offset + 2] = 0;
          imgData[offset + 3] = 255;
        } else {
          imgData[offset] = 255;
          imgData[offset + 1] = 255;
          imgData[offset + 2] = 255;
          imgData[offset + 3] = 255;
        }
      }
    }
    ctx.imageSmoothingEnabled = false;
    ctx.putImageData(imagedata, 0, 0);
  });
  return <canvas id={id} height={size} width={size} ref={canvasRef} />;
};
