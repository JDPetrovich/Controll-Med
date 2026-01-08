export const formataCasasDecimais = (numeroStr: string, qtdCasasDecimais: number = 2, separador: "," | "." = ".") => {
    let valor = "";
    if (!numeroStr) { return ""; }

    numeroStr = numeroStr.replace(".", "").replace(",", ".");
    if (numeroStr.split(".").length > 2) { return ""; }

    if (numeroStr.split(".").length === 1) {
        valor = `${numeroStr}${separador}${"0".repeat(qtdCasasDecimais)}`;
    } else {
        const numeroDividido = numeroStr.split(".");
        if (numeroDividido[1].length > qtdCasasDecimais) {
            valor = `${numeroDividido[0]}`;
        } else if (numeroDividido[1].length > qtdCasasDecimais) {
            valor = `${numeroDividido[0]}${separador}${numeroDividido[1].substring(1, qtdCasasDecimais)}`;
        } else {
            valor = `${numeroDividido[0]}${separador}${numeroDividido[1].padEnd(qtdCasasDecimais, "0")}`;
        }
    }
    return valor;
}