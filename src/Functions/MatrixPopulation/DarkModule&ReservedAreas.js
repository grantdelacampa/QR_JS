import { getDarkModule } from '../../Helpers/HelperFunctions';
/*
    Top Left
    --------R
    --------R
    --------R
    --------R
    --------R
    --------R
    --------R
    --------R
    RRRRRRRRR
*/
export const ReserveFormatArea = (bitMatrix, version) => {
  // Draw bottom left
  // Get the start point [row, col]
  const startPoint = getDarkModule(version);
  const row = startPoint[0];
  const col = startPoint[1];
  // Since we get it here set the darkModule as well
  bitMatrix.setBit(row, col, true, true);
  // Traverse down the col
  for (let i = row; i < bitMatrix.size; i++) {
    if (i !== row) {
      bitMatrix.setBit(i, col, true, true);
      // console.log('Bottom Left: ' + i + ', ' + col);
    }
    bitMatrix.setBit(col, i, true, true);
    // console.log('Top Right: ' + col + ', ' + i);
  }

  const basePoint = 8;
  for (let j = basePoint; j >= 0; j--) {
    if (j === basePoint) {
      bitMatrix.setBit(basePoint, basePoint, true, true);
      console.log('Start: ' + basePoint + ', ' + basePoint);
      // Skip the timing pattern
    } else if (j !== 6) {
      bitMatrix.setBit(basePoint, j, true, true);
      // console.log('One: ' + basePoint + ', ' + j);
      bitMatrix.setBit(j, basePoint, true, true);
      // console.log('Two: ' + j + ', ' + basePoint);
    }
  }
};
