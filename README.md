# 🚀 KerubinDev - Site Profissional com Anime.js

## ✨ Visão Geral

Site profissional desenvolvido especialmente para o GitHub Pages do KerubinDev, inspirado no design e animações elegantes do **animejs.com**. O projeto combina animações fluidas e modernas com um sistema completo de artigos em Markdown.

## 🎯 Características Principais

### 🎨 Design e Animações
- **Animações Anime.js de alta qualidade** no mesmo nível do animejs.com
- **Círculos concêntricos animados** com gradientes coloridos vibrantes
- **Elementos SVG animados** com stroke drawing e morphing
- **Transições suaves** entre seções com easing personalizado
- **Elementos flutuantes** com movimento orbital e parallax
- **Paleta de cores moderna** inspirada no animejs.com

### 📱 Responsividade Total
- **Design responsivo** para desktop, tablet e mobile
- **Animações otimizadas** para diferentes dispositivos
- **Performance otimizada** com GPU acceleration
- **Suporte a prefers-reduced-motion** para acessibilidade

### 📝 Sistema de Artigos Avançado
- **Carregamento automático** de arquivos Markdown
- **Sistema de busca** em tempo real
- **Tags coloridas** por categoria
- **Modal elegante** para leitura completa
- **URLs amigáveis** com slugs automáticos
- **Metadados automáticos** (data, tempo de leitura, autor)

### 🛠️ Funcionalidades Técnicas
- **Navegação SPA** com animações entre seções
- **Sistema de roteamento** com suporte a deep links
- **Carregamento progressivo** com loading screen animado
- **Otimização de performance** com lazy loading
- **Código modular** e bem estruturado

## 📁 Estrutura do Projeto

```
kerubindev-animejs/
├── index.html                 # Página principal
├── assets/
│   ├── css/
│   │   ├── main.css           # Estilos principais
│   │   ├── animations.css     # Animações Anime.js
│   │   └── responsive.css     # Design responsivo
│   └── js/
│       ├── animations.js      # Sistema de animações
│       ├── articles.js        # Gerenciador de artigos
│       └── main.js           # Controlador principal
├── articles/                  # Pasta para artigos em Markdown
│   ├── sintofilia.md         # Artigo exemplo 1
│   └── futuro-desenvolvimento-web.md # Artigo exemplo 2
└── README.md                 # Esta documentação
```

## 🎨 Paleta de Cores

```css
/* Cores principais inspiradas no anime.js */
--primary-green: #00ff88    /* Verde vibrante */
--primary-red: #ff4757      /* Vermelho coral */
--primary-yellow: #ffa502   /* Amarelo dourado */
--primary-blue: #00d4ff     /* Azul ciano */
--primary-purple: #9c27b0   /* Roxo moderno */

/* Cores neutras */
--bg-dark: #0a0a0a         /* Fundo escuro */
--text-light: #ffffff      /* Texto claro */
--text-gray: #a0a0a0       /* Texto secundário */
```

## 🚀 Como Usar

### 1. Deploy no GitHub Pages

1. **Substitua os arquivos** do seu repositório `kerubindev.github.io` pelos arquivos desta pasta
2. **Commit e push** para o GitHub
3. **Aguarde alguns minutos** para o GitHub Pages atualizar
4. **Acesse** https://kerubindev.github.io

### 2. Teste Local

```bash
# Navegue até a pasta do projeto
cd kerubindev-animejs

# Inicie um servidor local
python3 -m http.server 8000

# Acesse no navegador
http://localhost:8000
```

## 📝 Como Adicionar Artigos

### Formato do Arquivo Markdown

Crie um arquivo `.md` na pasta `articles/` seguindo este formato:

```markdown
# Título do Artigo

**Autor:** Seu Nome
**Data:** 21 de Junho de 2025
**Tempo de leitura:** 5 minutos
**Tags:** Tecnologia, JavaScript, Web Development

---

Conteúdo do artigo em Markdown...

## Seção 1

Texto da seção...

### Subseção

Mais conteúdo...
```

### Exemplo Prático

1. **Crie o arquivo**: `articles/meu-novo-artigo.md`
2. **Adicione o conteúdo** seguindo o formato acima
3. **Salve o arquivo**
4. **O artigo aparecerá automaticamente** na seção de artigos

### Tags Disponíveis com Cores

