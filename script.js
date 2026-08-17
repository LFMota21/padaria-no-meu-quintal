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
        total: total,
        horario: new Date().toLocaleTimeString('pt-BR'),
        timestamp: Date.now()
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
function togglePersonalizacao(id) {

    const area = document.getElementById(id);

    if (area.style.display === "block") {
        area.style.display = "none";
    } else {
        area.style.display = "block";
    }
}
function togglePersonalizacao(id) {

    const area = document.getElementById(id);

    if (area.style.display === "block") {
        area.style.display = "none";
    } else {
        area.style.display = "block";
    }

}
function adicionarPaoComOvo() {
   

    let nome = "Pão com ovo";
    let preco = 6;

    const opcoes =
        document.querySelectorAll("#paoOvo input[type='checkbox']");

    opcoes.forEach(opcao => {

        if (opcao.checked) {

            if (opcao.parentElement.textContent.includes("Queijo")) {
                nome += " + Queijo";
                preco += 2;
            }

            if (opcao.parentElement.textContent.includes("Presunto")) {
                nome += " + Presunto";
                preco += 2;
            }

            if (opcao.parentElement.textContent.includes("Ovo Extra")) {
                nome += " + Ovo Extra";
                preco += 2;
            }
        }
    });

    adicionarProduto(nome, preco);

    opcoes.forEach(opcao => {
        opcao.checked = false;
    });
}
function adicionarPaonachapa() {

    let nome = "Pão na chapa";
    let preco = 5;

    const opcoes =
        document.querySelectorAll("#paoChapa input[type='checkbox']");

    opcoes.forEach(opcao => {

        if (opcao.checked) {

            if (opcao.parentElement.textContent.includes("Queijo")) {
                nome += " + Queijo";
                preco += 2;
            }

            if (opcao.parentElement.textContent.includes("Presunto")) {
                nome += " + Presunto";
                preco += 2;
            }

            if (opcao.parentElement.textContent.includes("Ovo no prato")) {
                nome += " + Ovo no prato";
                preco += 2;
            }
        }
    });

    adicionarProduto(nome, preco);

    opcoes.forEach(opcao => {
        opcao.checked = false;
    });
}