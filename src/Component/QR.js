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
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 0, size, size);    
    console.log(finalMessage);
  });
  return <canvas id={id} height={size} width={size} ref={canvasRef} />;
};
