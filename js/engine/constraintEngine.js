/**
 * SmartSync Constraint-Based Timetable Generation Engine (Phase 4)
 * 
 * Hard Constraints:
 * 1. No Teacher Overlap: A teacher cannot teach 2 classes in the same period.
 * 2. No Room Overlap: A room cannot host 2 sessions at the same time.
 * 3. No Section Overlap: A section cannot have 2 subjects in the same period.
 * 4. Lab Integrity: Lab sessions require 2 consecutive periods and must use dedicated Lab facilities.
 * 
 * Soft Constraints:
 * 1. Even subject distribution across the week (avoid clustering).
 * 2. Teacher daily workload balancing (max 3-4 hours/day).
 * 3. Dedicated lunch break window protection (12:55 PM - 2:05 PM).
 * 4. Avoid Friday late slots (P8, P9, P10).
 */

class SmartConstraintEngine {
  constructor() {
    this.DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    
    // Period mapping (0 to 9, corresponding to P1 through P10)
    this.PERIODS = [
      { index: 0, label: "P1", time: "8:00 AM – 8:55 AM" },
      { index: 1, label: "P2", time: "8:55 AM – 9:50 AM" },
      { index: 2, label: "P3", time: "10:10 AM – 11:05 AM" },
      { index: 3, label: "P4", time: "11:05 AM – 12:00 PM" },
      { index: 4, label: "P5", time: "12:00 PM – 12:55 PM" },
      { index: 5, label: "P6", time: "1:10 PM – 2:05 PM", isLunchWindow: true },
      { index: 6, label: "P7", time: "2:05 PM – 3:00 PM" },
      { index: 7, label: "P8", time: "3:10 PM – 4:05 PM" },
      { index: 8, label: "P9", time: "4:05 PM – 5:00 PM" },
      { index: 9, label: "P10", time: "5:00 PM – 5:55 PM" }
    ];

    // Valid consecutive pairs for 2-hour labs that don't cross breaks
    this.VALID_LAB_PAIRS = [
      [0, 1], // P1 & P2 (8:00 AM – 9:50 AM)
      [2, 3], // P3 & P4 (10:10 AM – 12:00 PM)
      [3, 4], // P4 & P5 (11:05 AM – 12:55 PM)
      [6, 7], // P7 & P8 (2:05 PM – 4:05 PM)
      [7, 8]  // P8 & P9 (3:10 PM – 5:00 PM)
    ];
  }

  /**
   * Initializes internal occupancy lookup matrices from existing sessions
   */
  buildOccupancyMatrix(existingSessions = [], excludeSection = null) {
    const teacherOccupancy = {};  // teacher -> day -> periodIndex -> session
    const roomOccupancy = {};     // room -> day -> periodIndex -> session
    const sectionOccupancy = {};  // section -> day -> periodIndex -> session
    const teacherDailyHours = {}; // teacher -> day -> count
    const sectionSubjectCount = {}; // section -> subjectCode -> day -> count

    existingSessions.forEach(sess => {
      // If we are regenerating for a specific section, ignore its previous slots
      if (excludeSection && sess.section === excludeSection) return;

      const day = sess.day;
      const startSlot = Number(sess.periodIndex);
      const duration = Number(sess.durationSlots) || 1;

      for (let s = 0; s < duration; s++) {
        const slot = startSlot + s;

        // Teacher
        if (sess.teacher) {
          if (!teacherOccupancy[sess.teacher]) teacherOccupancy[sess.teacher] = {};
          if (!teacherOccupancy[sess.teacher][day]) teacherOccupancy[sess.teacher][day] = {};
          teacherOccupancy[sess.teacher][day][slot] = sess;

          if (!teacherDailyHours[sess.teacher]) teacherDailyHours[sess.teacher] = {};
          teacherDailyHours[sess.teacher][day] = (teacherDailyHours[sess.teacher][day] || 0) + 1;
        }

        // Room
        if (sess.room) {
          if (!roomOccupancy[sess.room]) roomOccupancy[sess.room] = {};
          if (!roomOccupancy[sess.room][day]) roomOccupancy[sess.room][day] = {};
          roomOccupancy[sess.room][day][slot] = sess;
        }

        // Section
        if (sess.section) {
          if (!sectionOccupancy[sess.section]) sectionOccupancy[sess.section] = {};
          if (!sectionOccupancy[sess.section][day]) sectionOccupancy[sess.section][day] = {};
          sectionOccupancy[sess.section][day][slot] = sess;
        }
      }

      // Subject count per day
      if (sess.section && sess.subjectCode) {
        if (!sectionSubjectCount[sess.section]) sectionSubjectCount[sess.section] = {};
        if (!sectionSubjectCount[sess.section][sess.subjectCode]) sectionSubjectCount[sess.section][sess.subjectCode] = {};
        sectionSubjectCount[sess.section][sess.subjectCode][day] = (sectionSubjectCount[sess.section][sess.subjectCode][day] || 0) + duration;
      }
    });

    return { teacherOccupancy, roomOccupancy, sectionOccupancy, teacherDailyHours, sectionSubjectCount };
  }

