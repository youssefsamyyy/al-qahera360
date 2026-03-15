(function () {
  const state = {
    language: 'en',
    isLiveOpen: false,
    quality: '1080p HD',
    qualityMenuOpen: false,
    tickerTime: ''
  };

  const QUALITIES = ['1080p HD', '720p', '480p', '360p', 'Auto'];

  const icon = (name, extra = '') => {
    const map = {
      search: '<svg class="lucide ' + extra + '" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>',
      menu: '<svg class="lucide ' + extra + '" viewBox="0 0 24 24"><path d="M4 12h16"></path><path d="M4 6h16"></path><path d="M4 18h16"></path></svg>',
      bell: '<svg class="lucide ' + extra + '" viewBox="0 0 24 24"><path d="M10.268 21a2 2 0 0 0 3.464 0"></path><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.674C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path></svg>',
      globe: '<svg class="lucide ' + extra + '" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20"></path><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>',
      play: '<svg class="lucide ' + extra + '" viewBox="0 0 24 24"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>',
      calendar: '<svg class="lucide ' + extra + '" viewBox="0 0 24 24"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>',
      zap: '<svg class="lucide ' + extra + '" viewBox="0 0 24 24"><path d="M4 14a1 1 0 0 1-.78-1.63l8-10A1 1 0 0 1 13 3v6h7a1 1 0 0 1 .78 1.63l-8 10A1 1 0 0 1 11 20v-6z"></path></svg>',
      sparkles: '<svg class="lucide ' + extra + '" viewBox="0 0 24 24"><path d="m12 3-1.9 5.1L5 10l5.1 1.9L12 17l1.9-5.1L19 10l-5.1-1.9L12 3z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path></svg>',
      x: '<svg class="lucide ' + extra + '" viewBox="0 0 24 24"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>',
      users: '<svg class="lucide ' + extra + '" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
      share: '<svg class="lucide ' + extra + '" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><path d="m8.59 13.51 6.83 3.98"></path><path d="m15.41 6.51-6.82 3.98"></path></svg>',
      settings: '<svg class="lucide ' + extra + '" viewBox="0 0 24 24"><path d="M12.22 2h-.44a2 2 0 0 0-2 1.82l-.15 1.34a8 8 0 0 0-1.9.79l-1.06-.67a2 2 0 0 0-2.51.24l-.31.31a2 2 0 0 0-.24 2.51l.67 1.06a8 8 0 0 0-.79 1.9l-1.34.15a2 2 0 0 0-1.82 2v.44a2 2 0 0 0 1.82 2l1.34.15a8 8 0 0 0 .79 1.9l-.67 1.06a2 2 0 0 0 .24 2.51l.31.31a2 2 0 0 0 2.51.24l1.06-.67a8 8 0 0 0 1.9.79l.15 1.34a2 2 0 0 0 2 1.82h.44a2 2 0 0 0 2-1.82l.15-1.34a8 8 0 0 0 1.9-.79l1.06.67a2 2 0 0 0 2.51-.24l.31-.31a2 2 0 0 0 .24-2.51l-.67-1.06a8 8 0 0 0 .79-1.9l1.34-.15a2 2 0 0 0 1.82-2v-.44a2 2 0 0 0-1.82-2l-1.34-.15a8 8 0 0 0-.79-1.9l.67-1.06a2 2 0 0 0-.24-2.51l-.31-.31a2 2 0 0 0-2.51-.24l-1.06.67a8 8 0 0 0-1.9-.79l-.15-1.34A2 2 0 0 0 12.22 2z"></path><circle cx="12" cy="12" r="3"></circle></svg>',
      check: '<svg class="lucide ' + extra + '" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"></path></svg>',
      facebook: '<svg class="lucide ' + extra + '" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>',
      twitter: '<svg class="lucide ' + extra + '" viewBox="0 0 24 24"><path d="M22 4s-.7 2.1-2 3.4c.3 6.7-4.6 11.6-11.3 11.6-2.3 0-4.5-.7-6.4-2 2.2.2 4.2-.5 5.8-1.9-1.9 0-3.5-1.3-4-3 1.2.2 2.2.1 3.2-.1-2-.4-3.5-2.2-3.5-4.3.6.3 1.3.5 2 .5-1.9-1.3-2.5-3.8-1.4-5.8 2.2 2.7 5.6 4.4 9.4 4.6-.7-3 1.6-5.8 4.7-5.8 1.4 0 2.7.6 3.6 1.6 1.1-.2 2.2-.6 3.1-1.2-.4 1.1-1.1 2-2.1 2.6 1-.1 2-.4 2.9-.8-.7 1-1.5 1.8-2.5 2.4"></path></svg>',
      instagram: '<svg class="lucide ' + extra + '" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>',
      youtube: '<svg class="lucide ' + extra + '" viewBox="0 0 24 24"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.56 49.56 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>'
    };
    return map[name] || '';
  };

  const t = (key) => (window.I18N.translations[state.language] || {})[key] || key;
  const isRtl = () => state.language === 'ar';

  const tickerTimeString = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const dataStream = () => Array.from({ length: 100 }, () => Math.random().toString(16).substring(2)).join(' ');

  const aiSummary = () => window.AI_SUMMARY[state.language];

  const cardClass = (idx) => {
    if (idx === 0) return 'content-card brutal-border card-large';
    if (idx === 3) return 'content-card brutal-border card-wide';
    return 'content-card brutal-border card-normal';
  };

  const createCard = (item, idx) => `
    <article class="${cardClass(idx)} fade-in">
      <img src="${item.thumbnail}" alt="${escapeHtml(item.title)}" referrerpolicy="no-referrer" />
      <div class="card-scanlines"></div>
      <div class="card-overlay"></div>
      <div class="card-top">
        ${item.isLive ? `<div class="live-badge skew-container animate-pulse-red"><span class="dot unskew-content"></span><span class="unskew-content">Live</span></div>` : ''}
        <div class="card-tags">
          <span class="card-tag primary glass">${escapeHtml(item.category)}</span>
          <span class="card-tag secondary glass">4K_HDR</span>
        </div>
      </div>
      <div class="card-body">
        <div class="card-time">
          <span class="gold">[${escapeHtml(item.timestamp)}]</span>
          ${item.duration ? `<span>•</span><span>${escapeHtml(item.duration)}</span>` : ''}
        </div>
        <h3 class="card-title">${escapeHtml(item.title)}</h3>
        ${idx === 0 ? `<p class="card-desc">${escapeHtml(item.description)}</p>` : ''}
        <div class="row-bottom">
          <div class="watch-cta">
            <span class="watch-icon">${icon('play')}</span>
            <span>${escapeHtml(t('hero.watch'))}</span>
          </div>
          <div class="card-id">ID: ${escapeHtml(item.id.toUpperCase())}</div>
        </div>
      </div>
    </article>
  `;

  const createRow = (title, items) => `
    <section class="row-section container">
      <div class="row-top">
        <div class="row-title-wrap">
          <span class="row-bg-word">Feed</span>
          <h2 class="row-title">${escapeHtml(title)}</h2>
          <div class="row-meta">
            <div class="row-line" style="max-width:64px;flex:none;"></div>
            <span class="row-node">Media_Library_Node_0${Math.floor(Math.random() * 9) + 1}</span>
          </div>
        </div>
        <a href="#" class="view-all">
          <span>${escapeHtml(t('row.viewAll'))}</span>
          <span class="view-line"></span>
        </a>
      </div>
      <div class="bento-grid">
        ${items.slice(0, 6).map(createCard).join('')}
      </div>
    </section>
  `;

  const createHero = () => {
    const item = window.APP_DATA.FEATURED_NEWS;
    const titleParts = item.title.split(' ');
    const first = titleParts.slice(0, 2).join(' ');
    const rest = titleParts.slice(2).join(' ');
    return `
      <section class="hero">
        <div class="hero-content fade-in">
          <div class="hero-topline">
            <div class="hero-tag skew-container">
              <span class="dot unskew-content"></span>
              <span class="unskew-content">${escapeHtml(t('common.breaking'))}</span>
            </div>
            <div class="row-line" style="max-width:48px;flex:none;"></div>
            <span class="hero-featured">${escapeHtml(t('hero.featured'))}</span>
          </div>
          <div class="hero-title-wrap">
            <span class="hero-number">01</span>
            <h1 class="hero-title">${escapeHtml(first)}<span class="hero-title-accent">${escapeHtml(rest)}</span></h1>
          </div>
          <p class="hero-desc">${escapeHtml(item.description)}</p>
          <div class="hero-actions">
            <button class="btn-primary" type="button">
              ${icon('play')} ${escapeHtml(t('hero.watch'))}
            </button>
            <button class="btn-secondary" type="button">${escapeHtml(t('hero.info'))}</button>
          </div>
          <div class="hero-meta-rail">
            <div>
              <div class="label">Signal Strength</div>
              <div class="signal-bars"><span class="active"></span><span class="active"></span><span class="active"></span><span class="active"></span><span></span></div>
            </div>
            <div style="width:1px;height:48px;background:rgba(255,255,255,0.1);"></div>
            <div>
              <div class="label">Frequency</div>
              <div class="mono-small" style="color:var(--color-brand-red);margin-top:6px;">142.85 MHz</div>
            </div>
          </div>
        </div>
        <div class="hero-media">
          <div class="hero-image-wrap">
            <img class="hero-image" src="${item.thumbnail}" alt="${escapeHtml(item.title)}" referrerpolicy="no-referrer" />
            <div class="hero-overlay-1"></div>
            <div class="hero-overlay-2"></div>
            <div class="hero-overlay-3"></div>
            <div class="hero-scanlines"></div>
          </div>
          <div class="hero-float-info">
            <div class="glass" style="padding:10px 16px;border-right:2px solid var(--color-brand-red);">Live Feed: Cairo_HQ</div>
            <div class="vertical-text" style="height:160px;padding-right:16px;border-right:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.3);font-size:8px;letter-spacing:0.4em;text-transform:uppercase;font-family:var(--font-mono);">ENCRYPTED_SATELLITE_LINK_72</div>
          </div>
          <div class="hero-bottom-card">
            <div class="hero-card glass brutal-border">
              <div class="hero-card-title">${icon('calendar', 'text-glow-gold')} <span>Broadcast Date</span></div>
              <div class="hero-card-date">22 Feb 2026</div>
              <div class="hero-card-grid">
                <div>
                  <div class="label">${escapeHtml(t('common.duration'))}</div>
                  <div style="margin-top:8px;font-size:22px;font-family:var(--font-mono);font-weight:700;color:var(--color-brand-gold);">42:15</div>
                </div>
                <div style="text-align:${isRtl() ? 'left' : 'right'};">
                  <div class="label">Quality</div>
                  <div style="margin-top:8px;font-size:22px;font-family:var(--font-mono);font-weight:700;">4K HDR</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  };

  const createNavbar = () => `
   <nav class="navbar ${window.scrollY > 50 ? 'scrolled' : ''}" id="navbar">
  <div class="container navbar-inner">
    <div class="navbar-left">
      <div>
        <a href="#hero" aria-label="${escapeHtml(t('nav.home'))}">
          <img
            class="logo-img"
            src="https://alqaheranews.net/_next/static/media/logo.6a2665e0.png"
            alt="Al Qahera News"
            referrerpolicy="no-referrer"
          />
        </a>
      </div>

      <div class="nav-links">
        <a href="#hero" class="nav-link">${escapeHtml(t('nav.home'))}</a>

        <a
          href="https://www.youtube.com/live/a5pDsG9ZOro?si=tFR4tQ5UbFIb-N5_"
          class="nav-live"
          id="navLiveBtn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="nav-live-dot"></span>
          ${escapeHtml(t('nav.live'))}
        </a>

        <a href="#programs" class="nav-link">${escapeHtml(t('nav.programs'))}</a>
        <a href="#docs" class="nav-link">${escapeHtml(t('nav.docs'))}</a>
      </div>
    </div>

    <div class="navbar-right">
      <div class="search-box glass">
        ${icon('search')}
        <input type="text" placeholder="${escapeHtml(t('nav.search'))}" />
      </div>

      <button class="lang-btn skew-container" type="button" id="langToggleBtn">
        <span class="unskew-content">${icon('globe')}</span>
        <span class="unskew-content">${state.language === 'en' ? 'العربية' : 'English'}</span>
      </button>

      <button class="icon-btn" type="button">
        ${icon('bell')}
        <span class="notif-dot"></span>
      </button>

      <button class="menu-btn" type="button">
        ${icon('menu')}
      </button>
    </div>
  </div>
</nav>
  `;

  const createAiCard = () => {
    const ai = aiSummary();
    return `
      <section class="ai-section container">
        <div class="ai-wrap brutal-border">
          <div class="ai-data-stream"><div class="ai-stream-text">${escapeHtml(dataStream())}</div></div>
          <div class="ai-bg-orb-1"></div>
          <div class="ai-bg-orb-2"></div>
          <div class="ai-inner glass">
            <div class="ai-top">
              <div class="ai-header">
                <div class="ai-icon skew-container"><div class="unskew-content">${icon('zap')}</div></div>
                <div>
                  <h3 class="ai-title">${escapeHtml(t('ai.title'))}</h3>
                  <div class="ai-power">
                    <span class="ai-powered">${escapeHtml(t('ai.powered'))}</span>
                    <span>•</span>
                    <span style="color:rgba(255,255,255,0.3);font-family:var(--font-mono);">Neural_Link_Active</span>
                  </div>
                </div>
              </div>
              <div class="ai-status">
                <div>
                  <div class="mini-label" style="color:rgba(255,255,255,0.2);margin-bottom:8px;">Processing Load</div>
                  <div class="load-bars"><span class="active"></span><span class="active"></span><span class="active"></span><span class="active"></span><span class="active"></span><span class="active"></span><span></span><span></span></div>
                </div>
                <div style="width:1px;height:48px;background:rgba(255,255,255,0.1);"></div>
                <div class="mono-small" style="color:rgba(255,255,255,0.3);line-height:1.7;letter-spacing:0.3em;">
                  Intelligence Node: 0x7F2A<br><span style="color:rgba(197,160,89,0.5);">Status: Optimized</span>
                </div>
              </div>
            </div>
            <div class="ai-content fade-in">
              <div>
                <div class="ai-kicker-row">
                  <div class="ai-kicker skew-container"><span class="unskew-content">${escapeHtml(t('common.briefing'))}</span></div>
                  <div class="ai-line"></div>
                </div>
                <h4 class="ai-headline">${escapeHtml(ai.headline)}</h4>
                <p class="ai-summary">${escapeHtml(ai.summary)}</p>
                <div class="ai-meta-row">
                  <div>
                    <div class="mini-label" style="color:rgba(255,255,255,0.3);margin-bottom:10px;">${escapeHtml(t('ai.sentiment'))}</div>
                    <div class="sentiment-box ${ai.sentiment === 'positive' ? 'sentiment-positive' : ai.sentiment === 'negative' ? 'sentiment-negative' : ''}">${escapeHtml(ai.sentiment)}</div>
                  </div>
                  <div>
                    <div class="mini-label" style="color:rgba(255,255,255,0.3);margin-bottom:10px;">Confidence</div>
                    <div style="display:flex;align-items:center;gap:10px;">
                      <div class="confidence-bar"><div class="confidence-fill"></div></div>
                      <span class="mono-small" style="color:var(--color-brand-red);">94%</span>
                    </div>
                  </div>
                </div>
              </div>
              <aside class="ai-side brutal-border">
                <div class="insight-tag skew-container"><span class="unskew-content">${escapeHtml(t('common.insights'))}</span></div>
                <h5 class="ai-side-title">${escapeHtml(t('ai.takeaways'))}</h5>
                <ol class="insights-list">
                  ${ai.bulletPoints.map((point, index) => `<li class="insight-item"><span class="insight-num">0${index + 1}</span><span class="insight-text">${escapeHtml(point)}</span></li>`).join('')}
                </ol>
                <div style="margin-top:28px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.06);display:flex;justify-content:space-between;align-items:center;gap:16px;">
                  <span class="mono-small" style="color:rgba(255,255,255,0.14);">Analysis_Complete_v2.4</span>
                  <div style="display:flex;gap:4px;"><span class="dot" style="width:4px;height:4px;background:rgba(197,160,89,0.4);"></span><span class="dot" style="width:4px;height:4px;background:rgba(197,160,89,0.4);"></span><span class="dot" style="width:4px;height:4px;background:rgba(197,160,89,0.4);"></span></div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    `;
  };

  const createBanner = () => `
    <section class="banner-section container">
      <div class="banner-card brutal-border" id="bannerLiveBtn">
        <img class="banner-image" src="https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=1920&h=1080" alt="Live Broadcast" referrerpolicy="no-referrer" />
        <div class="banner-overlay-1"></div>
        <div class="banner-overlay-2"></div>
        <div class="banner-top">
          <div class="banner-pill skew-container animate-pulse-red"><span class="dot unskew-content"></span><span class="unskew-content">${escapeHtml(t('live.now'))}</span></div>
          <div style="display:flex;flex-direction:column;align-items:end;gap:6px;">
            <span style="font-size:10px;font-family:var(--font-mono);color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.35em;">Broadcast Node: CAI_S_01</span>
            <div style="width:120px;height:1px;background:rgba(255,255,255,0.1);"></div>
            <span style="font-size:10px;font-family:var(--font-mono);color:var(--color-brand-gold);text-transform:uppercase;">UPLINK_STABLE_98%</span>
          </div>
        </div>
        <div class="banner-main">
          <div class="row-header"><div class="row-line" style="max-width:64px;flex:none;background:var(--color-brand-gold);"></div><span style="font-size:10px;color:var(--color-brand-gold);letter-spacing:0.45em;text-transform:uppercase;font-weight:900;">Global Network Coverage</span></div>
          <h2>${escapeHtml(t('banner.title'))}</h2>
          <p>${escapeHtml(t('banner.desc'))}</p>
          <button type="button" class="banner-btn"><span class="banner-btn-circle">${icon('play')}</span><span>${escapeHtml(t('banner.button'))}</span></button>
        </div>
        <div class="banner-scanlines"></div>
      </div>
    </section>
  `;

  const createFooter = () => `
    <footer class="footer">
      <div class="footer-glow"></div>
      <div class="container">
        <div class="footer-grid">
          <div class="footer-about">
            <img class="logo-img" src="https://alqaheranews.net/_next/static/media/logo.6a2665e0.png" alt="Al Qahera News" referrerpolicy="no-referrer" />
            <p>${escapeHtml(t('footer.desc'))}</p>
            <div class="footer-social">
              <a href="#">${icon('facebook')}</a>
              <a href="#">${icon('twitter')}</a>
              <a href="#">${icon('instagram')}</a>
              <a href="#">${icon('youtube')}</a>
            </div>
          </div>
          <div class="footer-col">
            <h4>${escapeHtml(t('footer.categories'))}</h4>
            <ul>
              <li><a href="#">${escapeHtml(t('nav.news'))}</a></li>
              <li><a href="#">${escapeHtml(t('nav.programs'))}</a></li>
              <li><a href="#">${escapeHtml(t('nav.docs'))}</a></li>
              <li><a href="#">Sports</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>${escapeHtml(t('footer.company'))}</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div class="newsletter-box brutal-border">
            <h4>${escapeHtml(t('footer.newsletter'))}</h4>
            <p>Stay updated with the latest news delivered to your inbox.</p>
            <div class="newsletter-form">
              <input class="newsletter-input" type="email" placeholder="Email address" />
              <button class="newsletter-btn" type="button">${escapeHtml(t('footer.join'))}</button>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <div class="footer-links">
            <p class="footer-copy" style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.25em;">${escapeHtml(t('footer.rights'))}</p>
            <div class="footer-mini-links">
              <a href="#">Terms</a>
              <a href="#">Privacy</a>
              <a href="#">Cookies</a>
            </div>
          </div>
          <div class="status-wrap">
            <div class="status-text" style="font-size:10px;font-family:var(--font-mono);">${escapeHtml(t('common.status'))}: ${escapeHtml(t('common.online'))}</div>
            <span class="status-dot"></span>
          </div>
        </div>
      </div>
    </footer>
  `;

  const createTicker = () => {
    const nowHour = new Date().getHours().toString().padStart(2, '0');
    const items = [...window.APP_DATA.URGENT_NEWS, ...window.APP_DATA.URGENT_NEWS]
      .map((news, i) => `
        <div class="ticker-item">
          <span class="ticker-time">[${nowHour}:${String((i % 5) * 10).padStart(2, '0')}]</span>
          <span class="ticker-text">${escapeHtml(news)}</span>
          <span class="ticker-sep"></span>
        </div>
      `).join('');

    return `
      <div class="ticker">
        <div class="ticker-label skew-container"><div class="unskew-content">${icon('zap')}</div><div class="unskew-content" style="font-size:11px;font-weight:900;letter-spacing:0.2em;text-transform:uppercase;">${escapeHtml(t('ticker.urgent'))}</div></div>
        <div class="ticker-track-wrap"><div class="ticker-track">${items}</div></div>
        <div class="ticker-clock skew-container"><div class="unskew-content"><div style="display:flex;flex-direction:column;align-items:end;line-height:1;gap:3px;"><span style="font-size:8px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.2em;">Live Feed</span><span id="tickerClockText" style="font-size:10px;font-family:var(--font-mono);color:var(--color-brand-red);">${escapeHtml(state.tickerTime)}</span></div></div></div>
      </div>
    `;
  };

  const createLiveModal = () => {
    const comments = Array.from({ length: 10 }).map((_, i) => {
      const id = i + 1;
      const text = id % 3 === 0
        ? 'The geopolitical implications of this move are significant for the entire region.'
        : id % 3 === 1
          ? 'Excellent reporting from the ground in Cairo. Stay safe!'
          : 'Waiting for the official statement from the Ministry of Foreign Affairs.';
      return `
        <div class="chat-item fade-in">
          <div class="chat-avatar brutal-border">${id}</div>
          <div style="flex:1;min-width:0;">
            <div style="display:flex;justify-content:space-between;gap:12px;align-items:center;">
              <span class="chat-node">User_Node_${id}</span>
              <span class="chat-time">14:2${id}</span>
            </div>
            <p>${escapeHtml(text)}</p>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="live-modal ${state.isLiveOpen ? 'open' : ''}" id="liveModal">
        <div class="live-main">
          <div class="live-header">
            <div class="live-top-left">
              <div class="hero-tag skew-container animate-pulse-red"><span class="dot unskew-content"></span><span class="unskew-content">${escapeHtml(t('live.now'))}</span></div>
              <div style="display:flex;flex-direction:column;gap:2px;">
                <h2 style="margin:0;font-size:28px;letter-spacing:-0.04em;text-transform:uppercase;font-style:italic;font-weight:900;">${escapeHtml(t('live.title'))}</h2>
                <span style="font-size:8px;letter-spacing:0.45em;color:rgba(255,255,255,0.3);text-transform:uppercase;font-weight:700;">Satellite Feed: CAI-72</span>
              </div>
            </div>
            <div class="live-top-right">
              <button class="icon-btn" type="button">${icon('share')}</button>
              <button class="icon-btn" id="closeLiveBtn" type="button" style="background:var(--color-brand-red);">${icon('x')}</button>
            </div>
          </div>
          <div class="live-video-shell">
            <div class="live-frame brutal-border">
              <iframe src="https://www.youtube.com/embed/LIgiitquE-8?autoplay=1&mute=0&rel=0&modestbranding=1&showinfo=0" title="Al Qahera News Live" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              <div class="live-scanlines"></div>
            </div>
          </div>
          <div class="live-bottom">
            <div class="live-bottom-grid">
              <div class="live-copy">
                <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;font-size:10px;font-weight:900;letter-spacing:0.25em;text-transform:uppercase;">
                  <span style="color:var(--color-brand-red);padding:6px 10px;border:1px solid rgba(227,30,36,0.3);">${escapeHtml(t('common.breaking'))}</span>
                  <div class="row-line" style="max-width:48px;flex:none;"></div>
                  <span style="font-family:var(--font-mono);color:rgba(255,255,255,0.4);">LAT: 30.0444° N | LONG: 31.2357° E</span>
                </div>
                <h3>Continuous Coverage: Regional Developments &amp; Strategic Analysis</h3>
                <div style="display:flex;align-items:center;gap:24px;flex-wrap:wrap;margin-top:18px;font-size:10px;font-weight:900;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.4);">
                  <span style="display:flex;align-items:center;gap:8px;">${icon('users')} <span style="color:white;">14,284</span> ${escapeHtml(t('live.watching'))}</span>
                  <div class="quality-menu-wrap">
                    <button class="quality-btn" id="qualityBtn" type="button">${icon('settings')} <span style="margin-inline-start:8px;">${escapeHtml(state.quality)}</span></button>
                    <div class="quality-menu glass brutal-border ${state.qualityMenuOpen ? 'open' : ''}" id="qualityMenu">
                      ${QUALITIES.map(q => `<button class="quality-item ${state.quality === q ? 'active' : ''}" data-quality="${escapeHtml(q)}" type="button"><span>${escapeHtml(q)}</span>${state.quality === q ? icon('check') : ''}</button>`).join('')}
                    </div>
                  </div>
                </div>
              </div>
              <div><button class="live-subscribe" type="button">${escapeHtml(t('live.subscribe'))}</button></div>
            </div>
          </div>
        </div>
        <aside class="live-side">
          <div class="live-side-head">
            <div style="display:flex;align-items:center;gap:10px;"><span class="dot"></span><h4 style="margin:0;font-size:12px;font-weight:900;letter-spacing:0.3em;text-transform:uppercase;">${escapeHtml(t('live.interaction'))}</h4></div>
            <span class="chat-time">ENCRYPTED_FEED</span>
          </div>
          <div class="live-side-body no-scrollbar">${comments}</div>
          <div class="live-side-foot">
            <div class="live-chat-box">
              <input class="live-chat-input" type="text" placeholder="${escapeHtml(t('live.placeholder'))}" />
              <button class="live-send" type="button">${escapeHtml(t('live.send'))}</button>
            </div>
          </div>
        </aside>
      </div>
    `;
  };

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function attachEvents() {
    const langToggleBtn = document.getElementById('langToggleBtn');
    const navLiveBtn = document.getElementById('navLiveBtn');
    const bannerLiveBtn = document.getElementById('bannerLiveBtn');
    const closeLiveBtn = document.getElementById('closeLiveBtn');
    const qualityBtn = document.getElementById('qualityBtn');
    const qualityMenu = document.getElementById('qualityMenu');

    if (langToggleBtn) {
      langToggleBtn.addEventListener('click', () => {
        state.language = state.language === 'en' ? 'ar' : 'en';
        render();
      });
    }

    [navLiveBtn, bannerLiveBtn].forEach((el) => {
      if (el) {
        el.addEventListener('click', () => {
          state.isLiveOpen = true;
          render();
        });
      }
    });

    if (closeLiveBtn) {
      closeLiveBtn.addEventListener('click', () => {
        state.isLiveOpen = false;
        state.qualityMenuOpen = false;
        render();
      });
    }

    if (qualityBtn) {
      qualityBtn.addEventListener('click', () => {
        state.qualityMenuOpen = !state.qualityMenuOpen;
        render();
      });
    }

    if (qualityMenu) {
      qualityMenu.querySelectorAll('[data-quality]').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          state.quality = e.currentTarget.getAttribute('data-quality');
          state.qualityMenuOpen = false;
          render();
        });
      });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  function handleScroll() {
    const nav = document.getElementById('navbar');
    if (!nav) return;
    if (window.scrollY > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }

  function render() {
    document.body.setAttribute('dir', isRtl() ? 'rtl' : 'ltr');
    document.documentElement.lang = state.language;
    state.tickerTime = tickerTimeString();

    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="app-shell">
        ${createNavbar()}
        <main>
          ${createHero()}
          <div class="section-stack">
            ${createAiCard()}
            ${createRow(t('row.latest'), window.APP_DATA.LATEST_NEWS)}
            ${createRow(t('row.docs'), window.APP_DATA.DOCUMENTARIES)}
            ${createBanner()}
            ${createRow(t('row.programs'), [...window.APP_DATA.LATEST_NEWS].reverse())}
            ${createRow(t('row.trending'), [...window.APP_DATA.DOCUMENTARIES].reverse())}
          </div>
        </main>
        ${createFooter()}
        ${createTicker()}
        ${createLiveModal()}
      </div>
    `;

    attachEvents();
    handleScroll();
  }

  render();
  setInterval(() => {
    const clock = document.getElementById('tickerClockText');
    if (clock) clock.textContent = tickerTimeString();
  }, 1000);
})();
