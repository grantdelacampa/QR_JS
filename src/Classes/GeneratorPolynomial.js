export class GeneratorPolynomial {

    // a^a+x^b
    constructor(a, b){
        // a
        this.alphaCoef=a;
        // x
        this.stdCoef=b;
    }

    // (a^a+x^b) * (a^a+x^b)
    multiply(polynomial){
        console.log("Multiplying: (" + this.toString() + ") * (" + polynomial.toString() + ")")
        const alphaMultiplier = polynomial.getAlphaCoef();
        const stdMultiplier = polynomial.getStdCoef();
        let finalAlpha = [];
        let finalStd = [];
        for(let i = 0; i < this.alphaCoef.length; i++){
            for(let j = 0;j<alphaMultiplier.length; j++){
                // If the added is larger than 255 then % 255 it
                let addedAlpha =  this.alphaCoef[i] + alphaMultiplier[j];
                finalAlpha.push(addedAlpha > 255 ? addedAlpha % 255 : addedAlpha);
            }
        }
        for(let i = 0; i < this.stdCoef.length; i++){
            for(let j = 0;j<stdMultiplier.length; j++){
                finalStd.push(this.stdCoef[i] + stdMultiplier[j]);
            }
        }
        return this.simplify(finalAlpha, finalStd);
        
    }

    simplify(alphaCoef, stdCoef){ 
        /*
        To find like terms:
            Since alphaCoef.length === stdCoef.length we only need to iterate
            on one and since we only care about combining like X terms then iterate on the X.
            1) Iterate on each element getting the index and value of each
            2) Ignore 0
            3) Check if there is an exisiting obj in the array (nonZeroX) that has a key of the element value.
            4) if the element value has an entry (0) update the value (array) with the index
                otherwise (-1) push a new entry object to the array {element.value, [index]} with the key as an array.

        */
       //[{element0 : [index0, ...indexn]},...{elementN : [index0, ...indexn]}]
       const nonZeroX = [];
       stdCoef.forEach((element, index) => { 
        if(element !== 0){
            const existingIndex = nonZeroX.findIndex((obj) => {return Object.hasOwn(obj, element)});
            if(existingIndex === -1){
                nonZeroX.push({[element]: [index]});
            } else {
                nonZeroX[existingIndex][element].push(index);
            }
        }
       });
       /*
        We now need to reduce the elements
       */
      const newAlpha = []
      const newStdCoef = []
      alphaCoef.forEach((element, index) => {
        const existingIndex = nonZeroX.findIndex((obj) => {return Object.hasOwn(obj, element)});
        const indexArray = existingIndex === -1 ? [] : nonZeroX[existingIndex][element];
        // If the array is less than 1 we just add it to the output
        if(indexArray.length < 1){
            newAlpha.push(alphaCoef[index]);
            newStdCoef.push(stdCoef[index]);
            // if we are at the first index then add otherwise ignore this value
        } else {
            if(indexArray[0] === index){
                console.log("At first index in element "+ element + " index list");
                // it is the first index that we find this value
                // so iterate on all the indexArray and add the alpha and stdCoef values
                let alphaCoefTotal = 0;
                let stdCoefTotal = 0;
                indexArray.forEach((idx) => {
                    /*
                        TODO <=======================================

                        this is currently broken since we don't need to iterate over the alphas as a running total like the x instead we need to 
                        get the alphas from the indexes and then convert them to their decimal forms via 2**value then XOR the added 
                    */
                    alphaCoefTotal = this.addAlpha(alphaCoefTotal, alphaCoef[idx]);
                    //alphaCoefTotal = this.addAlpha(alpha1, alpha2);
                    stdCoefTotal += stdCoef[idx];
                });
                newAlpha.push(alphaCoefTotal);
                newStdCoef.push(stdCoefTotal);
            }
        }
      })
       
       return new GeneratorPolynomial(newAlpha, newStdCoef);
    }

    addAlpha(alpha1, alpha2){
        const dec1 = 2**alpha1;
        const dec2 = 2**alpha2;
        const xored = dec1 ^ dec2;
        return xored;
    }
    galosFieldCalculation(firstDegree, secondDegree){
        const totalDegree = firstDegree + secondDegree;
        if(totalDegree >= 256){
          return totalDegree % 255;
        }
      }

    getAlphaCoef(){
        return this.alphaCoef;
    }

    getStdCoef(){
        return this.stdCoef;
    }

    toString(){
        let output = "";
        let size = this.alphaCoef.length;
        for(let i = 0; i < size; i++){
            output = output + "a^" + this.alphaCoef[i] + "x^" + this.stdCoef[i];
            if(size-1 !== i){
                output = output + " + ";
            }
        }
        return output;
    }
}