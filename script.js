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

    // Otimizar efeito de parallax
    let ultimoScroll = window.pageYOffset;
    const elementosParallax = document.querySelectorAll('.parallax');

    window.addEventListener('scroll', () => {
        requestAnimationFrame(() => {
            const scrollAtual = window.pageYOffset;
            const delta = scrollAtual - ultimoScroll;
            
            elementosParallax.forEach(elemento => {
                const velocidade = elemento.dataset.velocidade || 0.5;
                const posicao = parseFloat(elemento.style.transform.replace(/[^\d.-]/g, '')) || 0;
                const novaPos = posicao + (delta * velocidade);
                
                elemento.style.transform = `translateY(${novaPos}px)`;
            });
            
            ultimoScroll = scrollAtual;
        });
    }, { passive: true });

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

    // Adicionar efeito de hover nos links do menu
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('mouseenter', (e) => {
            cursor.style.transform = 'scale(1.5)';
            cursorDot.style.transform = 'scale(0.5)';
        });

        link.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorDot.style.transform = 'scale(1)';
        });
    });

    // Animação para os cards de habilidades
    document.querySelectorAll('.habilidade-card').forEach(card => {
        const circulo = card.querySelector('.progresso-circular circle');
        const porcentagem = card.querySelector('.porcentagem');
        const nivel = card.querySelector('.habilidade-nivel').dataset.nivel;

        if (circulo && porcentagem) {
            const raio = circulo.r.baseVal.value;
            const circunferencia = 2 * Math.PI * raio;
            
            circulo.style.strokeDasharray = circunferencia;
            circulo.style.strokeDashoffset = circunferencia;

            setTimeout(() => {
                const offset = circunferencia - (nivel / 100) * circunferencia;
                circulo.style.strokeDashoffset = offset;
                
                let contador = 0;
                const intervalo = setInterval(() => {
                    if (contador === parseInt(nivel)) {
                        clearInterval(intervalo);
                    } else {
                        contador++;
                        porcentagem.textContent = contador + '%';
                    }
                }, 20);
            }, 500);
        }
    });

    // Efeito de glitch no texto
    function adicionarEfeitoGlitch(elemento) {
        if (!elemento) return;

        const texto = elemento.textContent;
        elemento.setAttribute('data-text', texto);
        
        elemento.addEventListener('mouseenter', () => {
            let iteracoes = 0;
            
            const intervalo = setInterval(() => {
                elemento.textContent = texto
                    .split('')
                    .map((letra, index) => {
                        if (index < iteracoes) {
                            return texto[index];
                        }
                        return letrasGlitch[Math.floor(Math.random() * letrasGlitch.length)];
                    })
                    .join('');
                
                if (iteracoes >= texto.length) {
                    clearInterval(intervalo);
                    elemento.textContent = texto;
                }
                iteracoes += 1/3;
            }, 30);
        });
    }

    const letrasGlitch = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%&*()_+-=[]{}|;:,.<>?';
    document.querySelectorAll('.glitch-text').forEach(adicionarEfeitoGlitch);

    // Modificar a função de animação de números para evitar duplicação
    function animarNumero(elemento) {
        // Verificar se já foi animado
        if (elemento.dataset.animado === 'true') return;
        
        const numero = parseInt(elemento.textContent);
        let atual = 0;
        
        const intervalo = setInterval(() => {
            if (atual >= numero) {
                clearInterval(intervalo);
                elemento.dataset.animado = 'true';
            } else {
                atual += 1;
                elemento.textContent = atual + (elemento.textContent.includes('+') ? '+' : '');
            }
        }, 50);
    }

    // Usar Intersection Observer para animar números apenas quando visíveis
    const observadorNumeros = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animarNumero(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-numero-grande, .stat-numero').forEach(numero => {
        observadorNumeros.observe(numero);
    });

    // Efeito de partículas interativas
    document.querySelectorAll('.tech-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
            
            const particula = document.createElement('div');
            particula.className = 'particula';
            particula.style.left = x + 'px';
            particula.style.top = y + 'px';
            card.appendChild(particula);
            
            setTimeout(() => particula.remove(), 1000);
        });
    });

    // Efeito de scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Adicionar animações para cards de interesse
    document.querySelectorAll('.interesse-card').forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            // Efeito de brilho
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
            
            // Efeito no cursor
            if (cursor && cursorDot) {
                cursor.style.transform = 'scale(1.5)';
                cursorDot.style.transform = 'scale(0.5)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (cursor && cursorDot) {
                cursor.style.transform = 'scale(1)';
                cursorDot.style.transform = 'scale(1)';
            }
        });
    });
}); 