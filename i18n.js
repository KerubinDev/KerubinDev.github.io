// Sistema de tradução multi-idioma
document.addEventListener('DOMContentLoaded', function() {
    // Dados de tradução
    const translations = {
        'pt-BR': {
            // Navegação
            'nav_hub': 'Hub Central',
            'nav_about': 'Dimensão Psique & Código',
            'nav_projects': 'Galáxia Portfólio',
            'nav_skills': 'Nebulosa Habilidades',
            'nav_contact': 'Estação Contato',
            
            // Hub
            'hub_welcome': 'Bem-vindo ao Universo Criativo de KerubinDev',
            'hub_navigate': 'Navegue pelos portais para explorar minhas dimensões.',
            'hub_quote': 'Desenvolvedor apaixonado, constantemente evoluindo e ultrapassando fronteiras em código, design e criatividade.',
            
            // Sobre
            'about_title': 'Dimensão Psique & Código',
            'about_p1': 'Olá, sou <strong>Kelvin Moraes (Kerubin)</strong>, um desenvolvedor fullstack e game developer do Brasil.',
            'about_p2': 'Atualmente sou estudante bilíngue de Desenvolvimento de Sistemas no Senac, onde estou aprimorando minhas habilidades para criar experiências digitais impactantes.',
            'about_p3': 'Minha jornada abrange desenvolvimento web, criação de jogos, design gráfico e marketing digital, combinando criatividade técnica com visão artística.',
            'about_p4': 'Sou fascinado por psicologia e psicanálise, adoro programar enquanto escuto música clássica, e tenho prazer em resolver quebra-cabeças complexos tanto no código quanto na vida.',
            
            // Projetos
            'projects_title': 'Galáxia Portfólio',
            'projects_view_details': 'Ver detalhes',
            'projects_github_more': 'Ver mais no GitHub',
            'projects_repos_title': 'Meus Repositórios GitHub',
            'projects_repos_check': 'Confira meus projetos mais recentes diretamente do GitHub:',
            'projects_loading': 'Carregando repositórios...',
            'projects_no_repos': 'Nenhum repositório encontrado.',
            'projects_view_repo': 'Ver Repositório',
            'projects_updated_on': 'Atualizado em:',
            'projects_error': 'Não foi possível carregar os repositórios.',
            
            // Modal de Projetos
            'modal_description': 'Descrição',
            'modal_technologies': 'Tecnologias Utilizadas',
            'modal_features': 'Recursos',
            'modal_view_project': 'Ver Projeto',
            'modal_repository': 'Repositório',
            
            // Habilidades
            'skills_title': 'Nebulosa Habilidades',
            'skills_other': 'Outras Habilidades',
            
            // Contato
            'contact_title': 'Estação Contato',
            'contact_form_title': 'Envie uma Mensagem',
            'contact_name': 'Nome',
            'contact_email': 'Email',
            'contact_subject': 'Assunto',
            'contact_message': 'Mensagem',
            'contact_send': 'Enviar Mensagem',
            'contact_success': 'Mensagem enviada com sucesso! Obrigado pelo contato.',
            'contact_error': 'Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.',
            'contact_available': 'Estou disponível para projetos de desenvolvimento web, criação de jogos, design gráfico e marketing digital. Fique à vontade para entrar em contato para discutirmos como posso ajudar!'
        },
        'en': {
            // Navigation
            'nav_hub': 'Central Hub',
            'nav_about': 'Psyche & Code Dimension',
            'nav_projects': 'Portfolio Galaxy',
            'nav_skills': 'Skills Nebula',
            'nav_contact': 'Contact Station',
            
            // Hub
            'hub_welcome': 'Welcome to KerubinDev\'s Creative Universe',
            'hub_navigate': 'Navigate through the portals to explore my dimensions.',
            'hub_quote': 'Passionate developer, constantly evolving and pushing boundaries in code, design, and creativity.',
            
            // About
            'about_title': 'Psyche & Code Dimension',
            'about_p1': 'Hello, I\'m <strong>Kelvin Moraes (Kerubin)</strong>, a fullstack and game developer from Brazil.',
            'about_p2': 'I\'m currently a bilingual Systems Development student at Senac, where I\'m enhancing my skills to create impactful digital experiences.',
            'about_p3': 'My journey encompasses web development, game creation, graphic design, and digital marketing, combining technical creativity with artistic vision.',
            'about_p4': 'I\'m fascinated by psychology and psychoanalysis, love coding while listening to classical music, and enjoy solving complex puzzles both in code and in life.',
            
            // Projects
            'projects_title': 'Portfolio Galaxy',
            'projects_view_details': 'View details',
            'projects_github_more': 'See more on GitHub',
            'projects_repos_title': 'My GitHub Repositories',
            'projects_repos_check': 'Check out my latest projects directly from GitHub:',
            'projects_loading': 'Loading repositories...',
            'projects_no_repos': 'No repositories found.',
            'projects_view_repo': 'View Repository',
            'projects_updated_on': 'Updated on:',
            'projects_error': 'Could not load repositories.',
            
            // Project Modal
            'modal_description': 'Description',
            'modal_technologies': 'Technologies Used',
            'modal_features': 'Features',
            'modal_view_project': 'View Project',
            'modal_repository': 'Repository',
            
            // Skills
            'skills_title': 'Skills Nebula',
            'skills_other': 'Other Skills',
            
            // Contact
            'contact_title': 'Contact Station',
            'contact_form_title': 'Send a Message',
            'contact_name': 'Name',
            'contact_email': 'Email',
            'contact_subject': 'Subject',
            'contact_message': 'Message',
            'contact_send': 'Send Message',
            'contact_success': 'Message sent successfully! Thank you for reaching out.',
            'contact_error': 'An error occurred while sending the message. Please try again.',
            'contact_available': 'I\'m available for web development, game creation, graphic design, and digital marketing projects. Feel free to get in touch to discuss how I can help!'
        },
        'ja': {
            // ナビゲーション
            'nav_hub': 'セントラルハブ',
            'nav_about': '精神＆コードディメンション',
            'nav_projects': 'ポートフォリオギャラクシー',
            'nav_skills': 'スキルネビュラ',
            'nav_contact': 'コンタクトステーション',
            
            // ハブ
            'hub_welcome': 'KerubinDevのクリエイティブユニバースへようこそ',
            'hub_navigate': 'ポータルを通して私の次元を探索してください。',
            'hub_quote': '情熱的な開発者、コード、デザイン、創造性において常に進化し、境界を押し広げています。',
            
            // 自己紹介
            'about_title': '精神＆コードディメンション',
            'about_p1': 'こんにちは、<strong>ケルビン・モラエス（Kerubin）</strong>です。ブラジル出身のフルスタック開発者兼ゲーム開発者です。',
            'about_p2': '現在、Senacでバイリンガルシステム開発学生として、インパクトのあるデジタル体験を創造するスキルを向上させています。',
            'about_p3': '私の旅はウェブ開発、ゲーム制作、グラフィックデザイン、デジタルマーケティングを網羅し、技術的創造性と芸術的ビジョンを融合させています。',
            'about_p4': '心理学と精神分析に魅了され、クラシック音楽を聴きながらコーディングすることを楽しみ、コードと人生の両方で複雑なパズルを解くことに喜びを感じています。',
            
            // プロジェクト
            'projects_title': 'ポートフォリオギャラクシー',
            'projects_view_details': '詳細を見る',
            'projects_github_more': 'GitHubでもっと見る',
            'projects_repos_title': '私のGitHubリポジトリ',
            'projects_repos_check': 'GitHubから最新のプロジェクトをチェック：',
            'projects_loading': 'リポジトリを読み込み中...',
            'projects_no_repos': 'リポジトリが見つかりません。',
            'projects_view_repo': 'リポジトリを見る',
            'projects_updated_on': '更新日:',
            'projects_error': 'リポジトリを読み込めませんでした。',
            
            // プロジェクトモーダル
            'modal_description': '説明',
            'modal_technologies': '使用技術',
            'modal_features': '機能',
            'modal_view_project': 'プロジェクトを見る',
            'modal_repository': 'リポジトリ',
            
            // スキル
            'skills_title': 'スキルネビュラ',
            'skills_other': 'その他のスキル',
            
            // コンタクト
            'contact_title': 'コンタクトステーション',
            'contact_form_title': 'メッセージを送る',
            'contact_name': '名前',
            'contact_email': 'メール',
            'contact_subject': '件名',
            'contact_message': 'メッセージ',
            'contact_send': 'メッセージを送信',
            'contact_success': 'メッセージが正常に送信されました！ご連絡ありがとうございます。',
            'contact_error': 'メッセージの送信中にエラーが発生しました。もう一度やり直してください。',
            'contact_available': 'ウェブ開発、ゲーム制作、グラフィックデザイン、デジタルマーケティングのプロジェクトに対応しています。どのようにお手伝いできるか話し合うために、お気軽にご連絡ください！'
        }
    };

    let currentLang = 'pt-BR'; // Idioma padrão

    // Selecionar elementos de idioma
    const langButtons = document.querySelectorAll('.language-btn');
    
    // Inicializar
    updateLanguage(currentLang);
    
    // Event listeners para botões de idioma
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            if (lang && translations[lang]) {
                currentLang = lang;
                updateLanguage(lang);
                
                // Atualizar classe ativa nos botões
                langButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Aplicar tradução
    function updateLanguage(lang) {
        if (!translations[lang]) return;
        
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang][key]) {
                // Verificar se o conteúdo deve ser tratado como HTML
                if (element.getAttribute('data-i18n-html') === 'true') {
                    element.innerHTML = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });
        
        // Atualizar atributos específicos
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (translations[lang][key]) {
                element.placeholder = translations[lang][key];
            }
        });
        
        // Atualizar atributos de HTML
        document.documentElement.lang = lang;
    }
    
    // Aplicar atributos data-i18n automaticamente na primeira carga
    function applyI18nAttributes() {
        // Navegação
        document.querySelectorAll('.nav-links a').forEach(link => {
            const target = link.getAttribute('data-target');
            if (target === 'hub') link.setAttribute('data-i18n', 'nav_hub');
            if (target === 'sobre') link.setAttribute('data-i18n', 'nav_about');
            if (target === 'projetos') link.setAttribute('data-i18n', 'nav_projects');
            if (target === 'habilidades') link.setAttribute('data-i18n', 'nav_skills');
            if (target === 'contato') link.setAttribute('data-i18n', 'nav_contact');
        });
        
        // Hub
        const hubContent = document.getElementById('hub-content');
        if (hubContent) {
            hubContent.querySelector('h1').setAttribute('data-i18n', 'hub_welcome');
            hubContent.querySelector('p').setAttribute('data-i18n', 'hub_navigate');
            const quote = hubContent.querySelector('.cosmic-quote p i');
            if (quote) quote.setAttribute('data-i18n', 'hub_quote');
        }
        
        // Sobre
        const sobreContent = document.getElementById('sobre-content');
        if (sobreContent) {
            sobreContent.querySelector('h2').setAttribute('data-i18n', 'about_title');
            const paragraphs = sobreContent.querySelectorAll('.about-text p');
            if (paragraphs.length >= 4) {
                paragraphs[0].setAttribute('data-i18n', 'about_p1');
                paragraphs[0].setAttribute('data-i18n-html', 'true');
                paragraphs[1].setAttribute('data-i18n', 'about_p2');
                paragraphs[2].setAttribute('data-i18n', 'about_p3');
                paragraphs[3].setAttribute('data-i18n', 'about_p4');
            }
        }
        
        // Projetos
        const projetosContent = document.getElementById('projetos-content');
        if (projetosContent) {
            projetosContent.querySelector('h2').setAttribute('data-i18n', 'projects_title');
            projetosContent.querySelectorAll('.project-details-btn').forEach(btn => {
                btn.setAttribute('data-i18n', 'projects_view_details');
            });
            const githubLink = projetosContent.querySelector('.github-link a');
            if (githubLink) {
                const githubText = githubLink.childNodes[0];
                if (githubText && githubText.nodeType === 3) { // Node.TEXT_NODE
                    githubLink.innerHTML = '<span data-i18n="projects_github_more"></span> <i class="fab fa-github"></i>';
                }
            }
            
            // Repositórios
            const reposTitle = projetosContent.querySelector('.github-repos h3');
            if (reposTitle) reposTitle.setAttribute('data-i18n', 'projects_repos_title');
            const reposText = projetosContent.querySelector('.github-repos p');
            if (reposText) reposText.setAttribute('data-i18n', 'projects_repos_check');
            const loadingText = projetosContent.querySelector('.repo-loading p');
            if (loadingText) loadingText.setAttribute('data-i18n', 'projects_loading');
        }
        
        // Habilidades
        const habilidadesContent = document.getElementById('habilidades-content');
        if (habilidadesContent) {
            habilidadesContent.querySelector('h2').setAttribute('data-i18n', 'skills_title');
            const otherSkillsTitle = habilidadesContent.querySelector('.other-skills h3');
            if (otherSkillsTitle) otherSkillsTitle.setAttribute('data-i18n', 'skills_other');
        }
        
        // Contato
        const contatoContent = document.getElementById('contato-content');
        if (contatoContent) {
            contatoContent.querySelector('h2').setAttribute('data-i18n', 'contact_title');
            const formTitle = contatoContent.querySelector('.contact-form-container h3');
            if (formTitle) formTitle.setAttribute('data-i18n', 'contact_form_title');
            
            // Campos do formulário
            const nameLabel = contatoContent.querySelector('label[for="name"]');
            if (nameLabel) nameLabel.setAttribute('data-i18n', 'contact_name');
            
            const emailLabel = contatoContent.querySelector('label[for="email"]');
            if (emailLabel) emailLabel.setAttribute('data-i18n', 'contact_email');
            
            const subjectLabel = contatoContent.querySelector('label[for="subject"]');
            if (subjectLabel) subjectLabel.setAttribute('data-i18n', 'contact_subject');
            
            const messageLabel = contatoContent.querySelector('label[for="message"]');
            if (messageLabel) messageLabel.setAttribute('data-i18n', 'contact_message');
            
            // Botão de envio
            const submitBtn = contatoContent.querySelector('.submit-btn');
            if (submitBtn) {
                const submitText = submitBtn.childNodes[0];
                if (submitText && submitText.nodeType === 3) { // Node.TEXT_NODE
                    submitBtn.innerHTML = '<span data-i18n="contact_send"></span> <i class="fas fa-paper-plane"></i>';
                }
            }
            
            // Mensagens de status
            const successMsg = contatoContent.querySelector('.form-success p');
            if (successMsg) successMsg.setAttribute('data-i18n', 'contact_success');
            
            const errorMsg = contatoContent.querySelector('.form-error p');
            if (errorMsg) errorMsg.setAttribute('data-i18n', 'contact_error');
            
            // Mensagem final
            const contactMsg = contatoContent.querySelector('.contact-message p');
            if (contactMsg) contactMsg.setAttribute('data-i18n', 'contact_available');
        }
        
        // Modal de projetos
        const projectModal = document.getElementById('project-modal');
        if (projectModal) {
            const descTitle = projectModal.querySelector('.project-description h4:nth-of-type(1)');
            if (descTitle) descTitle.setAttribute('data-i18n', 'modal_description');
            
            const techTitle = projectModal.querySelector('.project-description h4:nth-of-type(2)');
            if (techTitle) techTitle.setAttribute('data-i18n', 'modal_technologies');
            
            const featuresTitle = projectModal.querySelector('.project-description h4:nth-of-type(3)');
            if (featuresTitle) featuresTitle.setAttribute('data-i18n', 'modal_features');
            
            const liveLink = projectModal.querySelector('.primary-btn');
            if (liveLink) {
                const liveText = liveLink.childNodes[0];
                if (liveText && liveText.nodeType === 3) { // Node.TEXT_NODE
                    liveLink.innerHTML = '<span data-i18n="modal_view_project"></span> <i class="fas fa-external-link-alt"></i>';
                }
            }
            
            const repoLink = projectModal.querySelector('.secondary-btn');
            if (repoLink) {
                const repoText = repoLink.childNodes[0];
                if (repoText && repoText.nodeType === 3) { // Node.TEXT_NODE
                    repoLink.innerHTML = '<span data-i18n="modal_repository"></span> <i class="fab fa-github"></i>';
                }
            }
        }
        
        // Aplicar tradução inicial
        updateLanguage(currentLang);
    }
    
    // Executar quando o DOM estiver carregado
    applyI18nAttributes();
}); 