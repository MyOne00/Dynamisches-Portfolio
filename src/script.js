// Typing Animation
const phrases = [
    "Entdecke meine neuesten Kreationen...",
    "Innovative Lösungen für moderne Probleme...",
    "Code, der Geschichten erzählt...",
    "Von der Idee zur Realität...",
    "Pixels mit Persönlichkeit..."
];

let currentPhrase = 0;
let currentChar = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeWriter() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const currentText = phrases[currentPhrase];
    
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
        typingSpeed = 2000; // Pause before deleting
    } else if (isDeleting && currentChar === 0) {
        isDeleting = false;
        currentPhrase = (currentPhrase + 1) % phrases.length;
        typingSpeed = 500; // Pause before typing next phrase
    }
    
    setTimeout(typeWriter, typingSpeed);
}

// Interactive Cards with 3D effect
function initInteractiveCards() {
    const cards = document.querySelectorAll('.interactive-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });
}

// Timeline Animation
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 200);
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => observer.observe(item));
}

// Stats Counter Animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateNumber(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateNumber(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, stepTime);
}

// Parallax Effect for Hero Section
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        const hero = document.querySelector('.hero::before');
        if (hero) {
            document.documentElement.style.setProperty('--parallax-offset', `${rate}px`);
        }
    });
}

