# 🚀 EventHive | Modern Multi-Role Event Orchestration Platform

EventHive is a next-generation, high-fidelity frontend web prototype designed to streamline event management, coordination, and execution. Inspired by sleek modern tools like Linear, Notion, and Vercel, it features a clean flat design system, vibrant status colors, smooth interactive animations, and a unified storage engine.

The platform works like a **"FoodPanda for events"**:
* **Vendors** (venues, community centers, caterers) list services and toggle availability.
* **Organizers** search the marketplace, reserve resources, organize tasks, and run campaigns.
* **Team Members / Staff** execute tasks and track schedules on-site.
* **Sponsors** purchase premium tiers to leverage brand exposure.
* **Guests / Attendees** enter an invite code to view custom timelines, menus, and RSVP.

---

## 🌟 Key Features & Portals

### 1. 👑 Multi-Role Orchestration System
EventHive accommodates six distinct stakeholder profiles with dedicated, highly-tailored user interfaces:

* **🛠️ Administrators (`admin.html`)**
  * Total platform oversight and platform metrics dashboard.
  * System health check, active user monitoring, and data audit logs.
  * Quick database reset and developer options.
* **📋 Organizers / Planners (`dashboard.html`)**
  * Pre-planning session creators and draft-to-active event pipelines.
  * Interactive task manager (To-Do, In-Progress, Done status toggling).
  * Real-time budget allocation and financial tracking.
  * Sponsor engagement overview (Diamond, Gold, Platinum).
* **🏪 Vendors / Service Providers (`vendor-dashboard.html`)**
  * Interactive calendar to toggle daily availability (Available/Booked).
  * Revenue statistics graphs and customer rating breakdown.
  * Direct request lists (Accept/Decline incoming corporate or personal hires).
* **🤝 Sponsors (`sponsor-dashboard.html`)**
  * High-value sponsorship bid submittals.
  * Direct ROI visibility dashboard (accepted stage banners, VIP lounges, network branding).
* **👷 On-Site Team Members (`staff-dashboard.html`)**
  * Task checklist tailored for personnel (AV setups, registration desks, flight details).
  * Shift information, supervisor info, and job coordination.
* **🎫 Attendees / Guests (`guest-view.html`)**
  * Secure passcode entry screen (`join.html`).
  * Elegant read-only guest-view featuring timeline details, food menus, and dietary information.
  * Instant RSVP feedback loop.

---

## 🛠️ Technology Stack & Architecture

EventHive is meticulously engineered with clean, modular vanilla web languages:

* **Core**: Pure HTML5 structure paired with modular semantic elements.
* **Styling**: Pure CSS3 variables using custom design tokens (`style.css`). Beautiful typography (Inter), rounded corners (`--radius-card`), smooth bezier animations, and light-mode flat panel accents.
* **Interactions**: Pure ES6 JavaScript (`script.js`, `common.js`, `auth.js`) for animations, navigation active toggles, dialog modals, and form submissions.
* **Central Database**: `store.js` implements a local client-side database layer using `localStorage` to simulate backend persistence. On first boot, the system pre-populates a rich demo dataset containing mock users, active events, task lists, sponsorship packages, and financial bookings.

---

## 📂 File Architecture

```text
Event Coordinator/
├── START-HERE.html          # Interactive quick start portal and concept brief
├── index.html              # Core landing page presenting all stakeholder entryways
├── marketplace.html        # Interactive venue searching, budget filtering, and booking portal
├── auth.html               # Multi-role tabbed login & account registration portal
├── style.css               # The master design system (CSS variables, buttons, alerts, forms)
├── script.js               # Visual dynamic micro-animations, counters, and scroll dynamics
├── store.js                # LocalStorage centralized data storage manager and mock database
├── common.js               # Globally accessible system utility functions (beautiful toast alerts)
├── auth.js                 # Authentication logic and session middleware definitions
├── admin.html              # Administrator overview and site metrics
├── dashboard.html          # Organizer workspace (events, budgets, tasks)
├── vendor-dashboard.html   # Service provider workspace (calendar, reviews, requests)
├── staff-dashboard.html    # Team member shift and task list coordinator
├── sponsor-dashboard.html  # Sponsorship bidding and ROI tracking
├── guest-view.html         # Live guest attendee timeline and menu overview
└── join.html               # Passcode prompt entryway for attendees
```

---

## 🔑 Ready-to-Use Demo Credentials

EventHive includes a preloaded demo mode. You can log in using these authentic preset credentials to instantly experience the active system:

| Role | Demo Email / Identifier | Password | Dashboard File |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@eh.com` | `admin123` | `admin.html` |
| **Organizer** | `org@eh.com` | `org123` | `dashboard.html` |
| **Vendor** | `vendor@eh.com` | `vendor123` | `vendor-dashboard.html` |
| **Staff Member** | `staff@eh.com` | `staff123` | `staff-dashboard.html` |
| **Sponsor** | `sponsor@eh.com` | `sponsor123` | `sponsor-dashboard.html` |
| **Attendee (Guest Code)** | Enter code: `DEMO26` or `123456` | *No password required* | `guest-view.html` |

---

## 🚀 Getting Started / Quick Run

Since EventHive is built entirely as a client-side frontend architecture, there are **no setup dependencies, node modules, or database configurations required**.

### Option A: Local Browser Launch
1. Open the project folder on your computer.
2. Double-click `START-HERE.html` or `index.html` to load the application directly in your web browser.

### Option B: Local Live Server (Recommended)
To prevent potential browser restrictions regarding absolute local file linking:
1. Run a simple HTTP utility server in the root of the project directory:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Or using Node.js static server
   npx serve .
   ```
2. Open `http://localhost:8000` (or the respective port) to view EventHive with full LocalStorage operations active.
