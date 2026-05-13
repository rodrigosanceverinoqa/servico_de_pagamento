export class ServicoDePagamento {
    #pagamentos;

    constructor() {

        this.#pagamentos = [];
    }

    pagar(codigoDeBarras, empresaBeneficiaria, valorPago) {

        let categoriaAplicada = "padrão";
        if (valorPago > 100.00) {
            categoriaAplicada = "cara";
        }


        this.#pagamentos.push({
            codigoBarras: codigoDeBarras,
            empresa: empresaBeneficiaria,
            valor: valorPago,
            categoria: categoriaAplicada
        });
    }

    consultarUltimoPagamento() {

        return this.#pagamentos.at(-1);
    }
}


