export const getMaskPattern = (r, c, maskNo) => {
  switch (maskNo) {
    case 0: {
      return (r + c) % 2 === 0;
    }
    case 1: {
      return r % 2 === 0;
    }
    case 2: {
      return c % 3 === 0;
    }
    case 3: {
      return (r + c) % 3 === 0;
    }
    case 4: {
      return (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0;
    }
    case 5: {
      return ((r * c) % 2) + ((r * c) % 3) === 0;
    }
    case 6: {
      return ((r * c) % 2) + (((r * c) % 3) % 2) === 0;
    }
    case 7: {
      return ((r + c) % 2) + (((r * c) % 3) % 2) === 0;
    }
    default: {
      throw new Error('Unknown mask');
    }
  }
};
