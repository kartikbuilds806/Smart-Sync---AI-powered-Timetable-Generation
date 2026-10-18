/**
 * SmartSync Interactive Admin CRUD Modals & Management Tools (Phase 3)
 * Replaces all placeholder toasts with functional modals connected directly to dataService.js
 */

// Filter states for management directories
window.SMARTSYNC_MGMT_FILTERS = {
  teachers: { search: '', department: 'ALL' },
  rooms: { category: 'ALL', search: '' },
  sections: { course: 'ALL', semester: 'ALL', search: '' },
  subjects: { course: 'ALL', type: 'ALL', search: '' }
};

// Modal close helper
window.closeCrudModal = function() {
  const modal = document.getElementById('crud-modal-backdrop');
  if (modal) modal.remove();
};

// ==========================================================================
// 1. Course Modal (Add / Edit / Delete)
// ==========================================================================

window.openCourseModal = async function(courseId = null) {
  const isEdit = Boolean(courseId);
  let course = { code: '', name: '', degree: 'Undergraduate', durationYears: 3, totalSections: 0, description: '' };
  
  if (isEdit) {
    const found = await window.dataService.getCourseById(courseId);
    if (found) course = { ...found };
  }

  window.closeCrudModal();

  const modalHTML = `
    <div id="crud-modal-backdrop" class="tt-modal-backdrop" onclick="if(event.target === this) window.closeCrudModal()">
      <div class="tt-modal-dialog" style="max-width: 560px;">
        <div class="tt-modal-header" style="background: #eff6ff;">
          <div>
            <span class="badge bg-primary mb-1">${isEdit ? '✏️ Edit Degree Program' : '➕ Add Degree Program'}</span>
            <h3 style="margin: 0; font-size: 1.15rem; color: var(--text-primary); font-weight: 800;">
              ${isEdit ? `Edit Course: ${course.code}` : 'Create New Degree Course'}
            </h3>
          </div>
          <button type="button" class="btn-close" onclick="window.closeCrudModal()"></button>
        </div>

        <form onsubmit="window.saveCourseForm(event, '${course.id || ''}')">
          <div class="tt-modal-body">
            <div class="row g-3">
              <div class="col-md-5">
                <label class="form-label small font-weight-bold text-muted">Course Code *</label>
                <input type="text" id="course-code" class="form-control" required placeholder="e.g. BCA, MCA" 
                       value="${SmartUtils.escapeHTML(course.code)}" ${isEdit ? 'readonly' : ''}>
                <span class="form-text small text-muted">Unique acronym identifier</span>
              </div>

              <div class="col-md-7">
                <label class="form-label small font-weight-bold text-muted">Degree Type *</label>
                <select id="course-degree" class="form-select" required>
                  <option value="Undergraduate" ${course.degree === 'Undergraduate' ? 'selected' : ''}>Undergraduate (UG)</option>
                  <option value="Postgraduate" ${course.degree === 'Postgraduate' ? 'selected' : ''}>Postgraduate (PG)</option>
                  <option value="Diploma" ${course.degree === 'Diploma' ? 'selected' : ''}>Diploma</option>
                  <option value="Doctorate" ${course.degree === 'Doctorate' ? 'selected' : ''}>Doctorate (Ph.D)</option>
                </select>
              </div>

              <div class="col-12">
                <label class="form-label small font-weight-bold text-muted">Program Title *</label>
                <input type="text" id="course-name" class="form-control" required 
                       placeholder="e.g. Bachelor of Computer Applications" 
                       value="${SmartUtils.escapeHTML(course.name)}">
              </div>

              <div class="col-md-6">
                <label class="form-label small font-weight-bold text-muted">Duration (Years) *</label>
                <select id="course-duration" class="form-select" required>
                  <option value="1" ${course.durationYears == 1 ? 'selected' : ''}>1 Year</option>
                  <option value="2" ${course.durationYears == 2 ? 'selected' : ''}>2 Years</option>
                  <option value="3" ${course.durationYears == 3 ? 'selected' : ''}>3 Years</option>
                  <option value="4" ${course.durationYears == 4 ? 'selected' : ''}>4 Years</option>
                  <option value="5" ${course.durationYears == 5 ? 'selected' : ''}>5 Years</option>
                </select>
              </div>

              <div class="col-md-6">
                <label class="form-label small font-weight-bold text-muted">Total Sections</label>
                <input type="number" id="course-sections" class="form-control" min="0" max="60" 
                       value="${course.totalSections || 0}">
              </div>

              <div class="col-12">
                <label class="form-label small font-weight-bold text-muted">Curriculum Description</label>
                <textarea id="course-desc" class="form-control" rows="3" 
                          placeholder="Brief program description, specialization tracks, and core domains...">${SmartUtils.escapeHTML(course.description || '')}</textarea>
              </div>
            </div>
          </div>

          <div class="tt-modal-footer">
            <button type="button" class="btn btn-outline-secondary btn-sm" onclick="window.closeCrudModal()">Cancel</button>
            <button type="submit" class="btn btn-primary btn-sm d-inline-flex align-items-center gap-1">
              <i data-lucide="check" style="width: 14px; height: 14px;"></i> ${isEdit ? 'Save Changes' : 'Create Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
  if (window.lucide) lucide.createIcons();
};

window.saveCourseForm = async function(event, existingId) {
  event.preventDefault();
  const code = document.getElementById('course-code').value.trim().toUpperCase();
  const name = document.getElementById('course-name').value.trim();
  const degree = document.getElementById('course-degree').value;
  const durationYears = Number(document.getElementById('course-duration').value);
  const totalSections = Number(document.getElementById('course-sections').value) || 0;
  const description = document.getElementById('course-desc').value.trim();

  if (!code || !name) {
    SmartUtils.showToast('Please enter both course code and title', 'warning');
    return;
  }

  const courseData = { code, name, degree, durationYears, totalSections, description };

  if (existingId) {
    await window.dataService.updateCourse(existingId, courseData);
    SmartUtils.showToast(`Course "${code}" updated successfully!`, 'success');
  } else {
    await window.dataService.addCourse(courseData);
    SmartUtils.showToast(`New course "${code}" created successfully!`, 'success');
  }

  window.closeCrudModal();
  await window.loadView('courses');
};

// ==========================================================================
// 2. Section Modal (Add / Edit / Delete)
// ==========================================================================

window.openSectionModal = async function(sectionId = null) {
  const isEdit = Boolean(sectionId);
  let section = { name: '', courseCode: 'BCA', semester: 1, room: 'CR1', coordinator: 'Mrs. Geetika Sharma' };

  if (isEdit) {
    const found = await window.dataService.getSectionById(sectionId);
    if (found) section = { ...found };
  }

  const courses = await window.dataService.getCourses();
  const teachers = await window.dataService.getTeachers();
  const rooms = await window.dataService.getRooms();

  window.closeCrudModal();

  const coursesOptions = courses.map(c => 
    `<option value="${c.code}" ${section.courseCode === c.code ? 'selected' : ''}>${c.code} - ${c.name}</option>`
  ).join('');

  const roomsOptions = rooms.map(r => 
    `<option value="${r.code}" ${section.room === r.code ? 'selected' : ''}>${r.code} (${r.type} - Cap: ${r.capacity})</option>`
  ).join('');

  const teachersOptions = teachers.map(t => 
    `<option value="${t.name}" ${section.coordinator === t.name ? 'selected' : ''}>${t.name} (${t.department})</option>`
  ).join('');

  const modalHTML = `
    <div id="crud-modal-backdrop" class="tt-modal-backdrop" onclick="if(event.target === this) window.closeCrudModal()">
      <div class="tt-modal-dialog" style="max-width: 560px;">
        <div class="tt-modal-header" style="background: #faf5ff;">
          <div>
            <span class="badge bg-purple text-purple mb-1">${isEdit ? '✏️ Edit Section' : '➕ Add Class Section'}</span>
            <h3 style="margin: 0; font-size: 1.15rem; color: var(--text-primary); font-weight: 800;">
              ${isEdit ? `Edit Section: ${section.name}` : 'Create New Class Section'}
            </h3>
          </div>
          <button type="button" class="btn-close" onclick="window.closeCrudModal()"></button>
        </div>

        <form onsubmit="window.saveSectionForm(event, '${section.id || ''}')">
          <div class="tt-modal-body">
            <div class="row g-3">
              <div class="col-12">
                <label class="form-label small font-weight-bold text-muted">Section Name *</label>
                <input type="text" id="sec-name" class="form-control" required 
                       placeholder="e.g. BCA III G5, MCA I G5" 
                       value="${SmartUtils.escapeHTML(section.name)}">
                <span class="form-text small text-muted">Standard academic batch identifier used across timetables</span>
              </div>

              <div class="col-md-6">
                <label class="form-label small font-weight-bold text-muted">Degree Course *</label>
                <select id="sec-course" class="form-select" required>
                  ${coursesOptions}
                </select>
              </div>

              <div class="col-md-6">
                <label class="form-label small font-weight-bold text-muted">Semester *</label>
                <select id="sec-sem" class="form-select" required>
                  <option value="1" ${section.semester == 1 ? 'selected' : ''}>Semester 1 (1st Sem)</option>
                  <option value="2" ${section.semester == 2 ? 'selected' : ''}>Semester 2 (2nd Sem)</option>
                  <option value="3" ${section.semester == 3 ? 'selected' : ''}>Semester 3 (3rd Sem)</option>
                  <option value="4" ${section.semester == 4 ? 'selected' : ''}>Semester 4 (4th Sem)</option>
                  <option value="5" ${section.semester == 5 ? 'selected' : ''}>Semester 5 (5th Sem)</option>
                  <option value="6" ${section.semester == 6 ? 'selected' : ''}>Semester 6 (6th Sem)</option>
                </select>
              </div>

              <div class="col-12">
                <label class="form-label small font-weight-bold text-muted">Allocated Home Classroom / Lab</label>
                <select id="sec-room" class="form-select">
                  ${roomsOptions}
                </select>
                <span class="form-text small text-muted">Primary lecture room assigned to this batch</span>
              </div>

              <div class="col-12">
                <label class="form-label small font-weight-bold text-muted">Class Coordinator (Faculty Roster) *</label>
                <select id="sec-coordinator" class="form-select" required>
                  ${teachersOptions}
                </select>
                <span class="form-text small text-muted">Instructor in charge of academic coordination and attendance</span>
              </div>
            </div>
          </div>

          <div class="tt-modal-footer">
            <button type="button" class="btn btn-outline-secondary btn-sm" onclick="window.closeCrudModal()">Cancel</button>
            <button type="submit" class="btn btn-primary btn-sm d-inline-flex align-items-center gap-1">
              <i data-lucide="check" style="width: 14px; height: 14px;"></i> ${isEdit ? 'Save Changes' : 'Create Section'}
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
  if (window.lucide) lucide.createIcons();
};

