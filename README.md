# PseudoCode Lab

> **Adaptive Pseudocode Learning Platform for UK Pearson BTEC Computing & Software Development Students (Aged 16+)**

PseudoCode Lab is a modern, interactive educational platform designed to build student confidence in pseudocode logic, structured algorithms, and desk checking ahead of formal vocational assessments.

---

## 🌟 Key Features

- **Adaptive Learning Engine:** Transparent, rules-based difficulty progression (Level 1: Beginner, Level 2: Intermediate, Level 3: Advanced).
  - 3 consecutive correct answers prompt advancement to the next tier.
  - 2 consecutive mistakes trigger targeted hints and simpler practice questions.
- **5 Interactive Exercise Formats:**
  - **Exercise A — Multiple Choice:** Core definitions and algorithmic principles.
  - **Exercise B — Complete the Pseudocode:** Fill in missing keywords with automated validation.
  - **Exercise C — Find the Mistake:** Identify and debug logical errors in loop conditions and variable states.
  - **Exercise D — Arrange the Instructions:** Parsons-style sequencing with drag-and-drop and accessible Move controls.
  - **Exercise E — Scenario Challenges:** Multi-step realistic algorithmic scenarios with self-assessment checklists.
- **Dedicated Pseudocode Editor:**
  - Line numbers, syntax highlighting, and auto-indentation (2 spaces on Tab/Enter).
  - Configurable validation and exemplar model solutions available on attempt.
- **Trace Table Visualizer:**
  - Interactive simulator to desk check variable values line-by-line across iterations.
- **Student & Teacher Analytics:**
  - **Student Dashboard:** Accuracy tracking, streak monitoring, and weak-area identification.
  - **Teacher Portal:** Cohort overview, common misconception analysis, and an extensible Question Bank manager.

---

## ⚠️ Pearson BTEC Convention Alignment Notice

This version of PseudoCode Lab operates in **Generic Demonstration Mode** using standard UK vocational computing pseudocode keywords (`INPUT`, `OUTPUT`, `SET`, `IF..THEN..ELSE..ENDIF`, `FOR..TO..NEXT`, `WHILE..DO..ENDWHILE`).

No unofficial Pearson conventions are invented. Once official specification materials (e.g. BTEC Level 3 Computing Unit 1 / Unit 14) are verified, exact qualification conventions can be calibrated directly in `src/data/conventions.ts`.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Git](https://git-scm.com/)

### Installation & Local Run

```bash
# Clone the repository
git clone https://github.com/legomigue/pseudocode-lab.git

# Navigate to project folder
cd pseudocode-lab

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

### Building for Production

```bash
npm run build
npm run preview
```

---

## 🛠️ Tech Stack

- **React 18** with **TypeScript**
- **Vite** for fast bundling
- **Tailwind CSS** for responsive educational UI design
- **Lucide React** for icons
- Designed for future integration with **Supabase** for persistent institutional authentication.

---

## 📄 License

MIT License. Designed for UK Computing & IT Education.
