// Configuração das animações de entrada
document.addEventListener('DOMContentLoaded', () => {
    // Animações de entrada para elementos
    const observador = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visivel');
            }
        });
    }, {
        threshold: 0.1
    });

    // Aplicar animação a todos elementos com classe 'fade-in'
    document.querySelectorAll('.fade-in').forEach((elemento) => {
        observador.observe(elemento);
    });

    // Efeito de digitação para o título principal
    const titulo = document.querySelector('.hero-titulo');
    if (titulo) {
        const texto = titulo.textContent;
        titulo.textContent = '';
        let index = 0;

        function digitarTexto() {
            if (index < texto.length) {
                titulo.textContent += texto.charAt(index);
                index++;
                setTimeout(digitarTexto, 100);
            }
        }

        digitarTexto();
    }

    // Efeito de parallax suave
    window.addEventListener('scroll', () => {
        const elementosParallax = document.querySelectorAll('.parallax');
        elementosParallax.forEach(elemento => {
            const velocidade = elemento.dataset.velocidade || 0.5;
            const posicao = window.pageYOffset * velocidade;
            elemento.style.transform = `translateY(${posicao}px)`;
        });
    });

    // Cursor personalizado
    const cursor = document.createElement('div');
    const cursorDot = document.createElement('div');
    cursor.className = 'cursor';
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });

    // Botão voltar ao topo
    const btnTopo = document.querySelector('.back-to-top');
    if (btnTopo) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                btnTopo.classList.add('visible');
            } else {
                btnTopo.classList.remove('visible');
            }
        });

        btnTopo.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Animação para cards de projetos
    document.querySelectorAll('.projeto-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = 
                `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
}); 