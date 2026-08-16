let carrinho = [];

function adicionarProduto(nome, preco) {

    const produtoExistente =
        carrinho.find(item => item.nome === nome);

    if (produtoExistente) {
        produtoExistente.quantidade++;
    } else {
        carrinho.push({
            nome: nome,
            preco: preco,
            quantidade: 1
        });
    }

    atualizarCarrinho();
}

function atualizarCarrinho() {

    const lista = document.getElementById("lista-carrinho");
    const total = document.getElementById("total");

    lista.innerHTML = "";

    let soma = 0;

    carrinho.forEach(produto => {

        const item = document.createElement("li");

        const subtotal =
            produto.preco * produto.quantidade;

        item.textContent =
            produto.nome +
            " x" +
            produto.quantidade +
            " - R$ " +
            subtotal.toFixed(2);

        lista.appendChild(item);

        soma += subtotal;
    });

    total.textContent =
        "Total: R$ " + soma.toFixed(2);
}

function limparCarrinho() {
    carrinho = [];
    atualizarCarrinho();
}

function finalizarPedido() {

    const mesa = document.getElementById("mesa").value;

    if (carrinho.length === 0) {
        alert("Adicione pelo menos um produto.");
        return;
    }

    if (mesa === "") {
        alert("Selecione uma mesa.");
        return;
    }

    let total = 0;

    carrinho.forEach(produto => {
        total += produto.preco * produto.quantidade;
    });

    const pedido = {
        mesa: mesa,
        itens: carrinho,
        total: total
    };

    push(
        ref(window.database, "pedidos"),
        pedido
    )
    .then(() => {

        alert("Pedido enviado com sucesso!");

        carrinho = [];

        atualizarCarrinho();

        document.getElementById("mesa").selectedIndex = 0;

    })
    .catch((erro) => {

        alert("Erro ao enviar pedido.");

        console.error(erro);

    });
}