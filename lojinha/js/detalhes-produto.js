
 
        // Dados dos produtos (simulando um banco de dados)
        const productsDatabase = {
            1: {
                title: "Conjunto Masculino Infantil",
                price: 79.90,
                description: "Conjunto confortável para meninos, perfeito para o dia a dia. Composto por camiseta e short em algodão 100%, proporcionando conforto e respirabilidade.",
                features: [
                    "Material: 100% algodão",
                    "Tamanhos disponíveis: 1 a 3 anos",
                    "Cores: Azul, Verde e Vermelho",
                    "Composição: Camiseta + short",
                    "Lavagem: Máquina (água fria)",
                    "Origem: Nacional"
                ],
                images: [
                    "../assets/conjunto_masc.jpeg",
                    "../assets/camisa_masc_conjunto.jpeg",
                    "../assets/bermuda_masc_conjunto.jpeg"
                ]
            },
            2: {
                title: "Vestido Feminino Infantil",
                price: 89.90,
                description: "Vestido leve e confortável para meninas, com estampa florida e tecido macio que não irrita a pele sensível das crianças.",
                features: [
                    "Material: 70% algodão, 30% poliéster",
                    "Tamanhos disponíveis: 1 a 2 anos",
                    "Cores: Rosa, verde e Branco",
                    "Estampa: Flores ",
                    "Lavagem: Máquina (água fria)",
                    "Origem: Nacional"
                ],
                images: [
                    "../assets/vestido_femino_infantil.jpeg"]
            },
            3: {
                title: "Camiseta Masculina",
                price: 39.90,
                description: "Camiseta divertida para meninos com estampas de astronaltas . Tecido de alta qualidade que mantém as cores vivas por mais tempo.",
                features: [
                    "Material: 100% algodão penteado",
                    "Tamanhos disponíveis: 1 a 3 anos",
                    "Cores: Branco, Azul, Cinza",
                    "Estampas diversas",
                    "Lavagem: Máquina (água fria)",
                    "Origem: Nacional"
                ],
                images: [
                    "../assets/camisa_masc.png"]
            }
        };

        // Função para carregar os dados do produto
        function loadProductDetails() {
            const productId = new URLSearchParams(window.location.search).get('id');
            const product = productsDatabase[productId];
            
            if (product) {
                // Preenche os dados do produto
                document.getElementById('productTitle').textContent = product.title;
                document.getElementById('productPrice').textContent = `R$ ${product.price.toFixed(2)}`;
                document.getElementById('productDescription').textContent = product.description;
                
                // Preenche as imagens
                const mainImage = document.getElementById('mainProductImage');
                mainImage.src = product.images[0];
                mainImage.alt = product.title;
                
                document.getElementById('zoomedImage').src = product.images[0];
                
                const thumbnails = document.querySelectorAll('.thumbnail');
                product.images.forEach((img, index) => {
                    if (thumbnails[index]) {
                        thumbnails[index].src = img;
                        thumbnails[index].alt = `${product.title} - Vista ${index + 1}`;
                    }
                });
                
                // Preenche as características
                const featuresList = document.getElementById('productFeatures');
                featuresList.innerHTML = '';
                product.features.forEach(feature => {
                    const li = document.createElement('li');
                    li.textContent = feature;
                    featuresList.appendChild(li);
                });
            } else {
                alert('Produto não encontrado!');
                window.location.href = 'index.html';
            }
        }

        // Funções auxiliares
        function changeImage(element, imageIndex) {
            const productId = new URLSearchParams(window.location.search).get('id');
            const mainImage = document.getElementById('mainProductImage');
            mainImage.src = element.src;
            document.getElementById('zoomedImage').src = element.src;
        }

        function zoomImage(element) {
            document.getElementById('zoomedImage').src = element.src;
            document.getElementById('zoomedImageContainer').style.display = 'flex';
        }

        function closeZoom() {
            document.getElementById('zoomedImageContainer').style.display = 'none';
        }

        function increaseQuantity() {
            const quantityInput = document.getElementById('quantity');
            if (parseInt(quantityInput.value) < 10) {
                quantityInput.value = parseInt(quantityInput.value) + 1;
            }
        }

        function decreaseQuantity() {
            const quantityInput = document.getElementById('quantity');
            if (parseInt(quantityInput.value) > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
            }
        }

        function addToCart() {
            const productId = new URLSearchParams(window.location.search).get('id');
            const product = productsDatabase[productId];
            const quantity = parseInt(document.getElementById('quantity').value);
            
            // Aqui implementei a logica para adcionar ao carrinho
            // Exemplo usando localStorage:
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push({
                id: productId,
                name: product.title,
                price: product.price,
                quantity: quantity,
                image: product.images[0]
            });
            localStorage.setItem('cart', JSON.stringify(cart));
            
           // Mostra o alerta e depois redireciona
    if (confirm(`${quantity} ${product.title} adicionado(s) ao carrinho!\nDeseja ir para o carrinho agora?`)) {
        window.location.href = 'carrinho.html';
    }
}
        
        // Carrega os dados quando a página é aberta
        document.addEventListener('DOMContentLoaded', loadProductDetails);
    