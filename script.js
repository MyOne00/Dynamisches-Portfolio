// Enhanced Portfolio JavaScript with Maximum Dynamism

// Global Variables
let currentPhraseIndex = 0;
let currentChar = 0;
let isDeleting = false;
let typingSpeed = 100;
let mobileMenuOpen = false;

// Typewriter phrases
const typewriterPhrases = [
    "Leidenschaftlicher Entwickler & kreativer Problemlöser",
    "Ich erschaffe moderne Web-Erfahrungen mit Code & Design",
    "Jeden Tag lerne ich neue Technologien und Möglichkeiten",
    "Von der Idee zur Realität - mit Code und Kreativität"
];

// Typing animation phrases for projects section
const typingPhrases = [
    "Entdecke meine neuesten Kreationen...",
    "Innovative Lösungen für moderne Probleme...",
    "Code, der Geschichten erzählt...",
    "Von der Idee zur Realität...",
    "Pixels mit Persönlichkeit...",
    "Kreativität trifft auf Technologie...",
    "Moderne Webentwicklung mit Leidenschaft..."
];

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeInteractions();
    initializeScrollEffects();
    initializeCursorTrail();
    loadGitHubRepos();
    
    // Load saved theme
    loadTheme();
    
    // Start typewriter animations
    setTimeout(() => {
        startTypewriterAnimation();
        startTypingAnimation();
    }, 1000);
});

// Theme Management
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.querySelector('.theme-toggle .theme-icon');
    
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        if (themeToggle) themeToggle.textContent = '☀️';
    }
}

function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle .theme-icon');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    }
    
    // Add theme transition effect
    body.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    setTimeout(() => {
        body.style.transition = '';
    }, 500);
}

// Mobile Menu
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    mobileMenuOpen = !mobileMenuOpen;
    
    if (mobileMenuOpen) {
        navLinks.classList.add('active');
        menuBtn.classList.add('active');
    } else {
        navLinks.classList.remove('active');
        menuBtn.classList.remove('active');
    }
}

// Typewriter Animation for Hero
function startTypewriterAnimation() {
    const typewriterElement = document.querySelector('.typewriter-text');
    if (!typewriterElement) return;
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentPhrase = typewriterPhrases[phraseIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % typewriterPhrases.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    type();
}

// Typing Animation for Projects Section
function startTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    function typeWriter() {
        const currentText = typingPhrases[currentPhraseIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, currentChar - 1);
            currentChar--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentText.substring(0, currentChar + 1);
            currentChar++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && currentChar === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && currentChar === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % typingPhrases.length;
            typingSpeed = 500;
        }
        
        setTimeout(typeWriter, typingSpeed);
    }
    
    typeWriter();
}

// Initialize Animations
function initializeAnimations() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Special handling for different elements
                if (entry.target.classList.contains('stats-card')) {
                    animateStatsCard(entry.target);
                } else if (entry.target.classList.contains('timeline-item')) {
                    animateTimelineItem(entry.target);
                } else if (entry.target.classList.contains('about-card')) {
                    animateAboutCard(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    const elementsToAnimate = document.querySelectorAll(
        '.about-card, .project-card, .timeline-item, .stats-card, .contact-info, .contact-form'
    );
    
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// Animate Stats Cards
function animateStatsCard(card) {
    const numberElement = card.querySelector('.stat-number');
    const targetValue = parseInt(card.getAttribute('data-count'));
    
    if (!numberElement || !targetValue) return;
    
    let currentValue = 0;
    const increment = targetValue / 60;
    const duration = 2000;
    const stepTime = duration / 60;
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
        }
        numberElement.textContent = Math.floor(currentValue);
    }, stepTime);
    
    // Add particle effect
    setTimeout(() => {
        card.querySelector('.card-particles').style.opacity = '1';
    }, 1000);
}

// Animate Timeline Items
function animateTimelineItem(item) {
    const marker = item.querySelector('.timeline-marker');
    const content = item.querySelector('.timeline-content');
    
    setTimeout(() => {
        marker.style.transform = 'translateX(-50%) scale(1.1)';
        setTimeout(() => {
            marker.style.transform = 'translateX(-50%) scale(1)';
        }, 300);
    }, 200);
    
    setTimeout(() => {
        content.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            content.style.transform = 'translateY(0)';
        }, 300);
    }, 400);
}

