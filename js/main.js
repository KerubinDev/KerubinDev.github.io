// ===== MAIN APPLICATION =====

class PortfolioApp {
  constructor() {
    this.isInitialized = false;
    this.currentFilter = 'all';
    this.projects = [];
    this.articles = [];
    
    this.init();
  }
  
  /**
   * Initialize the application
   */
  init() {
    if (this.isInitialized) return;
    
    this.setupEventListeners();
    this.setupNavigation();
    this.setupProjectFilters();
    this.setupContactForm();
    this.setupSkillBars();
    this.setupSmoothScrolling();
    this.setupKeyboardNavigation();
    this.setupPerformanceOptimizations();
    
    this.isInitialized = true;
    
    // Initialize data
    this.loadProjects();
    this.loadArticles();
    
    console.log('Portfolio app initialized successfully');
  }
  
  /**
   * Setup global event listeners
   */
  setupEventListeners() {
    // Window events
    window.addEventListener('load', () => {
      this.onWindowLoad();
    });
    
    window.addEventListener('resize', utils.debounce(() => {
      this.onWindowResize();
    }, 250));
    
    window.addEventListener('scroll', utils.throttle(() => {
      this.onWindowScroll();
    }, 16));
    
    // Keyboard events
    document.addEventListener('keydown', (e) => {
      this.handleKeyboardNavigation(e);
    });
    
    // Theme change events
    document.addEventListener('themechange', (e) => {
      this.onThemeChange(e.detail.theme);
    });
    
    // Visibility change
    document.addEventListener('visibilitychange', () => {
      this.onVisibilityChange();
    });
  }
  
