// ===== MAIN APPLICATION CONTROLLER =====

class MainApp {
    constructor() {
        this.projects = [];
        this.init();
    }
    
    init() {
        this.loadProjects();
        this.setupRouting();
        this.setupKeyboardNavigation();
        
        // Tornar disponível globalmente para outros módulos
        window.app = this;
    }
    
    loadProjects() {
        // Dados dos projetos (em produção, viria de uma API)
        this.projects = [
            {
                title: "Assistente IA Avançado",
                description: "Sistema de inteligência artificial para automação e assistência, desenvolvido com tecnologias de ponta para processamento de linguagem natural.",
                tags: ["Python", "IA", "NLP", "Machine Learning"],
                links: [
                    { text: "GitHub", url: "https://github.com/KerubinDev" },
                    { text: "Demo", url: "#" }
                ],
                featured: true
            },
            {
                title: "Portfolio Interativo 3D",
                description: "Site de portfólio com experiência 3D imersiva usando Anime.js e tecnologias web modernas para criar animações fluidas e elegantes.",
                tags: ["JavaScript", "Anime.js", "CSS3", "HTML5"],
                links: [
                    { text: "GitHub", url: "https://github.com/KerubinDev/kerubindev.github.io" },
                    { text: "Live", url: "https://kerubindev.github.io" }
                ],
                featured: true
            },
            {
                title: "Game Engine 2D",
                description: "Engine de jogos 2D desenvolvida em C++ com foco em performance e facilidade de uso para desenvolvimento de jogos indie.",
                tags: ["C++", "GameDev", "OpenGL", "Engine"],
                links: [
                    { text: "GitHub", url: "https://github.com/KerubinDev" }
                ],
                featured: false
            },
            {
                title: "Sistema de Blog Dinâmico",
                description: "Plataforma de blog com sistema de artigos em Markdown, busca avançada e interface administrativa completa.",
                tags: ["Node.js", "MongoDB", "React", "Markdown"],
                links: [
                    { text: "GitHub", url: "https://github.com/KerubinDev" },
                    { text: "Demo", url: "#" }
                ],
                featured: false
            },
            {
                title: "App Mobile de Produtividade",
                description: "Aplicativo mobile para gestão de tarefas e produtividade com sincronização em nuvem e interface intuitiva.",
                tags: ["React Native", "Firebase", "TypeScript", "Mobile"],
                links: [
                    { text: "GitHub", url: "https://github.com/KerubinDev" }
                ],
                featured: false
            },
            {
                title: "API RESTful Completa",
                description: "API robusta para gerenciamento de dados com autenticação JWT, documentação automática e testes integrados.",
                tags: ["Python", "FastAPI", "PostgreSQL", "Docker"],
                links: [
                    { text: "GitHub", url: "https://github.com/KerubinDev" },
                    { text: "Docs", url: "#" }
                ],
                featured: false
            }
        ];
        
        this.renderProjects();
    }
    
    renderProjects() {
        const container = document.getElementById('projectsGrid');
        if (!container) return;
        
        container.innerHTML = this.projects.map(project => this.renderProjectCard(project)).join('');
        this.setupProjectEvents();
    }
    
    renderProjectCard(project) {
        const tagColors = {
            'Python': 'var(--primary-blue)',
            'JavaScript': 'var(--primary-yellow)',
            'React': 'var(--primary-blue)',
            'Node.js': 'var(--primary-green)',
            'C++': 'var(--primary-red)',
            'HTML5': 'var(--primary-red)',
            'CSS3': 'var(--primary-blue)',
            'Anime.js': 'var(--primary-purple)',
            'IA': 'var(--primary-green)',
            'NLP': 'var(--primary-blue)',
            'GameDev': 'var(--primary-red)',
            'Mobile': 'var(--primary-purple)'
        };
        
        const tagsHtml = project.tags.map(tag => {
            const color = tagColors[tag] || 'var(--primary-gray)';
            return `<span class="project-tag" style="background: ${color}20; color: ${color};">${tag}</span>`;
        }).join('');
        
        const linksHtml = project.links.map(link => 
            `<a href="${link.url}" class="project-link" target="_blank" rel="noopener">${link.text}</a>`
        ).join('');
        
        const featuredClass = project.featured ? 'featured' : '';
        
        return `
            <div class="project-card ${featuredClass}">
                <div class="project-header">
                    <h3 class="project-title">${project.title}</h3>
                    ${project.featured ? '<span class="featured-badge">✨ Destaque</span>' : ''}
                </div>
                
                <p class="project-description">${project.description}</p>
                
                <div class="project-tags">
                    ${tagsHtml}
                </div>
                
                <div class="project-links">
                    ${linksHtml}
                </div>
            </div>
        `;
    }
    
