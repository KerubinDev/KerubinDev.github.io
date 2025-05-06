// Dados dos projetos
const projectsData = {
    kerubinai: {
        title: "Kerubin AI",
        description: "Assistente de IA avançado desenvolvido para automatizar tarefas e fornecer assistência inteligente em diversos contextos. Utiliza processamento de linguagem natural para entender e responder consultas de usuários de maneira contextual e precisa.",
        technologies: ["Python", "TensorFlow", "NLP", "Machine Learning", "API REST"],
        features: [
            "Processamento de linguagem natural avançado",
            "Sistema de aprendizado contínuo",
            "Interface conversacional intuitiva",
            "Integração com múltiplas plataformas",
            "Módulos especializados para diferentes domínios"
        ],
        images: [
            "images/projects/kerubinai/main.jpg",
            "images/projects/kerubinai/interface.jpg",
            "images/projects/kerubinai/architecture.jpg",
            "images/projects/kerubinai/analytics.jpg"
        ],
        liveURL: "#",
        repoURL: "https://github.com/KerubinDev/Kerubin_AI"
    },
    schoolmanagement: {
        title: "School Management System",
        description: "Sistema completo para gerenciamento escolar, permitindo controle de alunos, professores, turmas, grades curriculares e recursos acadêmicos. Plataforma desenvolvida para otimizar processos administrativos em instituições de ensino.",
        technologies: ["Python", "SQL", "Django", "Bootstrap", "PostgreSQL"],
        features: [
            "Dashboard administrativo com métricas em tempo real",
            "Gestão de matrículas e turmas",
            "Controle de notas e frequência",
            "Gerenciamento de recursos e infraestrutura",
            "Comunicação integrada entre pais, alunos e professores",
            "Relatórios e análises de desempenho"
        ],
        images: [
            "images/projects/schoolmanagement/dashboard.jpg",
            "images/projects/schoolmanagement/students.jpg",
            "images/projects/schoolmanagement/reports.jpg",
            "images/projects/schoolmanagement/calendar.jpg"
        ],
        liveURL: "#",
        repoURL: "#"
    },
    kanban: {
        title: "Kanban Board",
        description: "Aplicativo de gerenciamento de tarefas inspirado na metodologia Kanban, permitindo organização visual de fluxos de trabalho em colunas customizáveis. Ideal para equipes ágeis e gestão pessoal de projetos.",
        technologies: ["JavaScript", "HTML5", "CSS3", "Local Storage", "Drag & Drop API"],
        features: [
            "Quadros personalizáveis com múltiplas colunas",
            "Sistema de drag-and-drop intuitivo",
            "Categorização por cores e etiquetas",
            "Armazenamento local para funcionamento offline",
            "Rastreamento de prazos e prioridades",
            "Filtros e pesquisa avançada"
        ],
        images: [
            "images/projects/kanban/board.jpg",
            "images/projects/kanban/card-detail.jpg",
            "images/projects/kanban/analytics.jpg",
            "images/projects/kanban/mobile.jpg"
        ],
        liveURL: "#",
        repoURL: "#"
    },
    gameproject: {
        title: "Cosmic Adventure",
        description: "Jogo 2D de aventura espacial desenvolvido com GameMaker, onde o jogador explora planetas misteriosos, resolve quebra-cabeças e enfrenta desafios únicos em cada ambiente. Uma experiência imersiva com narrativa envolvente.",
        technologies: ["GameMaker Studio", "GML", "Pixel Art", "Sound Design"],
        features: [
            "Mundos proceduralmente gerados",
            "Sistema de combate dinâmico",
            "Economia e progressão de personagem",
            "Quebra-cabeças ambientais",
            "Trilha sonora adaptativa"
        ],
        images: [
            "images/projects/gameproject/gameplay.jpg",
            "images/projects/gameproject/characters.jpg",
            "images/projects/gameproject/world.jpg",
            "images/projects/gameproject/battle.jpg"
        ],
        liveURL: "#",
        repoURL: "#"
    },
    webapp: {
        title: "Web Application",
        description: "Aplicação web responsiva desenvolvida para oferecer uma experiência de usuário moderna e fluida. Utiliza as mais recentes tecnologias web para garantir performance, acessibilidade e compatibilidade com diversos dispositivos.",
        technologies: ["JavaScript", "Node.js", "Express", "MongoDB", "Responsive Design"],
        features: [
            "Arquitetura MVC robusta",
            "API RESTful para integração com outros sistemas",
            "Autenticação segura com JWT",
            "Design responsivo para mobile e desktop",
            "Performance otimizada com lazy loading"
        ],
        images: [
            "images/projects/webapp/dashboard.jpg",
            "images/projects/webapp/mobile.jpg",
            "images/projects/webapp/features.jpg",
            "images/projects/webapp/settings.jpg"
        ],
        liveURL: "#",
        repoURL: "#"
    },
    designportfolio: {
        title: "Design Portfolio",
        description: "Coleção de trabalhos de design gráfico incluindo identidades visuais, interfaces de usuário, materiais de marketing e ilustrações. Demonstra versatilidade estilística e capacidade de solucionar problemas de comunicação visual.",
        technologies: ["Photoshop", "Illustrator", "InDesign", "UI/UX", "Branding"],
        features: [
            "Identidade visual para empresas de diversos setores",
            "Interfaces para aplicativos e websites",
            "Materiais promocionais impressos e digitais",
            "Ilustrações e arte conceitual",
            "Design de experiência do usuário"
        ],
        images: [
            "images/projects/designportfolio/branding.jpg",
            "images/projects/designportfolio/ui.jpg",
            "images/projects/designportfolio/print.jpg",
            "images/projects/designportfolio/illustration.jpg"
        ],
        liveURL: "#",
        repoURL: "#"
    }
};

