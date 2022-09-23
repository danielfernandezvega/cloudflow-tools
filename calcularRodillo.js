function calcularRodillo(unidades, numDientes, pasoPrensa) {
    var dimensionesRodillo = numDientes * pasoPrensa;
    if (unidades == "mm") {
        return dimensionesRodillo * 25.4;
    } else {
        return dimensionesRodillo;
    }
}