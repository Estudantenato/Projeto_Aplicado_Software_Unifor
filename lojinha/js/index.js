
        // Adiciona classe "scrolled" ao navbar ao rolar a página
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar-custom');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Scroll suave para links do menu
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    

    //JavaScript do Filtro de Produtos 
    
        document.addEventListener('DOMContentLoaded', function() {
            // Seleciona todos os botões de filtro
            const filterButtons = document.querySelectorAll('.filter-btn');
            
            // Adiciona evento de clique a cada botão
            filterButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Remove a classe 'active' de todos os botões
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Adiciona a classe 'active' apenas ao botão clicado
                    this.classList.add('active');
                    
                    // Obtém o valor do filtro (all, masculino, feminino)
                    const filterValue = this.getAttribute('data-filter');
                    
                    // Seleciona todos os produtos
                    const products = document.querySelectorAll('#produtos-container > [data-category]');
                    
                    // Filtra os produtos
                    products.forEach(product => {
                        if (filterValue === 'all') {
                            product.style.display = 'block';
                        } else {
                            product.style.display = product.getAttribute('data-category') === filterValue ? 'block' : 'none';
                        }
                    });
                });
            });
        });
    