window.saveSectionForm = async function(event, existingId) {
  event.preventDefault();
  const name = document.getElementById('sec-name').value.trim();
  const courseCode = document.getElementById('sec-course').value;
  const semester = Number(document.getElementById('sec-sem').value);
  const room = document.getElementById('sec-room').value;
  const coordinator = document.getElementById('sec-coordinator').value;

  if (!name) {
    SmartUtils.showToast('Please specify a section name', 'warning');
    return;
  }

  const sectionData = {
    name,
    courseCode,
    semester,
    semesterLabel: `Semester ${semester}`,
    room,
    coordinator
  };

  if (existingId) {
    await window.dataService.updateSection(existingId, sectionData);
    SmartUtils.showToast(`Section "${name}" updated successfully!`, 'success');
  } else {
    await window.dataService.addSection(sectionData);
    SmartUtils.showToast(`New section "${name}" created successfully!`, 'success');
  }

  window.closeCrudModal();
  await window.loadView('sections');
};

// ==========================================================================
// 3. Faculty / Teacher Modal (Add / Edit / Delete + Search & Filter)
// ==========================================================================

window.openTeacherModal = async function(teacherId = null) {
  const isEdit = Boolean(teacherId);
  let teacher = {
    name: '',
    designation: 'Assistant Professor',
    department: 'Computer Applications',
    email: '',
    phone: '',
    maxWorkloadHours: 16
  };

  if (isEdit) {
    const found = await window.dataService.getTeacherById(teacherId);
    if (found) teacher = { ...found };
  }

  window.closeCrudModal();

  const modalHTML = `
    <div id="crud-modal-backdrop" class="tt-modal-backdrop" onclick="if(event.target === this) window.closeCrudModal()">
      <div class="tt-modal-dialog" style="max-width: 560px;">
        <div class="tt-modal-header" style="background: #ecfdf5;">
          <div>
            <span class="badge bg-success mb-1">${isEdit ? '✏️ Edit Faculty Member' : '➕ Add Faculty Member'}</span>
            <h3 style="margin: 0; font-size: 1.15rem; color: var(--text-primary); font-weight: 800;">
              ${isEdit ? `Edit Profile: ${teacher.name}` : 'Register Faculty Instructor'}
            </h3>
          </div>
          <button type="button" class="btn-close" onclick="window.closeCrudModal()"></button>
        </div>

        <form onsubmit="window.saveTeacherForm(event, '${teacher.id || ''}')">
          <div class="tt-modal-body">
            <div class="row g-3">
              <div class="col-12">
                <label class="form-label small font-weight-bold text-muted">Full Name (with Title) *</label>
                <input type="text" id="tch-name" class="form-control" required 
                       placeholder="e.g. Dr. Bhawnesh Kumar, Mrs. Geetika Sharma" 
                       value="${SmartUtils.escapeHTML(teacher.name)}">
              </div>

              <div class="col-md-6">
                <label class="form-label small font-weight-bold text-muted">Academic Designation *</label>
                <select id="tch-desig" class="form-select" required>
                  <option value="Assistant Professor" ${teacher.designation === 'Assistant Professor' ? 'selected' : ''}>Assistant Professor</option>
                  <option value="Associate Professor" ${teacher.designation === 'Associate Professor' ? 'selected' : ''}>Associate Professor</option>
                  <option value="Professor" ${teacher.designation === 'Professor' ? 'selected' : ''}>Professor</option>
                  <option value="Professor & HOD" ${teacher.designation === 'Professor & HOD' ? 'selected' : ''}>Professor & HOD</option>
                  <option value="Lab Instructor" ${teacher.designation === 'Lab Instructor' ? 'selected' : ''}>Lab Instructor</option>
                </select>
              </div>

              <div class="col-md-6">
                <label class="form-label small font-weight-bold text-muted">Department / Branch *</label>
                <select id="tch-dept" class="form-select" required>
                  <option value="Computer Applications" ${teacher.department === 'Computer Applications' ? 'selected' : ''}>Computer Applications</option>
                  <option value="Computer Science" ${teacher.department === 'Computer Science' ? 'selected' : ''}>Computer Science</option>
                  <option value="AI & Data Science" ${teacher.department === 'AI & Data Science' ? 'selected' : ''}>AI & Data Science</option>
                  <option value="Mathematics / CS" ${teacher.department === 'Mathematics / CS' ? 'selected' : ''}>Mathematics / CS</option>
                  <option value="English & Humanities" ${teacher.department === 'English & Humanities' ? 'selected' : ''}>English & Humanities</option>
                  <option value="Cloud Computing" ${teacher.department === 'Cloud Computing' ? 'selected' : ''}>Cloud Computing</option>
                  <option value="Career Success" ${teacher.department === 'Career Success' ? 'selected' : ''}>Career Success</option>
                </select>
              </div>

              <div class="col-md-7">
                <label class="form-label small font-weight-bold text-muted">University Email Address *</label>
                <input type="email" id="tch-email" class="form-control" required 
                       placeholder="e.g. faculty.name@gehu.ac.in" 
                       value="${SmartUtils.escapeHTML(teacher.email)}">
              </div>

              <div class="col-md-5">
                <label class="form-label small font-weight-bold text-muted">Contact Phone</label>
                <input type="text" id="tch-phone" class="form-control" 
                       placeholder="+91 9876543210" 
                       value="${SmartUtils.escapeHTML(teacher.phone || '')}">
              </div>

              <div class="col-12">
                <label class="form-label small font-weight-bold text-muted">Max Weekly Workload (Contact Hours/Week)</label>
                <input type="number" id="tch-workload" class="form-control" min="4" max="30" 
                       value="${teacher.maxWorkloadHours || 16}">
                <span class="form-text small text-muted">Scheduler limit to prevent faculty overloading (typically 12 - 18 hrs/week)</span>
              </div>
            </div>
          </div>

          <div class="tt-modal-footer">
            <button type="button" class="btn btn-outline-secondary btn-sm" onclick="window.closeCrudModal()">Cancel</button>
            <button type="submit" class="btn btn-success btn-sm d-inline-flex align-items-center gap-1 text-white">
              <i data-lucide="check" style="width: 14px; height: 14px;"></i> ${isEdit ? 'Save Changes' : 'Register Faculty'}
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
  if (window.lucide) lucide.createIcons();
};

window.saveTeacherForm = async function(event, existingId) {
  event.preventDefault();
  const name = document.getElementById('tch-name').value.trim();
  const designation = document.getElementById('tch-desig').value;
  const department = document.getElementById('tch-dept').value;
  const email = document.getElementById('tch-email').value.trim();
  const phone = document.getElementById('tch-phone').value.trim();
  const maxWorkloadHours = Number(document.getElementById('tch-workload').value) || 16;

  if (!name || !email) {
    SmartUtils.showToast('Please provide both faculty name and official email', 'warning');
    return;
  }

  const teacherData = { name, designation, department, email, phone, maxWorkloadHours };

  if (existingId) {
    await window.dataService.updateTeacher(existingId, teacherData);
    SmartUtils.showToast(`Faculty "${name}" updated successfully!`, 'success');
  } else {
    await window.dataService.addTeacher(teacherData);
    SmartUtils.showToast(`New faculty "${name}" registered successfully!`, 'success');
  }

  window.closeCrudModal();
  await window.loadView('teachers');
};

// ==========================================================================
// 4. Room & Lab Facility Modal (Add / Edit / Delete + Category Filter)
// ==========================================================================

window.openRoomModal = async function(roomId = null) {
  const isEdit = Boolean(roomId);
  let room = {
    code: '',
    category: 'Hall',
    type: 'Classroom',
    capacity: 60,
    building: 'Main Academic Block'
  };

  if (isEdit) {
    const found = await window.dataService.getRoomById(roomId);
    if (found) room = { ...found };
  }

  window.closeCrudModal();

  const modalHTML = `
    <div id="crud-modal-backdrop" class="tt-modal-backdrop" onclick="if(event.target === this) window.closeCrudModal()">
      <div class="tt-modal-dialog" style="max-width: 560px;">
        <div class="tt-modal-header" style="background: #fff7ed;">
          <div>
            <span class="badge bg-warning text-dark mb-1">${isEdit ? '✏️ Edit Facility' : '➕ Add Facility'}</span>
            <h3 style="margin: 0; font-size: 1.15rem; color: var(--text-primary); font-weight: 800;">
              ${isEdit ? `Edit Room: ${room.code}` : 'Register Campus Room or Lab'}
            </h3>
          </div>
          <button type="button" class="btn-close" onclick="window.closeCrudModal()"></button>
        </div>

        <form onsubmit="window.saveRoomForm(event, '${room.id || ''}')">
          <div class="tt-modal-body">
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label small font-weight-bold text-muted">Room Code / Number *</label>
                <input type="text" id="rm-code" class="form-control" required 
                       placeholder="e.g. LT-3, NCR1, IBM LAB" 
                       value="${SmartUtils.escapeHTML(room.code)}">
                <span class="form-text small text-muted">Official university room code</span>
              </div>

              <div class="col-md-6">
                <label class="form-label small font-weight-bold text-muted">Category *</label>
                <select id="rm-cat" class="form-select" required onchange="window.updateRoomTypeOptions(this.value)">
                  <option value="Hall" ${room.category === 'Hall' ? 'selected' : ''}>Classroom / Lecture Theater</option>
                  <option value="Lab" ${room.category === 'Lab' ? 'selected' : ''}>Computer Laboratory</option>
                </select>
              </div>

              <div class="col-md-6">
                <label class="form-label small font-weight-bold text-muted">Specific Facility Type *</label>
                <select id="rm-type" class="form-select" required>
                  <option value="Lecture Theater" ${room.type === 'Lecture Theater' ? 'selected' : ''}>Lecture Theater</option>
                  <option value="Classroom" ${room.type === 'Classroom' ? 'selected' : ''}>Classroom</option>
                  <option value="Computer Lab" ${room.type === 'Computer Lab' ? 'selected' : ''}>Computer Lab</option>
                  <option value="Specialized Lab" ${room.type === 'Specialized Lab' ? 'selected' : ''}>Specialized Lab (IBM/AI)</option>
                </select>
              </div>

              <div class="col-md-6">
                <label class="form-label small font-weight-bold text-muted">Capacity (Seats/Terminals) *</label>
                <input type="number" id="rm-capacity" class="form-control" min="10" max="300" required 
                       value="${room.capacity || 60}">
              </div>

              <div class="col-12">
                <label class="form-label small font-weight-bold text-muted">Campus Building / Floor *</label>
                <input type="text" id="rm-building" class="form-control" required 
                       placeholder="e.g. New Academic Block, Central Lecture Complex, IT Building 3rd Fl" 
                       value="${SmartUtils.escapeHTML(room.building || '')}">
              </div>
            </div>
          </div>

          <div class="tt-modal-footer">
            <button type="button" class="btn btn-outline-secondary btn-sm" onclick="window.closeCrudModal()">Cancel</button>
            <button type="submit" class="btn btn-primary btn-sm d-inline-flex align-items-center gap-1">
              <i data-lucide="check" style="width: 14px; height: 14px;"></i> ${isEdit ? 'Save Changes' : 'Register Facility'}
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
  if (window.lucide) lucide.createIcons();
};

