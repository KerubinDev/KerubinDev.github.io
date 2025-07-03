// ===== UTILITY FUNCTIONS =====

/**
 * Debounce function to limit the rate of function execution
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @param {boolean} immediate - Execute immediately
 * @returns {Function} Debounced function
 */
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
}

/**
 * Throttle function to limit the rate of function execution
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Check if element is in viewport
 * @param {Element} element - Element to check
 * @param {number} threshold - Threshold percentage (0-1)
 * @returns {boolean} True if element is in viewport
 */
function isInViewport(element, threshold = 0.1) {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  
  const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
  const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);
  
  return (vertInView && horInView);
}

/**
 * Get scroll percentage of page
 * @returns {number} Scroll percentage (0-100)
 */
function getScrollPercentage() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  return (scrollTop / scrollHeight) * 100;
}

/**
 * Smooth scroll to element
 * @param {string|Element} target - Target element or selector
 * @param {number} offset - Offset in pixels
 * @param {number} duration - Animation duration in milliseconds
 */
function smoothScrollTo(target, offset = 0, duration = 1000) {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (!element) return;
  
  const targetPosition = element.offsetTop - offset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;
  
  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }
  
  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }
  
  requestAnimationFrame(animation);
}

/**
 * Generate random number between min and max
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random number
 */
function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Generate random color
 * @returns {string} Random hex color
 */
function randomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Get device type
 * @returns {string} Device type (mobile, tablet, desktop)
 */
function getDeviceType() {
  const width = window.innerWidth;
  if (width <= 768) return 'mobile';
  if (width <= 1024) return 'tablet';
  return 'desktop';
}

/**
 * Check if device supports touch
 * @returns {boolean} True if touch is supported
 */
function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Get browser information
 * @returns {object} Browser info
 */
function getBrowserInfo() {
  const ua = navigator.userAgent;
  let browser = 'Unknown';
  
  if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Safari')) browser = 'Safari';
  else if (ua.includes('Edge')) browser = 'Edge';
  else if (ua.includes('Opera')) browser = 'Opera';
  
  return {
    name: browser,
    userAgent: ua,
    isMobile: /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)
  };
}

/**
 * Local storage helper
 */
const storage = {
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn('LocalStorage not available:', e);
      return false;
    }
  },
  
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.warn('Error reading from localStorage:', e);
      return defaultValue;
    }
  },
  
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.warn('Error removing from localStorage:', e);
      return false;
    }
  },
  
  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (e) {
      console.warn('Error clearing localStorage:', e);
      return false;
    }
  }
};

/**
 * Cookie helper
 */
