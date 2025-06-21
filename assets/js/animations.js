// ===== KERUBINDEV ANIME.JS APP =====

class KerubinDevApp {
    constructor() {
        this.currentSection = 'home';
        this.isAnimating = false;
        this.animations = {};
        
        this.init();
    }
    
    init() {
        console.log('🚀 Inicializando KerubinDev App com Anime.js...');
        
        // Aguardar carregamento completo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    setup() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.hideLoading();
        this.startHeroAnimations();
        
        console.log('✨ KerubinDev App inicializado com sucesso!');
    }
    
    setupEventListeners() {
        // Navegação
        document.querySelectorAll('.nav-link, [data-section]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section') || link.getAttribute('href').substring(1);
                this.navigateToSection(section);
            });
        });
        
        // Scroll para animações
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Resize
        window.addEventListener('resize', () => this.handleResize());
        
        // Modal de artigos
        this.setupModalEvents();
        
        // Menu mobile
        this.setupMobileMenu();
    }
    
    setupModalEvents() {
        const modal = document.getElementById('articleModal');
        const closeBtn = document.getElementById('modalClose');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }
        
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.closeModal();
            });
        }
        
        // ESC para fechar modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });
    }
    
    setupMobileMenu() {
        const toggle = document.getElementById('navToggle');
        const menu = document.getElementById('navMenu');
        
        if (toggle && menu) {
            toggle.addEventListener('click', () => {
                menu.classList.toggle('active');
                toggle.classList.toggle('active');
            });
        }
    }
    
    initializeAnimations() {
        // Animação inicial da navegação
        this.animateNavigation();
        
        // Preparar elementos para animação
        this.prepareElements();
    }
    
    animateNavigation() {
        anime({
            targets: '.nav-link',
            translateY: ['-20px', '0px'],
            opacity: [0, 1],
            duration: 800,
            delay: anime.stagger(100, {start: 500}),
            easing: 'easeOutExpo'
        });
        
        anime({
            targets: '.nav-brand',
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 1000,
            delay: 300,
            easing: 'easeOutElastic(1, .8)'
        });
    }
    
    prepareElements() {
        // Adicionar classes para elementos que serão animados
        document.querySelectorAll('.project-card, .article-card, .skill-category').forEach(el => {
            el.classList.add('scroll-reveal');
        });
    }
    
    hideLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            anime({
                targets: loading,
                opacity: [1, 0],
                duration: 500,
                delay: 1000,
                easing: 'easeOutQuad',
                complete: () => {
                    loading.style.display = 'none';
                }
            });
        }
    }
    
    startHeroAnimations() {
        this.animateHeroSVG();
        this.animateHeroText();
        this.startContinuousAnimations();
    }
    
    animateHeroSVG() {
        // Animar aparição do SVG
        anime({
            targets: '.hero-svg',
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 1000,
            delay: 1200,
            easing: 'easeOutExpo'
        });
        
        // Animar círculos (stroke drawing)
        anime({
            targets: '.main-circle',
            strokeDashoffset: [1000, 0],
            duration: 2000,
            delay: 1500,
            easing: 'easeOutExpo'
        });
        
        anime({
            targets: '.inner-circle-1',
            strokeDashoffset: [1000, 0],
            duration: 1500,
            delay: 1800,
            easing: 'easeOutExpo'
        });
        
        anime({
            targets: '.inner-circle-2',
            strokeDashoffset: [1000, 0],
            duration: 1000,
            delay: 2100,
            easing: 'easeOutExpo'
        });
        
        // Animar triângulos
        anime({
            targets: '.triangle-1, .triangle-2',
            opacity: [0, 0.8],
            scale: [0, 1],
            rotate: ['-180deg', '0deg'],
            duration: 1200,
            delay: anime.stagger(200, {start: 2300}),
            easing: 'easeOutElastic(1, .8)'
        });
        
        // Animar pontos
        anime({
            targets: '.dot-1, .dot-2, .dot-3, .dot-4',
            opacity: [0, 1],
            scale: [0, 1],
            duration: 800,
            delay: anime.stagger(150, {start: 2800}),
            easing: 'easeOutElastic(1, .6)'
        });
    }
    
    animateHeroText() {
        // Animar título linha por linha
        anime({
            targets: '.title-line',
            translateY: ['50px', '0px'],
            opacity: [0, 1],
            duration: 1000,
            delay: anime.stagger(200, {start: 1800}),
            easing: 'easeOutExpo'
        });
        
        // Animar subtítulo
        anime({
            targets: '.hero-subtitle',
            translateY: ['30px', '0px'],
            opacity: [0, 1],
            duration: 800,
            delay: 2600,
            easing: 'easeOutExpo'
        });
        
        // Animar botões
        anime({
            targets: '.hero-buttons',
            translateY: ['30px', '0px'],
            opacity: [0, 1],
            duration: 800,
            delay: 2900,
            easing: 'easeOutExpo'
        });
    }
    
    startContinuousAnimations() {
        // Rotação contínua dos círculos
        this.animations.circleRotation = anime({
            targets: '.main-circle',
            rotate: '360deg',
            duration: 20000,
            loop: true,
            easing: 'linear'
        });
        
        // Rotação dos círculos internos (direção oposta)
        this.animations.innerCircleRotation = anime({
            targets: '.inner-circle-1, .inner-circle-2',
            rotate: '-360deg',
            duration: 15000,
            loop: true,
            easing: 'linear'
        });
        
        // Movimento orbital dos pontos
        this.animateOrbitalDots();
        
        // Animação dos elementos flutuantes
        this.animateFloatingElements();
    }
    
    animateOrbitalDots() {
        const dots = ['.dot-1', '.dot-2', '.dot-3', '.dot-4'];
        
        dots.forEach((dot, index) => {
            anime({
                targets: dot,
                translateX: [
                    {value: 20, duration: 2000},
                    {value: -20, duration: 2000},
                    {value: 0, duration: 2000}
                ],
                translateY: [
                    {value: -20, duration: 2000},
                    {value: 20, duration: 2000},
                    {value: 0, duration: 2000}
                ],
                scale: [
                    {value: 1.2, duration: 1000},
                    {value: 0.8, duration: 1000},
                    {value: 1, duration: 1000}
                ],
                delay: index * 500,
                loop: true,
                easing: 'easeInOutSine'
            });
        });
    }
    
    animateFloatingElements() {
        anime({
            targets: '.floating-element',
            opacity: [0, 1],
            scale: [0, 1],
            rotate: ['0deg', '360deg'],
            duration: 1000,
            delay: anime.stagger(200, {start: 3500}),
            easing: 'easeOutElastic(1, .8)'
        });
        
        // Movimento contínuo
        anime({
            targets: '.floating-element',
            translateY: ['-10px', '10px'],
            duration: 3000,
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine',
            delay: anime.stagger(500)
        });
    }
    
    navigateToSection(sectionName) {
        if (this.isAnimating || this.currentSection === sectionName) return;
        
        this.isAnimating = true;
        
        // Atualizar navegação ativa
        this.updateActiveNav(sectionName);
        
        // Animar saída da seção atual
        this.animateSectionOut(this.currentSection, () => {
            // Mostrar nova seção
            this.showSection(sectionName);
            
            // Animar entrada da nova seção
            this.animateSectionIn(sectionName, () => {
                this.currentSection = sectionName;
                this.isAnimating = false;
            });
        });
    }
    
    updateActiveNav(sectionName) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[data-section="${sectionName}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    
    animateSectionOut(sectionName, callback) {
        const section = document.getElementById(sectionName);
        if (!section) {
            callback();
            return;
        }
        
        anime({
            targets: section,
            opacity: [1, 0],
            translateY: ['0px', '-30px'],
            duration: 400,
            easing: 'easeInQuad',
            complete: callback
        });
    }
    
    showSection(sectionName) {
        // Esconder todas as seções
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Mostrar seção alvo
        const targetSection = document.getElementById(sectionName);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    }
    
    animateSectionIn(sectionName, callback) {
        const section = document.getElementById(sectionName);
        if (!section) {
            callback();
            return;
        }
        
        // Reset da posição
        anime.set(section, {
            opacity: 0,
            translateY: '30px'
        });
        
        // Animar entrada
        anime({
            targets: section,
            opacity: [0, 1],
            translateY: ['30px', '0px'],
            duration: 600,
            easing: 'easeOutExpo',
            complete: () => {
                this.animateSectionContent(sectionName);
                callback();
            }
        });
    }
    
    animateSectionContent(sectionName) {
        const section = document.getElementById(sectionName);
        if (!section) return;
        
        // Animar título da seção
        const title = section.querySelector('.section-title');
        if (title) {
            anime({
                targets: title,
                opacity: [0, 1],
                translateY: ['30px', '0px'],
                duration: 800,
                delay: 200,
                easing: 'easeOutExpo'
            });
        }
        
        // Animar subtítulo
        const subtitle = section.querySelector('.section-subtitle');
        if (subtitle) {
            anime({
                targets: subtitle,
                opacity: [0, 1],
                translateY: ['20px', '0px'],
                duration: 600,
                delay: 400,
                easing: 'easeOutExpo'
            });
        }
        
        // Animações específicas por seção
        switch (sectionName) {
            case 'about':
                this.animateAboutSection();
                break;
            case 'projects':
                this.animateProjectsSection();
                break;
            case 'articles':
                this.animateArticlesSection();
                break;
            case 'skills':
                this.animateSkillsSection();
                break;
            case 'contact':
                this.animateContactSection();
                break;
        }
    }
    
    animateAboutSection() {
        // Animar texto sobre
        anime({
            targets: '.about-text p',
            opacity: [0, 1],
            translateY: ['20px', '0px'],
            duration: 600,
            delay: anime.stagger(100, {start: 600}),
            easing: 'easeOutExpo'
        });
        
        // Animar estatísticas
        anime({
            targets: '.stat-item',
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 800,
            delay: anime.stagger(150, {start: 1000}),
            easing: 'easeOutElastic(1, .8)'
        });
        
        // Animar círculo do perfil
        anime({
            targets: '.profile-circle',
            opacity: [0, 1],
            scale: [0, 1],
            rotate: ['0deg', '360deg'],
            duration: 1200,
            delay: 800,
            easing: 'easeOutElastic(1, .6)'
        });
        
        // Animar elementos flutuantes
        anime({
            targets: '.floating-element',
            opacity: [0, 1],
            scale: [0, 1],
            rotate: ['0deg', '180deg'],
            duration: 800,
            delay: anime.stagger(200, {start: 1200}),
            easing: 'easeOutElastic(1, .8)'
        });
    }
    
    animateProjectsSection() {
        anime({
            targets: '.project-card',
            opacity: [0, 1],
            translateY: ['50px', '0px'],
            scale: [0.9, 1],
            duration: 800,
            delay: anime.stagger(150, {start: 600}),
            easing: 'easeOutExpo'
        });
    }
    
    animateArticlesSection() {
        // Animar barra de busca
        anime({
            targets: '.search-container',
            opacity: [0, 1],
            translateY: ['20px', '0px'],
            duration: 600,
            delay: 600,
            easing: 'easeOutExpo'
        });
        
        // Animar cards de artigos
        anime({
            targets: '.article-card',
            opacity: [0, 1],
            translateY: ['50px', '0px'],
            scale: [0.9, 1],
            duration: 800,
            delay: anime.stagger(150, {start: 800}),
            easing: 'easeOutExpo'
        });
    }
    
    animateSkillsSection() {
        anime({
            targets: '.skill-category',
            opacity: [0, 1],
            translateY: ['50px', '0px'],
            scale: [0.9, 1],
            duration: 800,
            delay: anime.stagger(200, {start: 600}),
            easing: 'easeOutExpo'
        });
        
        // Animar skills individuais
        setTimeout(() => {
            anime({
                targets: '.skill-item',
                opacity: [0, 1],
                translateY: ['20px', '0px'],
                scale: [0.9, 1],
                duration: 400,
                delay: anime.stagger(50),
                easing: 'easeOutExpo'
            });
        }, 1000);
    }
    
    animateContactSection() {
        // Animar informações de contato
        anime({
            targets: '.contact-info h3, .contact-info p',
            opacity: [0, 1],
            translateY: ['20px', '0px'],
            duration: 600,
            delay: anime.stagger(200, {start: 600}),
            easing: 'easeOutExpo'
        });
        
        // Animar links de contato
        anime({
            targets: '.contact-link',
            opacity: [0, 1],
            translateX: ['-30px', '0px'],
            duration: 600,
            delay: anime.stagger(150, {start: 1000}),
            easing: 'easeOutExpo'
        });
        
        // Animar bubble de mensagem
        anime({
            targets: '.message-bubble',
            opacity: [0, 1],
            scale: [0.8, 1],
            rotate: ['-5deg', '0deg'],
            duration: 800,
            delay: 800,
            easing: 'easeOutElastic(1, .8)'
        });
    }
    
    handleScroll() {
        // Animações baseadas em scroll
        const scrollY = window.scrollY;
        
        // Parallax suave para elementos
        if (this.currentSection === 'home') {
            anime.set('.hero-svg', {
                translateY: scrollY * 0.1
            });
        }
    }
    
    handleResize() {
        // Reajustar animações em resize
        if (window.innerWidth < 768) {
            // Pausar animações pesadas em mobile
            if (this.animations.circleRotation) {
                this.animations.circleRotation.pause();
            }
        } else {
            // Retomar animações
            if (this.animations.circleRotation) {
                this.animations.circleRotation.play();
            }
        }
    }
    
    openModal(title, content) {
        const modal = document.getElementById('articleModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');
        
        if (modal && modalTitle && modalBody) {
            modalTitle.textContent = title;
            modalBody.innerHTML = content;
            
            // Animar abertura do modal
            modal.classList.add('active');
            
            anime({
                targets: '.modal-content',
                opacity: [0, 1],
                scale: [0.8, 1],
                duration: 400,
                easing: 'easeOutExpo'
            });
        }
    }
    
    closeModal() {
        const modal = document.getElementById('articleModal');
        
        if (modal) {
            anime({
                targets: '.modal-content',
                opacity: [1, 0],
                scale: [1, 0.8],
                duration: 300,
                easing: 'easeInQuad',
                complete: () => {
                    modal.classList.remove('active');
                }
            });
        }
    }
    
    // Método para adicionar hover animations
    addHoverAnimations() {
        // Botões
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                anime({
                    targets: btn,
                    scale: 1.05,
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            });
            
            btn.addEventListener('mouseleave', () => {
                anime({
                    targets: btn,
                    scale: 1,
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            });
        });
        
        // Cards
        document.querySelectorAll('.project-card, .article-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                anime({
                    targets: card,
                    translateY: -5,
                    scale: 1.02,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
            
            card.addEventListener('mouseleave', () => {
                anime({
                    targets: card,
                    translateY: 0,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
        });
    }
}

// Inicializar aplicação
const app = new KerubinDevApp();

// Adicionar hover animations após carregamento
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        app.addHoverAnimations();
    }, 2000);
});

