/* eslint-disable */
import { splitIntoGroups } from '../../Helpers/HelperFunctions';

export const DataPattern = (bitMatrix, data) => {
  /*
    X-XO-XO-XO-XO-XO-XO
    X-XO-XO-XO-XO-XO-XO
    X-XO-XO-XO-XO-XO-XO
    X-XO-XO-XO-XO-XO-XO
    X-XO-XO-XO-XO-XO-XO
    X-XO-XO-XO-XO-XO-XO
    */
  const bitArray = splitIntoGroups(data, 1);
  let dir = true;
  // Traverse each column
  for(let c = bitMatrix.size; c > -1; c-- ){

    // if dir then traverse the column upwards by row
    if(dir){
        for(let r = bitMatrix.size; r > -1; r--){
            console.log("^["+ r + ", " + c + "]");
        }
        // flip the directiom
        dir = false;
    // else then traverse the column downwards by row
    } else{
        for(let r = 0; r < bitMatrix.size; r++){
            console.log("v["+ r + ", " + c + "]");
        }
        // flip the direction
        dir = true;
    }
  }
};
