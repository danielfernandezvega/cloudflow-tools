function calcularDistorsion(unidades, dimensionesRodillo, calibreFotopolimero) {
    //La fórmula quedaría algo así, % Distorsión = [RL÷(2π)+(M-P)] / [RL÷ (2π)]
    var unidades = unidades;
    if (unidades == "mm") {
        var RL = dimensionesRodillo;
        var P = (parseFloat(calibreFotopolimero)) * 25.4;
        const PI = 3.141592;
        const M = 0.127;
        var distorsion = (((RL / (2 * PI) + (M - P)) / (RL / (2 * PI))) * 100).toFixed(3);
        var rodDistorsionado = RL * (distorsion / 100);
        var factorK = RL - rodDistorsionado;

        var data = {
            value: distorsion,
            rodDistorsionado: rodDistorsionado,
            factorK: factorK,
            status: true,
            message: "All ok"
        };
    } else if (unidades == "in") {
        var RL = dimensionesRodillo;
        console.log(RL);
        var P = parseFloat(calibreFotopolimero);
        console.log(P);
        const PI = 3.141592;
        const M = 0.005;
        var distorsion = (((RL / (2 * PI) + (M - P)) / (RL / (2 * PI))) * 100).toFixed(3);
        var rodDistorsionado = RL * (distorsion / 100);
        var factorK = RL - rodDistorsionado;

        var data = {
            value: distorsion,
            rodDistorsionado: rodDistorsionado,
            factorK: factorK,
            status: true,
            message: "All ok"
        };
    } else {
        addMessageToLog("error", "Unidades no corresponden, debe usar mm o in")
        var data = {
            value: null,
            rodDistorsionado: null,
            factorK: null,
            status: false,
            meesage: "Unidades no corresponden, debe usar mm o in"
        };
        setOutput('failure');
    }


    return data;
}