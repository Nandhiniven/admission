# Smart College Admission Assistant – AI-Based Student Query Chatbot

[![GitHub Pages Compatible](https://img.shields.io/badge/Deployment-GitHub%20Pages-brightgreen.svg)](#github-pages-deployment)
[![Technologies](https://img.shields.io/badge/Tech%20Stack-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-blue.svg)](#technologies-used)
[![Academic Project](https://img.shields.io/badge/Project%20Type-Final--Year%20College%20Project-purple.svg)](#project-overview)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

An intelligent, modern, responsive College Admission Portal and 24/7 rule-based conversational AI chatbot designed for prospective students, parents, and academic counselors.

Built entirely using **HTML5, CSS3, and Vanilla JavaScript** with **zero external framework dependencies** (no React, Vue, or Angular) and **zero paid backend APIs**. The project runs instantly by opening files locally in any modern web browser and is **100% compatible with GitHub Pages**.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Key Features](#key-features)
3. [Chatbot Intelligence & NLP Algorithm](#chatbot-intelligence--nlp-algorithm)
4. [Technologies Used](#technologies-used)
5. [Complete Folder Structure](#complete-folder-structure)
6. [How to Run Locally](#how-to-run-locally)
7. [Step-by-Step GitHub Upload Guide](#step-by-step-github-upload-guide)
8. [Deploying with GitHub Pages](#deploying-with-github-pages)
9. [Viva Voce & Academic Demonstration Guide](#viva-voce--academic-demonstration-guide)
10. [Customization Guide](#customization-guide)
11. [License & Credits](#license--credits)

---

## Project Overview

During college admission seasons, admission offices face thousands of repetitive inquiries regarding:
- Available courses and specializations
- Eligibility criteria and 10+2 marks cutoff
- Fee structures and semester installment policies
- Merit, sports, and need-based scholarships
- Mandatory document verification checklists
- Campus hostels, bus transportation, and laboratory infrastructure
- Corporate placement statistics and highest/average packages
- Important application deadlines and entrance test schedules

**Smart College Admission Assistant (AURA)** solves this bottleneck by providing an interactive, client-side conversational AI bot embedded across every page of the university website. It answers student queries in real time with natural language understanding, suggested question chips, action buttons, typing indicators, speech-to-text recognition, and chat history persistence.

---

## Key Features

### 1. Modern University Web Portal
- **Home Page (`index.html`):** Engaging hero banner with live counters (95% placements, 50+ courses, ₹44 LPA highest package), real-time admission deadline ticker, 4 core institutional pillars, and quick chatbot triggers.
- **About Page (`about.html`):** Institutional legacy since 2004, Director's address, Vision & Mission, NAAC 'A++' and NBA accreditations, and 45-acre campus overview.
- **Courses Page (`courses.html`):** Dynamic category filtering (Computing & AI, Engineering, Management, Postgraduate), live search bar, and course cards with tuition fees, eligibility, and dual action buttons (*"Apply"* and *"Ask Bot"*).
- **Admission Page (`admission.html`):** 4-step visual roadmap, interactive document checklist, important dates schedule table, full online enquiry/application form with client-side validation, receipt modal with printable acknowledgment, and an **Application Status Lookup Tool**.
- **Contact Page (`contact.html`):** Campus locator, helpline numbers, direct query form with success feedback, and accessible FAQ accordion.

### 2. Conversational Chatbot Widget (AURA)
- **Floating Launcher:** Bottom-right floating trigger with glowing pulse ring and unread notification badge.
- **Intelligent Rule-Based NLP Engine:** Understands varied question formulations using tokenization, punctuation stripping, synonym normalization, and weighted keyword intent scoring.
- **Typing Indicator Simulation:** Realistic 600ms–900ms delay with bouncing dots animation.
- **Quick Suggestion Chips:** Horizontal scrollable pills with 10+ one-click questions.
- **Speech-to-Text Voice Input:** Integrated with the browser's Web Speech API (`webkitSpeechRecognition`).
- **Synthesized Audio Chimes:** Uses the Web Audio API to create subtle notification beeps on bot responses without requiring external audio files.
- **`localStorage` Persistence:** Stores conversation history so refreshing the page or switching between pages does not erase the chat.
- **Clear Chat Option:** One-click reset with user confirmation dialog.

### 3. Application Vault & Tracking Tool
- Prospective student applications are validated and saved in the browser's `localStorage` (`aitm_applications_vault`).
- Generates a unique tracking reference (e.g. `AITM-2026-7492`).
- Students can look up their submission status using their Application ID or phone number.

---

## Chatbot Intelligence & NLP Algorithm

The chatbot does **not** rely on external paid AI APIs (like OpenAI or Gemini backend servers), making it completely cost-free, privacy-preserving, and immune to API rate limits or network failures.

```
       [ Student Inputs Question ]
                  │
                  ▼
    [ Tokenization & Text Normalization ]
    - Convert to lowercase
    - Strip punctuation and symbols
    - Trim extraneous whitespace
                  │
                  ▼
  [ Weighted Keyword & Synonym Matching ]
    - Exact Phrase Match    --> +50 Points
    - Multi-Word Substring  --> +25 Points
    - Single Word Substring --> +10 Points
    - Token Intersections   --> +5 Points
                  │
                  ▼
      [ Confidence Threshold >= 5? ]
            /             \
        [ YES ]          [ NO ]
           │               │
           ▼               ▼
[ Retrieve Matched Intent ]  [ Trigger Polite Fallback ]
- Detailed Answer HTML       - Suggest Alternate Questions
- Actionable URL Links       - Display Admission Helpline
                  │
                  ▼
     [ Simulated Typing Delay (600-900ms) ]
                  │
                  ▼
     [ Synthesized Web Audio Chime ]
                  │
                  ▼
     [ Render Bubble & Save to LocalStorage ]
```

### Knowledge Base Domains Covered
1. **Greetings & Bot Persona:** Introduction, creator info, and capabilities.
2. **Programs & Degrees:** CSE, AI/ML, Data Science, BCA, MCA, MBA, BBA, ECE, M.Tech.
3. **Cutoffs & Eligibility:** 10+2 PCM criteria, graduation percentages, entrance exams.
4. **Fees & Installments:** Semester breakdown, caution deposit, loan assistance.
5. **Scholarships:** 100% merit waivers, sports quota, female student concessions.
6. **Hostels & Transport:** AC/Non-AC rooms, mess cuisine, Wi-Fi, bus routes, metro shuttles.
7. **Placements:** 95.4% placement rate, ₹44 LPA highest package, recruiter list.
8. **Required Documents:** 10th/12th marksheets, TC, migration, photos, ID proofs.
9. **Deadlines & Schedules:** Application close date, counseling dates, session start.
10. **Campus Facilities:** Central digital library, laboratories, sports complex.

---

## Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **HTML5** | Semantic structure, accessible landmarks, modal dialogs, and SVG rendering. |
| **CSS3** | Modern responsive layout (Flexbox & CSS Grid), CSS variables, keyframe animations, glassmorphism, and print stylesheet. |
| **Vanilla JavaScript (ES6+)** | Rule-based NLP pattern engine, DOM manipulation, form validation, Web Audio API, Web Speech API, and `localStorage` vault. |
| **Google Fonts (Plus Jakarta Sans)** | Clean typography suitable for a modern educational institution. |
| **Font Awesome 6 (CDN)** | Vector iconography for navigation, stats, and chatbot controls. |
| **SVG (Scalable Vector Graphics)** | Lightweight vector illustrations (logo, campus hero graphic, bot avatar, favicon). |

---

## Complete Folder Structure

```
college-admission-chatbot/
│
├── index.html                   # Home Landing Page
├── about.html                   # About Institution & Accreditation Page
├── courses.html                 # Course Catalog with Live Search & Filter
├── admission.html               # Step-by-Step Admission, Checklist & Form
├── contact.html                 # Contact Info, Helpdesk, Map & FAQs
│
├── css/
│   └── style.css                # Master Stylesheet (Variables, Components, Chatbot)
│
├── js/
│   ├── main.js                  # Navigation, Form Validation, Search, Counters, Modal
│   └── chatbot.js               # Rule-Based NLP Engine, Audio API, Speech, Persistence
│
├── assets/
│   └── images/
│       ├── logo.svg             # University Shield Crest Logo
│       ├── bot-avatar.svg       # AURA Robot Mascot Vector
│       ├── campus-hero.svg      # Campus Building & Chatbot Graphic
│       └── favicon.svg          # Browser Tab Icon
│
└── README.md                    # Academic Documentation & Deployment Guide
```

---

## How to Run Locally

You do **not** need Node.js, Python, or any web server to run this project.

### Method 1: Direct Browser Launch
1. Download or clone this repository to your computer.
2. Navigate into the `college-admission-chatbot/` directory.
3. Double-click **`index.html`** to open the website directly in any web browser (Chrome, Edge, Firefox, Safari, Brave).

### Method 2: Using VS Code Live Server (Optional)
1. Open the `college-admission-chatbot` folder in **Visual Studio Code**.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click on `index.html` and select **"Open with Live Server"**.
4. The site will launch at `http://127.0.0.1:5500/index.html`.

---

## Step-by-Step GitHub Upload Guide

Follow these steps to upload your project to your GitHub account:

### Step 1: Initialize Git in the Project Folder
Open your terminal (PowerShell, Command Prompt, or Git Bash) inside the `college-admission-chatbot` directory:
```bash
cd college-admission-chatbot
git init
```

### Step 2: Stage and Commit the Files
```bash
git add .
git commit -m "Initial commit: Complete College Admission Chatbot Web Application"
```

### Step 3: Create a New Repository on GitHub
1. Log in to [GitHub.com](https://github.com).
2. Click the **`+`** icon in the top-right corner and select **New repository**.
3. Repository name: `college-admission-chatbot` (or your preferred name).
4. Set visibility to **Public** (required for free GitHub Pages).
5. **Do NOT** check "Add a README file" (we already created one).
6. Click **Create repository**.

### Step 4: Link Local Repository and Push to GitHub
Copy the commands shown on GitHub:
```bash
git branch -M main
git remote add origin https://github.com/<YOUR-USERNAME>/college-admission-chatbot.git
git push -u origin main
```
*(Replace `<YOUR-USERNAME>` with your GitHub username).*

---

## Deploying with GitHub Pages

Once pushed to GitHub, host the site live in under 60 seconds:

1. Open your repository on GitHub (`https://github.com/<YOUR-USERNAME>/college-admission-chatbot`).
2. Click on the **Settings** tab (gear icon at the top).
3. In the left-hand navigation menu, click on **Pages** (under the "Code and automation" section).
4. Under **Build and deployment**:
   - **Source:** Select `Deploy from a branch`.
   - **Branch:** Select `main` from the dropdown.
   - **Folder:** Select `/(root)`.
5. Click **Save**.
6. Wait 1 to 2 minutes for the GitHub Actions deployment pipeline to complete.
7. Refresh the page. You will see a green banner:
   > **"Your site is live at `https://<YOUR-USERNAME>.github.io/college-admission-chatbot/`"**
8. Click the link to test your live, working web application!

---

## Viva Voce & Academic Demonstration Guide

When presenting this project to your external examiner, professor, or project evaluation committee, demonstrate the following key workflows:

### 1. Chatbot Knowledge Testing
Open the chatbot widget by clicking the bottom-right launcher button or the **"Chat with Admission Assistant"** hero button, then test these sample prompts:

| Category | Sample Student Query | Expected Bot Behavior |
| :--- | :--- | :--- |
| **Greeting** | *"Hello", "Hi AURA"* | Welcomes student, lists key topics, displays course links. |
| **Courses** | *"What courses are available?"* | Displays UG & PG branches (CSE, AI/ML, BCA, MCA, MBA). |
| **Specific Branch** | *"Tell me about B.Tech CSE"* | Shows duration (4 Yrs), eligibility (PCM 60%), fee (₹1.45L), and placements. |
| **Eligibility** | *"What are the eligibility criteria?"* | Displays cut-offs and mandatory subject requirements. |
| **Fees** | *"What is the fee structure?"* | Outlines annual tuition, installment options, and deposits. |
| **Scholarships** | *"Are scholarships available?"* | Details 100%, 50%, 25% merit waivers and sports quotas. |
| **Placements** | *"What are the placement opportunities?"* | Highlights 95.4% rate, ₹44 LPA max package, top recruiters. |
| **Hostel & Transport**| *"Tell me about hostel and bus facilities"* | Explains AC/Non-AC rooms, mess, Wi-Fi, and 40+ bus routes. |
| **Documents** | *"What documents are required?"* | Formats 9-point checklist with link to admission page. |
| **Deadlines** | *"What are the important admission dates?"* | Lists Phase-1 close date, entrance exam, and orientation. |
| **Unrecognized** | *"Can you book a flight ticket?"* | Polite fallback suggesting admission helpline & email. |

### 2. Multi-Page Persistence Demonstration
- Ask a question on `index.html`.
- Navigate to `courses.html` or `admission.html`.
- Open the chatbot — notice that the entire conversation history is seamlessly preserved via `localStorage`!
- Click the trash can icon in the bot header to demonstrate the **Clear Chat** feature.

### 3. Admission Application & Vault Demo
- Navigate to `admission.html`.
- Test client-side validation by attempting to submit an empty form (demonstrating custom error messages).
- Fill in valid credentials (e.g. Name: *Priya Verma*, Phone: *9876543210*, Marks: *88.5%*).
- Click **Submit Application & Generate ID**.
- Show the generated **Application Reference ID** (e.g. `AITM-2026-XXXX`) and the printable modal receipt.
- Scroll down to the **Track Application Status** tool, type the generated ID or mobile number, and click **Check Status** to show real-time retrieval from the `localStorage` vault!

### 4. Interactive Course Search & Filter Demo
- Navigate to `courses.html`.
- Click the category filter pills (*Computing & AI*, *Engineering*, *Management*, *Postgraduate*).
- Type *"AI"* or *"MBA"* into the real-time search box to demonstrate instant DOM filtering.
- Click **"Ask Bot"** on any course card — it immediately opens the chatbot and asks for details about that specific course automatically.

---

## Customization Guide

All college details in this project are realistic demo content that you can customize in 5 minutes:

### 1. Changing College Name and Logo
- Search and replace `Apex Institute of Technology & Management` and `AITM` across the HTML files with your own college name.
- Replace `assets/images/logo.svg` with your college logo image or vector.

### 2. Adding or Modifying Chatbot Rules
Open `js/chatbot.js` and locate the `KNOWLEDGE_BASE` array. You can add new topics by adding a new object:
```javascript
{
  id: 'sports_quota',
  keywords: ['sports', 'athletics', 'cricket', 'football', 'trials'],
  response: `AITM offers up to 50% tuition fee concessions for State and National medalists. Trials are conducted every June.`,
  actions: [
    { label: 'Inquire Sports Quota', link: 'admission.html#enquiry-form' }
  ]
}
```

### 3. Changing Theme Colors
Open `css/style.css` and modify the root CSS variables:
```css
:root {
  --primary: #1e3a8a;          /* Change to your institution's primary color */
  --primary-light: #3b82f6;
  --accent-purple: #7c3aed;    /* Change accent color */
}
```

---

## License & Credits

This project was developed as a final-year academic engineering capstone project.
- **Author:** Student Developer
- **Degree:** Bachelor of Technology / Computer Applications
- **License:** Open Source under the [MIT License](LICENSE). Free to use, modify, and present for academic and educational evaluations.
