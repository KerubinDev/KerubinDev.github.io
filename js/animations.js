// ===== ADVANCED ANIMATION SYSTEM =====

class AnimationController {
  constructor() {
    this.animations = new Map();
    this.observers = new Map();
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isInitialized = false;
    
    this.init();
  }
  
  /**
   * Initialize animation system
   */
  init() {
    if (this.isInitialized) return;
    
    this.setupReducedMotionDetection();
    this.setupIntersectionObserver();
    this.setupScrollAnimations();
    this.setupParallaxEffects();
    this.setupLoadingAnimations();
    this.setupHoverAnimations();
    this.setupCounterAnimations();
    this.setupTextAnimations();
    this.setupMorphingAnimations();
    this.setupParticleEffects();
    
    this.isInitialized = true;
  }
  
  /**
   * Setup reduced motion detection
   */
  setupReducedMotionDetection() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', (e) => {
      this.isReducedMotion = e.matches;
      if (this.isReducedMotion) {
        this.pauseAllAnimations();
      }
    });
  }
  
  /**
   * Setup intersection observer for scroll animations
   */
  setupIntersectionObserver() {
    if (!window.IntersectionObserver) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.triggerScrollAnimation(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    this.observers.set('scroll', observer);
    
    // Observe elements with scroll animation classes
    const scrollElements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale, .stagger-children');
    scrollElements.forEach(el => observer.observe(el));
  }
  
  /**
   * Setup scroll-based animations
   */
  setupScrollAnimations() {
    const scrollHandler = utils.throttle(() => {
      this.updateParallax();
      this.updateScrollProgress();
    }, 16); // 60fps
    
    window.addEventListener('scroll', scrollHandler, { passive: true });
  }
  
  /**
   * Setup parallax effects
   */
  setupParallaxEffects() {
    this.parallaxElements = document.querySelectorAll('.parallax-element, .parallax-slow, .parallax-medium, .parallax-fast');
  }
  
  /**
   * Setup loading animations
   */
  setupLoadingAnimations() {
    this.createLoadingAnimation();
  }
  
  /**
   * Setup hover animations
   */
  setupHoverAnimations() {
    const hoverElements = document.querySelectorAll('[class*="hover-"]');
    hoverElements.forEach(element => {
      this.setupHoverAnimation(element);
    });
  }
  
  /**
   * Setup counter animations
   */
  setupCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
      this.setupCounterAnimation(counter);
    });
  }
  
  /**
   * Setup text animations
   */
  setupTextAnimations() {
    this.setupTypewriterEffect();
    this.setupTextReveal();
    this.setupGlitchEffect();
  }
  
  /**
   * Setup morphing animations
   */
  setupMorphingAnimations() {
    const morphElements = document.querySelectorAll('[class*="morph-"]');
    morphElements.forEach(element => {
      this.setupMorphAnimation(element);
    });
  }
  
  /**
   * Setup particle effects
   */
  setupParticleEffects() {
    this.createFloatingParticles();
    this.createMouseTrail();
  }
  
  /**
   * Create loading animation
   */
  createLoadingAnimation() {
    const loadingScreen = document.querySelector('.loading-screen');
    if (!loadingScreen) return;
    
    // Animate loading elements
    const logoText = document.querySelector('.loading-logo .logo-text');
    const loadingText = document.querySelector('.loading-text');
    const loadingBar = document.querySelector('.loading-progress');
    
    if (logoText) {
      anime({
        targets: logoText,
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutElastic(1, .8)',
        delay: 300
      });
    }
    
    if (loadingText) {
      anime({
        targets: loadingText,
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutQuart',
        delay: 600
      });
    }
    
    if (loadingBar) {
      anime({
        targets: loadingBar,
        width: ['0%', '100%'],
        duration: 2000,
        easing: 'easeInOutQuart',
        delay: 800,
        complete: () => {
          setTimeout(() => {
            this.hideLoadingScreen();
          }, 500);
        }
      });
    }
  }
  
  /**
   * Hide loading screen with animation
   */
  hideLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    if (!loadingScreen) return;
    
    anime({
      targets: loadingScreen,
      opacity: [1, 0],
      scale: [1, 1.1],
      duration: 800,
      easing: 'easeInQuart',
      complete: () => {
        loadingScreen.style.display = 'none';
        this.startMainAnimations();
      }
    });
  }
  
  /**
   * Start main page animations
   */
  startMainAnimations() {
    this.animateHeroSection();
    this.animateNavigation();
    this.startContinuousAnimations();
  }
  
  /**
   * Animate hero section
   */
  animateHeroSection() {
    const heroElements = {
      greeting: document.querySelector('.hero-greeting'),
      title: document.querySelectorAll('.title-line'),
      subtitle: document.querySelector('.title-subtitle'),
      description: document.querySelector('.hero-description'),
      stats: document.querySelectorAll('.stat-item'),
      actions: document.querySelector('.hero-actions'),
      visual: document.querySelector('.hero-visual')
    };
    
    // Animate greeting
    if (heroElements.greeting) {
      anime({
        targets: heroElements.greeting,
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutQuart',
        delay: 200
      });
    }
    
    // Animate title lines
    if (heroElements.title.length > 0) {
      anime({
        targets: heroElements.title,
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutQuart',
        delay: anime.stagger(100, {start: 400})
      });
    }
    
    // Animate subtitle
    if (heroElements.subtitle) {
      anime({
        targets: heroElements.subtitle,
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutQuart',
        delay: 800
      });
    }
    
    // Animate description
    if (heroElements.description) {
      anime({
        targets: heroElements.description,
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutQuart',
        delay: 1000
      });
    }
    
    // Animate stats
    if (heroElements.stats.length > 0) {
      anime({
        targets: heroElements.stats,
        translateY: [40, 0],
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 700,
        easing: 'easeOutElastic(1, .8)',
        delay: anime.stagger(150, {start: 1200})
      });
    }
    
    // Animate actions
    if (heroElements.actions) {
      anime({
        targets: heroElements.actions.children,
        translateY: [40, 0],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutQuart',
        delay: anime.stagger(100, {start: 1400})
      });
    }
    
    // Animate visual
    if (heroElements.visual) {
      anime({
        targets: heroElements.visual,
        translateX: [100, 0],
        opacity: [0, 1],
        rotateY: [15, 0],
        duration: 1000,
        easing: 'easeOutQuart',
        delay: 600
      });
    }
  }
  
  /**
   * Animate navigation
   */
  animateNavigation() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    anime({
      targets: navbar,
      translateY: [-100, 0],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutQuart',
      delay: 100
    });
    
    const navItems = document.querySelectorAll('.nav-item');
    if (navItems.length > 0) {
      anime({
        targets: navItems,
        translateY: [-20, 0],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutQuart',
        delay: anime.stagger(50, {start: 300})
      });
    }
  }
  
  /**
   * Start continuous animations
   */
  startContinuousAnimations() {
    this.startFloatingAnimation();
    this.startPulseAnimation();
    this.startShimmerAnimation();
  }
  
  /**
   * Start floating animation
   */
  startFloatingAnimation() {
    const floatingElements = document.querySelectorAll('.animate-float, .floating-element');
    
    floatingElements.forEach((element, index) => {
      anime({
        targets: element,
        translateY: [0, -20, 0],
        duration: 3000 + (index * 200),
        easing: 'easeInOutSine',
        loop: true,
        delay: index * 300
      });
    });
  }
  
  /**
   * Start pulse animation
   */
  startPulseAnimation() {
    const pulseElements = document.querySelectorAll('.animate-pulse, .logo-accent');
    
    pulseElements.forEach((element, index) => {
      anime({
        targets: element,
        scale: [1, 1.1, 1],
        opacity: [1, 0.7, 1],
        duration: 2000,
        easing: 'easeInOutQuad',
        loop: true,
        delay: index * 500
      });
    });
  }
  
  /**
   * Start shimmer animation
   */
  startShimmerAnimation() {
    const shimmerElements = document.querySelectorAll('.animate-shimmer');
    
    shimmerElements.forEach(element => {
      anime({
        targets: element,
        backgroundPosition: ['0% 50%', '100% 50%'],
        duration: 2000,
        easing: 'easeInOutQuad',
        loop: true
      });
    });
  }
  
  /**
   * Trigger scroll animation for element
   * @param {Element} element - Target element
   */
  triggerScrollAnimation(element) {
    if (element.classList.contains('animated')) return;
    
    element.classList.add('animated');
    
    if (element.classList.contains('scroll-animate')) {
      anime({
        targets: element,
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutQuart'
      });
    }
    
    if (element.classList.contains('scroll-animate-left')) {
      anime({
        targets: element,
        translateX: [-50, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutQuart'
      });
    }
    
    if (element.classList.contains('scroll-animate-right')) {
      anime({
        targets: element,
        translateX: [50, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutQuart'
      });
    }
    
    if (element.classList.contains('scroll-animate-scale')) {
      anime({
        targets: element,
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutElastic(1, .8)'
      });
    }
    
    if (element.classList.contains('stagger-children')) {
      const children = element.children;
      anime({
        targets: children,
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutQuart',
        delay: anime.stagger(100)
      });
    }
  }
  
  /**
   * Update parallax effects
   */
  updateParallax() {
    if (!this.parallaxElements || this.parallaxElements.length === 0) return;
    
    const scrollTop = window.pageYOffset;
    
    this.parallaxElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const speed = element.dataset.speed || 0.5;
      const yPos = -(scrollTop * speed);
      
      element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
  }
  
  /**
   * Update scroll progress
   */
  updateScrollProgress() {
    const scrollProgress = utils.getScrollPercentage();
    const progressBar = document.querySelector('.scroll-progress');
    
    if (progressBar) {
      progressBar.style.width = `${scrollProgress}%`;
    }
    
    // Update navbar on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (scrollProgress > 5) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  }
  
  /**
   * Setup hover animation for element
   * @param {Element} element - Target element
   */
  setupHoverAnimation(element) {
    const animationType = Array.from(element.classList)
      .find(cls => cls.startsWith('hover-'))
      ?.replace('hover-', '');
    
    if (!animationType) return;
    
    let hoverAnimation;
    
    element.addEventListener('mouseenter', () => {
      if (this.isReducedMotion) return;
      
      switch (animationType) {
        case 'float':
          hoverAnimation = anime({
            targets: element,
            translateY: [0, -10, 0],
            duration: 2000,
            easing: 'easeInOutSine',
            loop: true
          });
          break;
          
        case 'pulse':
          hoverAnimation = anime({
            targets: element,
            scale: [1, 1.05, 1],
            duration: 1000,
            easing: 'easeInOutQuad',
            loop: true
          });
          break;
          
        case 'bounce':
          hoverAnimation = anime({
            targets: element,
            translateY: [0, -15, 0],
            duration: 600,
            easing: 'easeOutBounce'
          });
          break;
          
        case 'wiggle':
          hoverAnimation = anime({
            targets: element,
            rotate: [0, 5, -5, 0],
            duration: 500,
            easing: 'easeInOutQuad'
          });
          break;
          
        case 'glow':
          element.style.filter = 'drop-shadow(0 0 20px var(--color-primary))';
          break;
      }
    });
    
    element.addEventListener('mouseleave', () => {
      if (hoverAnimation) {
        hoverAnimation.pause();
      }
      
      anime({
        targets: element,
        translateY: 0,
        scale: 1,
        rotate: 0,
        duration: 300,
        easing: 'easeOutQuart',
        complete: () => {
          element.style.filter = '';
        }
      });
    });
  }
  
  /**
   * Setup counter animation
   * @param {Element} counter - Counter element
   */
  setupCounterAnimation(counter) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counter.classList.contains('counted')) {
          counter.classList.add('counted');
          this.animateCounter(counter);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(counter);
  }
  
  /**
   * Animate counter
   * @param {Element} counter - Counter element
   */
  animateCounter(counter) {
    const target = parseInt(counter.dataset.count || counter.textContent);
    const duration = 2000;
    
    anime({
      targets: { count: 0 },
      count: target,
      duration: duration,
      easing: 'easeOutQuart',
      update: function(anim) {
        const value = Math.floor(anim.animatables[0].target.count);
        counter.textContent = value === Infinity ? '∞' : utils.formatNumber(value);
      }
    });
  }
  
  /**
   * Setup typewriter effect
   */
  setupTypewriterEffect() {
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    typewriterElements.forEach(element => {
      const text = element.textContent;
      element.textContent = '';
      
      anime({
        targets: { progress: 0 },
        progress: text.length,
        duration: text.length * 50,
        easing: 'linear',
        update: function(anim) {
          const progress = Math.floor(anim.animatables[0].target.progress);
          element.textContent = text.substring(0, progress);
        }
      });
    });
  }
  
  /**
   * Setup text reveal animation
   */
  setupTextReveal() {
    const textRevealElements = document.querySelectorAll('.text-reveal');
    
    textRevealElements.forEach(element => {
      const text = element.textContent;
      const words = text.split(' ');
      
      element.innerHTML = words.map(word => 
        `<span class="word">${word}</span>`
      ).join(' ');
      
      const wordElements = element.querySelectorAll('.word');
      
      anime({
        targets: wordElements,
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutQuart',
        delay: anime.stagger(100)
      });
    });
  }
  
  /**
   * Setup glitch effect
   */
  setupGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
      element.dataset.text = element.textContent;
      
      setInterval(() => {
        if (Math.random() > 0.95) {
          element.classList.add('glitch-active');
          setTimeout(() => {
            element.classList.remove('glitch-active');
          }, 200);
        }
      }, 100);
    });
  }
  
  /**
   * Setup morph animation
   * @param {Element} element - Target element
   */
  setupMorphAnimation(element) {
    const morphType = Array.from(element.classList)
      .find(cls => cls.startsWith('morph-'));
    
    if (!morphType) return;
    
    element.addEventListener('mouseenter', () => {
      if (morphType.includes('circle-to-square')) {
        anime({
          targets: element,
          borderRadius: '0%',
          duration: 500,
          easing: 'easeInOutQuart'
        });
      } else if (morphType.includes('square-to-circle')) {
        anime({
          targets: element,
          borderRadius: '50%',
          duration: 500,
          easing: 'easeInOutQuart'
        });
      }
    });
    
    element.addEventListener('mouseleave', () => {
      if (morphType.includes('circle-to-square')) {
        anime({
          targets: element,
          borderRadius: '50%',
          duration: 500,
          easing: 'easeInOutQuart'
        });
      } else if (morphType.includes('square-to-circle')) {
        anime({
          targets: element,
          borderRadius: '0%',
          duration: 500,
          easing: 'easeInOutQuart'
        });
      }
    });
  }
  
  /**
   * Create floating particles
   */
  createFloatingParticles() {
    const particleContainer = document.querySelector('.floating-elements');
    if (!particleContainer) return;
    
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--color-primary);
        border-radius: 50%;
        opacity: 0.3;
        pointer-events: none;
      `;
      
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      
      particleContainer.appendChild(particle);
      
      anime({
        targets: particle,
        translateY: [0, -100],
        translateX: [0, Math.random() * 50 - 25],
        opacity: [0.3, 0],
        duration: 3000 + Math.random() * 2000,
        easing: 'easeOutQuart',
        loop: true,
        delay: Math.random() * 2000
      });
    }
  }
  
  /**
   * Create mouse trail effect
   */
  createMouseTrail() {
    if (utils.isTouchDevice()) return;
    
    const trail = [];
    const trailLength = 10;
    
    for (let i = 0; i < trailLength; i++) {
      const dot = document.createElement('div');
      dot.className = 'mouse-trail-dot';
      dot.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: var(--color-primary);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        transform: scale(0);
      `;
      document.body.appendChild(dot);
      trail.push(dot);
    }
    
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    function updateTrail() {
      trail.forEach((dot, index) => {
        const delay = index * 50;
        setTimeout(() => {
          dot.style.left = mouseX + 'px';
          dot.style.top = mouseY + 'px';
          
          anime({
            targets: dot,
            scale: [0, 1, 0],
            opacity: [0, 0.6, 0],
            duration: 600,
            easing: 'easeOutQuart'
          });
        }, delay);
      });
      
      requestAnimationFrame(updateTrail);
    }
    
    updateTrail();
  }
  
  /**
   * Pause all animations
   */
  pauseAllAnimations() {
    this.animations.forEach(animation => {
      if (animation.pause) {
        animation.pause();
      }
    });
  }
  
  /**
   * Resume all animations
   */
  resumeAllAnimations() {
    this.animations.forEach(animation => {
      if (animation.play) {
        animation.play();
      }
    });
  }
  
  /**
   * Create custom animation
   * @param {object} config - Animation configuration
   * @returns {object} Animation instance
   */
  createAnimation(config) {
    if (this.isReducedMotion) {
      return { play: () => {}, pause: () => {}, restart: () => {} };
    }
    
    const animation = anime(config);
    const id = Date.now() + Math.random();
    this.animations.set(id, animation);
    
    return {
      ...animation,
      destroy: () => this.animations.delete(id)
    };
  }
  
  /**
   * Get animation by ID
   * @param {string} id - Animation ID
   * @returns {object} Animation instance
   */
  getAnimation(id) {
    return this.animations.get(id);
  }
  
  /**
   * Remove animation
   * @param {string} id - Animation ID
   */
  removeAnimation(id) {
    const animation = this.animations.get(id);
    if (animation && animation.pause) {
      animation.pause();
    }
    this.animations.delete(id);
  }
  
  /**
   * Clear all animations
   */
  clearAllAnimations() {
    this.animations.forEach(animation => {
      if (animation.pause) {
        animation.pause();
      }
    });
    this.animations.clear();
  }
}

// Initialize animation controller
const animationController = new AnimationController();

// Export for global access
window.animationController = animationController;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AnimationController;
}

