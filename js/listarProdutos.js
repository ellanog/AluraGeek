import { fetchProdutos } from './api.js';

// Linha 1: Selecionar o contêiner onde os produtos serão exibidos
const produtosContainer = document.querySelector('[data-produtos-container]');

// Linha 2: Função para criar o template de um card
function criarCard(produto) {
    return `
        <div class="card">
            <img src="${produto.imagem}" alt="Imagem de ${produto.nome}" class="card__imagem">
            <div class="card-container--info">
                <p class="card__nome">${produto.nome}</p>
                <div class="card-container--value">
                    <p class="card__preco">Preço: R$ ${produto.preco}</p>
                </div>
            </div>
        </div>
    `;
}

// Linha 3: Função para renderizar os produtos no DOM
async function listarProdutos() {
    try {
        // Busca os produtos da API
        const produtos = await fetchProdutos();

        // Verifica se há produtos; caso contrário, exibe uma mensagem
        if (produtos.length === 0) {
            produtosContainer.innerHTML = '<p>Nenhum produto foi adicionado.</p>';
            return;
        }

        // Cria os cards dinamicamente e insere no DOM
        produtosContainer.innerHTML = produtos.map(criarCard).join('');
    } catch (error) {
        console.error("Erro ao listar os produtos:", error);
        produtosContainer.innerHTML = '<p>Erro ao carregar produtos.</p>';
    }
}

// Linha 4: Executa a função para listar os produtos
listarProdutos();
