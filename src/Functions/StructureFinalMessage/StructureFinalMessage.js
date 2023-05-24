export function StructureFinalMessage(codeWords, errorCorrectionInfo){
    let groups = 1;
    let group1blocks = errorCorrectionInfo[2]
    let group1BlockDataCodewords = errorCorrectionInfo[3]
    let group2blocks = 0;
    let group2BlockDataCodewords = 0;
    // This is the case that we have two groups
    if(errorCorrectionInfo.length > 5){
        groups = 2;
        group2blocks = errorCorrectionInfo[4];
        group2BlockDataCodewords = errorCorrectionInfo[5];
        // this is the case we have one group;
    }
}