window.updateRoomTypeOptions = function(cat) {
  const typeSelect = document.getElementById('rm-type');
  if (!typeSelect) return;
  if (cat === 'Lab') {
    typeSelect.innerHTML = `
      <option value="Computer Lab">Computer Lab</option>
      <option value="Specialized Lab">Specialized Lab (IBM / Param / AI)</option>
    `;
  } else {
    typeSelect.innerHTML = `
      <option value="Lecture Theater">Lecture Theater</option>
      <option value="Classroom">Classroom</option>
    `;
  }
};

window.saveRoomForm = async function(event, existingId) {
  event.preventDefault();
  const code = document.getElementById('rm-code').value.trim();
  const category = document.getElementById('rm-cat').value;
  const type = document.getElementById('rm-type').value;
  const capacity = Number(document.getElementById('rm-capacity').value) || 60;
  const building = document.getElementById('rm-building').value.trim();

  if (!code) {
    SmartUtils.showToast('Please specify a room code', 'warning');
    return;
  }

  const roomData = { code, category, type, capacity, building };

  if (existingId) {
    await window.dataService.updateRoom(existingId, roomData);
    SmartUtils.showToast(`Facility "${code}" updated successfully!`, 'success');
  } else {
    await window.dataService.addRoom(roomData);
    SmartUtils.showToast(`New facility "${code}" registered successfully!`, 'success');
  }

  window.closeCrudModal();
  await window.loadView('rooms');
};

