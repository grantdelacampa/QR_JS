import { alphaToInt, intToAlpha } from "../Constants/Constants";

export class GeneratorPolynomial {

    // a^a+x^b
    constructor(a, b) {
        // a
        this.alphaCoef = a;
        // x
        this.stdCoef = b;
    }

    // (a^a+x^b) * (a^a+x^b)
    multiply(polynomial) {
        const alphaMultiplier = polynomial.getAlphaCoef();
        const stdMultiplier = polynomial.getStdCoef();
        let finalAlpha = [];
        let finalStd = [];
        for (let i = 0; i < this.alphaCoef.length; i++) {
            for (let j = 0; j < alphaMultiplier.length; j++) {
                // If the added is larger than 255 then % 255 it
                let addedAlpha = this.alphaCoef[i] + alphaMultiplier[j];
                finalAlpha.push(addedAlpha > 255 ? this.galosExponetReduction(addedAlpha) : addedAlpha);
                finalStd.push(this.stdCoef[i] + stdMultiplier[j]);
            }
        }
        // Lifted the finalStd push to the above loop
        // for (let i = 0; i < this.stdCoef.length; i++) {
        //     for (let j = 0; j < stdMultiplier.length; j++) {
        //         finalStd.push(this.stdCoef[i] + stdMultiplier[j]);
        //     }
        // }
        return this.simplify(finalAlpha, finalStd);

    }

    simplify(alphaCoef, stdCoef) {
        const newAlpha = [];
        const newStdCoef = [];
        //[{element0 : index},...{elementN : index}]
        const vistied = [];
        stdCoef.forEach((element, index) => {
            // Set the existingIndex to an imposible number so we know if element is 0
            let existingIndex = -2;
            // If the element is not 0 we need the index
            if (element !== 0) {
                existingIndex = vistied.findIndex((obj) => { return Object.hasOwn(obj, element) });
            }
            // If existingIndex < 0 then element is 0 or newly visited so add it either way
            if (existingIndex < 0) {
                newAlpha.push(alphaCoef[index]);
                newStdCoef.push(stdCoef[index]);
            }
            // If existingIndex === -1 then add the element to the visitedArray
            if (existingIndex === -1) {
                // Store the first time we both visited and wrote this element respectivly
                vistied.push({ [element]: [index, newStdCoef.length - 1] });
            }
            // If 0 or more this has been visited
            if (existingIndex >= 0) {
                // Get the array with the visited and writted index
                const indexArray = vistied[existingIndex][element];
                const newStdIndex = indexArray[1];
                const stdCoefIndex = indexArray[0];
                // NOTE: We dont care about adding the stds because x^2 + x^2 = x^2]
                // Add the Alphas using the correct value based on the QR
                newAlpha[newStdIndex] = this.addAlphaToAlpha(alphaCoef[stdCoefIndex], alphaCoef[index]);

            }

        });

        this.setAlphaCoef(newAlpha);
        this.setStdCoef(newStdCoef);
    }


    galosExponetReduction(exponent) {
        return (exponent % 256) + Math.floor(exponent / 256);
    }

    addAlphaToAlpha(alpha1, alpha2) {
        const dec1 = alphaToInt[alpha1];
        const dec2 = alphaToInt[alpha2];
        const xored = dec1 ^ dec2;
        return intToAlpha[xored];
    }

    getAlphaCoef() {
        return this.alphaCoef;
    }

    setAlphaCoef(newAlphaCoefs){
        this.alphaCoef = newAlphaCoefs;
    }

    getStdCoef() {
        return this.stdCoef;
    }

    setStdCoef(newStdCoef){
        this.stdCoef = newStdCoef;
    }

    toString() {
        let output = "";
        let size = this.alphaCoef.length;
        for (let i = 0; i < size; i++) {
            output = output + "a^" + this.alphaCoef[i] + "x^" + this.stdCoef[i];
            if (size - 1 !== i) {
                output = output + " + ";
            }
        }
        return output;
    }
}