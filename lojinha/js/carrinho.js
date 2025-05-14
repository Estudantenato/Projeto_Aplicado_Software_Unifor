// Função para carregar e exibir os itens do carrinho
function loadCart() {
    try {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotalElement = document.getElementById('cart-total');
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="text-center py-5">
                    <p class="text-muted">Seu carrinho está vazio</p>
                    <a href="index.html" class="btn btn-primary">Continuar Comprando</a>
                </div>
            `;
            cartTotalElement.textContent = '0,00';
            return;
        }
        
        let html = '';
        let total = 0;
        
        cart.forEach((item, index) => {
            total += item.price;
            html += `
                <div class="card mb-3 cart-item animate__animated animate__fadeIn" data-index="${index}">
                    <div class="row g-0">
                        <div class="col-md-3">
                            <img src="${item.image}" class="img-fluid rounded-start" alt="${item.name}">
                        </div>
                        <div class="col-md-7">
                            <div class="card-body">
                                <h5 class="card-title">${item.name}</h5>
                                <p class="card-text">R$ ${item.price.toFixed(2).replace('.', ',')}</p>
                            </div>
                        </div>
                        <div class="col-md-2 d-flex align-items-center justify-content-center">
                            <button class="btn btn-danger remove-item">
                                <i class="bi bi-trash"></i> Remover
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        cartItemsContainer.innerHTML = html;
        cartTotalElement.textContent = total.toFixed(2).replace('.', ',');
        
        // Adiciona eventos aos botões de remover
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', removeFromCart);
        });
    } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
    }
}

// Função para remover item do carrinho
function removeFromCart(event) {
    try {
        const itemElement = event.target.closest('.cart-item');
        const index = parseInt(itemElement.getAttribute('data-index'));
        
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Animação ao remover item
        itemElement.classList.add('animate__fadeOut');
        setTimeout(() => {
            loadCart();
        }, 300);
    } catch (error) {
        console.error('Erro ao remover item:', error);
    }
}

// Função para finalizar compra
function checkout() {
    try {
        console.log('Função checkout chamada'); // Verificação no console
        
        const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked');
        
        if (!selectedPayment) {
            Swal.fire({
                title: 'Ops...',
                text: 'Por favor, selecione um método de pagamento',
                icon: 'error'
            });
            return;
        }
        
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            Swal.fire({
                title: 'Carrinho vazio',
                text: 'Seu carrinho está vazio, adicione itens antes de finalizar',
                icon: 'warning'
            });
            return;
        }
        
        const paymentMethod = selectedPayment.value;
        let paymentText = '';
        
        switch(paymentMethod) {
            case 'credit': paymentText = 'Cartão de Crédito'; break;
            case 'debit': paymentText = 'Cartão de Débito'; break;
            case 'pix': paymentText = 'PIX'; break;
        }
        
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        
        Swal.fire({
            title: 'Compra finalizada com sucesso!',
            html: `
                <p>Sua compra no valor de <b>R$ ${total.toFixed(2).replace('.', ',')}</b> foi efetuada com sucesso via ${paymentText}.</p>
                <p>Verifique seu e-mail e WhatsApp para conferir os detalhes da sua compra.</p>
                <p>Obrigado por comprar conosco!</p>
            `,
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#0d6efd'
        }).then(() => {
            localStorage.removeItem('cart');
            loadCart();
        });
        
    } catch (error) {
        console.error('Erro ao finalizar compra:', error);
        Swal.fire({
            title: 'Erro',
            text: 'Ocorreu um erro ao processar sua compra',
            icon: 'error'
        });
    }
}

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    
    // Adiciona evento ao botão de finalizar compra
    const checkoutButton = document.getElementById('checkout-btn');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            checkout();
        });
    } else {
        console.error('Botão de checkout não encontrado!');
    }
});