// Animate About Cards
function animateAboutCard(card) {
    const icon = card.querySelector('.floating-icon');
    const techBubbles = card.querySelectorAll('.tech-bubble');
    
    // Animate icon
    setTimeout(() => {
        icon.style.transform = 'translateY(-20px) scale(1.1)';
        setTimeout(() => {
            icon.style.transform = 'translateY(0) scale(1)';
        }, 500);
    }, 300);
    
    // Animate tech bubbles
    techBubbles.forEach((bubble, index) => {
        setTimeout(() => {
            bubble.style.transform = 'translateY(-10px) scale(1.05)';
            setTimeout(() => {
                bubble.style.transform = 'translateY(0) scale(1)';
            }, 300);
        }, 500 + (index * 100));
    });
}

// Initialize Interactions
function initializeInteractions() {
    // 3D Tilt Effect for Cards
    const tiltCards = document.querySelectorAll('[data-tilt]');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 8;
            const rotateY = (centerX - x) / 8;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });
    
    // Enhanced hover effects for project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-25px) rotateX(8deg) rotateY(4deg)';
            
            // Trigger shine effect
            const shine = card.querySelector('.card-shine');
            if (shine) {
                shine.style.left = '100%';
                setTimeout(() => {
                    shine.style.left = '-100%';
                }, 600);
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg)';
        });
    });
    
    // Interactive tech bubbles
    const techBubbles = document.querySelectorAll('.tech-bubble');
    
    techBubbles.forEach(bubble => {
        bubble.addEventListener('click', () => {
            bubble.style.transform = 'scale(1.2)';
            bubble.style.filter = 'brightness(1.2)';
            
            setTimeout(() => {
                bubble.style.transform = 'scale(1)';
                bubble.style.filter = 'brightness(1)';
            }, 200);
        });
    });
}

// Initialize Scroll Effects
function initializeScrollEffects() {
    // Parallax effect for background elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Move floating shapes
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = 0.2 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        // Move gradient orbs
        const orbs = document.querySelectorAll('.orb');
        orbs.forEach((orb, index) => {
            const speed = 0.1 + (index * 0.05);
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        // Header background effect
        const header = document.querySelector('.glass-header');
        if (scrolled > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(30px)';
            if (document.body.getAttribute('data-theme') === 'dark') {
                header.style.background = 'rgba(15, 23, 42, 0.95)';
            }
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.1)';
            header.style.backdropFilter = 'blur(20px)';
            if (document.body.getAttribute('data-theme') === 'dark') {
                header.style.background = 'rgba(15, 23, 42, 0.1)';
            }
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (mobileMenuOpen) {
                    toggleMobileMenu();
                }
            }
        });
    });
}

// Initialize Cursor Trail
function initializeCursorTrail() {
    const trail = document.querySelector('.cursor-trail');
    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        trail.style.opacity = '0.6';
    });
    
    document.addEventListener('mouseleave', () => {
        trail.style.opacity = '0';
    });
    
    function updateTrail() {
        const dx = mouseX - trailX;
        const dy = mouseY - trailY;
        
        trailX += dx * 0.1;
        trailY += dy * 0.1;
        
        trail.style.left = trailX + 'px';
        trail.style.top = trailY + 'px';
        
        requestAnimationFrame(updateTrail);
    }
    
    updateTrail();
}

// GitHub API Integration
async function loadGitHubRepos() {
    const username = 'MyOne00';
    const container = document.getElementById('projects-container');
    const grid = document.getElementById('projects-grid');
    
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        
        if (!response.ok) {
            throw new Error('GitHub API request failed');
        }
        
        const repos = await response.json();
        
        // Hide loading, show grid
        container.style.display = 'none';
        grid.style.display = 'grid';
        
        // Display repos
        displayRepos(repos);
        
    } catch (error) {
        console.log('GitHub API failed, showing demo data');
        
        // Show demo data
        setTimeout(() => {
            showDemoProjects();
        }, 2000);
    }
}

