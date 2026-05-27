// ============================================================
// APP.JS — Lógica principal de la aplicación de rutinas
// ============================================================

let currentGender = 'masculino';
let currentDay = 1;

// ─── Initialize ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderDay(currentDay);
  initScrollEffects();
  createParticles();
  initIntersectionObserver();
});

// ─── Gender Switcher ────────────────────────────────────────
function setGender(gender) {
  currentGender = gender;
  document.getElementById('btnMasculino').classList.toggle('active', gender === 'masculino');
  document.getElementById('btnFemenino').classList.toggle('active', gender === 'femenino');

  const data = routineData[gender];
  if (!data || data.days.length === 0) {
    document.getElementById('mainContent').innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🚧</div>
        <h2>Próximamente</h2>
        <p>La rutina femenina estará disponible muy pronto.</p>
      </div>
    `;
    return;
  }

  currentDay = 1;
  updateDayTabs();
  renderDay(currentDay);
}

// ─── Day Switcher ───────────────────────────────────────────
function switchDay(day) {
  currentDay = day;
  updateDayTabs();
  renderDay(day);

  // Scroll to content
  const mainContent = document.getElementById('mainContent');
  mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updateDayTabs() {
  const tabs = document.querySelectorAll('.day-tab');
  tabs.forEach(tab => {
    const tabDay = parseInt(tab.dataset.day);
    tab.classList.toggle('active', tabDay === currentDay);
  });
}

// ─── Render Day Content ─────────────────────────────────────
function renderDay(dayNumber) {
  const data = routineData[currentGender];
  if (!data || data.days.length === 0) return;

  const dayData = data.days.find(d => d.day === dayNumber);
  if (!dayData) return;

  const mainContent = document.getElementById('mainContent');

  const exercisesHTML = dayData.exercises.map((ex, index) => `
    <div class="exercise-card" style="--card-index: ${index}; --accent-color: ${dayData.color}">
      <div class="exercise-card-header">
        <div class="exercise-number" style="background: ${dayData.color}20; color: ${dayData.color}; border: 1px solid ${dayData.color}40">
          ${String(index + 1).padStart(2, '0')}
        </div>
        <div class="exercise-title-area">
          <h3 class="exercise-name">${ex.name}</h3>
          <span class="exercise-material-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
              <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
            </svg>
            ${ex.material}
          </span>
        </div>
      </div>

      <div class="exercise-body">
        <div class="exercise-video-area" onclick="openVideoModal('${ex.id}', '${escapeHTML(ex.name)}', '${escapeHTML(ex.videoUrl)}')">
          <div class="video-placeholder">
            <div class="play-button-wrapper">
              <div class="play-button-ring"></div>
              <div class="play-button">
                <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                  <polygon points="5,3 19,12 5,21"/>
                </svg>
              </div>
            </div>
            <span class="video-label">Ver demostración</span>
          </div>
        </div>

        <div class="exercise-details">
          <p class="exercise-description">${ex.description}</p>
          
          <div class="exercise-metrics">
            <div class="metric">
              <div class="metric-icon" style="background: ${dayData.color}15; color: ${dayData.color}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
                  <path d="M23 6l-9.5 9.5-5-5L1 18"/>
                </svg>
              </div>
              <div class="metric-info">
                <span class="metric-value">${ex.reps}</span>
                <span class="metric-label">Repeticiones</span>
              </div>
            </div>
            <div class="metric">
              <div class="metric-icon" style="background: ${dayData.color}15; color: ${dayData.color}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
                  <rect x="2" y="2" width="20" height="20" rx="2"/>
                  <path d="M7 12h10M12 7v10"/>
                </svg>
              </div>
              <div class="metric-info">
                <span class="metric-value">${ex.sets}</span>
                <span class="metric-label">Series</span>
              </div>
            </div>
            <div class="metric">
              <div class="metric-icon" style="background: ${dayData.color}15; color: ${dayData.color}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12,6 12,12 16,14"/>
                </svg>
              </div>
              <div class="metric-info">
                <span class="metric-value">${ex.rest}</span>
                <span class="metric-label">Descanso</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  mainContent.innerHTML = `
    <div class="day-content" id="dayContent">
      <div class="day-header">
        <div class="day-header-left">
          <span class="day-icon" style="background: ${dayData.color}20; border: 1px solid ${dayData.color}40">${dayData.icon}</span>
          <div>
            <div class="day-label">Día ${dayData.day}</div>
            <h2 class="day-title">${dayData.title}</h2>
            <div class="day-muscle-group" style="color: ${dayData.color}">${dayData.muscleGroup}</div>
          </div>
        </div>
        <div class="day-header-right">
          <div class="exercise-count" style="background: ${dayData.color}; box-shadow: 0 4px 20px ${dayData.color}50">
            ${dayData.exercises.length} ejercicios
          </div>
        </div>
      </div>

      <div class="exercises-grid">
        ${exercisesHTML}
      </div>
    </div>
  `;

  // Re-init intersection observer for new cards
  initIntersectionObserver();
}

// ─── Video Modal ────────────────────────────────────────────
function openVideoModal(exerciseId, exerciseName, videoUrl) {
  const modal = document.getElementById('videoModal');
  const player = document.getElementById('videoModalPlayer');
  const info = document.getElementById('videoModalInfo');

  if (videoUrl && videoUrl.trim() !== '') {
    // If it's a YouTube URL, embed it
    const youtubeId = extractYoutubeId(videoUrl);
    if (youtubeId) {
      player.innerHTML = `<iframe src="https://www.youtube.com/embed/${youtubeId}?autoplay=1" frameborder="0" allowfullscreen allow="autoplay; encrypted-media"></iframe>`;
    } else {
      player.innerHTML = `<video src="${videoUrl}" controls autoplay></video>`;
    }
  } else {
    player.innerHTML = `
      <div class="no-video">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="48" height="48">
          <polygon points="23,7 16,12 23,17" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
        </svg>
        <p>Video próximamente</p>
        <span>El video demostrativo de este ejercicio se añadirá pronto</span>
      </div>
    `;
  }

  info.innerHTML = `<h3>${exerciseName}</h3>`;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  const player = document.getElementById('videoModalPlayer');
  modal.classList.remove('active');
  document.body.style.overflow = '';
  // Stop video
  setTimeout(() => { player.innerHTML = ''; }, 300);
}

function extractYoutubeId(url) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : null;
}

// ─── Utility ────────────────────────────────────────────────
function escapeHTML(str) {
  return str.replace(/'/g, "\\'").replace(/"/g, '\\"');
}

// ─── Scroll Effects ─────────────────────────────────────────
function initScrollEffects() {
  const header = document.getElementById('header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    header.classList.toggle('scrolled', currentScroll > 50);
    lastScroll = currentScroll;
  });
}

// ─── Intersection Observer for Animations ───────────────────
function initIntersectionObserver() {
  const cards = document.querySelectorAll('.exercise-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  cards.forEach(card => observer.observe(card));
}

// ─── Background Particles ───────────────────────────────────
function createParticles() {
  const container = document.getElementById('bgParticles');
  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      width: ${Math.random() * 4 + 1}px;
      height: ${Math.random() * 4 + 1}px;
      animation-delay: ${Math.random() * 8}s;
      animation-duration: ${Math.random() * 10 + 10}s;
    `;
    container.appendChild(particle);
  }
}

// ─── Keyboard navigation ───────────────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeVideoModal();
  }
  if (e.key === 'ArrowRight' && currentDay < 5) {
    switchDay(currentDay + 1);
  }
  if (e.key === 'ArrowLeft' && currentDay > 1) {
    switchDay(currentDay - 1);
  }
});
