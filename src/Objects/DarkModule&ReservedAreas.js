import { getDarkModule } from "../Helpers/HelperFunctions"

const setDarkModule = (bitMatrix, version) => {
    const cords = getDarkModule(version);
    bitMatrix.setBit(cords[0], cords[1], true, true);
}