  /**
   * Setup navigation functionality
   */
  setupNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        this.toggleMobileMenu();
      });
    }
    
    // Navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        this.handleNavigation(e, link);
      });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu && navMenu.classList.contains('active') && 
          !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        this.closeMobileMenu();
      }
    });
  }
  
  /**
   * Setup project filters
   */
  setupProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.filterProjects(button.dataset.filter);
        this.updateActiveFilter(button);
      });
    });
  }
  
  /**
   * Setup contact form
   */
  setupContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    
    const inputs = contactForm.querySelectorAll('.form-input, .form-textarea');
    const submitButton = contactForm.querySelector('.btn-submit');
    
    // Form validation
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        this.validateField(input);
      });
      
      input.addEventListener('input', () => {
        this.clearFieldError(input);
      });
    });
    
    // Form submission
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFormSubmission(contactForm);
    });
  }
  
  /**
   * Setup skill bars animation
   */
  setupSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
          entry.target.classList.add('animated');
          this.animateSkillBar(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
  }
  
  /**
   * Setup smooth scrolling
   */
  setupSmoothScrolling() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          utils.smoothScrollTo(targetElement, 80, 1000);
          this.updateActiveNavLink(targetId);
        }
      });
    });
  }
  
  /**
   * Setup keyboard navigation
   */
  setupKeyboardNavigation() {
    // Focus management for accessibility
    const focusableElements = document.querySelectorAll(
      'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
      element.addEventListener('focus', () => {
        this.onElementFocus(element);
      });
    });
  }
  
  /**
   * Setup performance optimizations
   */
  setupPerformanceOptimizations() {
    // Lazy load images
    this.setupLazyLoading();
    
    // Preload critical resources
    this.preloadCriticalResources();
    
    // Setup intersection observers for performance
    this.setupPerformanceObservers();
  }
  
  /**
   * Handle window load event
   */
  onWindowLoad() {
    // Remove loading screen if still visible
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
      }, 500);
    }
    
    // Initialize animations after load
    if (window.animationController) {
      animationController.startMainAnimations();
    }
    
    // Update navigation
    this.updateActiveNavLink();
  }
  
  /**
   * Handle window resize event
   */
  onWindowResize() {
    // Close mobile menu on resize
    this.closeMobileMenu();
    
    // Update layout calculations
    this.updateLayoutCalculations();
    
    // Trigger custom resize event
    document.dispatchEvent(new CustomEvent('portfolioresize', {
      detail: {
        width: window.innerWidth,
        height: window.innerHeight,
        deviceType: utils.getDeviceType()
      }
    }));
  }
  
  /**
   * Handle window scroll event
   */
  onWindowScroll() {
    // Update active navigation link
    this.updateActiveNavLink();
    
    // Update scroll progress
    this.updateScrollProgress();
    
    // Handle navbar scroll effects
    this.handleNavbarScroll();
  }
  
  /**
   * Handle keyboard navigation
   * @param {KeyboardEvent} e - Keyboard event
   */
  handleKeyboardNavigation(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
      this.closeMobileMenu();
    }
    
    // Tab navigation enhancement
    if (e.key === 'Tab') {
      this.handleTabNavigation(e);
    }
    
    // Arrow key navigation for filters
    if (e.target.classList.contains('filter-btn')) {
      this.handleFilterKeyNavigation(e);
    }
  }
  
  /**
   * Handle theme change
   * @param {string} theme - New theme
   */
  onThemeChange(theme) {
    // Update theme-dependent elements
    this.updateThemeDependentElements(theme);
    
    // Trigger custom theme change event
    document.dispatchEvent(new CustomEvent('portfoliothemechange', {
      detail: { theme }
    }));
  }
  
  /**
   * Handle visibility change
   */
  onVisibilityChange() {
    if (document.hidden) {
      // Pause animations when tab is not visible
      if (window.animationController) {
        animationController.pauseAllAnimations();
      }
    } else {
      // Resume animations when tab becomes visible
      if (window.animationController) {
        animationController.resumeAllAnimations();
      }
    }
  }
  
  /**
   * Toggle mobile menu
   */
  toggleMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Update aria attributes
      const isOpen = navMenu.classList.contains('active');
      navToggle.setAttribute('aria-expanded', isOpen);
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }
  }
  
  /**
   * Close mobile menu
   */
  closeMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }
  
  /**
   * Handle navigation click
   * @param {Event} e - Click event
   * @param {Element} link - Navigation link
   */
  handleNavigation(e, link) {
    const href = link.getAttribute('href');
    
    // Handle internal links
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        utils.smoothScrollTo(targetElement, 80, 1000);
        this.closeMobileMenu();
      }
    }
    
    // Update active state
    this.updateActiveNavLink(href.substring(1));
  }
  
  /**
   * Filter projects
   * @param {string} filter - Filter category
   */
  filterProjects(filter) {
    this.currentFilter = filter;
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
      const categories = card.dataset.category?.split(',') || [];
      const shouldShow = filter === 'all' || categories.includes(filter);
      
      if (shouldShow) {
        card.style.display = 'block';
        anime({
          targets: card,
          opacity: [0, 1],
          scale: [0.8, 1],
          duration: 400,
          easing: 'easeOutQuart',
          delay: Math.random() * 200
        });
      } else {
        anime({
          targets: card,
          opacity: [1, 0],
          scale: [1, 0.8],
          duration: 300,
          easing: 'easeInQuart',
          complete: () => {
            card.style.display = 'none';
          }
        });
      }
    });
  }
  
  /**
   * Update active filter button
   * @param {Element} activeButton - Active filter button
   */
  updateActiveFilter(activeButton) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
      button.classList.remove('active');
    });
    
    activeButton.classList.add('active');
  }
  
  /**
   * Validate form field
   * @param {Element} field - Form field
   * @returns {boolean} Is valid
   */
  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'Este campo é obrigatório.';
    }
    
    // Email validation
    if (fieldName === 'email' && value && !utils.validateEmail(value)) {
      isValid = false;
      errorMessage = 'Por favor, insira um email válido.';
    }
    
    // Minimum length validation
    const minLength = field.getAttribute('minlength');
    if (minLength && value.length < parseInt(minLength)) {
      isValid = false;
      errorMessage = `Mínimo de ${minLength} caracteres.`;
    }
    
    this.showFieldError(field, isValid ? '' : errorMessage);
    return isValid;
  }
  
  /**
   * Show field error
   * @param {Element} field - Form field
   * @param {string} message - Error message
   */
  showFieldError(field, message) {
    const errorElement = field.parentNode.querySelector('.form-error');
    
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = message ? 'block' : 'none';
    }
    
    field.classList.toggle('error', !!message);
  }
  
  /**
   * Clear field error
   * @param {Element} field - Form field
   */
  clearFieldError(field) {
    this.showFieldError(field, '');
  }
  
  /**
   * Handle form submission
   * @param {Element} form - Contact form
   */
  async handleFormSubmission(form) {
    const submitButton = form.querySelector('.btn-submit');
    const inputs = form.querySelectorAll('.form-input, .form-textarea');
    
    // Validate all fields
    let isFormValid = true;
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isFormValid = false;
      }
    });
    
    if (!isFormValid) {
      this.showFormMessage('Por favor, corrija os erros antes de enviar.', 'error');
      return;
    }
    
    // Show loading state
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    
    try {
      // Simulate form submission (replace with actual API call)
      await this.submitForm(new FormData(form));
      
      this.showFormMessage('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
      form.reset();
      
    } catch (error) {
      console.error('Form submission error:', error);
      this.showFormMessage('Erro ao enviar mensagem. Tente novamente.', 'error');
      
    } finally {
      submitButton.classList.remove('loading');
      submitButton.disabled = false;
    }
  }
  
  /**
   * Submit form data
   * @param {FormData} formData - Form data
   * @returns {Promise} Submission promise
   */
  async submitForm(formData) {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success/failure
        if (Math.random() > 0.1) {
          resolve({ success: true });
        } else {
          reject(new Error('Submission failed'));
        }
      }, 2000);
    });
  }
  
  /**
   * Show form message
   * @param {string} message - Message text
   * @param {string} type - Message type (success, error)
   */
  showFormMessage(message, type) {
    // Create or update message element
    let messageElement = document.querySelector('.form-message');
    
    if (!messageElement) {
      messageElement = document.createElement('div');
      messageElement.className = 'form-message';
      const form = document.querySelector('.contact-form');
      form.appendChild(messageElement);
    }
    
    messageElement.textContent = message;
    messageElement.className = `form-message ${type}`;
    messageElement.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      messageElement.style.display = 'none';
    }, 5000);
  }
  
  /**
   * Animate skill bar
   * @param {Element} skillBar - Skill progress bar
   */
  animateSkillBar(skillBar) {
    const percentage = skillBar.dataset.percentage || '0';
    
    anime({
      targets: skillBar,
      width: percentage + '%',
      duration: 1500,
      easing: 'easeOutQuart',
      delay: Math.random() * 200
    });
  }
  
  /**
   * Update active navigation link
   * @param {string} targetId - Target section ID
   */
  updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!targetId) {
      // Auto-detect current section
      const sections = document.querySelectorAll('section[id]');
      const scrollTop = window.pageYOffset + 100;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
          targetId = section.id;
        }
      });
    }
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === `#${targetId}`);
    });
  }
  
  /**
   * Update scroll progress
   */
  updateScrollProgress() {
    const scrollProgress = utils.getScrollPercentage();
    
    // Update any scroll progress indicators
    const progressIndicators = document.querySelectorAll('.scroll-progress');
    progressIndicators.forEach(indicator => {
      indicator.style.width = `${scrollProgress}%`;
    });
  }
  
  /**
   * Handle navbar scroll effects
   */
  handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    const scrollTop = window.pageYOffset;
    
    if (scrollTop > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  
  /**
   * Setup lazy loading for images
   */
  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });
      
      const lazyImages = document.querySelectorAll('img[data-src]');
      lazyImages.forEach(img => imageObserver.observe(img));
    }
  }
  
  /**
   * Preload critical resources
   */
  preloadCriticalResources() {
    const criticalResources = [
      // Add critical resources to preload
    ];
    
    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.url;
      link.as = resource.type;
      document.head.appendChild(link);
    });
  }
  
  /**
   * Setup performance observers
   */
  setupPerformanceObservers() {
    // Monitor performance metrics
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
          // Log performance metrics
          console.log(`${entry.name}: ${entry.duration}ms`);
        });
      });
      
      observer.observe({ entryTypes: ['measure', 'navigation'] });
    }
  }
  
  /**
   * Load projects data
   */
  loadProjects() {
    // This would typically load from an API
    this.projects = [
      {
        id: 1,
        title: 'E-commerce Platform',
        description: 'Plataforma completa de e-commerce com painel administrativo.',
        category: ['web', 'fullstack'],
        technologies: ['React', 'Node.js', 'MongoDB'],
        image: '/assets/images/project1.jpg',
        demoUrl: '#',
        codeUrl: '#'
      },
      // Add more projects...
    ];
  }
  
  /**
   * Load articles data
   */
  loadArticles() {
    // This would typically load from an API
    this.articles = [
      {
        id: 1,
        title: 'Como criar animações fluidas com CSS e JavaScript',
        excerpt: 'Aprenda técnicas avançadas para criar animações performáticas.',
        date: '2024-01-15',
        readTime: '8 min',
        tags: ['CSS', 'JavaScript', 'Animações'],
        url: '#'
      },
      // Add more articles...
    ];
  }
  
  /**
   * Get application state
   * @returns {object} Application state
   */
  getState() {
    return {
      isInitialized: this.isInitialized,
      currentFilter: this.currentFilter,
      projects: this.projects,
      articles: this.articles,
      theme: window.themeManager?.getCurrentTheme(),
      deviceType: utils.getDeviceType()
    };
  }
  
  /**
   * Destroy application
   */
  destroy() {
    // Clean up event listeners and observers
    this.isInitialized = false;
    console.log('Portfolio app destroyed');
  }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.portfolioApp = new PortfolioApp();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PortfolioApp;
}

