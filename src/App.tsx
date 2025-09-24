import React, { useEffect, useState } from 'react';
import { Github, Mail, Linkedin, ExternalLink, Star, GitFork, Calendar } from 'lucide-react';
import './App.css';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
}

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const phrases = [
    "Entdecke meine neuesten Kreationen...",
    "Innovative Lösungen für moderne Probleme...",
    "Code, der Geschichten erzählt...",
    "Von der Idee zur Realität...",
    "Pixels mit Persönlichkeit..."
  ];

  // Theme toggle
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Typing animation
  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentPhrase = phrases[currentPhraseIndex];
      
      if (isDeleting) {
        setCurrentText(current => current.slice(0, -1));
      } else {
        setCurrentText(current => currentPhrase.slice(0, current.length + 1));
      }

      if (!isDeleting && currentText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentPhraseIndex((current) => (current + 1) % phrases.length);
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentPhraseIndex, phrases]);

  // Fetch GitHub repos
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/MyOne00/repos?sort=updated&per_page=6');
        if (response.ok) {
          const data = await response.json();
          setRepos(data);
        } else {
          throw new Error('API request failed');
        }
      } catch (error) {
        // Demo data fallback
        const demoRepos: GitHubRepo[] = [
          {
            id: 1,
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
            id: 2,
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
            id: 3,
            name: "weather-dashboard",
            description: "Wetter-Dashboard mit API-Integration und schönen Animationen",
            html_url: "https://github.com/demo/weather-dashboard", 
            homepage: "https://weather.demo",
            stargazers_count: 12,
            forks_count: 4,
            language: "JavaScript",
            topics: ["javascript", "api", "weather"],
            updated_at: "2025-01-01"
          }
        ];
        setRepos(demoRepos);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  // Stats animation
  const AnimatedNumber: React.FC<{ target: number; label: string; icon: string }> = ({ target, label, icon }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      const increment = target / 50;
      const timer = setInterval(() => {
        setCount(prev => {
          if (prev < target) {
            return Math.min(prev + increment, target);
          }
          return target;
        });
      }, 40);

      return () => clearInterval(timer);
    }, [target]);

    return (
      <div className="stats-card">
        <div className="stat-number">{Math.floor(count)}</div>
        <div className="stat-label">{label}</div>
        <div className="stat-icon">{icon}</div>
      </div>
    );
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className={`app ${theme}`}>
      {/* Header */}
      <header className="header">
        <nav className="nav">
          <div className="logo" onClick={() => scrollToSection('home')}>Johann</div>
          <ul className={`nav-links ${mobileMenuOpen ? 'nav-links-open' : ''}`}>
            <li><a onClick={() => scrollToSection('home')}>Start</a></li>
            <li><a onClick={() => scrollToSection('about')}>Über mich</a></li>
            <li><a onClick={() => scrollToSection('projects')}>Projekte</a></li>
            <li><a onClick={() => scrollToSection('experience')}>Werdegang</a></li>
            <li><a onClick={() => scrollToSection('contact')}>Kontakt</a></li>
          </ul>
          <div className="header-actions">
            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <a href="https://github.com/MyOne00" className="github-btn" target="_blank" rel="noopener noreferrer">
              <Github size={18} />
              GitHub
            </a>
            <button 
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              ☰
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-background"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="wave-emoji">👋</span> Hallo, ich bin Johann
          </h1>
          <p className="hero-subtitle">
            Leidenschaftlicher Entwickler & kreativer Problemlöser<br/>
            Ich erschaffe moderne Web-Erfahrungen mit Code & Design
          </p>
          <button className="cta-button" onClick={() => scrollToSection('projects')}>
            Meine Projekte entdecken
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <h2 className="section-title">Über mich</h2>
        <div className="about-container">
          <div className="about-card interactive-card">
            <div className="card-glow"></div>
            <div className="floating-icon">🎓</div>
            <h3>Aktueller Status</h3>
            <p>16 Jahre alt und momentan dabei, meinen Realschulabschluss zu absolvieren. Parallel dazu lerne ich Web Development und arbeite an kleineren Projekten, um praktische Erfahrungen zu sammeln.</p>
            <div className="stats-mini">
              <span><strong>16</strong> Jahre jung</span>
              <span><strong>Realschule</strong> aktiv</span>
            </div>
          </div>

          <div className="about-card interactive-card">
            <div className="card-glow"></div>
            <div className="floating-icon">💻</div>
            <h3>Meine Leidenschaft</h3>
            <p>Als Web Development Anfänger entdecke ich jeden Tag neue Technologien und Möglichkeiten. Code zu schreiben und Websites zum Leben zu erwecken fasziniert mich ungemein!</p>
            <div className="tech-cloud">
              <span className="tech-bubble">HTML/CSS</span>
              <span className="tech-bubble">JavaScript</span>
              <span className="tech-bubble">GitHub</span>
              <span className="tech-bubble">Learning</span>
            </div>
          </div>

          <div className="about-card interactive-card">
            <div className="card-glow"></div>
            <div className="floating-icon">🚀</div>
            <h3>Meine Vision</h3>
            <p>Nach meinem Realschulabschluss möchte ich eine berufliche Karriere in der Web Development Branche starten. Jeden Tag lerne ich dazu und arbeite an neuen Projekten!</p>
            <div className="pulse-indicator">
              <div className="pulse-dot"></div>
              <span>Bereit für neue Lernerfahrungen</span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <h2 className="section-title">Meine Projekte</h2>
        <div className="projects-intro">
          <div className="typing-animation">
            <span className="typing-text">{currentText}</span>
            <span className="cursor">|</span>
          </div>
        </div>

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Lade GitHub Repositories...</p>
          </div>
        ) : (
          <div className="projects-grid">
            {repos.map((repo) => (
              <div key={repo.id} className="project-card">
                <div className="project-card-inner">
                  <div className="project-header">
                    <h3>{repo.name}</h3>
                    <div className="project-status">
                      <span className={`status-dot ${repo.updated_at ? 'active' : 'inactive'}`}></span>
                      <span className="status-text">{repo.updated_at ? 'Aktiv' : 'Archiv'}</span>
                    </div>
                  </div>
                  <p className="project-description">
                    {repo.description || 'Keine Beschreibung verfügbar'}
                  </p>
                  <div className="tech-stack">
                    {repo.topics?.map((topic) => (
                      <span key={topic} className="tech-tag">{topic}</span>
                    ))}
                    {repo.language && <span className="tech-tag">{repo.language}</span>}
                  </div>
                  <div className="project-stats">
                    <span className="stat-item">
                      <Star size={16} />
                      <span className="stat-value">{repo.stargazers_count}</span>
                    </span>
                    <span className="stat-item">
                      <GitFork size={16} />
                      <span className="stat-value">{repo.forks_count}</span>
                    </span>
                    <span className="stat-item">
                      <Calendar size={16} />
                      <span className="stat-value">{repo.language || 'Mixed'}</span>
                    </span>
                  </div>
                  <div className="project-links">
                    <a href={repo.html_url} className="project-link primary" target="_blank" rel="noopener noreferrer">
                      <span>GitHub</span>
                      <span className="link-arrow">→</span>
                    </a>
                    {repo.homepage && (
                      <a href={repo.homepage} className="project-link secondary" target="_blank" rel="noopener noreferrer">
                        <span>Live Demo</span>
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
                <div className="project-glow"></div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Experience Timeline */}
      <section id="experience" className="experience-section">
        <h2 className="section-title">Mein Weg</h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-marker">
              <div className="timeline-icon">📚</div>
            </div>
            <div className="timeline-content">
              <div className="timeline-date">2022 - Heute</div>
              <h3>Realschulabschluss & Web Development</h3>
              <p>Konzentriere mich auf meinen Realschulabschluss und lerne parallel HTML, CSS, JavaScript und Git. Arbeite an ersten eigenen Projekten und sammle praktische Erfahrungen.</p>
              <div className="timeline-tags">
                <span>HTML/CSS</span>
                <span>JavaScript</span>
                <span>Git/GitHub</span>
              </div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-marker">
              <div className="timeline-icon">💡</div>
            </div>
            <div className="timeline-content">
              <div className="timeline-date">2022 - 2023</div>
              <h3>Erste Schritte ins Coding</h3>
              <p>Entdeckung meiner Leidenschaft für Web Development. Beginn mit Online-Tutorials, ersten HTML/CSS Experimenten und dem Aufbau grundlegender Programmierkenntnisse.</p>
              <div className="timeline-tags">
                <span>HTML</span>
                <span>CSS</span>
                <span>Tutorials</span>
              </div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-marker">
              <div className="timeline-icon">🎯</div>
            </div>
            <div className="timeline-content">
              <div className="timeline-date">2026 - Zukunft</div>
              <h3>Geplanter Berufseinstieg Web Development</h3>
              <p>Nach dem Realschulabschluss möchte ich eine Ausbildung oder ein Studium im Bereich Web Development beginnen und meine Leidenschaft zum Beruf machen.</p>
              <div className="timeline-tags">
                <span>Ausbildung</span>
                <span>Berufseinstieg</span>
                <span>Karriere</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <AnimatedNumber target={365} label="Tage lerne ich schon" icon="📚" />
          <AnimatedNumber target={9} label="Kleine Projekte erstellt" icon="🎯" />
          <AnimatedNumber target={16} label="Jahre jung" icon="🌟" />
          <AnimatedNumber target={3} label="Technologien gelernt" icon="⚡" />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <h2 className="section-title">Kontakt</h2>
        <div className="contact-container">
          <div className="contact-info">
            <h3>Lass uns zusammenarbeiten!</h3>
            <p>Ich bin immer offen für spannende Projekte und neue Herausforderungen. Ob du eine Idee hast, Feedback zu meinen Projekten oder einfach Hallo sagen möchtest – ich freue mich auf deine Nachricht!</p>
            
            <div className="contact-details">
              <p><Mail size={16} /> johannwohlgemuth139@gmail.com</p>
              <p>📱 +49 1522 7868860</p>
              <p>📍 Deutschland</p>
            </div>

            <div className="social-links">
              <a href="https://github.com/MyOne00" className="social-link" title="GitHub" target="_blank" rel="noopener noreferrer">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/johann-wohlgemuth-3943b9271/" className="social-link" title="LinkedIn" target="_blank" rel="noopener noreferrer">
                <Linkedin size={20} />
              </a>
              <a href="mailto:johannwohlgemuth139@gmail.com" className="social-link" title="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">E-Mail</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Betreff</label>
              <input type="text" id="subject" name="subject" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Nachricht</label>
              <textarea id="message" name="message" rows={5} required></textarea>
            </div>
            <button type="submit" className="submit-btn">Nachricht senden</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 All rights reserved. Designed and Created by Johann Wohlgemuth</p>
      </footer>
    </div>
  );
};

export default App;