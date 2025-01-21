// Linha 1: Crie uma função para buscar produtos do servidor
async function fetchProdutos() {
    try {
        // Linha 2: Realize a requisição GET ao servidor
        const response = await fetch("http://localhost:3000/produtos");

        // Linha 3: Verifique se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        // Linha 4: Converta a resposta para JSON
        const produtos = await response.json();
        return produtos;
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        return [];
    }
}

// Linha 5: Exporte a função para usá-la em outros arquivos
export { fetchProdutos };
