export class GeneratorPolynomial {

    // a^a+x^b
    constructor(a, b){
        // a
        this.alphaCoef=a;
        // x
        this.stdCoef=b;
    }

    multiply(polynomial){
        const alphaMultiplier = polynomial.getAlphaCoef();
        const stdMultiplier = polynomial.getStdCoef();
        let finalAlpha = [];
        let finalStd = [];
        for(let i = 0; i < this.alphaCoef.length; i++){
            for(let j = 0;j<alphaMultiplier.length; j++){
                finalAlpha.push(this.alphaCoef[i] + alphaMultiplier[j]);
            }
        }
        for(let i = 0; i < this.stdCoef.length; i++){
            for(let j = 0;j<stdMultiplier.length; j++){
                finalStd.push(this.stdCoef[i] + stdMultiplier[j]);
            }
        }
        return new GeneratorPolynomial(finalAlpha, finalStd);
        
    }

    simplify(alphaCoef, stdCoef){

        // Todo find like terms in alpha if they exist add the coresponding indicies for stdCoef
        return []
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