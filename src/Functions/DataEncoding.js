import { ModeBitLength, ModeCapacities } from "../Constants/Constants";

/**
 * Get the smallest QR version that can hold this text
 * @param {Int} inputSize 
 * @param {String} mode 
 * @param {String} errorCorrection 
 * @returns 
 */
export function getSmallestQRVersion(inputSize, mode, errorCorrection){
    const capacityArray = ModeCapacities[mode][errorCorrection];
    for(let i = 0; i <= 40; i++){
      if(capacityArray[i] >= inputSize){
        return [i+1, capacityArray[i]];
      }
    }
  }