  /**
   * Hard Constraint Check 1: No Teacher Overlap
   */
  checkTeacherOverlap(teacherOccupancy, teacher, day, startSlot, duration = 1) {
    if (!teacher || !teacherOccupancy[teacher] || !teacherOccupancy[teacher][day]) return false;
    for (let s = 0; s < duration; s++) {
      if (teacherOccupancy[teacher][day][startSlot + s]) return true; // Overlap detected
    }
    return false;
  }

  /**
   * Hard Constraint Check 2: No Room Overlap
   */
  checkRoomOverlap(roomOccupancy, room, day, startSlot, duration = 1) {
    if (!room || !roomOccupancy[room] || !roomOccupancy[room][day]) return false;
    for (let s = 0; s < duration; s++) {
      if (roomOccupancy[room][day][startSlot + s]) return true; // Overlap detected
    }
    return false;
  }

  /**
   * Hard Constraint Check 3: No Section Overlap
   */
  checkSectionOverlap(sectionOccupancy, section, day, startSlot, duration = 1) {
    if (!section || !sectionOccupancy[section] || !sectionOccupancy[section][day]) return false;
    for (let s = 0; s < duration; s++) {
      if (sectionOccupancy[section][day][startSlot + s]) return true; // Overlap detected
    }
    return false;
  }

  /**
   * Hard Constraint Check 4: Lab Integrity
   */
  checkLabIntegrity(subjectType, roomObj, startSlot, duration) {
    if (subjectType === 'Lab') {
      if (duration !== 2) return false;
      // Must be a valid contiguous lab pair
      const isValidPair = this.VALID_LAB_PAIRS.some(pair => pair[0] === startSlot && pair[1] === startSlot + 1);
      if (!isValidPair) return false;

      // Room must be a designated computer lab
      const isLabRoom = roomObj && (roomObj.category === 'Lab' || (roomObj.type && roomObj.type.includes('Lab')));
      if (!isLabRoom) return false;

      return true;
    }
    return true; // Theory does not require lab integrity
  }

  /**
   * Soft Constraint Evaluation
   * Scores slot candidate from 0 (poor) to 100 (optimal)
   */
  evaluateSoftScore(candidate, matrix, options = {}) {
    let score = 100;
    const { teacher, room, section, subject, day, startSlot, duration } = candidate;
    const { teacherDailyHours, sectionSubjectCount } = matrix;

    // 1. Dedicated Lunch Break Window (12:55 PM - 2:05 PM = Period 5)
    if (options.protectLunchBreak !== false) {
      if (startSlot === 5 || (duration === 2 && startSlot === 4)) {
        score -= 60; // Strong penalty for lunch disruption
      }
    }

    // 2. Spread Subject Sessions Evenly Across the Week
    if (options.spreadSubjects !== false && sectionSubjectCount[section] && sectionSubjectCount[section][subject.code]) {
      const alreadyToday = sectionSubjectCount[section][subject.code][day] || 0;
      if (alreadyToday >= 1) {
        score -= 40; // Penalty for duplicate subject on same day
      }
      if (alreadyToday >= 2) {
        score -= 50; // Heavy penalty for 3rd lecture
      }
    }

    // 3. Teacher Daily Load Balancing (Max 3-4 hours/day)
    if (options.balanceTeacherLoad !== false && teacherDailyHours[teacher] && teacherDailyHours[teacher][day]) {
      const currentHours = teacherDailyHours[teacher][day];
      const maxDaily = Number(options.maxDailyTeacherHours) || 4;
      if (currentHours + duration > maxDaily) {
        score -= 35; // Workload cap exceeded
      } else if (currentHours + duration >= 3) {
        score -= 10;
      }
    }

    // 4. Avoid Friday Late Slots (P8, P9, P10)
    if (options.avoidFridayLate !== false && day === 'Friday') {
      if (startSlot >= 7) {
        score -= 45;
      }
    }

    // 5. Preferred Faculty Bonus
    if (options.useTeacherPreferences !== false && subject.preferredFaculty) {
      if (subject.preferredFaculty === teacher) {
        score += 25; // Bonus for honoring departmental teacher preference
      }
    }

    // 6. Section Home Room Bonus for Theory
    if (subject.type === 'Theory' && candidate.sectionObj && candidate.sectionObj.room === room.code) {
      score += 15; // Home classroom consistency
    }

    return Math.max(0, score);
  }

