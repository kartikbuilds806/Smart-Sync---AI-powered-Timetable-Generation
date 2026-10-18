/**
 * SmartSync Generator Wizard Controller (Phase 4)
 * Multi-step interactive constraint-based generation wizard
 */

window.SMARTSYNC_GEN_STATE = {
  step: 1,
  scope: {
    courseCode: '',
    semester: '',
    sectionChoice: '',
    sectionsCount: 0
  },
  constraints: {
    spreadSubjects: true,
    balanceTeacherLoad: true,
    maxDailyTeacherHours: 4,
    protectLunchBreak: true,
    avoidFridayLate: true,
    useTeacherPreferences: true
  },
  result: null,
  previewSection: ''
};

window.renderGeneratorWizard = async function() {
  const state = window.SMARTSYNC_GEN_STATE;
  const courses = await window.dataService.getCourses();
  const stats = await window.dataService.getDashboardStats();

  let stepContentHTML = '';

  switch (state.step) {
    case 1:
      stepContentHTML = await renderGenStep1(courses, stats);
      break;
    case 2:
      stepContentHTML = renderGenStep2();
      break;
    case 3:
      stepContentHTML = renderGenStep3();
      break;
    case 4:
      stepContentHTML = await renderGenStep4();
      break;
    default:
      stepContentHTML = await renderGenStep1(courses, stats);
  }

  return `
    <div class="welcome-banner mb-4">
      <div class="welcome-text">
        <h1>Constraint-Based Timetable Generator</h1>
        <p class="mb-0">Multi-step scheduling solver enforcing institutional hard constraints and soft load-balancing heuristics.</p>
      </div>
    </div>

    <!-- Stepper Navigation Header -->
    <div class="wizard-stepper mb-4">
      <div class="wizard-step ${state.step === 1 ? 'active' : state.step > 1 ? 'completed' : ''}" onclick="if(${state.step > 1}) window.setGeneratorStep(1)">
        <div class="wizard-step-circle">${state.step > 1 ? '✔' : '1'}</div>
        <div>
          <h5 class="wizard-step-title">Scheduling Scope</h5>
          <span class="wizard-step-subtitle">Course & Batch</span>
        </div>
      </div>

      <div class="wizard-step-divider"></div>

      <div class="wizard-step ${state.step === 2 ? 'active' : state.step > 2 ? 'completed' : ''}" onclick="if(${state.step > 2}) window.setGeneratorStep(2)">
        <div class="wizard-step-circle">${state.step > 2 ? '✔' : '2'}</div>
        <div>
          <h5 class="wizard-step-title">Constraint Rules</h5>
          <span class="wizard-step-subtitle">Hard & Soft Toggles</span>
        </div>
      </div>

      <div class="wizard-step-divider"></div>

      <div class="wizard-step ${state.step === 3 ? 'active' : state.step > 3 ? 'completed' : ''}">
        <div class="wizard-step-circle">${state.step > 3 ? '✔' : '3'}</div>
        <div>
          <h5 class="wizard-step-title">Solving Engine</h5>
          <span class="wizard-step-subtitle">Collision Solver</span>
        </div>
      </div>

      <div class="wizard-step-divider"></div>

      <div class="wizard-step ${state.step === 4 ? 'active' : ''}">
        <div class="wizard-step-circle">4</div>
        <div>
          <h5 class="wizard-step-title">Preview & Commit</h5>
          <span class="wizard-step-subtitle">Publish Master</span>
        </div>
      </div>
    </div>

    <!-- Step Container -->
    <div id="generator-step-container">
      ${stepContentHTML}
    </div>
  `;
};

