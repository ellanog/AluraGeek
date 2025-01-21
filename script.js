// Seleciona o container onde os cards serão adicionados
const produtosContainer = document.querySelector('.produtos-container');

// Array de exemplo de produtos
const produtos = [
    { nome: 'Produto 1', preco: 'R$49,90', imagem: 'caminho/para/imagem1.png' },
    { nome: 'Produto 2', preco: 'R$99,90', imagem: 'caminho/para/imagem2.png' },
    { nome: 'Produto 3', preco: 'R$29,90', imagem: 'caminho/para/imagem3.png' }
];

// Função para criar um card de produto
function criarCard(produto) {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = produto.imagem;
    img.alt = `Imagem de ${produto.nome}`;

    const infoContainer = document.createElement('div');
    infoContainer.classList.add('card-container--info');

    const nomeProduto = document.createElement('p');
    nomeProduto.textContent = produto.nome;

    const valueContainer = document.createElement('div');
    valueContainer.classList.add('card-container--value');

    const preco = document.createElement('p');
    preco.textContent = `Preço: ${produto.preco}`;

    const iconeExclusao = document.createElement('img');
    iconeExclusao.src = 'caminho/para/icono-de-eliminacion.png';
    iconeExclusao.alt = 'Ícone de exclusão';

    
    valueContainer.appendChild(preco);
    valueContainer.appendChild(iconeExclusao);

    infoContainer.appendChild(nomeProduto);
    infoContainer.appendChild(valueContainer);

    card.appendChild(img);
    card.appendChild(infoContainer);

    return card;
}

// Renderiza os cards dinamicamente
produtos.forEach(produto => {
    const card = criarCard(produto);
    produtosContainer.appendChild(card);
});
const apiUrl = "http://localhost:3000/produtos";

// Função para carregar produtos da API
async function carregarProdutos() {
    const response = await fetch(apiUrl);
    const produtos = await response.json();
    const produtosContainer = document.querySelector('.produtos-container');

    // Limpar produtos exibidos anteriormente
    produtosContainer.innerHTML = '';

    if (produtos.length === 0) {
        produtosContainer.innerHTML = '<p>Nenhum produto foi adicionado.</p>';
    } else {
        produtos.forEach(produto => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <img src="${produto.imagem}" alt="Imagem do produto">
                <div class="card-container--info">
                    <p>${produto.nome}</p>
                    <div class="card-container--value">
                        <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
                        <button onclick="removerProduto(${produto.id})">Excluir</button>
                    </div>
                </div>
            `;
            produtosContainer.appendChild(card);
        });
    }
}

// Função para adicionar um novo produto
async function adicionarProduto(event) {
    event.preventDefault();
    const nome = document.querySelector('input[placeholder="Nome do Produto"]').value;
    const preco = parseFloat(document.querySelector('input[placeholder="Preço"]').value);
    const imagem = document.querySelector('input[placeholder="URL da Imagem"]').value;

    const produto = { nome, preco, imagem };

    await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto),
    });

    document.querySelector('form').reset();
    carregarProdutos();
}

// Função para remover um produto
async function removerProduto(id) {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    carregarProdutos();
}

// Evento para o botão de adicionar produto
document.querySelector('form').addEventListener('submit', adicionarProduto);

// Carregar os produtos ao iniciar a aplicação
carregarProdutos();
