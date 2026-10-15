/**
 * ADRA — COMPLETE VANILLA JAVASCRIPT APPLICATION ARCHITECTURE
 * ============================================================================
 */

(function () {
  'use strict';

  const { brand, divisions, navigation, universeSection, showcaseSection, about, visionMissionGoals, contact, thankYou, footer } = window.SITE_CONTENT;

  // Global State
  let currentView = 'home'; // 'home' | 'division-details' | 'thank-you'
  let activeDivisionIndex = 0;
  let activeStartupIndex = 0;
  let savedHomeScrollY = 0;

  // Orbit State
  let orbitAngle = 18;
  let isOrbitManuallyPaused = false;
  let isOrbitHovered = false;
  let lastOrbitTime = null;
  const orbitPeriodSec = 96;
  const radiusX = 365;
  const radiusY = 252;

  // Showcase State
  let isShowcasePaused = false;
  let showcaseTimer = null;
  const showcaseIntervalMs = 4000;

  // Modal State
  let activeModalDivision = null;
  let activeModalStartup = null;
  let lastFocusedElement = null;

  // Registry / Submissions
  function getStoredInquiries() {
    try {
      const raw = localStorage.getItem('adra_inquiries');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function saveInquiry(record) {
    try {
      const items = getStoredInquiries();
      items.unshift(record);
      localStorage.setItem('adra_inquiries', JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save inquiry to localStorage', e);
    }
  }

  function updateRegistryCount() {
    const count = getStoredInquiries().length;
    const btn = document.getElementById('btn-registry-count');
    if (btn) btn.textContent = `Registry (${count})`;
  }

  // ---------------------------------------------------------------------------
  // 1. RENDER HERO & AMBIENT LIGHT
  // ---------------------------------------------------------------------------
  function initHero() {
    const heroCharsContainer = document.getElementById('hero-wordmark-chars');
    if (heroCharsContainer) {
      heroCharsContainer.innerHTML = brand.name
        .split('')
        .map((char) => `<span class="hero-wordmark-char">${char}</span>`)
        .join('');
    }

    const heroSection = document.getElementById('hero');
    const ambientLight = document.getElementById('hero-ambient-light');
    if (heroSection && ambientLight) {
      heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const normX = (e.clientX - rect.left) / rect.width - 0.5;
        const normY = (e.clientY - rect.top) / rect.height - 0.5;
        ambientLight.style.transform = `translate(calc(-50% + ${normX * 26}px), calc(-50% + ${normY * 26}px))`;
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 2. RENDER & RUN ORBITAL UNIVERSE
  // ---------------------------------------------------------------------------
  function initOrbit() {
    const toolbarPills = document.getElementById('orbit-toolbar-pills');
    if (toolbarPills) {
      toolbarPills.innerHTML = divisions
        .map(
          (div, idx) => `
          <button type="button" class="orbit-pill ${idx === activeDivisionIndex ? 'is-active' : ''}" data-division-index="${idx}">
            <span class="orbit-pill__dot" style="background-color: ${div.accentColor}"></span>
            <span>${div.romanIndex}. ${div.name}</span>
          </button>
        `
        )
        .join('');

      toolbarPills.querySelectorAll('.orbit-pill').forEach((btn) => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.divisionIndex, 10);
          selectDivision(idx);
          scrollToSection('showcase');
        });
      });
    }

    const pauseToggleBtn = document.getElementById('btn-orbit-pause-toggle');
    if (pauseToggleBtn) {
      pauseToggleBtn.addEventListener('click', () => {
        isOrbitManuallyPaused = !isOrbitManuallyPaused;
        pauseToggleBtn.textContent = isOrbitManuallyPaused ? '▶ Resume Orbit' : '❚❚ Pause Orbit';
      });
    }

    // Render 4 Desktop Division Cards
    const cardsContainer = document.getElementById('orbit-cards-container');
    if (cardsContainer) {
      cardsContainer.innerHTML = divisions
        .map(
          (div, idx) => `
          <div class="orbit-node-wrapper" id="orbit-node-${idx}">
            <div class="orbit-division-card" data-division-index="${idx}" style="--division-accent: ${div.accentColor}" tabindex="0">
              <div class="orbit-division-card__top">
                <span class="orbit-division-card__code">${div.code} · ${div.romanIndex}</span>
                <span class="orbit-division-card__count">${div.startups.length} Startups</span>
              </div>
              <div class="orbit-division-card__title-row">
                ${window.renderEmblemHTML(div, 'sm')}
                <div>
                  <h3 class="orbit-division-card__name">${div.name}</h3>
                  <div style="font-size: 0.7rem; color: ${div.accentColor}">${div.subtitle}</div>
                </div>
              </div>
              <p class="orbit-division-card__desc">${div.shortDescription}</p>
              <div style="display:flex; justify-content:space-between; align-items:center; padding-top:0.65rem; border-top:1px solid var(--border-dark-hairline);">
                <span class="orbit-division-card__cta">
                  <span>Inspect Showcase</span>
                  <span style="color: ${div.accentColor}">→</span>
                </span>
                <button type="button" class="btn-dossier-quick" data-division-index="${idx}" style="font-size:0.66rem; letter-spacing:0.12em; text-transform:uppercase; color:var(--color-secondary-text); text-decoration:underline;">
                  Full Dossier
                </button>
              </div>
            </div>
          </div>
        `
        )
        .join('');

      cardsContainer.querySelectorAll('.orbit-division-card').forEach((card) => {
        const idx = parseInt(card.dataset.divisionIndex, 10);
        card.addEventListener('mouseenter', () => { isOrbitHovered = true; highlightDivisionNode(idx); });
        card.addEventListener('mouseleave', () => { isOrbitHovered = false; });
        card.addEventListener('focus', () => { isOrbitHovered = true; highlightDivisionNode(idx); });
        card.addEventListener('blur', () => { isOrbitHovered = false; });
        card.addEventListener('click', (e) => {
          if (e.target.closest('.btn-dossier-quick')) return;
          selectDivision(idx);
          scrollToSection('showcase');
        });
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            selectDivision(idx);
            scrollToSection('showcase');
          }
        });
      });

      cardsContainer.querySelectorAll('.btn-dossier-quick').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const idx = parseInt(btn.dataset.divisionIndex, 10);
          openDivisionDetails(idx);
        });
      });
    }

    // Render Mobile Grid
    const mobileGrid = document.getElementById('orbit-mobile-grid');
    if (mobileGrid) {
      mobileGrid.innerHTML = divisions
        .map(
          (div, idx) => `
          <div class="orbit-division-card" data-division-index="${idx}" style="--division-accent: ${div.accentColor}" tabindex="0">
            <div class="orbit-division-card__top">
              <span class="orbit-division-card__code">${div.code} · ${div.romanIndex}</span>
              <span class="orbit-division-card__count">${div.startups.length} Startups</span>
            </div>
            <div class="orbit-division-card__title-row">
              ${window.renderEmblemHTML(div, 'sm')}
              <div>
                <h3 class="orbit-division-card__name">${div.name}</h3>
                <div style="font-size: 0.72rem; color: ${div.accentColor}">${div.subtitle}</div>
              </div>
            </div>
            <p class="orbit-division-card__desc">${div.shortDescription}</p>
            <div style="display:flex; justify-content:space-between; align-items:center; padding-top:0.65rem; border-top:1px solid var(--border-dark-hairline);">
              <span class="orbit-division-card__cta">
                <span>Showcase</span>
                <span style="color: ${div.accentColor}">→</span>
              </span>
              <button type="button" class="btn-dossier-mobile" data-division-index="${idx}" style="font-size:0.68rem; letter-spacing:0.12em; text-transform:uppercase; color:${div.accentColor}; text-decoration:underline;">
                Dossier
              </button>
            </div>
          </div>
        `
        )
        .join('');

      mobileGrid.querySelectorAll('.orbit-division-card').forEach((card) => {
        const idx = parseInt(card.dataset.divisionIndex, 10);
        card.addEventListener('click', (e) => {
          if (e.target.closest('.btn-dossier-mobile')) return;
          selectDivision(idx);
          scrollToSection('showcase');
        });
      });

      mobileGrid.querySelectorAll('.btn-dossier-mobile').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const idx = parseInt(btn.dataset.divisionIndex, 10);
          openDivisionDetails(idx);
        });
      });
    }

    requestAnimationFrame(orbitAnimationLoop);
  }

  function highlightDivisionNode(idx) {
    document.querySelectorAll('.orbit-division-card').forEach((c) => c.classList.remove('is-highlighted'));
    const target = document.querySelector(`.orbit-division-card[data-division-index="${idx}"]`);
    if (target) target.classList.add('is-highlighted');

    const hubCode = document.getElementById('orbit-hub-division-code');
    if (hubCode && divisions[idx]) {
      hubCode.textContent = divisions[idx].code;
      hubCode.style.color = divisions[idx].accentColor;
    }
  }

  function orbitAnimationLoop(now) {
    if (!lastOrbitTime) lastOrbitTime = now;
    const dt = (now - lastOrbitTime) / 1000;
    lastOrbitTime = now;

    if (!isOrbitManuallyPaused && !isOrbitHovered) {
      const degreesPerSec = 360 / orbitPeriodSec;
      orbitAngle = (orbitAngle + dt * degreesPerSec) % 360;
    }

    const tethersLayer = document.getElementById('orbit-dynamic-tethers');
    let tethersSVG = '';

    divisions.forEach((div, idx) => {
      const thetaRad = ((orbitAngle + div.orbitAngleDeg) * Math.PI) / 180;
      const x = Math.cos(thetaRad) * radiusX;
      const y = Math.sin(thetaRad) * radiusY;

      const nodeWrapper = document.getElementById(`orbit-node-${idx}`);
      if (nodeWrapper) {
        nodeWrapper.style.transform = `translate(calc(-50% + ${x.toFixed(2)}px), calc(-50% + ${y.toFixed(2)}px))`;
      }

      const isCurrent = idx === activeDivisionIndex;
      tethersSVG += `
        <line x1="0" y1="0" x2="${x}" y2="${y}" stroke="${isCurrent ? div.accentColor : 'rgba(237,235,227,0.12)'}" stroke-width="${isCurrent ? '1.6' : '1'}" ${isCurrent ? '' : 'stroke-dasharray="3 5"'} />
        <circle cx="${x * 0.42}" cy="${y * 0.42}" r="${isCurrent ? 3.5 : 2}" fill="${isCurrent ? div.accentColor : 'rgba(199,181,138,0.35)'}" />
      `;
    });

    if (tethersLayer) {
      tethersLayer.innerHTML = tethersSVG;
    }

    requestAnimationFrame(orbitAnimationLoop);
  }

  // ---------------------------------------------------------------------------
  // 3. RENDER & RUN SHOWCASE
  // ---------------------------------------------------------------------------
  function initShowcase() {
    const tabsContainer = document.getElementById('showcase-division-tabs');
    if (tabsContainer) {
      tabsContainer.innerHTML = divisions
        .map(
          (div, idx) => `
          <button type="button" role="tab" class="showcase-division-tab ${idx === activeDivisionIndex ? 'is-active' : ''}" data-division-index="${idx}">
            <div style="font-size:0.68rem; letter-spacing:0.16em; text-transform:uppercase; color:${idx === activeDivisionIndex ? div.accentColor : 'var(--color-secondary-text)'}; margin-bottom:0.25rem;">
              ${div.code} · ${div.romanIndex}
            </div>
            <div style="font-family:var(--font-display); font-size:1.35rem; color:var(--color-ivory);">
              ${div.name}
            </div>
            <div style="font-size:0.74rem; color:var(--color-secondary-text); margin-top:0.15rem;">
              ${div.subtitle}
            </div>
          </button>
        `
        )
        .join('');

      tabsContainer.querySelectorAll('.showcase-division-tab').forEach((tab) => {
        tab.addEventListener('click', () => {
          const idx = parseInt(tab.dataset.divisionIndex, 10);
          selectDivision(idx);
        });
      });
    }

    const frame = document.getElementById('showcase-stage-frame');
    if (frame) {
      frame.addEventListener('mouseenter', () => { isShowcasePaused = true; });
      frame.addEventListener('mouseleave', () => { isShowcasePaused = false; });
      frame.addEventListener('focusin', () => { isShowcasePaused = true; });
      frame.addEventListener('focusout', () => { isShowcasePaused = false; });
    }

    const stageClickable = document.getElementById('showcase-stage-clickable');
    if (stageClickable) {
      stageClickable.addEventListener('click', () => {
        openDivisionDetails(activeDivisionIndex);
      });
      stageClickable.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openDivisionDetails(activeDivisionIndex);
        }
      });
    }

    document.getElementById('btn-showcase-prev')?.addEventListener('click', () => {
      const curDiv = divisions[activeDivisionIndex];
      activeStartupIndex = (activeStartupIndex - 1 + curDiv.startups.length) % curDiv.startups.length;
      updateShowcaseStage();
    });

    document.getElementById('btn-showcase-next')?.addEventListener('click', () => {
      const curDiv = divisions[activeDivisionIndex];
      activeStartupIndex = (activeStartupIndex + 1) % curDiv.startups.length;
      updateShowcaseStage();
    });

    const pauseBtn = document.getElementById('btn-showcase-pause');
    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        isShowcasePaused = !isShowcasePaused;
        pauseBtn.textContent = isShowcasePaused ? '▶ Resume' : '❚❚ Pause';
      });
    }

    document.getElementById('btn-showcase-quick-inspect')?.addEventListener('click', (e) => {
      e.stopPropagation();
      const div = divisions[activeDivisionIndex];
      const startup = div.startups[activeStartupIndex];
      openStartupModal(div, startup);
    });

    startShowcaseInterval();
    updateShowcaseStage();
  }

  function startShowcaseInterval() {
    if (showcaseTimer) clearInterval(showcaseTimer);
    showcaseTimer = setInterval(() => {
      if (!isShowcasePaused) {
        const curDiv = divisions[activeDivisionIndex];
        activeStartupIndex = (activeStartupIndex + 1) % curDiv.startups.length;
        updateShowcaseStage();
      }
    }, showcaseIntervalMs);
  }

  function selectDivision(divIndex) {
    activeDivisionIndex = divIndex;
    activeStartupIndex = 0;

    // Update tabs
    document.querySelectorAll('.showcase-division-tab').forEach((tab, idx) => {
      tab.classList.toggle('is-active', idx === divIndex);
    });

    // Update toolbar pills
    document.querySelectorAll('#orbit-toolbar-pills .orbit-pill').forEach((pill, idx) => {
      pill.classList.toggle('is-active', idx === divIndex);
    });

    highlightDivisionNode(divIndex);
    updateShowcaseStage();
  }

  function updateShowcaseStage() {
    const div = divisions[activeDivisionIndex];
    const startup = div.startups[activeStartupIndex];
    if (!startup) return;

    const showcaseSectionEl = document.getElementById('showcase');
    if (showcaseSectionEl) {
      showcaseSectionEl.style.backgroundColor = startup.showcaseBgColor;
    }

    const ambientLightEl = document.getElementById('showcase-ambient-light');
    if (ambientLightEl) {
      ambientLightEl.style.background = `radial-gradient(circle at 50% 48%, ${startup.stageTint} 0%, rgba(17, 20, 17, 0) 68%)`;
    }

    const titleEl = document.getElementById('showcase-heading-title');
    if (titleEl) {
      titleEl.innerHTML = `${div.name} <span class="font-display-italic" style="color: ${div.accentColor}">Showcase</span>`;
    }

    // Update Metadata Bar
    const statusEl = document.getElementById('showcase-meta-status');
    if (statusEl) {
      statusEl.textContent = `${div.name} — Startup ${startup.indexLabel} of 05`;
    }
    const dotEl = document.getElementById('showcase-meta-dot');
    if (dotEl) {
      dotEl.style.backgroundColor = div.accentColor;
    }

    // Update Stage Pedestal & Monograph
    const pedestal = document.getElementById('showcase-pedestal');
    if (pedestal) {
      pedestal.style.background = `radial-gradient(circle at 50% 50%, ${startup.stageTint}, rgba(17, 20, 17, 0.72))`;
      pedestal.innerHTML = `
        ${window.renderEmblemHTML(startup, 'xl')}
        <div style="margin-top:1.25rem; font-size:0.68rem; letter-spacing:0.18em; text-transform:uppercase; color:var(--color-secondary-text);">
          ${startup.stagePlaceholder}
        </div>
      `;
    }

    // Update Startup Narrative
    const subheaderEl = document.getElementById('showcase-startup-sub');
    if (subheaderEl) {
      subheaderEl.textContent = `Venture ${startup.indexLabel} · ${div.name}`;
      subheaderEl.style.color = div.accentColor;
    }
    const nameEl = document.getElementById('showcase-startup-name');
    if (nameEl) nameEl.textContent = startup.name;
    const tagEl = document.getElementById('showcase-startup-tagline');
    if (tagEl) tagEl.textContent = startup.tagline;
    const descEl = document.getElementById('showcase-startup-desc');
    if (descEl) descEl.textContent = startup.shortIntro;

    const quickInspectBtn = document.getElementById('btn-showcase-quick-inspect');
    if (quickInspectBtn) {
      quickInspectBtn.textContent = `Quick-Inspect ${startup.name}`;
    }

    // Update Progress Bar
    const progressEl = document.getElementById('showcase-progress-fill');
    if (progressEl) {
      progressEl.style.backgroundColor = div.accentColor;
      progressEl.style.transition = 'none';
      progressEl.style.width = '0%';
      setTimeout(() => {
        progressEl.style.transition = `width ${showcaseIntervalMs}ms linear`;
        progressEl.style.width = '100%';
      }, 30);
    }

    // Update Dots Bar
    const dotsContainer = document.getElementById('showcase-startup-dots');
    if (dotsContainer) {
      dotsContainer.innerHTML = div.startups
        .map(
          (st, idx) => `
          <button type="button" class="showcase-dot-btn ${idx === activeStartupIndex ? 'is-active' : ''}" data-startup-index="${idx}">
            <span style="color:${div.accentColor}; margin-right:0.35rem;">${st.indexLabel}</span>
            <span>${st.name}</span>
          </button>
        `
        )
        .join('');

      dotsContainer.querySelectorAll('.showcase-dot-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          activeStartupIndex = parseInt(btn.dataset.startupIndex, 10);
          updateShowcaseStage();
        });
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 4. RENDER & RUN DIVISION DETAILS (ALTERNATING EDITORIAL ROWS)
  // ---------------------------------------------------------------------------
  function openDivisionDetails(divIndex) {
    savedHomeScrollY = window.scrollY;
    activeDivisionIndex = divIndex;
    const div = divisions[divIndex];

    const homeContainer = document.getElementById('view-home');
    const detailsContainer = document.getElementById('view-division-details');
    if (homeContainer && detailsContainer) {
      homeContainer.style.display = 'none';
      detailsContainer.classList.add('is-visible');
      currentView = 'division-details';
      window.scrollTo({ top: 0, behavior: 'auto' });
      renderDivisionDetails(div);
      history.pushState({ view: 'division-details', divIndex }, '', `#division/${div.id}`);
    }
  }

  function closeDivisionDetails() {
    const homeContainer = document.getElementById('view-home');
    const detailsContainer = document.getElementById('view-division-details');
    if (homeContainer && detailsContainer) {
      detailsContainer.classList.remove('is-visible');
      homeContainer.style.display = 'block';
      currentView = 'home';
      window.scrollTo({ top: savedHomeScrollY, behavior: 'auto' });
      history.pushState({ view: 'home' }, '', '#showcase');
    }
  }

  function renderDivisionDetails(div) {
    // Header & Subtitle
    const titleEl = document.getElementById('dossier-heading-title');
    if (titleEl) titleEl.textContent = div.name;
    const subEl = document.getElementById('dossier-heading-subtitle');
    if (subEl) {
      subEl.textContent = div.subtitle;
      subEl.style.color = div.accentColor;
    }
    const overviewEl = document.getElementById('dossier-heading-overview');
    if (overviewEl) overviewEl.textContent = div.editorialOverview;
    const eyebrowEl = document.getElementById('dossier-heading-eyebrow');
    if (eyebrowEl) {
      eyebrowEl.textContent = `${div.code} · Division ${div.romanIndex} Venture Dossier`;
      eyebrowEl.style.color = div.accentColor;
    }

    // Top switcher pills
    const pillsContainer = document.getElementById('dossier-switch-pills');
    if (pillsContainer) {
      pillsContainer.innerHTML = divisions
        .map(
          (d, idx) => `
          <button type="button" class="orbit-pill ${idx === activeDivisionIndex ? 'is-active' : ''}" data-division-index="${idx}">
            <span class="orbit-pill__dot" style="background-color: ${d.accentColor}"></span>
            <span>${d.romanIndex}. ${d.name}</span>
          </button>
        `
        )
        .join('');

      pillsContainer.querySelectorAll('.orbit-pill').forEach((pill) => {
        pill.addEventListener('click', () => {
          const idx = parseInt(pill.dataset.divisionIndex, 10);
          activeDivisionIndex = idx;
          renderDivisionDetails(divisions[idx]);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      });
    }

    // Alternating Rows (Odd: Visual left / text right; Even: Text left / visual right)
    const listContainer = document.getElementById('dossier-startup-list');
    if (listContainer) {
      listContainer.innerHTML = div.startups
        .map((st, idx) => {
          const isReversed = idx % 2 === 1;
          return `
            <article class="startup-editorial-row ${isReversed ? 'is-reversed' : ''}">
              <div class="startup-editorial-row__visual">
                <div class="startup-visual-plate" data-startup-index="${idx}" style="background: radial-gradient(circle at 50% 45%, ${st.stageTint}, var(--color-charcoal-elevated) 75%);" tabindex="0" role="button" aria-label="Open overlay for ${st.name}">
                  <div style="position:absolute; top:1.15rem; left:1.35rem; font-size:0.7rem; letter-spacing:0.16em; text-transform:uppercase; color:${div.accentColor};">
                    ${div.code} / ${st.indexLabel}
                  </div>
                  <div style="position:absolute; top:1.15rem; right:1.35rem; font-size:0.68rem; letter-spacing:0.14em; text-transform:uppercase; color:var(--color-secondary-text);">
                    Click to Focus ↗
                  </div>
                  ${window.renderEmblemHTML(st, 'xl')}
                  <div style="margin-top:1.5rem; font-family:var(--font-display); font-size:1.55rem; letter-spacing:0.14em; text-transform:uppercase; color:var(--color-ivory);">
                    ${st.name}
                  </div>
                  <div style="margin-top:0.25rem; font-size:0.68rem; letter-spacing:0.16em; text-transform:uppercase; color:var(--color-secondary-text);">
                    ${st.stagePlaceholder}
                  </div>
                </div>
              </div>

              <div class="startup-editorial-row__content">
                <div style="display:inline-flex; align-items:center; gap:0.65rem; margin-bottom:0.75rem;">
                  <span style="font-family:var(--font-display); font-style:italic; font-size:1.35rem; color:${div.accentColor};">${st.indexLabel}.</span>
                  <span style="font-size:0.72rem; letter-spacing:0.16em; text-transform:uppercase; color:var(--color-secondary-text);">${div.name} Portfolio Venture</span>
                </div>
                <h2 style="font-family:var(--font-display); font-size:clamp(2rem, 3.3vw, 3rem); font-weight:400; color:var(--color-ivory); line-height:1.08; margin-bottom:0.75rem;">
                  <button type="button" class="btn-open-modal-title" data-startup-index="${idx}" style="text-align:left; font:inherit; color:inherit;">${st.name}</button>
                </h2>
                <p style="font-size:1.08rem; color:${div.accentColor}; margin-bottom:1.15rem; line-height:1.5;">${st.tagline}</p>
                <p style="font-size:0.96rem; color:var(--color-ivory); font-weight:300; line-height:1.75; margin-bottom:1.25rem;">${st.description}</p>
                
                <div style="padding:1.1rem 1.25rem; border-left:2px solid ${div.accentColor}; background-color:rgba(255,255,255,0.02); margin-bottom:1.5rem;">
                  <div style="font-size:0.68rem; letter-spacing:0.16em; text-transform:uppercase; color:${div.accentColor}; margin-bottom:0.35rem;">Purpose & Problem Addressed</div>
                  <p style="font-size:0.88rem; color:var(--color-secondary-text); line-height:1.65;">${st.purpose}</p>
                </div>

                <div style="display:flex; align-items:center; flex-wrap:wrap; gap:0.85rem;">
                  <button type="button" class="btn-architectural btn-open-modal" data-startup-index="${idx}">
                    <span>Open Venture Overlay</span>
                    <span aria-hidden="true">↗</span>
                  </button>
                  <button type="button" class="btn-architectural btn-architectural--ghost btn-inquire-startup" data-startup-index="${idx}">
                    <span>Inquire / Collaborate</span>
                  </button>
                  <a href="#" class="btn-website-placeholder" style="font-size:0.74rem; letter-spacing:0.14em; text-transform:uppercase; color:var(--color-secondary-text); text-decoration:underline; margin-left:0.35rem;">
                    Website Placeholder
                  </a>
                </div>
              </div>
            </article>
          `;
        })
        .join('');

      // Attach Click Listeners
      listContainer.querySelectorAll('.startup-visual-plate, .btn-open-modal, .btn-open-modal-title').forEach((el) => {
        el.addEventListener('click', () => {
          const sIdx = parseInt(el.dataset.startupIndex, 10);
          openStartupModal(div, div.startups[sIdx]);
        });
      });

      listContainer.querySelectorAll('.btn-inquire-startup').forEach((el) => {
        el.addEventListener('click', () => {
          const sIdx = parseInt(el.dataset.startupIndex, 10);
          prefillContactForm(div.name, div.startups[sIdx].name);
          closeDivisionDetails();
          scrollToSection('contact');
        });
      });

      listContainer.querySelectorAll('.btn-website-placeholder').forEach((el) => {
        el.addEventListener('click', (e) => {
          e.preventDefault();
        });
      });
    }

    // Bottom other divisions navigation
    const otherDivsContainer = document.getElementById('dossier-other-divisions');
    if (otherDivsContainer) {
      otherDivsContainer.innerHTML = divisions
        .filter((_, idx) => idx !== activeDivisionIndex)
        .map(
          (d) => {
            const idx = divisions.findIndex((x) => x.id === d.id);
            return `
            <button type="button" class="orbit-pill" data-division-index="${idx}">
              <span>Explore ${d.name} →</span>
            </button>
          `;
          }
        )
        .join('');

      otherDivsContainer.querySelectorAll('.orbit-pill').forEach((btn) => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.divisionIndex, 10);
          activeDivisionIndex = idx;
          renderDivisionDetails(divisions[idx]);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 5. STARTUP INTERACTION MODAL (OVERLAY)
  // ---------------------------------------------------------------------------
  function openStartupModal(div, startup) {
    activeModalDivision = div;
    activeModalStartup = startup;
    lastFocusedElement = document.activeElement;

    const modal = document.getElementById('startup-modal');
    if (!modal) return;

    document.getElementById('modal-div-code').textContent = `${div.code} · ${div.name} / Venture ${startup.indexLabel}`;
    document.getElementById('modal-div-code').style.color = div.accentColor;
    document.getElementById('modal-div-dot').style.backgroundColor = div.accentColor;

    const pedestal = document.getElementById('modal-pedestal');
    if (pedestal) {
      pedestal.innerHTML = `
        ${window.renderEmblemHTML(startup, 'xl')}
        <div style="margin-top:1.25rem; font-family:var(--font-display); font-size:1.35rem; letter-spacing:0.14em; text-transform:uppercase; color:var(--color-ivory);">
          ${startup.name}
        </div>
        <div style="margin-top:0.35rem; font-size:0.68rem; letter-spacing:0.15em; text-transform:uppercase; color:var(--color-secondary-text);">
          ${startup.stagePlaceholder}
        </div>
      `;
    }

    document.getElementById('modal-startup-name').textContent = startup.name;
    const tagEl = document.getElementById('modal-startup-tagline');
    tagEl.textContent = startup.tagline;
    tagEl.style.color = div.accentColor;
    document.getElementById('modal-startup-desc').textContent = startup.description;
    document.getElementById('modal-startup-purpose').textContent = startup.purpose;

    const problemTitle = document.getElementById('modal-problem-title');
    if (problemTitle) problemTitle.style.color = div.accentColor;
    const problemBox = document.getElementById('modal-problem-box');
    if (problemBox) problemBox.style.borderLeftColor = div.accentColor;

    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    const closeBtn = document.getElementById('btn-close-modal');
    closeBtn?.focus();
  }

  function closeStartupModal() {
    const modal = document.getElementById('startup-modal');
    if (modal) {
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
      lastFocusedElement?.focus();
    }
  }

  // ---------------------------------------------------------------------------
  // 6. CONTACT & REGISTRY PERSISTENCE
  // ---------------------------------------------------------------------------
  let currentContactTrack = 'pitch';

  function initContact() {
    const trackBtns = document.querySelectorAll('.contact-track-btn');
    trackBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        trackBtns.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        currentContactTrack = btn.dataset.track;
        updateContactFormTrack(currentContactTrack);
      });
    });

    const form = document.getElementById('adra-contact-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleFormSubmit();
      });
    }
  }

  function updateContactFormTrack(trackId) {
    const trackObj = contact.tracks.find((t) => t.id === trackId) || contact.tracks[0];
    const headerEl = document.getElementById('contact-form-heading');
    if (headerEl) headerEl.textContent = trackObj.headline;
    const subEl = document.getElementById('contact-form-sub');
    if (subEl) subEl.textContent = `Pathway ${trackObj.index} · ${trackObj.label}`;
    const submitBtn = document.getElementById('btn-contact-submit');
    if (submitBtn) submitBtn.textContent = trackObj.submitLabel;
    const orgLabel = document.getElementById('label-contact-org');
    if (orgLabel) orgLabel.textContent = trackObj.organizationLabel;
    const msgLabel = document.getElementById('label-contact-msg');
    if (msgLabel) msgLabel.textContent = trackObj.messageLabel;
  }

  function prefillContactForm(divisionName, startupName) {
    const select = document.getElementById('contact-input-division');
    if (select) select.value = divisionName;
    const startupRefInput = document.getElementById('contact-input-startup-ref');
    if (startupRefInput) startupRefInput.value = startupName;
    const startupRefGroup = document.getElementById('contact-group-startup-ref');
    if (startupRefGroup) startupRefGroup.style.display = 'block';
  }

  function handleFormSubmit() {
    const nameInput = document.getElementById('contact-input-name');
    const emailInput = document.getElementById('contact-input-email');
    const orgInput = document.getElementById('contact-input-org');
    const divSelect = document.getElementById('contact-input-division');
    const startupRefInput = document.getElementById('contact-input-startup-ref');
    const msgInput = document.getElementById('contact-input-msg');

    const errName = document.getElementById('err-contact-name');
    const errEmail = document.getElementById('err-contact-email');
    const errMsg = document.getElementById('err-contact-msg');

    errName.textContent = '';
    errEmail.textContent = '';
    errMsg.textContent = '';

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = msgInput.value.trim();

    let hasError = false;
    if (name.length < 2) {
      errName.textContent = 'Please enter your name (minimum 2 characters).';
      hasError = true;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      errEmail.textContent = 'Please enter a valid electronic mail address.';
      hasError = true;
    }
    if (message.length < 15) {
      errMsg.textContent = 'Please provide at least 15 characters of context.';
      hasError = true;
    }

    if (hasError) return;

    const existing = getStoredInquiries();
    const seq = String(existing.length + 1).padStart(3, '0');
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const referenceCode = `ADRA-${seq}-${randomSuffix}`;

    const record = {
      id: `inq_${Date.now()}_${randomSuffix.toLowerCase()}`,
      referenceCode,
      track: currentContactTrack,
      name,
      email,
      organization: orgInput.value.trim() || 'Independent',
      divisionInterest: divSelect.value || 'Ecosystem-Wide',
      startupReference: startupRefInput ? startupRefInput.value.trim() : '',
      message,
      createdAt: new Date().toISOString(),
    };

    saveInquiry(record);
    updateRegistryCount();

    // Reset Form
    nameInput.value = '';
    emailInput.value = '';
    orgInput.value = '';
    msgInput.value = '';

    openThankYou(record);
  }

  function openThankYou(record) {
    savedHomeScrollY = window.scrollY;
    const homeContainer = document.getElementById('view-home');
    const detailsContainer = document.getElementById('view-division-details');
    const thankYouContainer = document.getElementById('view-thank-you');

    if (homeContainer) homeContainer.style.display = 'none';
    if (detailsContainer) detailsContainer.classList.remove('is-visible');
    if (thankYouContainer) thankYouContainer.classList.add('is-visible');

    currentView = 'thank-you';
    window.scrollTo({ top: 0, behavior: 'auto' });

    if (record) {
      document.getElementById('thank-you-ref-code').textContent = `Registry Reference: ${record.referenceCode}`;
      document.getElementById('thank-you-sender').textContent = record.name;
      document.getElementById('thank-you-division').textContent = record.divisionInterest;
    }

    history.pushState({ view: 'thank-you' }, '', '#thank-you');
  }

  function closeThankYou() {
    const homeContainer = document.getElementById('view-home');
    const thankYouContainer = document.getElementById('view-thank-you');
    if (homeContainer && thankYouContainer) {
      thankYouContainer.classList.remove('is-visible');
      homeContainer.style.display = 'block';
      currentView = 'home';
      window.scrollTo({ top: 0, behavior: 'auto' });
      history.pushState({ view: 'home' }, '', '#hero');
    }
  }

  // ---------------------------------------------------------------------------
  // 7. REGISTRY MODAL INSPECTOR
  // ---------------------------------------------------------------------------
  function openRegistryModal() {
    const modal = document.getElementById('registry-modal');
    if (!modal) return;

    const items = getStoredInquiries();
    const countEl = document.getElementById('registry-modal-count');
    if (countEl) countEl.textContent = `(${items.length})`;

    const listEl = document.getElementById('registry-modal-list');
    if (listEl) {
      if (items.length === 0) {
        listEl.innerHTML = `<div style="padding:2.5rem; border:1px solid var(--border-dark-hairline); text-align:center; color:var(--color-secondary-text);">No inquiries logged in this browser session yet. Submit the contact form below to test!</div>`;
      } else {
        listEl.innerHTML = items
          .map(
            (item) => `
            <div style="padding:1.25rem; border:1px solid var(--border-dark-hairline); background-color:rgba(255,255,255,0.02); margin-bottom:1rem;">
              <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.5rem; font-size:0.72rem; letter-spacing:0.14em; text-transform:uppercase; color:var(--color-champagne);">
                <span>${item.referenceCode} · Track: ${item.track}</span>
                <span style="color:var(--color-secondary-text);">${new Date(item.createdAt).toLocaleString()}</span>
              </div>
              <div style="font-size:0.92rem; color:var(--color-ivory); margin-bottom:0.35rem;">
                <strong>${item.name}</strong> (${item.email}) — <span style="color:var(--color-sage);">${item.divisionInterest}</span>
                ${item.startupReference ? ` / ${item.startupReference}` : ''}
              </div>
              <p style="font-size:0.86rem; color:var(--color-secondary-text); line-height:1.6;">${item.message}</p>
            </div>
          `
          )
          .join('');
      }
    }

    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeRegistryModal() {
    const modal = document.getElementById('registry-modal');
    if (modal) {
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  // ---------------------------------------------------------------------------
  // 8. NAVIGATION & ROUTING
  // ---------------------------------------------------------------------------
  function scrollToSection(id) {
    if (currentView !== 'home') {
      const homeContainer = document.getElementById('view-home');
      const detailsContainer = document.getElementById('view-division-details');
      const thankYouContainer = document.getElementById('view-thank-you');
      if (homeContainer) homeContainer.style.display = 'block';
      if (detailsContainer) detailsContainer.classList.remove('is-visible');
      if (thankYouContainer) thankYouContainer.classList.remove('is-visible');
      currentView = 'home';
    }

    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      history.pushState({ view: 'home', sectionId: id }, '', `#${id}`);
    }
  }

  // ---------------------------------------------------------------------------
  // 9. INITIALIZATION
  // ---------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initHero();
    initOrbit();
    initShowcase();
    initContact();
    updateRegistryCount();

    // Header Links
    document.querySelectorAll('.site-header__link, .btn-nav-jump').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('href').replace('#', '');
        scrollToSection(sectionId);
      });
    });

    // Mobile Navigation Drawer Toggle
    const mobileMenuBtn = document.getElementById('btn-mobile-menu-toggle');
    const mobileDrawer = document.getElementById('mobile-nav-drawer');
    if (mobileMenuBtn && mobileDrawer) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileDrawer.classList.toggle('is-open');
      });
      mobileDrawer.querySelectorAll('.btn-mobile-nav').forEach((link) => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          mobileDrawer.classList.remove('is-open');
          const sectionId = link.getAttribute('href').replace('#', '');
          scrollToSection(sectionId);
        });
      });
    }

    // Modal Close Buttons & Backdrop Clicks
    document.getElementById('btn-close-modal')?.addEventListener('click', closeStartupModal);
    document.getElementById('startup-modal')?.addEventListener('click', (e) => {
      if (e.target.id === 'startup-modal') closeStartupModal();
    });

    document.getElementById('btn-close-registry-modal')?.addEventListener('click', closeRegistryModal);
    document.getElementById('registry-modal')?.addEventListener('click', (e) => {
      if (e.target.id === 'registry-modal') closeRegistryModal();
    });

    document.getElementById('btn-registry-modal-trigger')?.addEventListener('click', openRegistryModal);

    // Modal Inquire Button
    document.getElementById('btn-modal-inquire')?.addEventListener('click', () => {
      if (activeModalDivision && activeModalStartup) {
        prefillContactForm(activeModalDivision.name, activeModalStartup.name);
        closeStartupModal();
        if (currentView === 'division-details') closeDivisionDetails();
        scrollToSection('contact');
      }
    });

    // Details Back Button
    document.getElementById('btn-dossier-back')?.addEventListener('click', closeDivisionDetails);

    // Thank You Return Buttons
    document.getElementById('btn-thankyou-return-home')?.addEventListener('click', closeThankYou);
    document.getElementById('btn-thankyou-return-orbit')?.addEventListener('click', () => {
      closeThankYou();
      scrollToSection('universe');
    });
    document.getElementById('btn-preview-thank-you')?.addEventListener('click', () => {
      openThankYou(null);
    });

    // Global ESC Key Listener
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeStartupModal();
        closeRegistryModal();
      }
    });

    // Popstate handling for browser Back/Forward
    window.addEventListener('popstate', (e) => {
      const state = e.state;
      if (!state || state.view === 'home') {
        const homeContainer = document.getElementById('view-home');
        const detailsContainer = document.getElementById('view-division-details');
        const thankYouContainer = document.getElementById('view-thank-you');
        if (homeContainer) homeContainer.style.display = 'block';
        if (detailsContainer) detailsContainer.classList.remove('is-visible');
        if (thankYouContainer) thankYouContainer.classList.remove('is-visible');
        currentView = 'home';
      } else if (state.view === 'division-details' && typeof state.divIndex === 'number') {
        openDivisionDetails(state.divIndex);
      } else if (state.view === 'thank-you') {
        openThankYou(null);
      }
    });
  });
})();
