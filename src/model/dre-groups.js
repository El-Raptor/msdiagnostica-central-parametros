export function fetchDREGroups() {
    return [
        { CODGRUPO: 1, GRUPONAT: "Receitas", RECDESPGRUPO: 1, CALCULO: "RL", ORDEM: 1 },
        { CODGRUPO: 4, GRUPONAT: "Impostos", RECDESPGRUPO: -1, CALCULO: "RL", ORDEM: 2 },
        { CODGRUPO: 2, GRUPONAT: "Compras", RECDESPGRUPO: -1, CALCULO: "LB", ORDEM: 3 },
        { CODGRUPO: 3, GRUPONAT: "Despesas", RECDESPGRUPO: -1, CALCULO: "LP", ORDEM: 4 },
    ]
}