# 🎓 SmartSync - College Timetable Management System

SmartSync is an automated college timetable management system designed for Administrators, Faculty, and Students of Graphic Era Hill University (College of Computer Applications).

---

## 🏗️ Architecture & Stack

- **Frontend**: HTML5, Vanilla CSS3 (Design Tokens), JavaScript (ES6+), Bootstrap 5 for UI layout, Lucide Icons.
- **Data Layer**: Powered by `js/services/dataService.js` reading real dataset files derived directly from official PDF timetables and Class Coordinator rosters.
- **Backend (Phase 4/5 Target)**: Java Spring Boot (Primary Application Backend) + Python FastAPI (Constraint Solving / Optimization Engine).

---

## 📂 Project Structure

```
d:\Timewise - pbl\
├── index.html                   # Main single-page application shell
├── README.md                    # Project documentation & run instructions
├── PROJECT_ANALYSIS.md          # Architectural plan & audit log
├── data/
│   ├── real-dataset.js          # Extracted real university dataset (JS window format)
│   ├── courses.json             # Degree programs (BCA, MCA, B.Sc IT, B.Sc CS)
│   ├── sections.json            # 40 Active class sections
│   ├── teachers.json            # 38 Unique faculty members
│   ├── rooms.json               # 33 Rooms & Computer labs (21 Halls, 12 Labs)
│   ├── subjects.json            # Real curriculum subjects
│   └── timetable.json           # Empty master schedule (honest empty state)
├── css/
│   ├── variables.css            # Color tokens, typography, radii, shadows
│   ├── base.css                 # CSS resets & core typography
│   ├── layout.css               # Sidebar, Topbar, Main Shell grid
│   ├── components.css           # Stat cards, Buttons, Badges, Modals
│   └── pages.css                # Hero banners & page styles
├── js/
│   ├── main.js                  # Global application controller & router
│   ├── navigation.js            # Responsive sidebar & role switching logic
│   ├── utils.js                 # HTML escape, toast notifications, badges
│   ├── views.js                 # Modular views renderer for all pages
│   └── services/
│       └── dataService.js       # Unified data access layer & stats calculation
├── pages/
│   ├── login.html               # Academic Login Screen
│   ├── admin/dashboard.html     # Admin workspace redirect
│   ├── teacher/dashboard.html   # Faculty workspace redirect
│   └── student/dashboard.html   # Student workspace redirect
└── Courses details/             # PDF source timetables & CC roster documents
```

---

## 🚀 How to Run the Frontend Locally

1. Open a terminal in the root directory (`d:\Timewise - pbl`).
2. Run any static web server, for example:
   ```bash
   npm start
   # or
   npx http-server . -p 3000
   ```
3. Open your browser and navigate to:
   - **Main Workspace Shell**: [http://localhost:3000](http://localhost:3000)
   - **Academic Login Screen**: [http://localhost:3000/pages/login.html](http://localhost:3000/pages/login.html)

---

## 📊 Real University Dataset Overview

- **Degree Programs**: 4 Courses (`BCA`, `MCA`, `B.Sc IT`, `B.Sc CS`)
- **Active Class Sections**: 40 Sections (BCA I, III, V; MCA I, III; B.Sc IT/CS)
- **Faculty Roster**: 38 Unique Faculty Members
- **Rooms & Facilities**: 33 Rooms (21 Lecture Halls & 12 Computer Labs)
- **Master Timetable Status**: Honest Empty State (Pending Phase 4/5 backend engine generation)