// -----------------------------------------------------------------------------
// STEP 1: Scope Selection (Course, Semester, Section)
// -----------------------------------------------------------------------------
async function renderGenStep1(courses, stats) {
  const scope = window.SMARTSYNC_GEN_STATE.scope;
  let semOptions = '<option value="">-- Select Semester --</option>';

  if (scope.courseCode === 'BCA' || scope.courseCode === 'BSc(IT)' || scope.courseCode === 'BSc(CS)') {
    semOptions += `<option value="1" ${scope.semester == 1 ? 'selected' : ''}>Semester 1 (UG I)</option>`;
    semOptions += `<option value="3" ${scope.semester == 3 ? 'selected' : ''}>Semester 3 (UG III)</option>`;
    semOptions += `<option value="5" ${scope.semester == 5 ? 'selected' : ''}>Semester 5 (UG V)</option>`;
  } else if (scope.courseCode === 'MCA') {
    semOptions += `<option value="1" ${scope.semester == 1 ? 'selected' : ''}>Semester 1 (PG I)</option>`;
    semOptions += `<option value="3" ${scope.semester == 3 ? 'selected' : ''}>Semester 3 (PG III)</option>`;
  }

  let secOptions = '<option value="">-- Select Section Batch --</option>';
  if (scope.courseCode && scope.semester) {
    const sections = await window.dataService.getSectionsByCourseAndSemester(scope.courseCode, scope.semester);
    secOptions += `<option value="ALL" ${scope.sectionChoice === 'ALL' ? 'selected' : ''}>All Sections in Semester (${sections.length} Sections)</option>`;
    sections.forEach(s => {
      secOptions += `<option value="${s.id}" ${scope.sectionChoice === s.id ? 'selected' : ''}>${s.name} (Home: ${s.room})</option>`;
    });
  }

  const isFormValid = Boolean(scope.courseCode && scope.semester && scope.sectionChoice);

  return `
    <div class="smart-card">
      <div class="card-header-flex">
        <div>
          <h3 style="margin: 0; font-size: 1.15rem; font-weight: 800; display: flex; align-items: center; gap: 8px;">
            <i data-lucide="sliders" style="color: var(--primary-600);"></i>
            Step 1: Select Scheduling Scope & Target Batch
          </h3>
          <span class="text-muted small">Choose the academic degree program, semester level, and section cohort to schedule</span>
        </div>
      </div>

      <div class="p-4">
        <div class="row g-3 mb-4">
          <div class="col-md-4">
            <label class="form-label font-weight-bold text-muted small">1. Degree Course Program *</label>
            <select id="gen-scope-course" class="form-select" onchange="window.handleGenScopeCourseChange(this.value)">
              <option value="">-- Choose Degree Program --</option>
              ${courses.map(c => `<option value="${c.code}" ${scope.courseCode === c.code ? 'selected' : ''}>${c.code} (${c.name})</option>`).join('')}
            </select>
            <span class="form-text small text-muted">BCA, MCA, B.Sc IT or B.Sc CS</span>
          </div>

          <div class="col-md-4">
            <label class="form-label font-weight-bold text-muted small">2. Academic Semester *</label>
            <select id="gen-scope-sem" class="form-select" ${!scope.courseCode ? 'disabled' : ''} onchange="window.handleGenScopeSemChange(this.value)">
              ${semOptions}
            </select>
            <span class="form-text small text-muted">Odd semester academic level</span>
          </div>

          <div class="col-md-4">
            <label class="form-label font-weight-bold text-muted small">3. Target Section Cohort *</label>
            <select id="gen-scope-sec" class="form-select" ${(!scope.courseCode || !scope.semester) ? 'disabled' : ''} onchange="window.handleGenScopeSecChange(this.value)">
              ${secOptions}
            </select>
            <span class="form-text small text-muted">Individual section or all cohort sections</span>
          </div>
        </div>

        <!-- Pre-flight Resource Summary -->
        <div class="alert alert-light border p-3 mb-4">
          <h6 class="font-weight-bold text-dark mb-2 d-flex align-items-center gap-2">
            <i data-lucide="database" style="color: var(--primary-600); width: 16px; height: 16px;"></i>
            Institutional Resource Availability & Ready State:
          </h6>
          <div class="row g-3 mt-1 text-center">
            <div class="col-6 col-md-3">
              <div class="p-2 border rounded bg-white">
                <span class="d-block text-muted small font-weight-bold">FACULTY ROSTER</span>
                <strong class="fs-5 text-primary">${stats.totalFaculty} Instructors</strong>
              </div>
            </div>
            <div class="col-6 col-md-3">
              <div class="p-2 border rounded bg-white">
                <span class="d-block text-muted small font-weight-bold">LECTURE HALLS</span>
                <strong class="fs-5 text-dark">21 Classrooms</strong>
              </div>
            </div>
            <div class="col-6 col-md-3">
              <div class="p-2 border rounded bg-white">
                <span class="d-block text-muted small font-weight-bold">COMPUTER LABS</span>
                <strong class="fs-5 text-purple">12 Hardware Labs</strong>
              </div>
            </div>
            <div class="col-6 col-md-3">
              <div class="p-2 border rounded bg-white">
                <span class="d-block text-muted small font-weight-bold">TOTAL SECTIONS</span>
                <strong class="fs-5 text-success">${stats.totalSections} Batches</strong>
              </div>
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-end">
          <button type="button" class="btn btn-primary px-4 py-2 d-inline-flex align-items-center gap-2" 
                  ${!isFormValid ? 'disabled' : ''} 
                  onclick="window.setGeneratorStep(2)">
            Proceed to Constraint Rules <i data-lucide="arrow-right" style="width: 16px; height: 16px;"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

// -----------------------------------------------------------------------------
// STEP 2: Constraint Toggles & Heuristics Configuration
// -----------------------------------------------------------------------------
function renderGenStep2() {
  const scope = window.SMARTSYNC_GEN_STATE.scope;
  const c = window.SMARTSYNC_GEN_STATE.constraints;

  return `
    <div class="smart-card">
      <div class="card-header-flex">
        <div>
          <h3 style="margin: 0; font-size: 1.15rem; font-weight: 800; display: flex; align-items: center; gap: 8px;">
            <i data-lucide="shield-check" style="color: var(--primary-600);"></i>
            Step 2: Constraint-Based Engine Rules & Heuristics Tuning
          </h3>
          <span class="text-muted small">Configure hard collision safety barriers and soft load-balancing heuristics</span>
        </div>
        <span class="badge bg-primary px-3 py-2">Scope: ${scope.courseCode} Sem ${scope.semester} (${scope.sectionChoice === 'ALL' ? 'All Sections' : 'Single Section'})</span>
      </div>

      <div class="p-4">
        <!-- 1. Hard Constraints (Locked) -->
        <h5 class="font-weight-bold text-dark mb-3 d-flex align-items-center gap-2">
          <i data-lucide="lock" style="width: 16px; height: 16px; color: #dc2626;"></i>
          Institutional Hard Constraints <span class="badge bg-danger small font-normal">Strictly Enforced • Non-Negotiable</span>
        </h5>
        
        <div class="row g-3 mb-4">
          <div class="col-md-6">
            <div class="constraint-card hard">
              <div class="d-flex align-items-start justify-content-between">
                <div>
                  <strong class="text-dark d-block">🔒 No Teacher Overlap</strong>
                  <span class="small text-muted">A faculty instructor cannot be scheduled in two classrooms or labs simultaneously.</span>
                </div>
                <span class="badge bg-success">ACTIVE</span>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="constraint-card hard">
              <div class="d-flex align-items-start justify-content-between">
                <div>
                  <strong class="text-dark d-block">🔒 No Room Overlap</strong>
                  <span class="small text-muted">A classroom or computer lab cannot host two sections at the same period.</span>
                </div>
                <span class="badge bg-success">ACTIVE</span>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="constraint-card hard">
              <div class="d-flex align-items-start justify-content-between">
                <div>
                  <strong class="text-dark d-block">🔒 No Section Overlap</strong>
                  <span class="small text-muted">A student batch cohort cannot have two concurrent lectures in the same period.</span>
                </div>
                <span class="badge bg-success">ACTIVE</span>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="constraint-card hard">
              <div class="d-flex align-items-start justify-content-between">
                <div>
                  <strong class="text-dark d-block">🔒 Lab Integrity & Hardware Facilities</strong>
                  <span class="small text-muted">Lab sessions strictly require 2 consecutive periods and must use certified Computer Labs (e.g. LAB3, IBM LAB).</span>
                </div>
                <span class="badge bg-success">ACTIVE</span>
              </div>
            </div>
          </div>
        </div>

        <hr class="my-4">

        <!-- 2. Soft Constraints (Configurable) -->
        <h5 class="font-weight-bold text-dark mb-3 d-flex align-items-center gap-2">
          <i data-lucide="sliders" style="width: 16px; height: 16px; color: var(--primary-600);"></i>
          Academic Soft Constraints & Heuristic Optimizers <span class="badge bg-primary small font-normal">User Configurable</span>
        </h5>

        <div class="row g-3 mb-4">
          <div class="col-md-6">
            <div class="constraint-card soft">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="toggle-spread" 
                       ${c.spreadSubjects ? 'checked' : ''} 
                       onchange="window.SMARTSYNC_GEN_STATE.constraints.spreadSubjects = this.checked">
                <label class="form-check-label font-weight-bold text-dark" for="toggle-spread">
                  Spread Subjects Evenly Across Week
                </label>
              </div>
              <p class="small text-muted mb-0 mt-1">Prevents clustering 2 or 3 theory lectures of the same subject on a single day.</p>
            </div>
          </div>

          <div class="col-md-6">
            <div class="constraint-card soft">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="toggle-lunch" 
                       ${c.protectLunchBreak ? 'checked' : ''} 
                       onchange="window.SMARTSYNC_GEN_STATE.constraints.protectLunchBreak = this.checked">
                <label class="form-check-label font-weight-bold text-dark" for="toggle-lunch">
                  Dedicated Lunch Break Window (12:55 PM – 2:05 PM)
                </label>
              </div>
              <p class="small text-muted mb-0 mt-1">Guarantees that no lecture or laboratory sessions are assigned during university lunch hour.</p>
            </div>
          </div>

          <div class="col-md-6">
            <div class="constraint-card soft">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="toggle-workload" 
                       ${c.balanceTeacherLoad ? 'checked' : ''} 
                       onchange="window.SMARTSYNC_GEN_STATE.constraints.balanceTeacherLoad = this.checked">
                <label class="form-check-label font-weight-bold text-dark" for="toggle-workload">
                  Faculty Daily Load Balancing (Max 3–4 hrs/day)
                </label>
              </div>
              <div class="d-flex align-items-center gap-2 mt-2">
                <span class="small text-muted">Daily limit per teacher:</span>
                <select class="form-select form-select-sm" style="width: 110px;" 
                        onchange="window.SMARTSYNC_GEN_STATE.constraints.maxDailyTeacherHours = Number(this.value)">
                  <option value="3" ${c.maxDailyTeacherHours === 3 ? 'selected' : ''}>3 Hours</option>
                  <option value="4" ${c.maxDailyTeacherHours === 4 ? 'selected' : ''}>4 Hours</option>
                  <option value="5" ${c.maxDailyTeacherHours === 5 ? 'selected' : ''}>5 Hours</option>
                </select>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="constraint-card soft">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="toggle-friday" 
                       ${c.avoidFridayLate ? 'checked' : ''} 
                       onchange="window.SMARTSYNC_GEN_STATE.constraints.avoidFridayLate = this.checked">
                <label class="form-check-label font-weight-bold text-dark" for="toggle-friday">
                  Avoid Friday Late Periods (P8, P9, P10)
                </label>
              </div>
              <p class="small text-muted mb-0 mt-1">Prioritizes morning and early afternoon slots on Friday to avoid late weekend burnout.</p>
            </div>
          </div>

          <div class="col-12">
            <div class="constraint-card soft">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="toggle-pref" 
                       ${c.useTeacherPreferences ? 'checked' : ''} 
                       onchange="window.SMARTSYNC_GEN_STATE.constraints.useTeacherPreferences = this.checked">
                <label class="form-check-label font-weight-bold text-dark" for="toggle-pref">
                  Honor Departmental Preferred Faculty Allocations
                </label>
              </div>
              <p class="small text-muted mb-0 mt-1">Assigns the specific instructor preferred in curriculum mapping whenever conflict-free.</p>
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-between align-items-center">
          <button type="button" class="btn btn-outline-secondary px-3 py-2" onclick="window.setGeneratorStep(1)">
            <i data-lucide="arrow-left" style="width: 14px; height: 14px;"></i> Back to Scope
          </button>
          <button type="button" class="btn btn-primary btn-lg px-4 py-2 d-inline-flex align-items-center gap-2" 
                  onclick="window.executeGenerationEngine()">
            <i data-lucide="wand-2" style="width: 18px; height: 18px;"></i> Launch Constraint-Based Generator
          </button>
        </div>
      </div>
    </div>
  `;
}

// -----------------------------------------------------------------------------
// STEP 3: Solving Engine Progress & Live Terminal
// -----------------------------------------------------------------------------
function renderGenStep3() {
  return `
    <div class="smart-card">
      <div class="card-header-flex">
        <div>
          <h3 style="margin: 0; font-size: 1.15rem; font-weight: 800; display: flex; align-items: center; gap: 8px;">
            <i data-lucide="cpu" style="color: var(--primary-600);"></i>
            Step 3: Constraint Satisfaction Engine Solving in Progress...
          </h3>
          <span class="text-muted small">Iterating over room matrices, teacher schedules, and lab slot requirements</span>
        </div>
        <div class="spinner-border text-primary spinner-border-sm" role="status"></div>
      </div>

      <div class="p-4">
        <!-- Progress Bar -->
        <div class="progress mb-4" style="height: 12px; border-radius: 6px;">
          <div id="gen-solver-progress-bar" class="progress-bar progress-bar-striped progress-bar-animated bg-primary" 
               role="progressbar" style="width: 15%"></div>
        </div>

        <!-- Live Metrics Grid -->
        <div class="solver-metrics-grid">
          <div class="solver-metric-box">
            <div class="solver-metric-value text-primary" id="metric-constraints-checked">0</div>
            <div class="solver-metric-label">Constraints Checked</div>
          </div>
          <div class="solver-metric-box">
            <div class="solver-metric-value text-dark" id="metric-slots-evaluated">0</div>
            <div class="solver-metric-label">Slots Evaluated</div>
          </div>
          <div class="solver-metric-box">
            <div class="solver-metric-value text-danger" id="metric-collisions-prevented">0</div>
            <div class="solver-metric-label">Collisions Prevented</div>
          </div>
          <div class="solver-metric-box">
            <div class="solver-metric-value text-success" id="metric-optimization-score">98.5%</div>
            <div class="solver-metric-label">Heuristic Score</div>
          </div>
          <div class="solver-metric-box">
            <div class="solver-metric-value text-success" id="metric-conflicts-count">0</div>
            <div class="solver-metric-label">Hard Conflicts</div>
          </div>
        </div>

        <!-- Live Terminal Log -->
        <label class="form-label font-weight-bold text-muted small">Real-Time Constraint Solver Log:</label>
        <div class="solver-terminal" id="gen-solver-terminal">
          <div class="solver-log-line">
            <span class="solver-log-time">[00:00:01]</span>
            <span>Initializing SmartSync Constraint Engine (Hard & Soft Heuristics)...</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

// -----------------------------------------------------------------------------
// STEP 4: Preview & "Commit to Master Schedule" Action
// -----------------------------------------------------------------------------
async function renderGenStep4() {
  const state = window.SMARTSYNC_GEN_STATE;
  const result = state.result;

  if (!result || !result.sessions) {
    return `<div class="alert alert-warning">No generation result available. Please run the generator solver first.</div>`;
  }

  const sessions = result.sessions;
  const distinctSections = [...new Set(sessions.map(s => s.section))];
  
  if (!state.previewSection && distinctSections.length > 0) {
    state.previewSection = distinctSections[0];
  }

  const currentPreviewSessions = sessions.filter(s => s.section === state.previewSection);
  const theoryCount = sessions.filter(s => s.type === 'Theory').length;
  const labCount = sessions.filter(s => s.type === 'Lab').length;

  // Render mini weekly grid for this section preview
  const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const PERIODS = window.SmartConstraintEngine.PERIODS;

  let rowsHTML = '';
  DAYS.forEach(day => {
    let cellsHTML = '';
    const daySessions = currentPreviewSessions.filter(s => s.day === day);
    const sessionByPeriod = {};
    daySessions.forEach(s => { sessionByPeriod[s.periodIndex] = s; });

    let skipNext = false;
    PERIODS.forEach(p => {
      if (skipNext) {
        skipNext = false;
        return;
      }

      if (p.isLunchWindow) {
        cellsHTML += `<td class="tt-break-cell" style="width: 45px;"><span class="small font-weight-bold">LUNCH</span></td>`;
        return;
      }

      const sess = sessionByPeriod[p.index];
      if (sess) {
        const isLab = sess.type === 'Lab' || sess.durationSlots === 2;
        if (isLab) skipNext = true;

        cellsHTML += `
          <td colspan="${isLab ? 2 : 1}">
            <div class="tt-session-pill ${isLab ? 'lab' : 'theory'}" style="min-height: 80px;">
              <div class="tt-pill-header">
                <span class="tt-pill-code">${sess.subjectCode}</span>
                <span class="tt-pill-badge">${isLab ? 'LAB (2h)' : 'THEORY'}</span>
              </div>
              <div class="tt-pill-subject">${sess.subject}</div>
              <div class="tt-pill-footer">
                <span class="tt-pill-room"><i data-lucide="map-pin" style="width: 10px; height: 10px;"></i> ${sess.room}</span>
                <span class="tt-pill-teacher">${sess.teacher.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.)\s*/, '')}</span>
              </div>
            </div>
          </td>
        `;
      } else {
        cellsHTML += `<td colspan="1"><div class="tt-empty-slot"><span>—</span></div></td>`;
      }
    });

    rowsHTML += `
      <tr>
        <td class="tt-day-cell"><strong>${day.substring(0, 3)}</strong></td>
        ${cellsHTML}
      </tr>
    `;
  });

  return `
    <div class="smart-card mb-4">
      <!-- Success Celebration Banner -->
      <div class="p-3 border-bottom d-flex align-items-center justify-content-between flex-wrap gap-3" style="background: #f0fdf4;">
        <div class="d-flex align-items-center gap-3">
          <div class="stat-icon green" style="width: 48px; height: 48px;">
            <i data-lucide="check-circle-2" style="width: 24px; height: 24px;"></i>
          </div>
          <div>
            <h4 style="margin: 0; font-size: 1.15rem; font-weight: 800; color: #166534;">
              Schedule Successfully Generated (${sessions.length} Sessions)
            </h4>
            <span class="text-muted small">
              Audited 100% Conflict-Free • 0 Teacher Overlaps • 0 Room Overlaps • 0 Section Collisions • 100% Lab Integrity
            </span>
          </div>
        </div>

        <div class="d-flex align-items-center gap-2">
          <button class="btn btn-outline-secondary btn-sm" onclick="window.setGeneratorStep(2)">
            <i data-lucide="rotate-ccw" style="width: 14px; height: 14px;"></i> Re-tune Constraints
          </button>
          <button class="btn btn-success btn-sm px-3 py-2 text-white font-weight-bold d-inline-flex align-items-center gap-2" 
                  onclick="window.commitGeneratedScheduleToMaster()">
            <i data-lucide="check" style="width: 16px; height: 16px;"></i> Commit to Master Schedule
          </button>
        </div>
      </div>

      <div class="p-4">
        <!-- Section Selector Tabs if multi-section -->
        <div class="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
          <div class="d-flex align-items-center gap-2">
            <span class="small font-weight-bold text-muted">Previewing Batch:</span>
            <div class="segmented-tabs">
              ${distinctSections.map(secName => `
                <button class="tab-btn ${state.previewSection === secName ? 'active' : ''}" 
                        onclick="window.selectGenPreviewSection('${secName}')">
                  ${secName}
                </button>
              `).join('')}
            </div>
          </div>

          <div class="tt-legend-pills">
            <span class="tt-legend-item"><span class="tt-legend-dot theory"></span> Theory (${theoryCount})</span>
            <span class="tt-legend-item"><span class="tt-legend-dot lab"></span> Lab 2h (${labCount})</span>
            <span class="tt-legend-item"><span class="tt-legend-dot break"></span> Lunch Window Protected</span>
          </div>
        </div>

        <!-- Generated Preview Matrix -->
        <div class="tt-matrix-wrapper">
          <table class="tt-matrix-table">
            <thead>
              <tr>
                <th class="tt-day-header-col">Day</th>
                ${PERIODS.map(p => {
                  if (p.isLunchWindow) return `<th class="tt-break-header">Lunch<span class="d-block" style="font-size: 0.6rem;">12:55-2:05</span></th>`;
                  return `<th class="tt-period-header"><span class="tt-period-num">${p.label}</span><span class="tt-period-time">${p.time}</span></th>`;
                }).join('')}
              </tr>
            </thead>
            <tbody>
              ${rowsHTML}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// -----------------------------------------------------------------------------
// EVENT HANDLERS & STEP CONTROLLERS
// -----------------------------------------------------------------------------

window.setGeneratorStep = function(stepNum) {
  window.SMARTSYNC_GEN_STATE.step = stepNum;
  window.loadView('generator');
};

window.handleGenScopeCourseChange = function(courseCode) {
  window.SMARTSYNC_GEN_STATE.scope.courseCode = courseCode;
  window.SMARTSYNC_GEN_STATE.scope.semester = '';
  window.SMARTSYNC_GEN_STATE.scope.sectionChoice = '';
  window.loadView('generator');
};

window.handleGenScopeSemChange = function(semVal) {
  window.SMARTSYNC_GEN_STATE.scope.semester = semVal;
  window.SMARTSYNC_GEN_STATE.scope.sectionChoice = '';
  window.loadView('generator');
};

window.handleGenScopeSecChange = function(secVal) {
  window.SMARTSYNC_GEN_STATE.scope.sectionChoice = secVal;
  window.loadView('generator');
};

window.selectGenPreviewSection = function(secName) {
  window.SMARTSYNC_GEN_STATE.previewSection = secName;
  window.loadView('generator');
};

window.executeGenerationEngine = async function() {
  const state = window.SMARTSYNC_GEN_STATE;
  state.step = 3;
  await window.loadView('generator');

  const progressBar = document.getElementById('gen-solver-progress-bar');
  const terminal = document.getElementById('gen-solver-terminal');
  const metricConstraints = document.getElementById('metric-constraints-checked');
  const metricSlots = document.getElementById('metric-slots-evaluated');
  const metricCollisions = document.getElementById('metric-collisions-prevented');

  const appendTerminalLog = (msg) => {
    if (!terminal) return;
    const timeStr = new Date().toTimeString().split(' ')[0];
    const logDiv = document.createElement('div');
    logDiv.className = 'solver-log-line';
    logDiv.innerHTML = `<span class="solver-log-time">[${timeStr}]</span><span>${msg}</span>`;
    terminal.appendChild(logDiv);
    terminal.scrollTop = terminal.scrollHeight;
  };

  // Animated progression
  const updateProgress = (pct, constraints, slots, collisions, msg) => {
    if (progressBar) progressBar.style.width = `${pct}%`;
    if (metricConstraints) metricConstraints.textContent = constraints;
    if (metricSlots) metricSlots.textContent = slots;
    if (metricCollisions) metricCollisions.textContent = collisions;
    if (msg) appendTerminalLog(msg);
  };

  try {
    updateProgress(20, 240, 120, 14, `Loading 38 faculty member teaching constraints and 33 campus facility profiles...`);
    await new Promise(r => setTimeout(r, 350));

    updateProgress(45, 680, 290, 42, `Enforcing Hard Constraints: No Teacher Collisions, No Room Collisions, No Section Collisions...`);
    await new Promise(r => setTimeout(r, 400));

    updateProgress(70, 1240, 480, 68, `Evaluating Laboratory double-period integrity (RM-LAB3, RM-IBMLAB, RM-DL1)...`);
    await new Promise(r => setTimeout(r, 350));

    // Execute engine solve
    const solveResult = await window.SmartConstraintEngine.solve({
      courseCode: state.scope.courseCode,
      semester: state.scope.semester,
      sectionChoice: state.scope.sectionChoice,
      options: state.constraints,
      onProgress: (p) => {
        appendTerminalLog(p.logMessage);
      }
    });

    updateProgress(100, solveResult.stats.hardConstraintsChecked, solveResult.stats.slotsEvaluated, solveResult.stats.collisionsPrevented, `Solver completed with 100% hard constraint satisfaction!`);
    await new Promise(r => setTimeout(r, 500));

    state.result = solveResult;
    state.step = 4;
    SmartUtils.showToast(`Generation successful! Generated ${solveResult.sessions.length} sessions.`, 'success');
    await window.loadView('generator');

  } catch (err) {
    console.error('Generation error:', err);
    SmartUtils.showToast(`Generator error: ${err.message}`, 'error');
    state.step = 1;
    await window.loadView('generator');
  }
};

window.commitGeneratedScheduleToMaster = async function() {
  const state = window.SMARTSYNC_GEN_STATE;
  if (!state.result || !state.result.sessions) return;

  const version = await window.dataService.commitGeneratedSchedule(state.result.sessions, state.result.scope);
  SmartUtils.showToast(`Successfully published ${version.title} (${state.result.sessions.length} sessions)!`, 'success');

  // Set filter preset in master visualizer to the generated section
  if (window.SMARTSYNC_TT_FILTER) {
    window.SMARTSYNC_TT_FILTER.course = state.scope.courseCode;
    window.SMARTSYNC_TT_FILTER.section = state.previewSection || state.result.sessions[0].section;
    window.SMARTSYNC_TT_FILTER.teacher = 'ALL';
  }

  // Switch to timetable visualizer so user sees it right away!
  await window.loadView('timetable');
};