const cookies = {
  set(name, value, days = 7) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  },
  
  get(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  
  remove(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
};

/**
 * DOM helper functions
 */
const dom = {
  /**
   * Create element with attributes and content
   * @param {string} tag - HTML tag
   * @param {object} attributes - Element attributes
   * @param {string|Element} content - Element content
   * @returns {Element} Created element
   */
  create(tag, attributes = {}, content = '') {
    const element = document.createElement(tag);
    
    Object.keys(attributes).forEach(key => {
      if (key === 'className') {
        element.className = attributes[key];
      } else if (key === 'dataset') {
        Object.keys(attributes[key]).forEach(dataKey => {
          element.dataset[dataKey] = attributes[key][dataKey];
        });
      } else {
        element.setAttribute(key, attributes[key]);
      }
    });
    
    if (typeof content === 'string') {
      element.innerHTML = content;
    } else if (content instanceof Element) {
      element.appendChild(content);
    }
    
    return element;
  },
  
  /**
   * Add event listener with automatic cleanup
   * @param {Element} element - Target element
   * @param {string} event - Event type
   * @param {Function} handler - Event handler
   * @param {object} options - Event options
   * @returns {Function} Cleanup function
   */
  on(element, event, handler, options = {}) {
    element.addEventListener(event, handler, options);
    return () => element.removeEventListener(event, handler, options);
  },
  
  /**
   * Add class to element
   * @param {Element} element - Target element
   * @param {string} className - Class name
   */
  addClass(element, className) {
    element.classList.add(className);
  },
  
  /**
   * Remove class from element
   * @param {Element} element - Target element
   * @param {string} className - Class name
   */
  removeClass(element, className) {
    element.classList.remove(className);
  },
  
  /**
   * Toggle class on element
   * @param {Element} element - Target element
   * @param {string} className - Class name
   * @returns {boolean} True if class was added
   */
  toggleClass(element, className) {
    return element.classList.toggle(className);
  },
  
  /**
   * Check if element has class
   * @param {Element} element - Target element
   * @param {string} className - Class name
   * @returns {boolean} True if element has class
   */
  hasClass(element, className) {
    return element.classList.contains(className);
  }
};

/**
 * Animation helper functions
 */
const animations = {
  /**
   * Animate element with CSS transitions
   * @param {Element} element - Target element
   * @param {object} properties - CSS properties to animate
   * @param {number} duration - Animation duration in milliseconds
   * @returns {Promise} Promise that resolves when animation completes
   */
  css(element, properties, duration = 300) {
    return new Promise(resolve => {
      const originalTransition = element.style.transition;
      element.style.transition = `all ${duration}ms ease-in-out`;
      
      Object.keys(properties).forEach(prop => {
        element.style[prop] = properties[prop];
      });
      
      setTimeout(() => {
        element.style.transition = originalTransition;
        resolve();
      }, duration);
    });
  },
  
  /**
   * Fade in element
   * @param {Element} element - Target element
   * @param {number} duration - Animation duration
   * @returns {Promise} Promise that resolves when animation completes
   */
  fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.display = 'block';
    return this.css(element, { opacity: '1' }, duration);
  },
  
  /**
   * Fade out element
   * @param {Element} element - Target element
   * @param {number} duration - Animation duration
   * @returns {Promise} Promise that resolves when animation completes
   */
  fadeOut(element, duration = 300) {
    return this.css(element, { opacity: '0' }, duration).then(() => {
      element.style.display = 'none';
    });
  },
  
  /**
   * Slide down element
   * @param {Element} element - Target element
   * @param {number} duration - Animation duration
   * @returns {Promise} Promise that resolves when animation completes
   */
  slideDown(element, duration = 300) {
    element.style.height = '0';
    element.style.overflow = 'hidden';
    element.style.display = 'block';
    const height = element.scrollHeight + 'px';
    return this.css(element, { height }, duration).then(() => {
      element.style.height = 'auto';
      element.style.overflow = 'visible';
    });
  },
  
  /**
   * Slide up element
   * @param {Element} element - Target element
   * @param {number} duration - Animation duration
   * @returns {Promise} Promise that resolves when animation completes
   */
  slideUp(element, duration = 300) {
    element.style.overflow = 'hidden';
    return this.css(element, { height: '0' }, duration).then(() => {
      element.style.display = 'none';
      element.style.height = 'auto';
      element.style.overflow = 'visible';
    });
  }
};

/**
 * Performance monitoring
 */
const performance = {
  /**
   * Measure function execution time
   * @param {Function} fn - Function to measure
   * @param {string} label - Label for measurement
   * @returns {*} Function result
   */
  measure(fn, label = 'Function') {
    const start = Date.now();
    const result = fn();
    const end = Date.now();
    console.log(`${label} took ${end - start}ms`);
    return result;
  },
  
  /**
   * Request idle callback with fallback
   * @param {Function} callback - Callback function
   * @param {object} options - Options
   */
  requestIdleCallback(callback, options = {}) {
    if (window.requestIdleCallback) {
      window.requestIdleCallback(callback, options);
    } else {
      setTimeout(callback, 1);
    }
  }
};

/**
 * Export utilities for use in other modules
 */
window.utils = {
  debounce,
  throttle,
  isInViewport,
  getScrollPercentage,
  smoothScrollTo,
  randomBetween,
  randomColor,
  formatNumber,
  validateEmail,
  getDeviceType,
  isTouchDevice,
  getBrowserInfo,
  storage,
  cookies,
  dom,
  animations,
  performance
};

