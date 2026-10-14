import { fallbackProjects, profile, type Project } from '@/lib/data';
import ContactForm from '@/components/ContactForm';
import TypingRole from '@/components/TypingRole';

const API = process.env.NEXT_PUBLIC_API_URL;

async function isLocalApiUp(urlStr: string): Promise<boolean> {
  try {
    const url = new URL(urlStr);
    if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
      const net = await import('net');
      return new Promise((resolve) => {
        const port = url.port ? parseInt(url.port, 10) : 80;
        const socket = net.createConnection({ host: url.hostname, port, timeout: 600 });
        socket.on('connect', () => {
          socket.destroy();
          resolve(true);
        });
        socket.on('timeout', () => {
          socket.destroy();
          resolve(false);
        });
        socket.on('error', () => {
          socket.destroy();
          resolve(false);
        });
      });
    }
    return true;
  } catch {
    return false;
  }
}

async function getProjects(): Promise<{ projects: Project[]; live: boolean }> {
  if (!API) return { projects: fallbackProjects, live: false };
  const up = await isLocalApiUp(API);
  if (!up) return { projects: fallbackProjects, live: false };

  try {
    const res = await fetch(`${API}/projects`, { cache: 'no-store', signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error('bad status');
    const projects: Project[] = await res.json();
    return { projects: projects.length ? projects : fallbackProjects, live: projects.length > 0 };
  } catch {
    return { projects: fallbackProjects, live: false };
  }
}

export default async function Home() {
  const { projects, live } = await getProjects();

  return (
    <>
      {/* Top Navigation */}
      <header className="site-nav">
        <div className="nav-container">
          <a href="#" className="nav-logo">
            <span className="nav-logo-badge">SA</span>
            <span>{profile.name}</span>
          </a>
          <nav>
            <ul className="nav-links">
              <li><a href="#about">About</a></li>
              <li><a href="#work">Projects</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#experience">Experience</a></li>
              <li><a href="#contact" className="nav-btn">Let's Talk</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero container">
        <div className="hero-grid">
          <div>
            <div className="status-pill">
              <span className="pulse-dot"></span>
              <span>{profile.status || 'Available for opportunities'}</span>
            </div>

            <h1 className="hero-title">
              Hi, I'm <span className="gradient-text">{profile.name}</span>
            </h1>

            <TypingRole />
            <p className="hero-intro">{profile.intro}</p>

            <div className="hero-actions">
              <a className="btn-primary" href="#contact">
                <span>Get in touch</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>

              {profile.cv && (
                <a className="btn-secondary" href={profile.cv} target="_blank" rel="noopener noreferrer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  <span>Download CV</span>
                </a>
              )}

              <div className="social-pills">
                {profile.github && (
                  <a className="social-pill" href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                    <span>GitHub</span>
                  </a>
                )}
                {profile.linkedin && (
                  <a className="social-pill" href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            </div>

            <div className="db-status">
              <span className={live ? 'db-dot active' : 'db-dot'}></span>
              <span>
                {live
                  ? 'Connected to NestJS API & PostgreSQL'
                  : 'Portfolio active • Showing saved project catalog'}
              </span>
            </div>
          </div>

          {/* Profile Picture Card */}
          <div className="hero-avatar-wrapper">
            <div className="avatar-ambient-glow"></div>
            <div className="avatar-card">
              <div className="avatar-image-container">
                <img
                  src={profile.avatar || '/avatar.svg'}
                  alt={profile.name}
                  className="avatar-image"
                />
              </div>
              <div className="avatar-badge-bottom">
                <div>
                  <div className="avatar-badge-text">{profile.name}</div>
                  <div className="avatar-badge-sub">{profile.location || 'Software Engineer'}</div>
                </div>
                <span className="avatar-badge-chip">&lt;/&gt; Full Stack</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container">
        {/* About Section */}
        <section className="section" id="about">
          <div className="section-header">
            <span className="section-tag">01. ABOUT ME</span>
            <h2 className="section-title">Background & Philosophy</h2>
          </div>
          <div className="about-grid">
            <div className="about-text">
              {profile.about.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
            <div className="highlight-box">
              <div className="stat-item">
                <h3>Full-Stack</h3>
                <p>Complete lifecycle from database schemas to polished React interfaces.</p>
              </div>
              <div className="stat-item">
                <h3>Clean Code</h3>
                <p>Maintainable, modular, and performant architectures that scale.</p>
              </div>
              <div className="stat-item">
                <h3>Reliable APIs</h3>
                <p>Robust NestJS microservices & REST endpoints backed by PostgreSQL.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="section" id="work">
          <div className="section-header">
            <span className="section-tag">02. FEATURED WORK</span>
            <h2 className="section-title">Recent Projects</h2>
            <p className="section-desc">
              Selected full-stack and web applications. {live ? 'Synced live from PostgreSQL.' : ''}
            </p>
          </div>

          <div className="projects-grid">
            {projects.map((p) => (
              <div className="project-card" key={p.title}>
                <div>
                  <div className="project-top">
                    <div className="project-folder-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                    </div>
                    <div className="project-links">
                      {p.liveUrl && (
                        <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link-btn" title="Live Preview">
                          <span>Live</span>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        </a>
                      )}
                      {p.repoUrl && (
                        <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className="project-link-btn" title="Source Code">
                          <span>Code</span>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="project-title">{p.title}</h3>
                  <p className="project-summary">{p.summary}</p>
                </div>

                <ul className="project-tags">
                  {p.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="section" id="skills">
          <div className="section-header">
            <span className="section-tag">03. EXPERTISE</span>
            <h2 className="section-title">Technical Skills</h2>
            <p className="section-desc">Technologies and tools I use to bring ideas to reality.</p>
          </div>

          <div className="skills-grid">
            {profile.skills.map((g) => (
              <div className="skill-category-card" key={g.group}>
                <h3 className="skill-category-title">
                  <span style={{ color: '#38bdf8' }}>◆</span>
                  <span>{g.group}</span>
                </h3>
                <div className="skill-pills">
                  {g.items.map((item) => (
                    <span className="skill-pill" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section className="section" id="experience">
          <div className="section-header">
            <span className="section-tag">04. EXPERIENCE</span>
            <h2 className="section-title">Career Timeline</h2>
            <p className="section-desc">My professional journey and track record of delivery.</p>
          </div>

          <div className="timeline">
            {profile.experience.map((e) => (
              <div className="timeline-item" key={e.period}>
                <div className="timeline-dot"></div>
                <span className="timeline-period">{e.period}</span>
                <h3 className="timeline-title">{e.title}</h3>
                <div className="timeline-org">{e.org}</div>
                <p className="timeline-note">{e.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="section" id="contact">
          <div className="section-header">
            <span className="section-tag">05. REACH OUT</span>
            <h2 className="section-title">Let's Build Something Together</h2>
          </div>

          <div className="contact-grid">
            <div className="contact-info-card">
              <div className="contact-info-text">
                <p>
                  Have an open role, an interesting project, or simply want to chat about engineering?
                  Send a message or reach out via direct email.
                </p>
                <div className="contact-method">
                  <div className="contact-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Email Address</div>
                    <a href={`mailto:${profile.email}`} style={{ fontWeight: 600, color: '#f8fafc' }}>
                      {profile.email}
                    </a>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="contact-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Location</div>
                    <div style={{ fontWeight: 600, color: '#f8fafc' }}>{profile.location || 'Dhaka, Bangladesh'}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-info-card">
              <ContactForm email={profile.email} />
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <p>© {new Date().getFullYear()} {profile.name} • Designed & Built with Next.js, NestJS & PostgreSQL.</p>
        </div>
      </footer>
    </>
  );
}
