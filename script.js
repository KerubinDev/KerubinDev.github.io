// Portfolio JavaScript with Anime.js, Three.js, and GSAP
// Author: KerubinDev
// Version: 3.0

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize System Loader
    initSystemLoader();
    
    // Initialize Three.js Background
    initThreeJsBackground();
    
    // Initialize Particles Background
    initParticlesBackground();
    
    // Initialize Scroll Companion
    initScrollCompanion();
    
    // Initialize Navigation
    initNavigation();
    
    // Initialize Parallax Effects
    initParallaxEffects();
    
    // Initialize Skill Bars
    initSkillBars();
    
    // Initialize Project Filters
    initProjectFilters();
    
    // Initialize Contact Form
    initContactForm();
    
    // Initialize Konami Code Easter Egg
    initKonamiCode();
});

// System Loader Animation
function initSystemLoader() {
    const systemLoader = document.getElementById('systemLoader');
    const mainContent = document.getElementById('mainContent');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const cpuUsage = document.getElementById('cpuUsage');
    const ramUsage = document.getElementById('ramUsage');
    const gpuUsage = document.getElementById('gpuUsage');
    const netSpeed = document.getElementById('netSpeed');
    const bootLines = document.querySelectorAll('.boot-line');
    const binaryCode = document.getElementById('binaryCode');
    
    // Generate binary code background
    generateBinaryCode();
    
    // Animate boot sequence lines
    bootLines.forEach(line => {
        const delay = parseInt(line.getAttribute('data-delay'));
        
        setTimeout(() => {
            anime({
                targets: line,
                opacity: 1,
                translateY: 0,
                duration: 800,
                easing: 'easeOutQuad'
            });
            
            // Typewriter effect for boot text
            const bootText = line.querySelector('.boot-text');
            const text = bootText.textContent;
            bootText.textContent = '';
            
            let i = 0;
            const typeInterval = setInterval(() => {
                if (i < text.length) {
                    bootText.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                    
                    // Show status after typing is complete
                    const bootStatus = line.querySelector('.boot-status');
                    bootStatus.style.opacity = '1';
                }
            }, 20);
        }, delay);
    });
    
    // Simulate system stats
    let progress = 0;
    const loadingInterval = setInterval(() => {
        // Update progress bar
        progress += Math.random() * 10;
        if (progress > 100) progress = 100;
        
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${Math.floor(progress)}%`;
        
        // Update system stats
        cpuUsage.textContent = `${Math.floor(Math.random() * 50 + 50)}%`;
        ramUsage.textContent = `${Math.floor(Math.random() * 1024 + 1024)} MB`;
        gpuUsage.textContent = `${Math.floor(Math.random() * 40 + 60)}%`;
        netSpeed.textContent = `${Math.floor(Math.random() * 100 + 100)} Mbps`;
        
        // When loading is complete
        if (progress >= 100) {
            clearInterval(loadingInterval);
            
            // Wait a moment before showing main content
            setTimeout(() => {
                // Fade out loader
                anime({
                    targets: systemLoader,
                    opacity: 0,
                    duration: 1000,
                    easing: 'easeInOutQuad',
                    complete: () => {
                        systemLoader.style.display = 'none';
                        
                        // Show main content
                        mainContent.style.display = 'block';
                        
                        // Initialize hero animations
                        initHeroAnimations();
                    }
                });
            }, 1000);
        }
    }, 100);
    
    // Generate binary code
    function generateBinaryCode() {
        let binary = '';
        for (let i = 0; i < 1000; i++) {
            binary += Math.floor(Math.random() * 2);
            if (i % 50 === 0 && i > 0) binary += '<br>';
        }
        binaryCode.innerHTML = binary;
    }
}

// Three.js Background Animation
function initThreeJsBackground() {
    const canvas = document.getElementById('threejs-canvas');
    
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Create geometry objects
    const geometries = [
        new THREE.TetrahedronGeometry(1, 0),
        new THREE.OctahedronGeometry(1, 0),
        new THREE.IcosahedronGeometry(1, 0),
        new THREE.DodecahedronGeometry(1, 0)
    ];
    
    const objects = [];
    const colors = [
        new THREE.Color(0x8a2be2), // Primary
        new THREE.Color(0x00ffff), // Secondary
        new THREE.Color(0xff00ff), // Accent
        new THREE.Color(0x00ff9d)  // Success
    ];
    
    // Create objects
    for (let i = 0; i < 50; i++) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)];
        const material = new THREE.MeshBasicMaterial({
            color: colors[Math.floor(Math.random() * colors.length)],
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });
        
        const object = new THREE.Mesh(geometry, material);
        
        // Random position
        object.position.x = (Math.random() - 0.5) * 40;
        object.position.y = (Math.random() - 0.5) * 40;
        object.position.z = (Math.random() - 0.5) * 40;
        
        // Random scale
        const scale = Math.random() * 0.5 + 0.5;
        object.scale.set(scale, scale, scale);
        
        // Random rotation
        object.rotation.x = Math.random() * Math.PI;
        object.rotation.y = Math.random() * Math.PI;
        object.rotation.z = Math.random() * Math.PI;
        
        // Store rotation speed
        object.userData = {
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01,
                z: (Math.random() - 0.5) * 0.01
            }
        };
        
        scene.add(object);
        objects.push(object);
    }
    
    // Position camera
    camera.position.z = 15;
    
    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - window.innerWidth / 2) * 0.001;
        mouseY = (event.clientY - window.innerHeight / 2) * 0.001;
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Update objects rotation
        objects.forEach(object => {
            object.rotation.x += object.userData.rotationSpeed.x;
            object.rotation.y += object.userData.rotationSpeed.y;
            object.rotation.z += object.userData.rotationSpeed.z;
        });
        
        // Smooth camera movement
        targetX = mouseX * 5;
        targetY = mouseY * 5;
        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.position.y += (targetY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Particles.js Background
function initParticlesBackground() {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ['#8a2be2', '#00ffff', '#ff00ff']
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#8a2be2',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.5
                    }
                },
                push: {
                    particles_nb: 3
                }
            }
        },
        retina_detect: true
    });
}

// Scroll Companion Animation
function initScrollCompanion() {
    const scrollCompanion = document.getElementById('scrollCompanion');
    const companionTrail = document.querySelector('.companion-trail');
    const sectionIndicator = document.querySelector('.section-indicator');
    const scrollProgress = document.querySelector('.scroll-progress');
    const sections = document.querySelectorAll('section[data-section-name]');
    
    // Update companion position and info on scroll
    window.addEventListener('scroll', () => {
        // Calculate scroll percentage
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        
        // Update trail height based on scroll percentage
        companionTrail.style.height = `${scrollPercentage * 3}px`;
        
        // Update scroll progress text
        scrollProgress.textContent = `${Math.floor(scrollPercentage)}%`;
        
        // Determine current section
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollTop >= sectionTop - 200 && scrollTop < sectionTop + sectionHeight - 200) {
                currentSection = section.getAttribute('data-section-name');
            }
        });
        
        // Update section indicator
        if (currentSection) {
            sectionIndicator.textContent = currentSection;
        }
        
        // Animate companion based on scroll
        anime({
            targets: '.core-ring',
            scale: 1 + (scrollPercentage / 500),
            duration: 100,
            easing: 'linear'
        });
        
        // Show/hide companion based on scroll position
        if (scrollTop > 100) {
            scrollCompanion.style.opacity = '1';
        } else {
            scrollCompanion.style.opacity = '0';
        }
    });
    
    // Initial animation
    anime({
        targets: scrollCompanion,
        opacity: 0,
        duration: 0
    });
}

// Navigation Functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Get target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Scroll to target section
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active link
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Change navbar style on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active link based on scroll position
        const scrollPosition = window.scrollY + 100;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Hero Section Animations
function initHeroAnimations() {
    // Title animation
    anime({
        targets: '.title-line h1, .title-line h2',
        translateY: 0,
        opacity: 1,
        duration: 1200,
        delay: anime.stagger(200),
        easing: 'easeOutExpo'
    });
    
    // Description animation
    anime({
        targets: '.hero-description p',
        translateY: 0,
        opacity: 1,
        duration: 1000,
        delay: 600,
        easing: 'easeOutExpo'
    });
    
    // Code block animation
    anime({
        targets: '.code-block',
        translateY: 0,
        opacity: 1,
        duration: 1000,
        delay: 800,
        easing: 'easeOutExpo'
    });
    
    // Buttons animation
    anime({
        targets: '.hero-actions',
        translateY: 0,
        opacity: 1,
        duration: 1000,
        delay: 1000,
        easing: 'easeOutExpo'
    });
    
    // Scroll indicator animation
    anime({
        targets: '.scroll-indicator',
        opacity: 1,
        duration: 1000,
        delay: 1500,
        easing: 'easeOutExpo'
    });
    
    // 3D elements animation
    anime({
        targets: '.cube',
        scale: [0, 1],
        opacity: [0, 1],
        duration: 1500,
        delay: anime.stagger(100),
        easing: 'easeOutExpo'
    });
}

// Parallax Effects
function initParallaxEffects() {
    // GSAP ScrollTrigger for parallax sections
    gsap.registerPlugin(ScrollTrigger);
    
    // Parallax sections
    document.querySelectorAll('.parallax-section').forEach(section => {
        const speed = section.getAttribute('data-speed') || 0.5;
        const elements = section.querySelectorAll('.section-header, .skill-category, .project-card, .article-card, .specialty-item');
        
        gsap.fromTo(elements, {
            y: 100,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none none'
            }
        });
        
        // Parallax background effect
        gsap.to(section, {
            backgroundPositionY: `${-50 * speed}%`,
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });
    
    // Profile card 3D effect
    const profileCard = document.querySelector('.profile-card-3d');
    
    if (profileCard) {
        profileCard.addEventListener('mousemove', (e) => {
            const rect = profileCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            profileCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        profileCard.addEventListener('mouseleave', () => {
            profileCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    }
}

// Skill Bars Animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Animate skill bars when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const percentage = entry.target.getAttribute('data-percentage');
                entry.target.style.width = `${percentage}%`;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Project Filters
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(btn => btn.classList.remove('active'));
            btn.classList.add('active');
            
            // Get filter value
            const filter = btn.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || filter === category) {
                    // Show card with animation
                    anime({
                        targets: card,
                        scale: [0.9, 1],
                        opacity: [0, 1],
                        duration: 500,
                        easing: 'easeOutExpo'
                    });
                    card.style.display = 'block';
                } else {
                    // Hide card with animation
                    anime({
                        targets: card,
                        scale: [1, 0.9],
                        opacity: [1, 0],
                        duration: 500,
                        easing: 'easeOutExpo',
                        complete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData.entries());
            
            // Simulate form submission
            console.log('Form submitted:', formValues);
            
            // Show success message (in a real application, you would send the data to a server)
            alert('Mensagem enviada com sucesso! Obrigado pelo contato.');
            
            // Reset form
            contactForm.reset();
        });
    }
}

// Konami Code Easter Egg
function initKonamiCode() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        // Check if the key matches the next key in the Konami code
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            
            // If the full code is entered
            if (konamiIndex === konamiCode.length) {
                activateMatrixMode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    // Matrix Mode Easter Egg
    function activateMatrixMode() {
        // Create canvas for matrix rain
        const canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.zIndex = '9999';
        canvas.style.pointerEvents = 'none';
        canvas.style.opacity = '0';
        document.body.appendChild(canvas);
        
        // Fade in canvas
        anime({
            targets: canvas,
            opacity: 0.8,
            duration: 1000,
            easing: 'easeInOutQuad'
        });
        
        // Matrix rain effect
        const ctx = canvas.getContext('2d');
        const characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const columns = Math.floor(canvas.width / 20);
        const drops = [];
        
        // Initialize drops
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.floor(Math.random() * -100);
        }
        
        // Draw matrix rain
        function drawMatrixRain() {
            // Semi-transparent black background to show trail
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Green text
            ctx.fillStyle = '#00ffff';
            ctx.font = '15px monospace';
            
            // Draw characters
            for (let i = 0; i < drops.length; i++) {
                // Random character
                const char = characters.charAt(Math.floor(Math.random() * characters.length));
                
                // Draw character
                ctx.fillText(char, i * 20, drops[i] * 20);
                
                // Move drop down
                if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                
                drops[i]++;
            }
        }
        
        // Animation loop
        const matrixInterval = setInterval(drawMatrixRain, 50);
        
        // Remove matrix effect after 10 seconds
        setTimeout(() => {
            clearInterval(matrixInterval);
            
            // Fade out canvas
            anime({
                targets: canvas,
                opacity: 0,
                duration: 1000,
                easing: 'easeInOutQuad',
                complete: () => {
                    canvas.remove();
                }
            });
        }, 10000);
    }
}

