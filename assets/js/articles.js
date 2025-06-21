// ===== SISTEMA DE ARTIGOS =====

class ArticlesManager {
    constructor() {
        this.articles = [];
        this.filteredArticles = [];
        this.searchTerm = '';
        
        this.init();
    }
    
    init() {
        this.loadArticles();
        this.setupSearch();
    }
    
    async loadArticles() {
        try {
            // Lista de artigos (em produção, isso viria de uma API ou seria gerado automaticamente)
            const articleFiles = [
                'sintofilia.md',
                'futuro-desenvolvimento-web.md'
            ];
            
            for (const file of articleFiles) {
                try {
                    const response = await fetch(`articles/${file}`);
                    if (response.ok) {
                        const content = await response.text();
                        const article = this.parseArticle(content, file);
                        this.articles.push(article);
                    }
                } catch (error) {
                    console.warn(`Erro ao carregar artigo ${file}:`, error);
                }
            }
            
            this.filteredArticles = [...this.articles];
            this.renderArticles();
            
        } catch (error) {
            console.error('Erro ao carregar artigos:', error);
            this.renderErrorState();
        }
    }
    
    parseArticle(content, filename) {
        const lines = content.split('\n');
        let title = '';
        let author = '';
        let date = '';
        let readTime = '';
        let tags = [];
        let excerpt = '';
        let bodyContent = '';
        
        let inMetadata = false;
        let metadataEnd = 0;
        
        // Extrair metadados do cabeçalho
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            if (line.startsWith('# ') && !title) {
                title = line.substring(2).trim();
                inMetadata = true;
                continue;
            }
            
            if (inMetadata) {
                if (line.startsWith('**Autor:**')) {
                    author = line.replace('**Autor:**', '').trim();
                } else if (line.startsWith('**Data:**')) {
                    date = line.replace('**Data:**', '').trim();
                } else if (line.startsWith('**Tempo de leitura:**')) {
                    readTime = line.replace('**Tempo de leitura:**', '').trim();
                } else if (line.startsWith('**Tags:**')) {
                    const tagsText = line.replace('**Tags:**', '').trim();
                    tags = tagsText.split(',').map(tag => tag.trim());
                } else if (line === '---') {
                    metadataEnd = i + 1;
                    break;
                }
            }
        }
        
        // Extrair conteúdo do corpo
        const bodyLines = lines.slice(metadataEnd);
        bodyContent = bodyLines.join('\n').trim();
        
