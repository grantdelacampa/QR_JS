import { ModeCapacities, PAD_BYTES } from '../../Constants/Constants';
import { padBitsEnd } from '../../Helpers/HelperFunctions';

/**
 * Get the smallest QR version that can hold this text
 * @param {Int} inputSize
 * @param {String} mode
 * @param {String} errorCorrection
 * @returns
 */
export function getSmallestQRVersion(
  inputSize = 0,
  mode = 'byte',
  errorCorrection = 'L'
) {
  const capacityArray = ModeCapacities[mode][errorCorrection];
  for (let i = 0; i <= 40; i++) {
    if (capacityArray[i] >= inputSize) {
      return [i + 1, capacityArray[i]];
    }
  }
}

export function fitTotalBits(totalBits = 0, currentBinary = '') {
  const currentDif = totalBits - currentBinary.length;
  // If the required number of bits is met do nothing
  if (currentDif === 0) {
    return currentBinary;
    // Add the required bits is less than or equal to 4 pad the bits and return
  } else if (currentDif <= 4) {
    return padBitsEnd(currentDif, currentBinary);
  } else {
    // First pad 4
    const inputWTerminator = padBitsEnd(4, currentBinary);
    // Pad the bits to make this a multiple of 8
    let remainder = inputWTerminator.length % 8;
    // In this case remainder is 0 so it is divisible by 8
    if (remainder === 0) {
      remainder = 8;
    }
    const inputAsMultiple = padBitsEnd(8 - remainder, inputWTerminator);
    // If we have the length return otherwise start the pad Byte sequence
    if (inputAsMultiple.length === totalBits) {
      return inputAsMultiple;
    } else {
      // Calculate the Pad Bytes needed
      const neededBytes = totalBits - inputAsMultiple.length;
      let finalString = inputAsMultiple;
      // Only iterate needed / 8 times
      for (let i = 0; i < neededBytes / 8; i++) {
        // Add the pad bytes cycling between the 0 and 1 index using modulo 2
        finalString = finalString + PAD_BYTES[i % 2];
      }
      return finalString;
    }
  }
}