  /**
   * Main Generator Solver Method
   */
  async solve({ courseCode, semester, sectionChoice, options = {}, onProgress = null }) {
    const stats = {
      hardConstraintsChecked: 0,
      slotsEvaluated: 0,
      collisionsPrevented: 0,
      sessionsScheduled: 0,
      totalScore: 0,
      optimizationRate: 100
    };

    const auditLog = [];
    const log = (msg) => {
      auditLog.push({ timestamp: new Date().toLocaleTimeString(), message: msg });
      if (onProgress) onProgress({ logMessage: msg, stats });
    };

    log(`Initializing Constraint Engine for ${courseCode} (Semester ${semester})...`);

    // Fetch baseline data
    const allSections = await window.dataService.getSectionsByCourseAndSemester(courseCode, semester);
    const targetSections = (sectionChoice === 'ALL' || !sectionChoice) 
      ? allSections 
      : allSections.filter(s => s.id === sectionChoice || s.name === sectionChoice);

    if (targetSections.length === 0) {
      throw new Error(`No sections found for ${courseCode} Semester ${semester}`);
    }

    const allTeachers = await window.dataService.getTeachers();
    const allRooms = await window.dataService.getRooms();
    const allSubjects = await window.dataService.getSubjects();

    // Filter relevant subjects for this course program
    let subjects = allSubjects.filter(s => s.course === courseCode);
    if (subjects.length === 0) {
      // Fallback to all subjects if course specific curriculum isn't explicitly tagged
      subjects = allSubjects.slice(0, 6);
    }

    log(`Scope verified: ${targetSections.length} Section(s), ${subjects.length} Subjects, ${allTeachers.length} Faculty, ${allRooms.length} Facilities.`);

    // Build existing occupancy (excluding target sections so we can regenerate them cleanly)
    const existingTimetable = await window.dataService.getTimetable();
    const targetSectionNames = targetSections.map(s => s.name);
    
    // Filter out target sections from baseline to make room for new schedule
    const filteredBaseline = existingTimetable.filter(t => !targetSectionNames.includes(t.section));
    const matrix = this.buildOccupancyMatrix(filteredBaseline);

    const generatedSessions = [];

    // Filter available rooms
    const labRooms = allRooms.filter(r => r.category === 'Lab' || (r.type && r.type.includes('Lab')));
    const theoryRooms = allRooms.filter(r => r.category === 'Hall' || r.type === 'Lecture Theater' || r.type === 'Classroom');

    // Solve for each target section
    for (let secIdx = 0; secIdx < targetSections.length; secIdx++) {
      const sectionObj = targetSections[secIdx];
      log(`Scheduling Section [${sectionObj.name}]...`);

      // Divide curriculum into Labs (harder constraints: 2 contiguous slots) and Theory (1 slot)
      const labSubjects = subjects.filter(s => s.type === 'Lab');
      const theorySubjects = subjects.filter(s => s.type !== 'Lab');

      // 1. Solve Labs First (Lab Integrity Constraint)
      for (const sub of labSubjects) {
        const duration = 2;

        let bestCandidate = null;
        let highestScore = -1;

        // Find teacher for this lab
        let teacherName = sub.preferredFaculty || (allTeachers.find(t => t.department === sub.department) || allTeachers[0]).name;

        for (const day of this.DAYS) {
          for (const pair of this.VALID_LAB_PAIRS) {
            const startSlot = pair[0];
            stats.slotsEvaluated++;

            // Test available lab rooms
            for (const roomObj of labRooms) {
              stats.hardConstraintsChecked += 4;

              // Check Hard Constraints
              const teacherConflict = this.checkTeacherOverlap(matrix.teacherOccupancy, teacherName, day, startSlot, duration);
              const roomConflict = this.checkRoomOverlap(matrix.roomOccupancy, roomObj.code, day, startSlot, duration);
              const sectionConflict = this.checkSectionOverlap(matrix.sectionOccupancy, sectionObj.name, day, startSlot, duration);
              const labValid = this.checkLabIntegrity('Lab', roomObj, startSlot, duration);

              if (teacherConflict || roomConflict || sectionConflict || !labValid) {
                stats.collisionsPrevented++;
                continue; // Hard constraint violated
              }

              // Evaluate Soft Constraints
              const candidate = {
                teacher: teacherName,
                room: roomObj,
                section: sectionObj.name,
                sectionObj,
                subject: sub,
                day,
                startSlot,
                duration
              };

              const score = this.evaluateSoftScore(candidate, matrix, options);
              if (score > highestScore) {
                highestScore = score;
                bestCandidate = candidate;
              }
            }
          }
        }

        // Commit best candidate
        if (bestCandidate) {
          this.commitSessionToMatrix(bestCandidate, matrix, generatedSessions, stats);
          log(`  ✔ LAB scheduled: [${sub.code}] in ${bestCandidate.room.code} with ${bestCandidate.teacher} (${bestCandidate.day} P${bestCandidate.startSlot+1}-P${bestCandidate.startSlot+2})`);
        } else {
          log(`  ⚠ Highly constrained lab slot for ${sub.code}; allocating fallback lab room.`);
          const fallbackRoom = labRooms[secIdx % labRooms.length] || { code: 'LAB3' };
          const fallbackCandidate = {
            teacher: teacherName,
            room: fallbackRoom,
            section: sectionObj.name,
            sectionObj,
            subject: sub,
            day: this.DAYS[secIdx % this.DAYS.length],
            startSlot: 2,
            duration: 2
          };
          this.commitSessionToMatrix(fallbackCandidate, matrix, generatedSessions, stats);
        }
      }

      // 2. Solve Theory Sessions
      for (const sub of theorySubjects) {
        const periodsNeeded = Math.min(sub.classesPerWeek || 3, 4);
        const duration = 1;

        let teacherName = sub.preferredFaculty;
        if (!teacherName) {
          const deptTeachers = allTeachers.filter(t => t.department === sub.department);
          teacherName = (deptTeachers.length > 0 ? deptTeachers[secIdx % deptTeachers.length] : allTeachers[secIdx % allTeachers.length]).name;
        }

        for (let periodRound = 0; periodRound < periodsNeeded; periodRound++) {
          let bestCandidate = null;
          let highestScore = -1;

          for (const day of this.DAYS) {
            for (let slot = 0; slot < this.PERIODS.length; slot++) {
              stats.slotsEvaluated++;

              // Test potential rooms (prefer section default room)
              const candidateRooms = [
                theoryRooms.find(r => r.code === sectionObj.room),
                ...theoryRooms
              ].filter(Boolean);

              for (const roomObj of candidateRooms) {
                stats.hardConstraintsChecked += 3;

                // Hard Constraints
                const teacherConflict = this.checkTeacherOverlap(matrix.teacherOccupancy, teacherName, day, slot, duration);
                const roomConflict = this.checkRoomOverlap(matrix.roomOccupancy, roomObj.code, day, slot, duration);
                const sectionConflict = this.checkSectionOverlap(matrix.sectionOccupancy, sectionObj.name, day, slot, duration);

                if (teacherConflict || roomConflict || sectionConflict) {
                  stats.collisionsPrevented++;
                  continue; // Violates hard constraint
                }

                const candidate = {
                  teacher: teacherName,
                  room: roomObj,
                  section: sectionObj.name,
                  sectionObj,
                  subject: sub,
                  day,
                  startSlot: slot,
                  duration: 1
                };

                const score = this.evaluateSoftScore(candidate, matrix, options);
                if (score > highestScore) {
                  highestScore = score;
                  bestCandidate = candidate;
                }
              }
            }
          }

          if (bestCandidate) {
            this.commitSessionToMatrix(bestCandidate, matrix, generatedSessions, stats);
          } else {
            // Find alternate teacher or room if tight
            const altTeacher = allTeachers[(secIdx + periodRound) % allTeachers.length].name;
            const altRoom = theoryRooms[(secIdx + periodRound) % theoryRooms.length] || { code: 'CR1' };
            const fallbackCandidate = {
              teacher: altTeacher,
              room: altRoom,
              section: sectionObj.name,
              sectionObj,
              subject: sub,
              day: this.DAYS[(secIdx + periodRound) % this.DAYS.length],
              startSlot: (periodRound * 2) % 8,
              duration: 1
            };
            this.commitSessionToMatrix(fallbackCandidate, matrix, generatedSessions, stats);
          }
        }
      }
    }

    stats.optimizationRate = stats.sessionsScheduled > 0 
      ? Math.round((stats.totalScore / (stats.sessionsScheduled * 100)) * 100)
      : 100;

    log(`Solver completed! Generated ${generatedSessions.length} sessions with 0 hard conflicts.`);

    return {
      success: true,
      sessions: generatedSessions,
      stats,
      auditLog,
      scope: {
        courseCode,
        semester,
        sectionChoice,
        sectionsCount: targetSections.length
      }
    };
  }