// Demo projects for fallback
function showDemoProjects() {
    const demoRepos = [
        {
            name: "portfolio-website",
            description: "Meine persönliche Portfolio-Website mit modernem Design und GitHub-Integration",
            html_url: "https://github.com/demo/portfolio-website",
            homepage: "https://johann-portfolio.demo",
            stargazers_count: 15,
            forks_count: 3,
            language: "HTML",
            topics: ["html", "css", "javascript", "portfolio"],
            updated_at: "2025-01-01"
        },
        {
            name: "task-manager-app",
            description: "Eine React-basierte Aufgaben-Management App mit lokaler Speicherung",
            html_url: "https://github.com/demo/task-manager",
            homepage: "https://task-manager.demo",
            stargazers_count: 8,
            forks_count: 2,
            language: "JavaScript",
            topics: ["react", "javascript", "productivity"],
            updated_at: "2025-01-01"
        },
        {
            name: "weather-dashboard",
            description: "Wetter-Dashboard mit API-Integration und schönen Animationen",
            html_url: "https://github.com/demo/weather-dashboard",
            homepage: "https://weather.demo",
            stargazers_count: 12,
            forks_count: 4,
            language: "JavaScript",
            topics: ["javascript", "api", "weather"],
            updated_at: "2025-01-01"
        },
        {
            name: "python-data-analyzer",
            description: "Python-Tool zur Datenanalyse mit pandas und matplotlib",
            html_url: "https://github.com/demo/data-analyzer",
            homepage: null,
            stargazers_count: 6,
            forks_count: 1,
            language: "Python",
            topics: ["python", "data-science", "analysis"],
            updated_at: "2025-01-01"
        },
        {
            name: "css-animations-collection",
            description: "Sammlung von CSS-Animationen und Effekten für moderne Websites",
            html_url: "https://github.com/demo/css-animations",
            homepage: "https://css-animations.demo",
            stargazers_count: 25,
            forks_count: 7,
            language: "CSS",
            topics: ["css", "animations", "frontend"],
            updated_at: "2025-01-01"
        },
        {
            name: "node-api-starter",
            description: "Node.js API Starter-Template mit Express und MongoDB Integration",
            html_url: "https://github.com/demo/node-api",
            homepage: null,
            stargazers_count: 4,
            forks_count: 2,
            language: "JavaScript",
            topics: ["nodejs", "api", "backend"],
            updated_at: "2025-01-01"
        }
    ];
    
    const container = document.getElementById('projects-container');
    const grid = document.getElementById('projects-grid');
    
    container.style.display = 'none';
    grid.style.display = 'grid';
    
    displayRepos(demoRepos);
}

// Display repositories
function displayRepos(repos) {
    const grid = document.getElementById('projects-grid');
    grid.innerHTML = '';
    
    repos.forEach((repo, index) => {
        const card = createProjectCard(repo);
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
        grid.appendChild(card);
        
        // Add intersection observer for individual cards
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });
        
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        observer.observe(card);
    });
}

// Create enhanced project card
function createProjectCard(repo) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-languages', (repo.topics || []).join(' ').toLowerCase());
    
    const techStack = repo.topics || [repo.language].filter(Boolean);
    const techTags = techStack.map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');
    
    card.innerHTML = `
        <div class="project-card-inner">
            <div class="project-header">
                <h3>${repo.name}</h3>
                <div class="project-status">
                    <span class="status-dot ${repo.updated_at ? 'active' : 'inactive'}"></span>
                    <span class="status-text">${repo.updated_at ? 'Aktiv' : 'Archiv'}</span>
                </div>
            </div>
            <p class="project-description">${repo.description || 'Keine Beschreibung verfügbar'}</p>
            <div class="tech-stack">${techTags}</div>
            <div class="project-stats">
                <span class="stat-item">
                    <span class="stat-icon">⭐</span>
                    <span class="stat-value">${repo.stargazers_count || 0}</span>
                </span>
                <span class="stat-item">
                    <span class="stat-icon">🔄</span>
                    <span class="stat-value">${repo.forks_count || 0}</span>
                </span>
                <span class="stat-item">
                    <span class="stat-icon">📅</span>
                    <span class="stat-value">${repo.language || 'Mixed'}</span>
                </span>
            </div>
            <div class="project-links">
                <a href="${repo.html_url}" class="project-link primary" target="_blank">
                    <span>GitHub</span>
                    <span class="link-arrow">→</span>
                </a>
                ${repo.homepage ? `
                    <a href="${repo.homepage}" class="project-link secondary" target="_blank">
                        <span>Live Demo</span>
                        <span class="link-arrow">↗</span>
                    </a>
                ` : ''}
            </div>
        </div>
        <div class="project-glow"></div>
        <div class="card-shine"></div>
    `;
    
    return card;
}

