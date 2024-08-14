document.addEventListener('DOMContentLoaded', () => {
    const saldoInput = document.getElementById('saldo');
    const precoInput = document.getElementById('preco');
    const quantidadeInput = document.getElementById('quantidade');
    const adicionarButton = document.getElementById('adicionar');
    const apagarComprasButton = document.getElementById('apagar-compras');
    const listaCompras = document.getElementById('lista-compras');
    const totalGastoElement = document.getElementById('total-gasto');
    const saldoRestanteElement = document.getElementById('saldo-restante');
    const alertaElement = document.getElementById('alerta');

    let saldoInicial = parseFloat(localStorage.getItem('saldo')) || 0;
    let totalGasto = parseFloat(localStorage.getItem('totalGasto')) || 0;

    saldoInput.value = saldoInicial;
    totalGastoElement.textContent = totalGasto.toFixed(2);
    saldoRestanteElement.textContent = (saldoInicial - totalGasto).toFixed(2);

    adicionarButton.addEventListener('click', () => {
        const precoProduto = parseFloat(precoInput.value) || 0;
        const quantidadeProduto = parseInt(quantidadeInput.value) || 0;
        const totalProduto = precoProduto * quantidadeProduto;

        const saldoRestante = saldoInicial - totalGasto;
        if (totalProduto <= 0 || precoProduto <= 0 || quantidadeProduto <= 0) {
            alertaElement.textContent = 'Preço e quantidade devem ser maiores que zero.';
            return;
        }

        if (totalProduto > saldoRestante) {
            const valorFaltante = totalProduto - saldoRestante;
            alertaElement.textContent = `Saldo insuficiente para adicionar este item. Você precisa de R$${valorFaltante.toFixed(2)} a mais.`;
            return;
        }

        alertaElement.textContent = ''; // Limpar qualquer mensagem de alerta

        const itemLista = document.createElement('li');
        itemLista.textContent = `Produto: R$${precoProduto.toFixed(2)} x ${quantidadeProduto} = R$${totalProduto.toFixed(2)}`;

        // Criar botão de apagar
        const apagarButton = document.createElement('button');
        apagarButton.textContent = 'Apagar';
        apagarButton.addEventListener('click', () => {
            listaCompras.removeChild(itemLista);
            totalGasto -= totalProduto;
            totalGastoElement.textContent = totalGasto.toFixed(2);

            saldoInicial = parseFloat(saldoInput.value) || 0;
            const saldoRestanteNovo = saldoInicial - totalGasto;
            saldoRestanteElement.textContent = saldoRestanteNovo.toFixed(2);

            localStorage.setItem('saldo', saldoInicial.toFixed(2));
            localStorage.setItem('totalGasto', totalGasto.toFixed(2));
        });

        itemLista.appendChild(apagarButton);
        listaCompras.appendChild(itemLista);

        totalGasto += totalProduto;
        totalGastoElement.textContent = totalGasto.toFixed(2);

        saldoInicial = parseFloat(saldoInput.value); // Atualizar o saldo inicial com o valor do input
        const saldoRestanteNovo = saldoInicial - totalGasto;
        saldoRestanteElement.textContent = saldoRestanteNovo.toFixed(2);

        localStorage.setItem('saldo', saldoInicial.toFixed(2));
        localStorage.setItem('totalGasto', totalGasto.toFixed(2));

        precoInput.value = '';
        quantidadeInput.value = '';
    });

    apagarComprasButton.addEventListener('click', () => {
        // Limpar a lista de compras
        listaCompras.innerHTML = '';

        // Resetar total gasto e saldo restante
        totalGasto = 0;
        totalGastoElement.textContent = totalGasto.toFixed(2);

        saldoInicial = parseFloat(saldoInput.value) || 0;
        saldoRestanteElement.textContent = saldoInicial.toFixed(2);

        // Remover os dados do localStorage
        localStorage.removeItem('saldo');
        localStorage.removeItem('totalGasto');
    });
});