// Slider de projetos
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.projects-slide');
    const indicators = document.querySelectorAll('.slider-indicators .indicator');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    let currentSlide = 0;

    // Inicializar GitHub API
    fetchGitHubRepos();

    // Inicializar modal de projetos
    setupProjectModals();

    // Função para mudar slide
    function goToSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
        
        // Desabilitar setas quando necessário
        prevArrow.classList.toggle('disabled', currentSlide === 0);
        nextArrow.classList.toggle('disabled', currentSlide === slides.length - 1);
    }

    // Event listeners para navegação
    prevArrow.addEventListener('click', () => {
        if (currentSlide > 0) {
            goToSlide(currentSlide - 1);
        }
    });

    nextArrow.addEventListener('click', () => {
        if (currentSlide < slides.length - 1) {
            goToSlide(currentSlide + 1);
        }
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    // Inicializar
    goToSlide(0);
});

// Integração com API do GitHub
function fetchGitHubRepos() {
    const username = 'KerubinDev';
    const reposList = document.querySelector('.repos-list');
    const loadingElem = document.querySelector('.repo-loading');
    
    if (!reposList) return;
    
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Falha ao obter repositórios');
            }
            return response.json();
        })
        .then(data => {
            loadingElem.style.display = 'none';
            
            if (data.length === 0) {
                reposList.innerHTML = '<p>Nenhum repositório encontrado.</p>';
                return;
            }
            
            data.forEach(repo => {
                const repoCard = document.createElement('div');
                repoCard.className = 'repo-card';
                
                // Criar estrelas
                const stars = `<span class="repo-stars"><i class="fas fa-star"></i> ${repo.stargazers_count}</span>`;
                
                // Criar tags de linguagens
                const language = repo.language ? 
                    `<span class="repo-language">${repo.language}</span>` : '';
                
                // Formatar data de atualização
                const updatedDate = new Date(repo.updated_at);
                const formattedDate = updatedDate.toLocaleDateString('pt-BR');
                
                repoCard.innerHTML = `
                    <h4>${repo.name}</h4>
                    <p>${repo.description || 'Sem descrição disponível.'}</p>
                    <div class="repo-meta">
                        ${language}
                        ${stars}
                        <span class="repo-updated">Atualizado em: ${formattedDate}</span>
                    </div>
                    <a href="${repo.html_url}" target="_blank" class="repo-link">
                        Ver Repositório <i class="fas fa-external-link-alt"></i>
                    </a>
                `;
                
                reposList.appendChild(repoCard);
            });
        })
        .catch(error => {
            loadingElem.style.display = 'none';
            reposList.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>Não foi possível carregar os repositórios. ${error.message}</p>
                </div>
            `;
            console.error('Erro ao obter repositórios:', error);
        });
}

// Configuração dos modais de projetos
function setupProjectModals() {
    const modal = document.getElementById('project-modal');
    const modalTitle = modal.querySelector('.modal-header h3');
    const modalDescription = modal.querySelector('.project-description p');
    const modalTechTags = modal.querySelector('.tech-tags');
    const modalFeatures = modal.querySelector('.features-list');
    const modalMainImage = modal.querySelector('.gallery-main img');
    const modalThumbs = modal.querySelector('.gallery-thumbs');
    const modalLiveLink = modal.querySelector('.primary-btn');
    const modalRepoLink = modal.querySelector('.secondary-btn');
    const closeButton = modal.querySelector('.close-modal');
    
    // Adicionar event listeners para botões de detalhes
    const detailButtons = document.querySelectorAll('.project-details-btn');
    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const project = projectsData[projectId];
            
            if (!project) return;
            
            // Preencher conteúdo do modal
            modalTitle.textContent = project.title;
            modalDescription.textContent = project.description;
            
            // Adicionar tags de tecnologias
            modalTechTags.innerHTML = '';
            project.technologies.forEach(tech => {
                const tag = document.createElement('span');
                tag.className = 'tech-tag';
                tag.textContent = tech;
                modalTechTags.appendChild(tag);
            });
            
            // Adicionar features
            modalFeatures.innerHTML = '';
            project.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                modalFeatures.appendChild(li);
            });
            
            // Configurar imagens da galeria
            if (project.images && project.images.length > 0) {
                modalMainImage.src = project.images[0];
                modalMainImage.alt = project.title;
                
                modalThumbs.innerHTML = '';
                project.images.forEach((src, index) => {
                    const thumb = document.createElement('img');
                    thumb.src = src;
                    thumb.alt = `${project.title} - Imagem ${index + 1}`;
                    if (index === 0) thumb.classList.add('active');
                    
                    // Evento de clique na miniatura
                    thumb.addEventListener('click', function() {
                        modalMainImage.src = this.src;
                        modalMainImage.alt = this.alt;
                        modalThumbs.querySelectorAll('img').forEach(img => img.classList.remove('active'));
                        this.classList.add('active');
                    });
                    
                    modalThumbs.appendChild(thumb);
                });
            }
            
            // Configurar links
            modalLiveLink.href = project.liveURL || '#';
            modalRepoLink.href = project.repoURL || '#';
            
            // Exibir modal
            modal.classList.add('active');
            document.body.classList.add('modal-open');
        });
    });
    
    // Fechar modal
    closeButton.addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    });
    
    // Fechar ao clicar fora do conteúdo
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    });
    
    // Fechar com tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    });
}

// Formulário de contato
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formSuccess = document.querySelector('.form-success');
        const formError = document.querySelector('.form-error');
        
        // Obter dados do formulário
        const formData = new FormData(contactForm);
        const formProps = Object.fromEntries(formData);
        
        // Simulação de envio - em produção, usar um serviço como Formspree ou backend próprio
        setTimeout(() => {
            // Simulando sucesso
            formSuccess.style.display = 'flex';
            formError.style.display = 'none';
            contactForm.reset();
            
            // Esconder mensagem de sucesso após 5 segundos
            setTimeout(() => {
                formSuccess.style.display = 'none';
            }, 5000);
            
            /* Para simular erro, descomentar:
            formSuccess.style.display = 'none';
            formError.style.display = 'flex';
            
            setTimeout(() => {
                formError.style.display = 'none';
            }, 5000);
            */
        }, 1500);
    });
}); 