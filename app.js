// ============================================================
// APP.JS — Lógica principal de la aplicación de rutinas
// ============================================================

let currentGender = 'masculino';
let currentDay = 1;

// ─── Progress Management (Database ready) ───────────────────
const ProgressManager = {
  data: {
    completedExercises: {},
    completedDays: {}
  },
  
  STORAGE_KEY: 'chris_training_progress',

  init() {
    this.load();
  },

  load() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        this.data = JSON.parse(stored);
        if (!this.data.completedExercises) this.data.completedExercises = {};
        if (!this.data.completedDays) this.data.completedDays = {};
      }
    } catch (e) {
      console.error('Error al cargar progreso:', e);
    }
  },

  save() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
      // NOTA PARA FUTURA BASE DE DATOS:
      // Aquí puedes añadir tu llamada fetch/axios/GraphQL para persistir el progreso en tu backend.
      // Ejemplo: syncWithDatabase(this.data);
    } catch (e) {
      console.error('Error al guardar progreso:', e);
    }
  },

  isExerciseCompleted(id) {
    return !!this.data.completedExercises[id];
  },

  toggleExercise(id) {
    const isCompleted = !this.isExerciseCompleted(id);
    this.data.completedExercises[id] = isCompleted;
    this.save();
    
    // Auto-update day completion when exercises change
    this.updateDayCompletionAuto();
    return isCompleted;
  },

  isDayCompleted(gender, day) {
    const key = `${gender}_${day}`;
    return !!this.data.completedDays[key];
  },

  toggleDay(gender, day, forceState = null) {
    const key = `${gender}_${day}`;
    const isCompleted = forceState !== null ? forceState : !this.isDayCompleted(gender, day);
    this.data.completedDays[key] = isCompleted;
    this.save();
    return isCompleted;
  },

  updateDayCompletionAuto() {
    for (const gender of ['masculino', 'femenino']) {
      const routine = routineData[gender];
      if (!routine || !routine.days) continue;
      
      routine.days.forEach(d => {
        const dayExercises = d.exercises;
        if (!dayExercises || dayExercises.length === 0) return;
        
        const allCompleted = dayExercises.every(ex => this.isExerciseCompleted(ex.id));
        this.toggleDay(gender, d.day, allCompleted);
      });
    }
  },

  getCompletedCountForDay(gender, dayNum) {
    const data = routineData[gender];
    if (!data) return { completed: 0, total: 0 };
    const dayData = data.days.find(d => d.day === dayNum);
    if (!dayData) return { completed: 0, total: 0 };
    
    const total = dayData.exercises.length;
    const completed = dayData.exercises.filter(ex => this.isExerciseCompleted(ex.id)).length;
    return { completed, total };
  },

  getGlobalProgress(gender) {
    const data = routineData[gender];
    if (!data || !data.days) return { completed: 0, total: 0, percentage: 0 };
    
    let total = 0;
    let completed = 0;
    
    data.days.forEach(d => {
      total += d.exercises.length;
      completed += d.exercises.filter(ex => this.isExerciseCompleted(ex.id)).length;
    });
    
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completed, total, percentage };
  }
};

// Initialize progress
ProgressManager.init();

// ─── Initialize ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderDayTabs();
  updateGlobalProgressUI();
  renderAllDays();
  initScrollEffects();
  initIntersectionObserver();
});

// ─── Gender Switcher ────────────────────────────────────────
function setGender(gender) {
  currentGender = gender;
  document.getElementById('btnMasculino').classList.toggle('active', gender === 'masculino');
  document.getElementById('btnFemenino').classList.toggle('active', gender === 'femenino');

  const data = routineData[gender];
  if (!data || data.days.length === 0) {
    const daysContainer = document.getElementById('daysContainer');
    if (daysContainer) {
      daysContainer.innerHTML = `
        <div class="empty-state">
          <h2>Próximamente</h2>
          <p>La rutina femenina estará disponible muy pronto.</p>
        </div>
      `;
    }
    const printHeader = document.getElementById('printHeader');
    if (printHeader) printHeader.innerHTML = '';
    return;
  }

  currentDay = 1;
  renderDayTabs();
  updateGlobalProgressUI();
  renderAllDays();
}

