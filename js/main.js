import { fetchProdutos } from './api.js';

async function renderProdutos() {
    const produtos = await fetchProdutos();
    console.log(produtos); // Substitua por lógica para exibir os produtos na tela
}

renderProdutos();
