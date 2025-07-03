// ===== THEME SYSTEM =====

class ThemeManager {
  constructor() {
    this.currentTheme = 'light';
    this.themeKey = 'portfolio-theme';
    this.transitions = new Map();
    
    this.init();
  }
  
  /**
   * Initialize theme system
   */
  init() {
    this.loadSavedTheme();
    this.setupThemeToggle();
    this.setupSystemThemeDetection();
    this.applyTheme(this.currentTheme, false);
    
    // Add theme loaded class for smooth transitions
    setTimeout(() => {
      document.body.classList.add('theme-loaded');
    }, 100);
  }
  
  /**
   * Load saved theme from localStorage
   */
  loadSavedTheme() {
    const savedTheme = utils.storage.get(this.themeKey);
    if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
      this.currentTheme = savedTheme;
    } else {
      // Auto-detect system preference
      this.currentTheme = this.getSystemTheme();
    }
  }
  
  /**
   * Get system theme preference
   * @returns {string} 'light' or 'dark'
   */
  getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }
  
  /**
   * Setup theme toggle button
   */
  setupThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    
    themeToggle.addEventListener('click', () => {
      this.toggleTheme();
    });
    
    // Keyboard support
    themeToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.toggleTheme();
      }
    });
    
    // Update toggle state
    this.updateThemeToggle();
  }
  
  /**
   * Setup system theme change detection
   */
  setupSystemThemeDetection() {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        // Only auto-switch if user hasn't manually set a theme
        const savedTheme = utils.storage.get(this.themeKey);
        if (!savedTheme) {
          this.currentTheme = e.matches ? 'dark' : 'light';
          this.applyTheme(this.currentTheme);
        }
      });
    }
  }
  
  /**
   * Toggle between light and dark themes
   */
  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
    
    // Add toggle animation
    this.animateThemeToggle();
  }
  
  /**
   * Set specific theme
   * @param {string} theme - Theme name ('light' or 'dark')
   */
  setTheme(theme) {
    if (!['light', 'dark'].includes(theme)) {
      console.warn(`Invalid theme: ${theme}`);
      return;
    }
    
    this.currentTheme = theme;
    this.applyTheme(theme);
    this.saveTheme(theme);
  }
  
  /**
   * Apply theme to document
   * @param {string} theme - Theme name
   * @param {boolean} animate - Whether to animate the transition
   */
  applyTheme(theme, animate = true) {
    const html = document.documentElement;
    const body = document.body;
    
    if (animate) {
      // Add transition class
      body.classList.add('theme-transition');
      
      // Remove transition class after animation
      setTimeout(() => {
        body.classList.remove('theme-transition');
      }, 300);
    }
    
    // Set theme attribute
    html.setAttribute('data-theme', theme);
    
    // Update meta theme-color for mobile browsers
    this.updateMetaThemeColor(theme);
    
    // Update theme toggle
    this.updateThemeToggle();
    
    // Trigger theme change event
    this.dispatchThemeChangeEvent(theme);
    
    // Update CSS custom properties for dynamic theming
    this.updateDynamicProperties(theme);
  }
  
  /**
   * Save theme to localStorage
   * @param {string} theme - Theme name
   */
  saveTheme(theme) {
    utils.storage.set(this.themeKey, theme);
  }
  
  /**
   * Update meta theme-color for mobile browsers
   * @param {string} theme - Theme name
   */
  updateMetaThemeColor(theme) {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.name = 'theme-color';
      document.head.appendChild(metaThemeColor);
    }
    
    const colors = {
      light: '#ffffff',
      dark: '#0f172a'
    };
    
    metaThemeColor.content = colors[theme];
  }
  
  /**
   * Update theme toggle button state
   */
  updateThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    
    if (!themeToggle) return;
    
    // Update aria-label for accessibility
    const label = this.currentTheme === 'light' ? 'Switch to dark theme' : 'Switch to light theme';
    themeToggle.setAttribute('aria-label', label);
    
    // Update icons
    if (sunIcon && moonIcon) {
      if (this.currentTheme === 'dark') {
        sunIcon.style.opacity = '0';
        moonIcon.style.opacity = '1';
      } else {
        sunIcon.style.opacity = '1';
        moonIcon.style.opacity = '0';
      }
    }
  }
  
  /**
   * Animate theme toggle button
   */
  animateThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    
    // Add animation class
    themeToggle.classList.add('animate-pulse');
    
    // Remove animation class after animation
    setTimeout(() => {
      themeToggle.classList.remove('animate-pulse');
    }, 600);
  }
  
  /**
   * Dispatch theme change event
   * @param {string} theme - New theme name
   */
  dispatchThemeChangeEvent(theme) {
    const event = new CustomEvent('themechange', {
      detail: { theme, previousTheme: this.currentTheme }
    });
    document.dispatchEvent(event);
  }
  
  /**
   * Update dynamic CSS properties based on theme
   * @param {string} theme - Theme name
   */
  updateDynamicProperties(theme) {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      // Enhanced dark theme properties
      root.style.setProperty('--glow-intensity', '0.4');
      root.style.setProperty('--shadow-intensity', '0.6');
      root.style.setProperty('--backdrop-blur', '20px');
    } else {
      // Light theme properties
      root.style.setProperty('--glow-intensity', '0.2');
      root.style.setProperty('--shadow-intensity', '0.1');
      root.style.setProperty('--backdrop-blur', '10px');
    }
  }
  
  /**
   * Get current theme
   * @returns {string} Current theme name
   */
  getCurrentTheme() {
    return this.currentTheme;
  }
  
  /**
   * Check if current theme is dark
   * @returns {boolean} True if dark theme is active
   */
  isDarkTheme() {
    return this.currentTheme === 'dark';
  }
  
  /**
   * Register theme transition callback
   * @param {string} id - Unique identifier for the callback
   * @param {Function} callback - Callback function
   */
  onThemeChange(id, callback) {
    this.transitions.set(id, callback);
    
    // Listen for theme change events
    document.addEventListener('themechange', (e) => {
      callback(e.detail.theme, e.detail.previousTheme);
    });
  }
  
  /**
   * Unregister theme transition callback
   * @param {string} id - Unique identifier for the callback
   */
  offThemeChange(id) {
    this.transitions.delete(id);
  }
  
  /**
   * Create theme-aware animation
   * @param {Element} element - Target element
   * @param {object} lightConfig - Animation config for light theme
   * @param {object} darkConfig - Animation config for dark theme
   * @returns {object} Animation instance
   */
  createThemeAnimation(element, lightConfig, darkConfig) {
    const config = this.isDarkTheme() ? darkConfig : lightConfig;
    
    // Update animation when theme changes
    this.onThemeChange(`animation-${Date.now()}`, (theme) => {
      const newConfig = theme === 'dark' ? darkConfig : lightConfig;
      // Update animation properties
      Object.keys(newConfig).forEach(key => {
        if (element.style[key] !== undefined) {
          element.style[key] = newConfig[key];
        }
      });
    });
    
    return config;
  }
  
  /**
   * Apply theme-specific styles to element
   * @param {Element} element - Target element
   * @param {object} lightStyles - Styles for light theme
   * @param {object} darkStyles - Styles for dark theme
   */
  applyThemeStyles(element, lightStyles, darkStyles) {
    const styles = this.isDarkTheme() ? darkStyles : lightStyles;
    
    Object.keys(styles).forEach(property => {
      element.style[property] = styles[property];
    });
    
    // Update styles when theme changes
    this.onThemeChange(`styles-${Date.now()}`, (theme) => {
      const newStyles = theme === 'dark' ? darkStyles : lightStyles;
      Object.keys(newStyles).forEach(property => {
        element.style[property] = newStyles[property];
      });
    });
  }
  
  /**
   * Get theme-specific value
   * @param {*} lightValue - Value for light theme
   * @param {*} darkValue - Value for dark theme
   * @returns {*} Theme-specific value
   */
  getThemeValue(lightValue, darkValue) {
    return this.isDarkTheme() ? darkValue : lightValue;
  }
  
  /**
   * Preload theme assets
   * @param {string} theme - Theme to preload
   */
  preloadTheme(theme) {
    // Preload theme-specific images or assets
    const themeAssets = {
      light: [
        // Add light theme specific assets
      ],
      dark: [
        // Add dark theme specific assets
      ]
    };
    
    const assets = themeAssets[theme] || [];
    assets.forEach(asset => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = asset;
      link.as = 'image';
      document.head.appendChild(link);
    });
  }
  
  /**
   * Reset theme to system preference
   */
  resetToSystemTheme() {
    utils.storage.remove(this.themeKey);
    const systemTheme = this.getSystemTheme();
    this.setTheme(systemTheme);
  }
  
  /**
   * Export theme configuration
   * @returns {object} Theme configuration
   */
  exportConfig() {
    return {
      currentTheme: this.currentTheme,
      systemTheme: this.getSystemTheme(),
      savedTheme: utils.storage.get(this.themeKey)
    };
  }
  
  /**
   * Import theme configuration
   * @param {object} config - Theme configuration
   */
  importConfig(config) {
    if (config.currentTheme) {
      this.setTheme(config.currentTheme);
    }
  }
}

// Initialize theme manager
const themeManager = new ThemeManager();

// Export for global access
window.themeManager = themeManager;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ThemeManager;
}