// Contact form handling
function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('.submit-btn span');
    const originalText = submitBtn.textContent;
    
    // Show loading state with animation
    submitBtn.textContent = 'Wird gesendet...';
    form.querySelector('.submit-btn').disabled = true;
    form.querySelector('.btn-particles').style.opacity = '1';
    
    // Simulate form submission
    setTimeout(() => {
        submitBtn.textContent = 'Erfolgreich gesendet! ✅';
        
        // Add success animation
        form.querySelector('.submit-btn').style.background = 'var(--gradient-success)';
        
        // Reset form after 3 seconds
        setTimeout(() => {
            form.reset();
            submitBtn.textContent = originalText;
            form.querySelector('.submit-btn').disabled = false;
            form.querySelector('.submit-btn').style.background = 'var(--gradient-primary)';
            form.querySelector('.btn-particles').style.opacity = '0';
        }, 3000);
    }, 2000);
}

// Enhanced scroll animations
function initializeAdvancedScrollEffects() {
    // Create intersection observer for advanced animations
    const advancedObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add staggered animation for child elements
                const children = element.querySelectorAll('*');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 50);
                });
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe sections for advanced animations
    const sectionsToObserve = document.querySelectorAll('section');
    sectionsToObserve.forEach(section => {
        advancedObserver.observe(section);
    });
}

// Easter Eggs and Special Effects
function initializeEasterEggs() {
    // Konami Code Easter Egg
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
            // Activate rainbow mode
            document.body.style.animation = 'rainbow 2s infinite';
            
            // Add particle explosion
            createParticleExplosion();
            
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
        }
    });
    
    // Double-click logo for special effect
    const logo = document.querySelector('.logo');
    let clickCount = 0;
    
    logo.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 2) {
            // Trigger special logo animation
            logo.style.animation = 'logo-special 1s ease-in-out';
            setTimeout(() => {
                logo.style.animation = '';
                clickCount = 0;
            }, 1000);
        }
        
        setTimeout(() => {
            clickCount = 0;
        }, 500);
    });
}

// Create particle explosion effect
function createParticleExplosion() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            left: 50%;
            top: 50%;
        `;
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 50;
        const velocity = 5 + Math.random() * 10;
        
        let x = 0;
        let y = 0;
        let opacity = 1;
        
        function animateParticle() {
            x += Math.cos(angle) * velocity;
            y += Math.sin(angle) * velocity;
            opacity -= 0.02;
            
            particle.style.transform = `translate(${x}px, ${y}px)`;
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animateParticle);
            } else {
                particle.remove();
            }
        }
        
        animateParticle();
    }
}

// Initialize advanced features
setTimeout(() => {
    initializeAdvancedScrollEffects();
    initializeEasterEggs();
}, 2000);

// Performance monitoring
function monitorPerformance() {
    // Monitor frame rate
    let lastTime = performance.now();
    let frameCount = 0;
    
    function checkFrameRate() {
        const currentTime = performance.now();
        frameCount++;
        
        if (currentTime - lastTime >= 1000) {
            const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
            
            // Reduce animations if FPS is too low
            if (fps < 30) {
                document.body.classList.add('reduced-motion');
            } else {
                document.body.classList.remove('reduced-motion');
            }
            
            frameCount = 0;
            lastTime = currentTime;
        }
        
        requestAnimationFrame(checkFrameRate);
    }
    
    checkFrameRate();
}

// Start performance monitoring
monitorPerformance();

// Handle window resize
window.addEventListener('resize', () => {
    // Recalculate animations on resize
    const cards = document.querySelectorAll('[data-tilt]');
    cards.forEach(card => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
    
    // Update mobile menu state
    if (window.innerWidth > 768 && mobileMenuOpen) {
        toggleMobileMenu();
    }
});

// Add CSS animation for rainbow effect
const rainbowKeyframes = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg) saturate(1.2) brightness(1.1); }
        25% { filter: hue-rotate(90deg) saturate(1.4) brightness(1.2); }
        50% { filter: hue-rotate(180deg) saturate(1.6) brightness(1.3); }
        75% { filter: hue-rotate(270deg) saturate(1.4) brightness(1.2); }
        100% { filter: hue-rotate(360deg) saturate(1.2) brightness(1.1); }
    }
    
    @keyframes logo-special {
        0% { transform: scale(1) rotate(0deg); }
        25% { transform: scale(1.2) rotate(90deg); }
        50% { transform: scale(1.4) rotate(180deg); }
        75% { transform: scale(1.2) rotate(270deg); }
        100% { transform: scale(1) rotate(360deg); }
    }
    
    .reduced-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
`;

// Inject additional CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = rainbowKeyframes;
document.head.appendChild(styleSheet);