//Genero Password RANDOM
function createPassword() {
    var longitud = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";

    for (var i = 0, n = charset.length; i < longitud; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal
}