    setupProjectEvents() {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                anime({
                    targets: card,
                    translateY: -8,
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
    
    setupRouting() {
        // Gerenciar navegação por URL
        window.addEventListener('popstate', () => {
            this.handleRoute();
        });
        
        // Verificar rota inicial
        this.handleRoute();
    }
    
    handleRoute() {
        const hash = window.location.hash;
        
        if (hash.startsWith('#artigo/')) {
            const slug = hash.split('/')[1];
            if (window.articlesManager) {
                window.articlesManager.openArticle(slug);
            }
        } else if (hash.startsWith('#')) {
            const section = hash.substring(1);
            if (section && document.getElementById(section)) {
                if (window.app && window.app.navigateToSection) {
                    window.app.navigateToSection(section);
                }
            }
        }
    }
    
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Navegação por teclado (1-6 para seções)
            if (e.key >= '1' && e.key <= '6') {
                const sections = ['home', 'about', 'projects', 'articles', 'skills', 'contact'];
                const sectionIndex = parseInt(e.key) - 1;
                if (sections[sectionIndex] && window.app && window.app.navigateToSection) {
                    window.app.navigateToSection(sections[sectionIndex]);
                }
            }
            
            // ESC para fechar modal
            if (e.key === 'Escape') {
                if (window.app && window.app.closeModal) {
                    window.app.closeModal();
                }
            }
        });
    }
    
    // Métodos delegados para o sistema de animações
    navigateToSection(section) {
        if (window.kerubinDevApp && window.kerubinDevApp.navigateToSection) {
            window.kerubinDevApp.navigateToSection(section);
        }
    }
    
    openModal(title, content) {
        if (window.kerubinDevApp && window.kerubinDevApp.openModal) {
            window.kerubinDevApp.openModal(title, content);
        }
    }
    
    closeModal() {
        if (window.kerubinDevApp && window.kerubinDevApp.closeModal) {
            window.kerubinDevApp.closeModal();
        }
    }
    
    // Método para adicionar novo projeto
    addProject(projectData) {
        this.projects.push(projectData);
        this.renderProjects();
    }
    
    // Método para obter estatísticas dos projetos
    getProjectStats() {
        return {
            total: this.projects.length,
            featured: this.projects.filter(p => p.featured).length,
            technologies: [...new Set(this.projects.flatMap(p => p.tags))]
        };
    }
}

// Aguardar carregamento completo antes de inicializar
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar aplicação principal
    const mainApp = new MainApp();
    
    // Conectar com o sistema de animações
    if (window.KerubinDevApp) {
        window.kerubinDevApp = new window.KerubinDevApp();
    }
    
    // Debug info
    console.log('🎯 Aplicação KerubinDev carregada com sucesso!');
    console.log('📊 Estatísticas:', {
        projetos: mainApp.getProjectStats(),
        artigos: window.articlesManager ? window.articlesManager.getStats() : 'Carregando...'
    });
});

// Conectar sistemas quando tudo estiver carregado
window.addEventListener('load', () => {
    // Conectar app principal com sistema de animações
    if (window.kerubinDevApp && window.app) {
        window.app.navigateToSection = window.kerubinDevApp.navigateToSection.bind(window.kerubinDevApp);
        window.app.openModal = window.kerubinDevApp.openModal.bind(window.kerubinDevApp);
        window.app.closeModal = window.kerubinDevApp.closeModal.bind(window.kerubinDevApp);
    }
    
    console.log('🔗 Sistemas conectados com sucesso!');
});