// ==========================================================================
// 5. Subject Modal (Add / Edit / Delete + Faculty Allocation & Lab Req)
// ==========================================================================

window.openSubjectModal = async function(subjectId = null) {
  const isEdit = Boolean(subjectId);
  let subject = {
    code: '',
    name: '',
    course: 'BCA',
    type: 'Theory',
    classesPerWeek: 3,
    department: 'Computer Applications',
    preferredFaculty: 'Mrs. Geetika Sharma',
    labRequirements: 'None (Classroom)'
  };

  if (isEdit) {
    const found = await window.dataService.getSubjectById(subjectId);
    if (found) subject = { ...found };
  }

  const courses = await window.dataService.getCourses();
  const teachers = await window.dataService.getTeachers();

  window.closeCrudModal();

  const coursesOptions = courses.map(c => 
    `<option value="${c.code}" ${subject.course === c.code ? 'selected' : ''}>${c.code} (${c.degree})</option>`
  ).join('');

  const teachersOptions = ['<option value="">-- No Specific Preference --</option>'].concat(teachers.map(t => 
    `<option value="${t.name}" ${subject.preferredFaculty === t.name ? 'selected' : ''}>${t.name} (${t.department})</option>`
  )).join('');

  const modalHTML = `
    <div id="crud-modal-backdrop" class="tt-modal-backdrop" onclick="if(event.target === this) window.closeCrudModal()">
      <div class="tt-modal-dialog" style="max-width: 580px;">
        <div class="tt-modal-header" style="background: #f0fdf4;">
          <div>
            <span class="badge bg-primary mb-1">${isEdit ? '✏️ Edit Curriculum Subject' : '➕ Add Curriculum Subject'}</span>
            <h3 style="margin: 0; font-size: 1.15rem; color: var(--text-primary); font-weight: 800;">
              ${isEdit ? `Edit Subject: ${subject.code}` : 'Map New Curriculum Subject'}
            </h3>
          </div>
          <button type="button" class="btn-close" onclick="window.closeCrudModal()"></button>
        </div>

        <form onsubmit="window.saveSubjectForm(event, '${subject.id || ''}')">
          <div class="tt-modal-body">
            <div class="row g-3">
              <div class="col-md-5">
                <label class="form-label small font-weight-bold text-muted">Subject Code *</label>
                <input type="text" id="sub-code" class="form-control" required 
                       placeholder="e.g. TBC305, PMC304" 
                       value="${SmartUtils.escapeHTML(subject.code)}">
                <span class="form-text small text-muted">Prefix T=Theory, P=Lab</span>
              </div>

              <div class="col-md-7">
                <label class="form-label small font-weight-bold text-muted">Degree Course *</label>
                <select id="sub-course" class="form-select" required>
                  ${coursesOptions}
                </select>
              </div>

              <div class="col-12">
                <label class="form-label small font-weight-bold text-muted">Subject Title *</label>
                <input type="text" id="sub-name" class="form-control" required 
                       placeholder="e.g. Design & Analysis of Algorithms" 
                       value="${SmartUtils.escapeHTML(subject.name)}">
              </div>

              <div class="col-md-6">
                <label class="form-label small font-weight-bold text-muted">Subject Type *</label>
                <select id="sub-type" class="form-select" required onchange="window.handleSubjectTypeChange(this.value)">
                  <option value="Theory" ${subject.type === 'Theory' ? 'selected' : ''}>Theory (1 slot/period)</option>
                  <option value="Lab" ${subject.type === 'Lab' ? 'selected' : ''}>Laboratory (2 consecutive slots)</option>
                </select>
              </div>

              <div class="col-md-6">
                <label class="form-label small font-weight-bold text-muted">Contact Periods / Week *</label>
                <input type="number" id="sub-periods" class="form-control" min="1" max="10" required 
                       value="${subject.classesPerWeek || 3}">
              </div>

              <div class="col-12">
                <label class="form-label small font-weight-bold text-muted">Teaching Department *</label>
                <select id="sub-dept" class="form-select" required>
                  <option value="Computer Applications" ${subject.department === 'Computer Applications' ? 'selected' : ''}>Computer Applications</option>
                  <option value="Computer Science" ${subject.department === 'Computer Science' ? 'selected' : ''}>Computer Science</option>
                  <option value="AI & Data Science" ${subject.department === 'AI & Data Science' ? 'selected' : ''}>AI & Data Science</option>
                  <option value="Mathematics / CS" ${subject.department === 'Mathematics / CS' ? 'selected' : ''}>Mathematics / CS</option>
                  <option value="English & Humanities" ${subject.department === 'English & Humanities' ? 'selected' : ''}>English & Humanities</option>
                </select>
              </div>

              <div class="col-12">
                <label class="form-label small font-weight-bold text-muted">Allocate Preferred Faculty Instructor</label>
                <select id="sub-faculty" class="form-select">
                  ${teachersOptions}
                </select>
                <span class="form-text small text-muted">Primary instructor assigned by Department Coordinator</span>
              </div>

              <div class="col-12">
                <label class="form-label small font-weight-bold text-muted">Laboratory Requirements</label>
                <select id="sub-lab-req" class="form-select">
                  <option value="None (Classroom)" ${subject.labRequirements === 'None (Classroom)' ? 'selected' : ''}>None (Standard Lecture Classroom)</option>
                  <option value="Computer Lab (60 Terminals)" ${subject.labRequirements === 'Computer Lab (60 Terminals)' ? 'selected' : ''}>Computer Lab (60 High-End Terminals)</option>
                  <option value="Digital Lab (DL1/DL2)" ${subject.labRequirements === 'Digital Lab (DL1/DL2)' ? 'selected' : ''}>Digital Technology Lab (DL1/DL2)</option>
                  <option value="IBM Specialized Lab" ${subject.labRequirements === 'IBM Specialized Lab' ? 'selected' : ''}>IBM Specialized Cloud & AI Lab</option>
                  <option value="Param Computing Lab" ${subject.labRequirements === 'Param Computing Lab' ? 'selected' : ''}>Param Supercomputing Laboratory</option>
                </select>
              </div>
            </div>
          </div>

          <div class="tt-modal-footer">
            <button type="button" class="btn btn-outline-secondary btn-sm" onclick="window.closeCrudModal()">Cancel</button>
            <button type="submit" class="btn btn-primary btn-sm d-inline-flex align-items-center gap-1">
              <i data-lucide="check" style="width: 14px; height: 14px;"></i> ${isEdit ? 'Save Changes' : 'Map Subject'}
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
  if (window.lucide) lucide.createIcons();
};

window.handleSubjectTypeChange = function(type) {
  const labReqSelect = document.getElementById('sub-lab-req');
  const periodsInput = document.getElementById('sub-periods');
  if (type === 'Lab') {
    if (labReqSelect && labReqSelect.value === 'None (Classroom)') {
      labReqSelect.value = 'Computer Lab (60 Terminals)';
    }
    if (periodsInput && periodsInput.value == 3) {
      periodsInput.value = 2;
    }
  } else {
    if (labReqSelect) {
      labReqSelect.value = 'None (Classroom)';
    }
    if (periodsInput && periodsInput.value == 2) {
      periodsInput.value = 4;
    }
  }
};

window.saveSubjectForm = async function(event, existingId) {
  event.preventDefault();
  const code = document.getElementById('sub-code').value.trim().toUpperCase();
  const name = document.getElementById('sub-name').value.trim();
  const course = document.getElementById('sub-course').value;
  const type = document.getElementById('sub-type').value;
  const classesPerWeek = Number(document.getElementById('sub-periods').value) || 3;
  const department = document.getElementById('sub-dept').value;
  const preferredFaculty = document.getElementById('sub-faculty').value;
  const labRequirements = document.getElementById('sub-lab-req').value;

  if (!code || !name) {
    SmartUtils.showToast('Please enter both subject code and title', 'warning');
    return;
  }

  const subjectData = {
    code,
    name,
    course,
    type,
    classesPerWeek,
    department,
    preferredFaculty,
    labRequirements
  };

  if (existingId) {
    await window.dataService.updateSubject(existingId, subjectData);
    SmartUtils.showToast(`Subject "${code}" updated successfully!`, 'success');
  } else {
    await window.dataService.addSubject(subjectData);
    SmartUtils.showToast(`New subject "${code}" mapped successfully!`, 'success');
  }

  window.closeCrudModal();
  await window.loadView('subjects');
};

// ==========================================================================
// 6. Universal Delete Confirmation Modal
// ==========================================================================

window.openDeleteModal = function(entityType, entityId, entityName) {
  window.closeCrudModal();

  const labels = {
    course: 'Degree Course',
    section: 'Class Section',
    teacher: 'Faculty Member',
    room: 'Room / Facility',
    subject: 'Curriculum Subject'
  };

  const label = labels[entityType] || 'Record';

  const modalHTML = `
    <div id="crud-modal-backdrop" class="tt-modal-backdrop" onclick="if(event.target === this) window.closeCrudModal()">
      <div class="tt-modal-dialog" style="max-width: 460px;">
        <div class="tt-modal-header" style="background: #fef2f2;">
          <div class="d-flex align-items-center gap-2 text-danger">
            <i data-lucide="alert-triangle" style="width: 22px; height: 22px;"></i>
            <h3 style="margin: 0; font-size: 1.1rem; color: #991b1b; font-weight: 800;">
              Confirm Deletion
            </h3>
          </div>
          <button type="button" class="btn-close" onclick="window.closeCrudModal()"></button>
        </div>

        <div class="tt-modal-body">
          <p class="mb-2">Are you sure you want to delete this <strong>${label}</strong>?</p>
          <div class="p-3 border rounded bg-light mb-3">
            <strong class="text-dark">${SmartUtils.escapeHTML(entityName)}</strong>
            <span class="d-block small text-muted mt-1">ID: <code>${SmartUtils.escapeHTML(entityId)}</code></span>
          </div>
          <div class="alert alert-warning small mb-0 py-2">
            <i data-lucide="info" style="width: 14px; height: 14px;"></i>
            This record will be removed from system storage and all associated timetable references.
          </div>
        </div>

        <div class="tt-modal-footer">
          <button type="button" class="btn btn-outline-secondary btn-sm" onclick="window.closeCrudModal()">Cancel</button>
          <button type="button" class="btn btn-danger btn-sm d-inline-flex align-items-center gap-1" 
                  onclick="window.confirmDelete('${entityType}', '${entityId}')">
            <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i> Delete Record
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
  if (window.lucide) lucide.createIcons();
};