- **IA** → Azul (`--primary-blue`)
- **Psicologia** → Roxo (`--primary-purple`)
- **Tecnologia** → Verde (`--primary-green`)
- **Relacionamentos** → Vermelho (`--primary-red`)
- **Futuro** → Amarelo (`--primary-yellow`)
- **Web Development** → Verde (`--primary-green`)
- **JavaScript** → Amarelo (`--primary-yellow`)
- **Frontend** → Azul (`--primary-blue`)
- **Backend** → Vermelho (`--primary-red`)

## 🎯 Seções do Site

### 🏠 Início (Home)
- **Animação principal** com círculos concêntricos
- **Título animado** linha por linha
- **Botões de ação** com hover effects
- **Elementos SVG** com stroke drawing

### 👤 Sobre Mim
- **Perfil animado** com círculo colorido
- **Elementos flutuantes** com tecnologias
- **Estatísticas animadas** com contadores
- **Texto progressivo** com fade-in

### 💼 Projetos
- **Grid responsivo** de projetos
- **Cards animados** com hover effects
- **Tags coloridas** por tecnologia
- **Links para GitHub** e demos

### 📚 Artigos
- **Sistema de busca** em tempo real
- **Cards de artigos** com metadados
- **Modal de leitura** com Markdown renderizado
- **Tags categorizadas** com cores

### 🛠️ Habilidades
- **Categorias organizadas** (Frontend, Backend, etc.)
- **Skills animadas** com stagger effect
- **Hover interactions** em cada skill
- **Layout responsivo**

### 📞 Contato
- **Links sociais** animados
- **Bubble de mensagem** com animação
- **Informações de contato** organizadas
- **Animações de entrada** suaves

## 🔧 Personalização

### Modificar Cores

Edite as variáveis CSS em `assets/css/main.css`:

```css
:root {
    --primary-green: #sua-cor;
    --primary-red: #sua-cor;
    /* ... outras cores */
}
```

### Adicionar Projetos

Edite o array `projects` em `assets/js/main.js`:

```javascript
{
    title: "Seu Projeto",
    description: "Descrição do projeto...",
    tags: ["JavaScript", "React"],
    links: [
        { text: "GitHub", url: "https://github.com/..." },
        { text: "Demo", url: "https://..." }
    ],
    featured: true // Para destacar o projeto
}
```

### Modificar Animações

As animações estão em `assets/js/animations.js`. Você pode:

- **Ajustar durações**: Modifique `duration` nas animações
- **Mudar easing**: Use diferentes curvas de `easing`
- **Adicionar delays**: Configure `delay` para sequências
- **Criar novas animações**: Use a API do Anime.js

## 🎨 Animações Implementadas

### Hero Section
- **Círculos concêntricos** com stroke drawing
- **Triângulos animados** com rotation e scale
- **Pontos orbitais** com movimento circular
- **Texto escalonado** com stagger effect

### Navegação
- **Menu responsivo** com animações mobile
- **Links com hover** e active states
- **Transições suaves** entre seções
- **Loading screen** animado

### Cards e Elementos
- **Hover animations** em todos os cards
- **Scroll reveal** para elementos
- **Floating elements** com movimento contínuo
- **Modal animations** para artigos

## 📱 Compatibilidade

### Navegadores Suportados
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

### Dispositivos
- ✅ Desktop (1920px+)
- ✅ Laptop (1366px+)
- ✅ Tablet (768px+)
- ✅ Mobile (320px+)

## 🚀 Performance

### Otimizações Implementadas
- **GPU acceleration** para animações
- **Will-change** em elementos animados
- **Debounced scroll** events
- **Lazy loading** de conteúdo
- **Minified assets** prontos para produção

### Métricas Esperadas
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🎯 Próximos Passos

### Melhorias Sugeridas
1. **PWA Support** - Service Worker e manifest
2. **Dark/Light Mode** - Toggle de tema
3. **Internacionalização** - Suporte a múltiplos idiomas
4. **Analytics** - Google Analytics ou similar
5. **SEO** - Meta tags e structured data
6. **Blog CMS** - Interface para gerenciar artigos

### Funcionalidades Avançadas
1. **Comentários** nos artigos
2. **Newsletter** signup
3. **Portfolio filtering** por tecnologia
4. **Contact form** funcional
5. **Social sharing** buttons

## 🤝 Suporte

Para dúvidas ou sugestões sobre o site:

- **GitHub**: https://github.com/KerubinDev
- **Email**: contato@kerubindev.com
- **LinkedIn**: https://linkedin.com/in/kerubindev

---

**Desenvolvido com ❤️ usando Anime.js e tecnologias web modernas**

*Site criado especialmente para KerubinDev - Transformando ideias em experiências digitais*