        // Gerar excerpt (primeiros 150 caracteres do conteúdo)
        const textContent = bodyContent.replace(/[#*`]/g, '').replace(/\n+/g, ' ');
        excerpt = textContent.substring(0, 150) + (textContent.length > 150 ? '...' : '');
        
        // Gerar slug para URL
        const slug = this.generateSlug(title);
        
        return {
            title: title || 'Artigo sem título',
            author: author || 'KerubinDev',
            date: date || new Date().toLocaleDateString('pt-BR'),
            readTime: readTime || '5 minutos',
            tags: tags.length > 0 ? tags : ['Geral'],
            excerpt,
            content: bodyContent,
            slug,
            filename
        };
    }
    
    generateSlug(title) {
        return title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim('-');
    }
    
    setupSearch() {
        const searchInput = document.getElementById('articleSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value.toLowerCase();
                this.filterArticles();
            });
        }
    }
    
    filterArticles() {
        if (!this.searchTerm) {
            this.filteredArticles = [...this.articles];
        } else {
            this.filteredArticles = this.articles.filter(article => {
                return (
                    article.title.toLowerCase().includes(this.searchTerm) ||
                    article.excerpt.toLowerCase().includes(this.searchTerm) ||
                    article.tags.some(tag => tag.toLowerCase().includes(this.searchTerm)) ||
                    article.author.toLowerCase().includes(this.searchTerm)
                );
            });
        }
        
        this.renderArticles();
    }
    
    renderArticles() {
        const container = document.getElementById('articlesGrid');
        if (!container) return;
        
        if (this.filteredArticles.length === 0) {
            container.innerHTML = this.renderEmptyState();
            return;
        }
        
        container.innerHTML = this.filteredArticles.map(article => this.renderArticleCard(article)).join('');
        
        // Adicionar event listeners para os cards
        this.setupArticleEvents();
        
        // Animar entrada dos cards se estivermos na seção de artigos
        if (document.getElementById('articles').classList.contains('active')) {
            this.animateArticleCards();
        }
    }
    
    renderArticleCard(article) {
        const tagColors = {
            'IA': 'var(--primary-blue)',
            'Psicologia': 'var(--primary-purple)',
            'Tecnologia': 'var(--primary-green)',
            'Relacionamentos': 'var(--primary-red)',
            'Futuro': 'var(--primary-yellow)',
            'Web Development': 'var(--primary-green)',
            'JavaScript': 'var(--primary-yellow)',
            'Frontend': 'var(--primary-blue)',
            'Backend': 'var(--primary-red)'
        };
        
        const tagsHtml = article.tags.map(tag => {
            const color = tagColors[tag] || 'var(--primary-gray)';
            return `<span class="article-tag" style="background: ${color}20; color: ${color};">${tag}</span>`;
        }).join('');
        
        return `
            <div class="article-card" data-slug="${article.slug}">
                <div class="article-meta">
                    <span class="article-date">📅 ${article.date}</span>
                    <span class="article-read-time">⏱️ ${article.readTime}</span>
                </div>
                
                <h3 class="article-title">${article.title}</h3>
                
                <p class="article-excerpt">${article.excerpt}</p>
                
                <div class="article-tags">
                    ${tagsHtml}
                </div>
                
                <a href="#artigo/${article.slug}" class="article-read-more">
                    Ler artigo completo →
                </a>
            </div>
        `;
    }
    
    renderEmptyState() {
        return `
            <div class="empty-state">
                <div class="empty-icon">📝</div>
                <h3>Nenhum artigo encontrado</h3>
                <p>Tente ajustar sua busca ou explore outros tópicos.</p>
            </div>
        `;
    }
    
    renderErrorState() {
        const container = document.getElementById('articlesGrid');
        if (container) {
            container.innerHTML = `
                <div class="error-state">
                    <div class="error-icon">⚠️</div>
                    <h3>Erro ao carregar artigos</h3>
                    <p>Não foi possível carregar os artigos. Tente novamente mais tarde.</p>
                </div>
            `;
        }
    }
    
    setupArticleEvents() {
        document.querySelectorAll('.article-card').forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const slug = card.getAttribute('data-slug');
                this.openArticle(slug);
            });
        });
        
        document.querySelectorAll('.article-read-more').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const href = link.getAttribute('href');
                const slug = href.split('/').pop();
                this.openArticle(slug);
            });
        });
    }
    
    animateArticleCards() {
        // Reset das posições
        anime.set('.article-card', {
            opacity: 0,
            translateY: '50px',
            scale: 0.9
        });
        
        // Animar entrada
        anime({
            targets: '.article-card',
            opacity: [0, 1],
            translateY: ['50px', '0px'],
            scale: [0.9, 1],
            duration: 800,
            delay: anime.stagger(150),
            easing: 'easeOutExpo'
        });
    }
    
    openArticle(slug) {
        const article = this.articles.find(a => a.slug === slug);
        if (!article) {
            console.error('Artigo não encontrado:', slug);
            return;
        }
        
        // Atualizar URL
        window.history.pushState({}, '', `#artigo/${slug}`);
        
        // Renderizar conteúdo do artigo
        const content = this.renderArticleContent(article);
        
        // Abrir modal com animação
        if (window.app) {
            window.app.openModal(article.title, content);
        }
    }
    
    renderArticleContent(article) {
        const tagColors = {
            'IA': 'var(--primary-blue)',
            'Psicologia': 'var(--primary-purple)',
            'Tecnologia': 'var(--primary-green)',
            'Relacionamentos': 'var(--primary-red)',
            'Futuro': 'var(--primary-yellow)',
            'Web Development': 'var(--primary-green)',
            'JavaScript': 'var(--primary-yellow)',
            'Frontend': 'var(--primary-blue)',
            'Backend': 'var(--primary-red)'
        };
        
        const tagsHtml = article.tags.map(tag => {
            const color = tagColors[tag] || 'var(--primary-gray)';
            return `<span style="background: ${color}20; color: ${color}; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; margin-right: 8px;">${tag}</span>`;
        }).join('');
        
        // Converter Markdown para HTML
        const htmlContent = marked.parse(article.content);
        
        return `
            <div class="article-header">
                <div class="article-meta-full">
                    <div><strong>Autor:</strong> ${article.author}</div>
                    <div><strong>Data:</strong> ${article.date}</div>
                    <div><strong>Tempo de leitura:</strong> ${article.readTime}</div>
                    <div><strong>Tags:</strong> ${tagsHtml}</div>
                </div>
            </div>
            
            <div class="article-content">
                ${htmlContent}
            </div>
        `;
    }
    
    // Método para adicionar novo artigo (para uso futuro)
    addArticle(articleData) {
        this.articles.push(articleData);
        this.filteredArticles = [...this.articles];
        this.renderArticles();
    }
    
    // Método para obter estatísticas
    getStats() {
        return {
            total: this.articles.length,
            tags: [...new Set(this.articles.flatMap(a => a.tags))],
            authors: [...new Set(this.articles.map(a => a.author))]
        };
    }
}

// Inicializar gerenciador de artigos
const articlesManager = new ArticlesManager();

// Tornar disponível globalmente
window.articlesManager = articlesManager;