window.confirmDelete = async function(entityType, entityId) {
  let viewToReload = 'dashboard';

  switch (entityType) {
    case 'course':
      await window.dataService.deleteCourse(entityId);
      SmartUtils.showToast('Course successfully deleted', 'success');
      viewToReload = 'courses';
      break;
    case 'section':
      await window.dataService.deleteSection(entityId);
      SmartUtils.showToast('Section successfully deleted', 'success');
      viewToReload = 'sections';
      break;
    case 'teacher':
      await window.dataService.deleteTeacher(entityId);
      SmartUtils.showToast('Faculty member successfully removed', 'success');
      viewToReload = 'teachers';
      break;
    case 'room':
      await window.dataService.deleteRoom(entityId);
      SmartUtils.showToast('Room facility successfully removed', 'success');
      viewToReload = 'rooms';
      break;
    case 'subject':
      await window.dataService.deleteSubject(entityId);
      SmartUtils.showToast('Subject successfully removed', 'success');
      viewToReload = 'subjects';
      break;
  }

  window.closeCrudModal();
  await window.loadView(viewToReload);
};

// ==========================================================================
// 7. Interactive Filter Handlers for Management Directories
// ==========================================================================

window.handleTeacherFilter = function(searchVal, deptVal) {
  if (searchVal !== undefined) window.SMARTSYNC_MGMT_FILTERS.teachers.search = searchVal;
  if (deptVal !== undefined) window.SMARTSYNC_MGMT_FILTERS.teachers.department = deptVal;
  window.loadView('teachers');
};

window.handleRoomCategoryFilter = function(categoryVal, searchVal) {
  if (categoryVal !== undefined) window.SMARTSYNC_MGMT_FILTERS.rooms.category = categoryVal;
  if (searchVal !== undefined) window.SMARTSYNC_MGMT_FILTERS.rooms.search = searchVal;
  window.loadView('rooms');
};

window.handleSectionFilter = function(courseVal, semVal, searchVal) {
  if (courseVal !== undefined) window.SMARTSYNC_MGMT_FILTERS.sections.course = courseVal;
  if (semVal !== undefined) window.SMARTSYNC_MGMT_FILTERS.sections.semester = semVal;
  if (searchVal !== undefined) window.SMARTSYNC_MGMT_FILTERS.sections.search = searchVal;
  window.loadView('sections');
};

window.handleSubjectFilter = function(courseVal, typeVal, searchVal) {
  if (courseVal !== undefined) window.SMARTSYNC_MGMT_FILTERS.subjects.course = courseVal;
  if (typeVal !== undefined) window.SMARTSYNC_MGMT_FILTERS.subjects.type = typeVal;
  if (searchVal !== undefined) window.SMARTSYNC_MGMT_FILTERS.subjects.search = searchVal;
  window.loadView('subjects');
};
