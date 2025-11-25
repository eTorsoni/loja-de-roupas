const API_URL = 'http://localhost:3000/api/produtos';
const form = document.getElementById('productForm');
const productList = document.getElementById('productList');

// 1. Função para buscar e exibir produtos (READ)
async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        const products = await response.json();
        
        productList.innerHTML = ''; // Limpa a lista antes de renderizar

        if (products.length === 0) {
            productList.innerHTML = '<p>Nenhum produto cadastrado.</p>';
            return;
        }

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${product.nome}</h3>
                <div class="price">R$ ${parseFloat(product.preco).toFixed(2)}</div>
                <div class="details">
                    <span>Tam: <strong>${product.tamanho}</strong></span> | 
                    <span>Cor: ${product.cor || 'N/A'}</span>
                </div>
                <button class="btn-delete" onclick="deleteProduct(${product.id})">Excluir</button>
            `;
            productList.appendChild(card);
        });
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        productList.innerHTML = '<p style="color:red">Erro ao carregar produtos do servidor.</p>';
    }
}

// 2. Função para cadastrar produto (CREATE)
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Impede a página de recarregar

    const newProduct = {
        nome: document.getElementById('nome').value,
        preco: parseFloat(document.getElementById('preco').value),
        tamanho: document.getElementById('tamanho').value,
        cor: document.getElementById('cor').value
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        });

        if (response.ok) {
            alert('Produto cadastrado com sucesso!');
            form.reset(); // Limpa o formulário
            fetchProducts(); // Atualiza a lista
        } else {
            alert('Erro ao cadastrar produto.');
        }
    } catch (error) {
        console.error('Erro:', error);
    }
});

// 3. Função para deletar produto (DELETE)
async function deleteProduct(id) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            fetchProducts(); // Atualiza a lista após deletar
        } catch (error) {
            console.error('Erro ao deletar:', error);
        }
    }
}

// Carregar produtos ao abrir a página
fetchProducts();