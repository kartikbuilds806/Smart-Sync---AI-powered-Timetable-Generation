# SmartSync - Project Analysis & Architectural Plan

## 1. Executive Summary & Audit (Phase 0)

### Workspace Audit Results
* **Workspace Path:** `d:\Timewise - pbl`
* **Provided Content:**
  1. `Courses details/`: Real university timetable documents in PDF format:
     - `Bca timetable/UG_I.pdf`, `UG_III.pdf`, `UG_V.pdf`
     - `CC list/CC-LIST-ODD-2026.pdf`
     - `Mca Timetable/PG_I.pdf`, `PG_III.pdf`, `PG_III_D2.pdf`
  2. `UI/`: High-fidelity reference mockups matching exact requirements:
     - `SmartSync Academic Dashboard Showcase.png` (Admin & System Overview)
     - `SmartSync Faculty Timetable Dashboard.png` (Faculty Timetable & Class Overview)
     - `SmartSync Student Timetable Dashboard.png` (Student Daily/Weekly Schedule)
* **Stack Verification:**
  - Forbidden items checked: `0` TypeScript (`.ts`/`.tsx`), `0` React/Next/Vue/Angular, `0` Tailwind, `0` SCSS.
  - Allowed stack enforced: HTML5, CSS3 (Vanilla), JavaScript (ES6+), Bootstrap 5 (via CDN), Lucide Icons (via CDN).

### Real Data Extracted from PDFs
The actual university timetable & class coordinator data has been extracted from the provided PDFs into the data layer (`data/mock-data.js`):
* **Courses:** BCA (Bachelor of Computer Applications), MCA (Master of Computer Applications)
* **Sections:** BCA UG-I (A, B, C, D), BCA UG-III (A, B, C, D), BCA UG-V (A, B, C, D), MCA PG-I (G1, G2), MCA PG-III (G3, G4, A1, D2)
* **Faculty Members:** Dr. Priya Sharma, Dr. S. C. Dimri, Mr. Kanishk Bhatt, Mr. Gagandeep Singh, Mr. Yogesh Lohumi, Dr. Varsha Mittal, Ms. Rashmi Kanyal, Ms. Payal Karki, Mr. Shubham Kumar, Mr. Vikash Kumar, Ms. Divya, Mr. Purnendu Agarwal, Dr. Hradesh, Dr. A. S. Shukla, Mr. Priyansh Kumar.
* **Subjects:** Design & Analysis of Algorithms (TMC301/TMD305), Mobile Application Development (TMC302), Advanced Java Programming (TMC303), Machine Learning II (TMC311), DevOps on Cloud (TMC312), Data Analytics & Visualization (TMD301), Software Testing & Quality Assurance (TMD313), R Programming (TMD303), Career Skills III (TMC304), OOP Intro (BMC301), and corresponding Lab courses.
* **Rooms & Labs:** LT-3, LT-4, LT-03, LT-04, LT-05, LT-07, NCR1, NCR3, NCR4, Room 204, Room 205, Room 206, Room 301, LAB1, LAB2, LAB3, IBM LAB, PARAM GF, PARAM FF, NEW LAB1.

---

## 2. Target Frontend Architecture

```
d:\Timewise - pbl\
├── index.html                      # Landing & Phase 1 Foundation Demo Shell
├── PROJECT_ANALYSIS.md             # This document
├── pages/
│   ├── login.html                  # Demo Login Screen
│   ├── admin/                      # Admin Role Pages (Phase 2 & 3)
│   │   └── dashboard.html
│   ├── teacher/                    # Teacher Role Pages (Phase 2 & 5)
│   │   └── dashboard.html
│   └── student/                    # Student Role Pages (Phase 2 & 5)
│       └── dashboard.html
├── css/
│   ├── variables.css               # Design tokens (colors, typography, radii, shadows)
│   ├── base.css                    # CSS resets & core typography
│   ├── layout.css                  # Sidebar, Topbar, Main Shell, Responsive Grid
│   ├── components.css              # Stat cards, Timetable grid, Buttons, Badges, Modals, Toasts
│   └── pages.css                   # Page-specific banners & hero styles
├── js/
│   ├── main.js                     # Global initializer & Lucide icon renderer
│   ├── navigation.js               # Responsive sidebar, role toggling, page routing
│   ├── utils.js                    # DOM helpers, formatters, toast/modal controllers
│   └── services/
│       ├── courseService.js        # Async data access for Courses
│       ├── teacherService.js       # Async data access for Teachers
│       ├── subjectService.js       # Async data access for Subjects
│       ├── roomService.js          # Async data access for Rooms/Labs
│       ├── timetableService.js     # Async data access for Timetables & Schedules
│       └── notificationService.js  # Async data access for Notifications & Changes
└── data/
    └── mock-data.js                # Extracted real university dataset
```

---

## 3. Design System Tokens (`css/variables.css`)

### Color Palette (Professional Academic Theme)
* **Primary / Accent:** `#2563EB` (Royal Blue), `#3B82F6` (Vibrant Blue), Hover: `#1D4ED8`
* **Sidebar Background:** `#0F172A` (Deep Navy), Hover item: `rgba(255, 255, 255, 0.08)`, Active item: `#2563EB`
* **Backgrounds:** `#F8FAFC` (Canvas Light Gray), Card background: `#FFFFFF`
* **Text Colors:** Primary: `#0F172A`, Muted: `#64748B`, Subtle: `#94A3B8`
* **Semantic Status Colors:**
  * Success: `#10B981` (Emerald Green)
  * Warning / Changed: `#F59E0B` (Warm Amber)
  * Conflict / Error: `#EF4444` (Coral Red)
  * Info: `#3B82F6` (Calm Blue)
* **Timetable Pills:**
  * Theory Subject: Light Blue (`#EFF6FF` bg, `#1D4ED8` text, `#BFDBFE` border)
  * Lab Subject: Light Purple (`#F3E8FF` bg, `#7E22CE` text, `#E9D5FF` border)
  * Changed Session: Light Amber (`#FEF3C7` bg, `#B45309` text, `#FDE68A` border)
  * Conflict Session: Light Red (`#FEE2E2` bg, `#B91C1C` text, `#FCA5A5` border)

---

## 4. Implementation Strategy by Phases

* **Phase 0 (Completed):** Repo audit & real PDF data parsing.
* **Phase 1 (Current):** Foundation setup — CSS design system (`variables.css`, `base.css`, `layout.css`, `components.css`, `pages.css`), async Service layer (`js/services/*`), real data module (`data/mock-data.js`), core UI utilities (`utils.js`, `navigation.js`, `main.js`), and foundation shell (`index.html`, `pages/login.html`).
* **Phase 2 (Next):** Core Dashboards for Admin, Teacher, and Student roles matching reference PNG mockups.
* **Phase 3:** Admin Management Pages (Courses, Sections, Subjects, Teachers, Rooms/Labs, Time Slots).
* **Phase 4:** Timetable System (Interactive Week/Day/List views, controlled mock generator wizard, conflicts resolver, versions tracker).
* **Phase 5:** Teacher & Student individual workflow pages.
* **Phase 6:** Polish, accessibility review, responsive validation, animation tuning.

---

## 5. Stack Verification Checklist
- [x] No `.ts` / `.tsx` / `tsconfig.json`
- [x] No React, Next, Angular, Vue, or Tailwind dependencies
- [x] Only `.html`, `.css`, and `.js` files created
- [x] Bootstrap 5 + Lucide Icons integrated via standard CDN
- [x] Service layer uses standard ES6 async functions returning Promises (ready for future Spring Boot REST integration)