// Dynamic Project Cards with enhanced animations
function createProjectCard(repo) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-languages', (repo.topics || []).join(' ').toLowerCase());
    
    const techStack = repo.topics || [repo.language].filter(Boolean);
    const techTags = techStack.map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');
    
    // Enhanced card with more interactive elements
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
    `;
    
    // Add hover effects
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) rotateX(5deg)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0)';
    });
    
    return card;
}

// Enhanced scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('about-card')) {
                    entry.target.style.animation = 'slideInUp 0.6s ease forwards';
                } else {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const elementsToAnimate = document.querySelectorAll(
        '.about-card, .project-card, .contact-container > *, .stats-card'
    );
    
    elementsToAnimate.forEach(el => {
        if (!el.classList.contains('about-card')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
        observer.observe(el);
    });
}

// Cursor trail effect
function initCursorTrail() {
    const trail = [];
    const trailLength = 20;
    
    // Create trail elements
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-dot';
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: ${1 - i / trailLength};
            transition: all 0.1s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function updateTrail() {
        let x = mouseX;
        let y = mouseY;
        
        trail.forEach((dot, index) => {
            dot.style.left = x + 'px';
            dot.style.top = y + 'px';
            
            const nextDot = trail[index + 1];
            if (nextDot) {
                x += (parseFloat(nextDot.style.left) - x) * 0.3;
                y += (parseFloat(nextDot.style.top) - y) * 0.3;
            }
        });
        
        requestAnimationFrame(updateTrail);
    }
    
    updateTrail();
}

// Loading screen
function initLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner">
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
            </div>
            <h2>Johann</h2>
            <p>Lade Portfolio...</p>
        </div>
    `;
    
    // Add loading screen styles
    const loadingStyles = `
        .loading-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--bg-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 1;
            transition: opacity 0.5s ease;
        }
        
        .loading-content {
            text-align: center;
        }
        
        .loading-spinner {
            position: relative;
            width: 80px;
            height: 80px;
            margin: 0 auto 2rem;
        }
        
        .spinner-ring {
            position: absolute;
            width: 64px;
            height: 64px;
            border: 3px solid transparent;
            border-top: 3px solid var(--primary-color);
            border-radius: 50%;
            animation: loading-spin 1s linear infinite;
        }
        
        .spinner-ring:nth-child(2) {
            width: 52px;
            height: 52px;
            top: 6px;
            left: 6px;
            animation-delay: -0.1s;
            border-top-color: var(--secondary-color);
        }
        
        .spinner-ring:nth-child(3) {
            width: 40px;
            height: 40px;
            top: 12px;
            left: 12px;
            animation-delay: -0.2s;
            border-top-color: var(--accent-color);
        }
        
        @keyframes loading-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = loadingStyles;
    document.head.appendChild(styleSheet);
    document.body.appendChild(loadingScreen);
    
    // Remove loading screen after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1000);
    });
}

// Update the main initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen
    initLoadingScreen();
    
    // Load GitHub repos
    fetchGitHubRepos();
    
    // Initialize all animations and effects
    setTimeout(() => {
        typeWriter();
        initInteractiveCards();
        initTimelineAnimation();
        animateStats();
        initScrollAnimations();
        initParallax();
        // initCursorTrail(); // Uncomment if you want the cursor trail
        
        // Add mobile menu functionality
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.style.display = 'none';
        
        // Mobile responsive behavior
        if (window.innerWidth <= 768) {
            const nav = document.querySelector('nav');
            nav.appendChild(mobileMenuBtn);
            mobileMenuBtn.style.display = 'block';
            
            mobileMenuBtn.addEventListener('click', () => {
                const navLinks = document.querySelector('.nav-links');
                navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            });
        }
    }, 100);
});// Theme Toggle
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    }
}

// Load theme from localStorage
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
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
        }
    });
});

// GitHub API Integration
async function fetchGitHubRepos() {
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
        
        // Store repos globally for filtering
        window.allRepos = repos;
        
        // Display repos
        displayRepos(repos);
        
    } catch (error) {
        container.innerHTML = `
            <div class="loading">
                <p>⚠️ Fehler beim Laden der GitHub Repositories</p>
                <p style="font-size: 0.9rem; opacity: 0.7;">Demo-Daten werden angezeigt</p>
            </div>
        `;
        
        // Show demo data after 2 seconds
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
            topics: ["html", "css", "javascript", "portfolio"]
        },
        {
            name: "task-manager-app",
            description: "Eine React-basierte Aufgaben-Management App mit lokaler Speicherung",
            html_url: "https://github.com/demo/task-manager",
            homepage: "https://task-manager.demo",
            stargazers_count: 8,
            forks_count: 2,
            language: "JavaScript",
            topics: ["react", "javascript", "productivity"]
        },
        {
            name: "weather-dashboard",
            description: "Wetter-Dashboard mit API-Integration und schönen Animationen",
            html_url: "https://github.com/demo/weather-dashboard",
            homepage: "https://weather.demo",
            stargazers_count: 12,
            forks_count: 4,
            language: "JavaScript",
            topics: ["javascript", "api", "weather"]
        },
        {
            name: "python-data-analyzer",
            description: "Python-Tool zur Datenanalyse mit pandas und matplotlib",
            html_url: "https://github.com/demo/data-analyzer",
            homepage: null,
            stargazers_count: 6,
            forks_count: 1,
            language: "Python",
            topics: ["python", "data-science", "analysis"]
        },
        {
            name: "css-animations-collection",
            description: "Sammlung von CSS-Animationen und Effekten für moderne Websites",
            html_url: "https://github.com/demo/css-animations",
            homepage: "https://css-animations.demo",
            stargazers_count: 25,
            forks_count: 7,
            language: "CSS",
            topics: ["css", "animations", "frontend"]
        },
        {
            name: "node-api-starter",
            description: "Node.js API Starter-Template mit Express und MongoDB Integration",
            html_url: "https://github.com/demo/node-api",
            homepage: null,
            stargazers_count: 4,
            forks_count: 2,
            language: "JavaScript",
            topics: ["nodejs", "api", "backend"]
        }
    ];
    
    const container = document.getElementById('projects-container');
    const grid = document.getElementById('projects-grid');
    
    container.style.display = 'none';
    grid.style.display = 'grid';
    
    window.allRepos = demoRepos;
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
    });
}

// Create project card
function createProjectCard(repo) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-languages', (repo.topics || []).join(' ').toLowerCase());
    
    const techStack = repo.topics || [repo.language].filter(Boolean);
    const techTags = techStack.map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');
    
    card.innerHTML = `
        <h3>${repo.name}</h3>
        <p class="project-description">${repo.description || 'Keine Beschreibung verfügbar'}</p>
        <div class="tech-stack">${techTags}</div>
        <div class="project-stats">
            <span>⭐ ${repo.stargazers_count || 0}</span>
            <span>🔄 ${repo.forks_count || 0}</span>
            <span>📅 ${repo.language || 'Mixed'}</span>
        </div>
        <div class="project-links">
            <a href="${repo.html_url}" class="project-link" target="_blank">GitHub</a>
            ${repo.homepage ? `<a href="${repo.homepage}" class="project-link" target="_blank">Live Demo</a>` : ''}
        </div>
    `;
    
    return card;
}

// Project filtering
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        filterProjects(filter);
    });
});

function filterProjects(filter) {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        const languages = card.getAttribute('data-languages') || '';
        const shouldShow = filter === 'all' || languages.includes(filter);
        
        if (shouldShow) {
            card.style.display = 'block';
            card.classList.add('fade-in');
        } else {
            card.style.display = 'none';
        }
    });
}

// Skills animation on scroll
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Contact form handling
function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Wird gesendet...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        submitBtn.textContent = 'Erfolgreich gesendet! ✅';
        
        // Reset form after 2 seconds
        setTimeout(() => {
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }, 1500);
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        if (document.body.getAttribute('data-theme') === 'dark') {
            header.style.background = 'rgba(17, 24, 39, 0.95)';
        }
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.8)';
        if (document.body.getAttribute('data-theme') === 'dark') {
            header.style.background = 'rgba(17, 24, 39, 0.8)';
        }
    }
});

// Intersection Observer for animations
const observeElements = () => {
    const elements = document.querySelectorAll('.skill-category, .project-card, .contact-container > *');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load GitHub repos
    fetchGitHubRepos();
    
    // Initialize animations
    animateSkills();
    observeElements();
    
    // Add mobile menu functionality
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.style.display = 'none';
    
    // Mobile responsive behavior
    if (window.innerWidth <= 768) {
        const nav = document.querySelector('nav');
        nav.appendChild(mobileMenuBtn);
        mobileMenuBtn.style.display = 'block';
        
        mobileMenuBtn.addEventListener('click', () => {
            const navLinks = document.querySelector('.nav-links');
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }
});

// Handle resize for mobile menu
window.addEventListener('resize', () => {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (window.innerWidth > 768) {
        navLinks.style.display = 'flex';
        if (mobileMenuBtn) mobileMenuBtn.style.display = 'none';
    } else {
        navLinks.style.display = 'none';
        if (mobileMenuBtn) mobileMenuBtn.style.display = 'block';
    }
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});