// ─── Day Switcher ───────────────────────────────────────────
function switchDay(day) {
  currentDay = day;
  renderDayTabs();
  
  // Toggle visibility of day contents
  const dayContents = document.querySelectorAll('.day-content');
  dayContents.forEach(el => {
    const dayNum = parseInt(el.getAttribute('data-day-num'));
    el.classList.toggle('active', dayNum === day);
  });

  // Scroll to content
  const mainContent = document.getElementById('mainContent');
  mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ─── Render Day Tabs ────────────────────────────────────────
function renderDayTabs() {
  const data = routineData[currentGender];
  if (!data || !data.days) return;
  
  const dayTabsContainer = document.getElementById('dayTabs');
  if (!dayTabsContainer) return;
  
  dayTabsContainer.innerHTML = data.days.map(d => {
    const isCompleted = ProgressManager.isDayCompleted(currentGender, d.day);
    const isActive = d.day === currentDay;
    
    // Check indicator inside tab
    const checkBadge = isCompleted 
      ? `<span class="day-tab-check">✓</span>` 
      : ``;
      
    return `
      <button class="day-tab ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}" data-day="${d.day}" onclick="switchDay(${d.day})">
        <div class="day-tab-header-row">
          <span class="day-tab-number">0${d.day}</span>
          ${checkBadge}
        </div>
        <span class="day-tab-label">${d.muscleGroup}</span>
      </button>
    `;
  }).join('');
}

// ─── Global Progress UI ──────────────────────────────────────
function updateGlobalProgressUI() {
  const progress = ProgressManager.getGlobalProgress(currentGender);
  
  const percentText = document.getElementById('globalProgressPercent');
  const fillBar = document.getElementById('globalProgressFill');
  
  if (percentText) {
    percentText.textContent = `${progress.percentage}% completado`;
  }
  if (fillBar) {
    fillBar.style.width = `${progress.percentage}%`;
  }
}

// ─── Day Progress UI ─────────────────────────────────────────
function updateDayProgressUI() {
  const data = routineData[currentGender];
  if (!data) return;
  
  data.days.forEach(dayData => {
    const dayProgressArea = document.getElementById(`dayProgressArea-${dayData.day}`);
    if (dayProgressArea) {
      const progress = ProgressManager.getCompletedCountForDay(currentGender, dayData.day);
      dayProgressArea.innerHTML = renderDayProgressBadge(dayData.color, progress.completed, progress.total);
    }
  });
}
function toggleExerciseState(exerciseId, event) {
  if (event) event.stopPropagation();
  
  const isCompleted = ProgressManager.toggleExercise(exerciseId);
  
  // Update card class
  const card = document.querySelector(`.exercise-card[data-id="${exerciseId}"]`);
  if (card) {
    card.classList.toggle('completed', isCompleted);
    
    // Update button style
    const btn = card.querySelector('.exercise-check-btn');
    if (btn) {
      btn.classList.toggle('checked', isCompleted);
      const color = card.style.getPropertyValue('--accent-color') || '#2563eb';
      btn.style.background = isCompleted ? color : 'transparent';
      btn.style.color = isCompleted ? 'white' : color;
    }
  }
  
  // Update tabs
  renderDayTabs();
  
  // Update day header progress
  updateDayProgressUI();
  
  // Update global progress bar
  updateGlobalProgressUI();
}

// ─── Render All Days Content ─────────────────────────────────
function renderAllDays() {
  const data = routineData[currentGender];
  if (!data || data.days.length === 0) return;

  const daysContainer = document.getElementById('daysContainer');
  if (!daysContainer) return;

  const printHeader = document.getElementById('printHeader');
  if (printHeader) {
    printHeader.innerHTML = `
      <h1>CHRIS TRAINING</h1>
      <h2>Plan de Entrenamiento Semanal — ${currentGender === 'masculino' ? 'Rutina Masculina' : 'Rutina Femenina'}</h2>
    `;
  }

  const allDaysHTML = data.days.map(dayData => {
    const progress = ProgressManager.getCompletedCountForDay(currentGender, dayData.day);
    const exercisesHTML = dayData.exercises.map((ex, index) => {
      const isCompleted = ProgressManager.isExerciseCompleted(ex.id);
      const timer = initTimerState(ex.id, ex.rest);
      const timeFormatted = formatTime(timer.remainingTime);
      const fillPercent = timer.totalTime > 0 ? (timer.remainingTime / timer.totalTime) * 100 : 0;
      const isRunning = timer.state === 'running';
      const isFinished = timer.state === 'finished';

      return `
        <div class="exercise-card ${isCompleted ? 'completed' : ''}" 
             data-id="${ex.id}" 
             style="--card-index: ${index}; --accent-color: ${dayData.color}">
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
            
            <!-- Checkmark Button -->
            <button class="exercise-check-btn ${isCompleted ? 'checked' : ''}" 
                    onclick="toggleExerciseState('${ex.id}', event)" 
                    style="color: ${isCompleted ? 'white' : dayData.color}; 
                           background: ${isCompleted ? dayData.color : 'transparent'}; 
                           border: 1px solid ${dayData.color}50;"
                    title="${isCompleted ? 'Completado' : 'Marcar como completado'}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="16" height="16">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </button>
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

              <!-- Dynamic Rest Timer -->
              <div class="exercise-timer-card ${isRunning ? 'running' : ''} ${isFinished ? 'finished' : ''}" 
                   id="timer-box-${ex.id}">
                <div class="timer-display-row">
                  <div class="timer-status-icon" style="color: ${dayData.color}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12,6 12,12 16,14"/>
                    </svg>
                  </div>
                  <span class="timer-title-text">Cronómetro de Descanso:</span>
                  <span class="timer-time" id="timer-val-${ex.id}">${timeFormatted}</span>
                </div>
                
                <div class="timer-controls">
                  <button class="timer-control-btn timer-start-pause" 
                          onclick="toggleTimer('${ex.id}', event)" 
                          style="background: ${dayData.color}15; color: ${dayData.color}">
                    ${isRunning ? `
                      <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                        <rect x="5" y="4" width="4" height="16"/>
                        <rect x="15" y="4" width="4" height="16"/>
                      </svg>
                    ` : `
                      <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                        <polygon points="6,3 20,12 6,21"/>
                      </svg>
                    `}
                  </button>
                  <button class="timer-control-btn timer-reset" 
                          onclick="resetTimer('${ex.id}', event)" 
                          style="background: rgba(255,255,255,0.05); color: var(--text-secondary)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="12" height="12">
                      <path d="M2.5 2v6h6M21.5 22v-6h-6"/>
                      <path d="M22 11.5A10 10 0 003.2 7.2L2.5 8M2 12.5a10 10 0 0018.8 4.3l.7-.8"/>
                    </svg>
                  </button>
                  <button class="timer-control-btn timer-adjust" 
                          onclick="adjustTimer('${ex.id}', 30, event)" 
                          style="background: rgba(255,255,255,0.05); color: var(--text-secondary)">+30s</button>
                  <button class="timer-control-btn timer-adjust" 
                          onclick="adjustTimer('${ex.id}', -30, event)" 
                          style="background: rgba(255,255,255,0.05); color: var(--text-secondary)">-30s</button>
                </div>
                
                <div class="timer-progress-container">
                  <div class="timer-progress-fill" 
                       id="timer-fill-${ex.id}" 
                       style="width: ${fillPercent}%; background: ${dayData.color}"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="day-content ${dayData.day === currentDay ? 'active' : ''}" 
           id="dayContent-${dayData.day}" 
           data-day-num="${dayData.day}">
        <div class="day-header">
          <div class="day-header-left">
            <div>
              <div class="day-label">Día ${dayData.day}</div>
              <h2 class="day-title">${dayData.title}</h2>
              <div class="day-muscle-group" style="color: ${dayData.color}">${dayData.muscleGroup}</div>
            </div>
          </div>
          <div class="day-header-right" id="dayProgressArea-${dayData.day}">
            ${renderDayProgressBadge(dayData.color, progress.completed, progress.total)}
          </div>
        </div>

        <div class="exercises-grid">
          ${exercisesHTML}
        </div>

        <div class="day-footer-actions">
          <a href="https://wa.me/34671628412?text=¡Hola%20Christian!%20Acabo%20de%20completar%20el%20Día%20${dayData.day}%20(${encodeURIComponent(dayData.muscleGroup)})%20de%20la%20semana%20gratis%20de%20entrenamiento.%20¡Estuvo%20excelente!%20🔥" 
             target="_blank" 
             rel="noopener noreferrer" 
             class="wa-complete-btn" 
             style="background: ${dayData.color}; box-shadow: 0 4px 20px ${dayData.color}40">
             <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style="margin-right: 8px; vertical-align: middle;">
               <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
             </svg>
             Día Completado — Enviar a WhatsApp
          </a>
        </div>
      </div>
    `;
  }).join('');

  daysContainer.innerHTML = allDaysHTML;

  // Re-init intersection observer for all cards
  initIntersectionObserver();
}

// ─── Stopwatch Timer States & Logic ──────────────────────────
const activeTimers = {};

function parseRestTime(restStr) {
  if (!restStr) return 90; // Default 1.5 mins
  const clean = restStr.toLowerCase();
  
  // Check patterns like "2-3 min" or "1-2 min"
  const rangeMatch = clean.match(/(\d+)\s*-\s*(\d+)\s*min/);
  if (rangeMatch) {
    const minVal = parseInt(rangeMatch[1]);
    const maxVal = parseInt(rangeMatch[2]);
    return Math.round((minVal + maxVal) / 2) * 60; // average in seconds
  }
  
  // Check patterns like "1 min" or "3 min"
  const singleMatch = clean.match(/(\d+)\s*min/);
  if (singleMatch) {
    return parseInt(singleMatch[1]) * 60;
  }
  
  // Check patterns like "45s" or "45 seg"
  const secMatch = clean.match(/(\d+)\s*(s|seg)/);
  if (secMatch) {
    return parseInt(secMatch[1]);
  }
  
  return 90; // Fallback
}

function initTimerState(exerciseId, restStr) {
  if (activeTimers[exerciseId]) {
    return activeTimers[exerciseId];
  }
  
  const duration = parseRestTime(restStr);
  activeTimers[exerciseId] = {
    intervalId: null,
    remainingTime: duration,
    totalTime: duration,
    state: 'idle' // 'idle' | 'running' | 'paused' | 'finished'
  };
  return activeTimers[exerciseId];
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function startTimerInterval(exerciseId) {
  const timer = activeTimers[exerciseId];
  if (!timer) return;
  
  if (timer.intervalId) clearInterval(timer.intervalId);
  
  timer.intervalId = setInterval(() => {
    if (timer.state !== 'running') {
      clearInterval(timer.intervalId);
      timer.intervalId = null;
      return;
    }
    
    if (timer.remainingTime > 0) {
      timer.remainingTime--;
      updateTimerUI(exerciseId);
    } else {
      timer.state = 'finished';
      clearInterval(timer.intervalId);
      timer.intervalId = null;
      updateTimerUI(exerciseId);
      playAlarmSound();
    }
  }, 1000);
}

function updateTimerUI(exerciseId) {
  const timer = activeTimers[exerciseId];
  if (!timer) return;
  
  const valEl = document.getElementById(`timer-val-${exerciseId}`);
  const fillEl = document.getElementById(`timer-fill-${exerciseId}`);
  const boxEl = document.getElementById(`timer-box-${exerciseId}`);
  
  if (valEl) valEl.textContent = formatTime(timer.remainingTime);
  
  if (fillEl) {
    const percent = timer.totalTime > 0 ? (timer.remainingTime / timer.totalTime) * 100 : 0;
    fillEl.style.width = `${percent}%`;
  }
  
  if (boxEl) {
    boxEl.classList.toggle('running', timer.state === 'running');
    boxEl.classList.toggle('finished', timer.state === 'finished');
    
    const btn = boxEl.querySelector('.timer-start-pause');
    if (btn) {
      if (timer.state === 'running') {
        btn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
            <rect x="5" y="4" width="4" height="16"/>
            <rect x="15" y="4" width="4" height="16"/>
          </svg>
        `;
      } else {
        btn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
            <polygon points="6,3 20,12 6,21"/>
          </svg>
        `;
      }
    }
  }
}

function toggleTimer(exerciseId, event) {
  if (event) event.stopPropagation();
  const timer = activeTimers[exerciseId];
  if (!timer) return;
  
  if (timer.state === 'running') {
    timer.state = 'paused';
    if (timer.intervalId) {
      clearInterval(timer.intervalId);
      timer.intervalId = null;
    }
    updateTimerUI(exerciseId);
  } else {
    if (timer.remainingTime <= 0) {
      timer.remainingTime = timer.totalTime;
    }
    timer.state = 'running';
    updateTimerUI(exerciseId);
    startTimerInterval(exerciseId);
  }
}

function resetTimer(exerciseId, event) {
  if (event) event.stopPropagation();
  const timer = activeTimers[exerciseId];
  if (!timer) return;
  
  timer.state = 'idle';
  timer.remainingTime = timer.totalTime;
  if (timer.intervalId) {
    clearInterval(timer.intervalId);
    timer.intervalId = null;
  }
  updateTimerUI(exerciseId);
}

function adjustTimer(exerciseId, seconds, event) {
  if (event) event.stopPropagation();
  const timer = activeTimers[exerciseId];
  if (!timer) return;
  
  timer.remainingTime = Math.max(0, timer.remainingTime + seconds);
  
  if (timer.remainingTime > 0 && timer.state === 'finished') {
    timer.state = 'paused';
  }
  
  if (timer.remainingTime > timer.totalTime) {
    timer.totalTime = timer.remainingTime;
  }
  
  updateTimerUI(exerciseId);
  
  if (timer.state === 'running') {
    startTimerInterval(exerciseId);
  }
}

// ─── Web Audio API Beep Alarm ────────────────────────────────
function playAlarmSound() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    const playTone = (freq, startTime, duration) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      
      gain.gain.setValueAtTime(0.15, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(startTime);
      osc.stop(startTime + duration);
    };
    
    const now = ctx.currentTime;
    // Play an elegant chime: E5 then A5
    playTone(659.25, now, 0.35); // E5
    playTone(880.00, now + 0.15, 0.45); // A5
  } catch (e) {
    console.error('Error al reproducir audio:', e);
  }
}

// ─── Video Modal ────────────────────────────────────────────
function openVideoModal(exerciseId, exerciseName, videoUrl) {
  const modal = document.getElementById('videoModal');
  const player = document.getElementById('videoModalPlayer');
  const info = document.getElementById('videoModalInfo');

  if (videoUrl && videoUrl.trim() !== '') {
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
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
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
  }, { threshold: 0.01, rootMargin: '0px 0px 300px 0px' });

  cards.forEach(card => observer.observe(card));
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
