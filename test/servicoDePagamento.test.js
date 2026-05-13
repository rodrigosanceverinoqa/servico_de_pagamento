
import { ServicoDePagamento } from "../src/servicoDePagamento.js";
import assert from 'node:assert';

describe('Classe de serviço de pagamento', function () {
    it('Validar que o pagamento é realizado com sucesso, com valor abaixo de 100 e atribuir categoria "padrão".', () => {
        const servico = new ServicoDePagamento();

        const codigoDeBarras = '111-222-666-999';
        const empresa = 'Loja A';
        const valor = 50.00;

        servico.pagar(codigoDeBarras, empresa, valor);
        const resultado = servico.consultarUltimoPagamento();

        assert.equal(resultado.categoria, 'padrão');
        assert.equal(resultado.valor, 50.00);

    });

    it('Validar que o pagamento é realizado com sucesso, com valor acima de 100 e atribuir categoria "cara".', () => {
        const servico = new ServicoDePagamento();

        const codigoDeBarras = '111-222-333-444';
        const empresa = 'Loja B';
        const valor = 150.00;

        servico.pagar(codigoDeBarras, empresa, valor);
        const resultado = servico.consultarUltimoPagamento();

        assert.equal(resultado.categoria, 'cara');
        assert.equal(resultado.valor, 150.00);

    });

    it('Validar que o último pagamento está retornando com sucesso', () => {

        const servico = new ServicoDePagamento();
        const ultimoCodigoEsperado = '555-222-666-444';

        servico.pagar('888-555-222-333', 'Empresa Ficticia A', 267.87);
        servico.pagar(ultimoCodigoEsperado, 'Empresa Ficticia B', 467.87);

        const resultado = servico.consultarUltimoPagamento();

        assert.equal(resultado.codigoBarras, ultimoCodigoEsperado);

    });


});