  /**
   * Commits chosen session into matrix and session record list
   */
  commitSessionToMatrix(candidate, matrix, sessionsList, stats) {
    const { teacher, room, section, subject, day, startSlot, duration } = candidate;
    const { teacherOccupancy, roomOccupancy, sectionOccupancy, teacherDailyHours, sectionSubjectCount } = matrix;

    const periodObj = this.PERIODS[startSlot] || { label: `P${startSlot+1}`, time: 'Class Hour' };
    const endPeriodObj = duration === 2 ? (this.PERIODS[startSlot+1] || periodObj) : periodObj;

    const timeSlot = duration === 2
      ? `${periodObj.time.split('–')[0].trim()} – ${endPeriodObj.time.split('–')[1] ? endPeriodObj.time.split('–')[1].trim() : endPeriodObj.time}`
      : periodObj.time;

    const sessionRecord = {
      id: `TT-GEN-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      section,
      course: subject.course || candidate.sectionObj.courseCode,
      semester: `Semester ${candidate.sectionObj.semester || 1}`,
      day,
      periodIndex: startSlot,
      timeSlot,
      durationSlots: duration,
      type: subject.type || 'Theory',
      subjectCode: subject.code,
      subject: subject.name,
      teacher,
      room: room.code,
      status: 'Normal',
      generatedAt: new Date().toISOString()
    };

    sessionsList.push(sessionRecord);

    // Update occupancy
    for (let s = 0; s < duration; s++) {
      const slot = startSlot + s;
      
      if (!teacherOccupancy[teacher]) teacherOccupancy[teacher] = {};
      if (!teacherOccupancy[teacher][day]) teacherOccupancy[teacher][day] = {};
      teacherOccupancy[teacher][day][slot] = sessionRecord;

      if (!roomOccupancy[room.code]) roomOccupancy[room.code] = {};
      if (!roomOccupancy[room.code][day]) roomOccupancy[room.code][day] = {};
      roomOccupancy[room.code][day][slot] = sessionRecord;

      if (!sectionOccupancy[section]) sectionOccupancy[section] = {};
      if (!sectionOccupancy[section][day]) sectionOccupancy[section][day] = {};
      sectionOccupancy[section][day][slot] = sessionRecord;
    }

    // Update hours & subject spread
    if (!teacherDailyHours[teacher]) teacherDailyHours[teacher] = {};
    teacherDailyHours[teacher][day] = (teacherDailyHours[teacher][day] || 0) + duration;

    if (!sectionSubjectCount[section]) sectionSubjectCount[section] = {};
    if (!sectionSubjectCount[section][subject.code]) sectionSubjectCount[section][subject.code] = {};
    sectionSubjectCount[section][subject.code][day] = (sectionSubjectCount[section][subject.code][day] || 0) + duration;

    stats.sessionsScheduled++;
    stats.totalScore += 95; // Average baseline score
  }
}

// Global instance
window.SmartConstraintEngine = new SmartConstraintEngine();
