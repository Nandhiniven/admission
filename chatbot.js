/**
 * ============================================================================
 * SMART COLLEGE ADMISSION ASSISTANT - CHATBOT ENGINE (Vanilla JavaScript)
 * Apex Institute of Technology & Management (AITM)
 * 
 * Features:
 * - Natural Language Rule-Based Intent & Keyword Matching Engine
 * - Rich Multi-Turn Responses with Actionable Navigation Buttons
 * - Typing Indicator Simulation (600ms - 900ms delay)
 * - LocalStorage Chat Session Persistence Across Pages
 * - Interactive Suggestion Chips & Voice Speech Recognition (Web Speech API)
 * - Synthesized Audio Chime via Web Audio API (Zero external assets needed)
 * - Clean Clear Chat & Auto-scroll functionality
 * ============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. KNOWLEDGE BASE & INTENT DEFINITIONS
  // --------------------------------------------------------------------------
  const KNOWLEDGE_BASE = [
    {
      id: 'greetings',
      keywords: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 'start', 'halo', 'namaste'],
      response: `Hello and welcome to <strong>Apex Institute of Technology & Management (AITM)</strong>! 🎓<br><br>I am <strong>AURA</strong>, your AI College Admission Assistant. I can help you with:<br>
      • 📚 Degree Courses & Specializations<br>
      • 📋 Eligibility & Cut-offs<br>
      • 💰 Fee Structure & Scholarships<br>
      • 📝 Step-by-Step Admission Process<br>
      • 🏢 Campus Facilities, Hostels & Placements<br><br>
      How may I assist you today? Feel free to ask a question or tap one of the suggested chips below!`,
      actions: [
        { label: 'View Courses', link: 'courses.html' },
        { label: 'Admission Guide', link: 'admission.html' }
      ]
    },
    {
      id: 'bot_identity',
      keywords: ['who are you', 'what are you', 'your name', 'who created you', 'who made you', 'are you a bot', 'what can you do', 'about bot', 'aura'],
      response: `I am <strong>AURA</strong> (Apex University Response Assistant) — an intelligent, rule-based Admission Query Chatbot built with HTML5, CSS3, and Vanilla JavaScript.<br><br>I am programmed to provide instant, 24/7 guidance to prospective students and parents about admissions, academics, campus life, and enrollment guidelines for the 2026-27 academic session.`,
      actions: [
        { label: 'Explore Campus', link: 'about.html' },
        { label: 'Contact Helpdesk', link: 'contact.html' }
      ]
    },
    {
      id: 'courses_general',
      keywords: ['courses', 'programs', 'degrees', 'what courses', 'branches', 'streams', 'what can i study', 'academic programs', 'all courses', 'available courses', 'offerings'],
      response: `AITM offers a diverse range of <strong>Undergraduate (UG)</strong> and <strong>Postgraduate (PG)</strong> programs accredited by NBA and approved by AICTE & UGC:<br><br>
      <strong>💻 School of Computing & AI:</strong><br>
      • B.Tech in Computer Science & Engineering (CSE) - 4 Yrs<br>
      • B.Tech in Artificial Intelligence & Machine Learning (AI & ML) - 4 Yrs<br>
      • B.Tech in Data Science & Big Data - 4 Yrs<br>
      • Bachelor of Computer Applications (BCA) - 3 Yrs<br>
      • Master of Computer Applications (MCA) - 2 Yrs<br><br>
      <strong>⚙️ School of Engineering:</strong><br>
      • B.Tech in Electronics & Communication (ECE) - 4 Yrs<br>
      • B.Tech in Mechanical & Automation - 4 Yrs<br>
      • M.Tech in Cyber Security & VLSI - 2 Yrs<br><br>
      <strong>📈 School of Business & Management:</strong><br>
      • Bachelor of Business Administration (BBA) - 3 Yrs<br>
      • Master of Business Administration (MBA Dual Specialization) - 2 Yrs`,
      actions: [
        { label: 'View Full Course Catalog', link: 'courses.html' },
        { label: 'Apply Online', link: 'admission.html#enquiry-form' }
      ]
    },
    {
      id: 'course_cse',
      keywords: ['cse', 'computer science', 'btech cse', 'software engineering', 'coding', 'cs', 'it branch'],
      response: `<strong>B.Tech in Computer Science & Engineering (CSE):</strong><br>
      • <strong>Duration:</strong> 4 Years (8 Semesters)<br>
      • <strong>Eligibility:</strong> 10+2 with PCM (Physics, Chemistry, Maths) minimum 60% aggregate.<br>
      • <strong>Annual Tuition Fee:</strong> ₹1,45,000 / year.<br>
      • <strong>Curriculum Highlights:</strong> Full-Stack Development, Cloud Computing, Algorithms, DevOps, and Machine Learning.<br>
      • <strong>Key Recruiters:</strong> Microsoft, Google, Amazon, TCS Digital, Infosys, and Cognizant with highest package reaching ₹44 LPA.`,
      actions: [
        { label: 'Course Details', link: 'courses.html' },
        { label: 'Apply for CSE', link: 'admission.html#enquiry-form' }
      ]
    },
    {
      id: 'course_aiml',
      keywords: ['aiml', 'ai', 'artificial intelligence', 'machine learning', 'data science', 'deep learning'],
      response: `<strong>B.Tech in AI & Machine Learning / Data Science:</strong><br>
      • <strong>Duration:</strong> 4 Years (8 Semesters)<br>
      • <strong>Eligibility:</strong> 10+2 with PCM minimum 60% aggregate.<br>
      • <strong>Annual Fee:</strong> ₹1,55,000 / year.<br>
      • <strong>Features:</strong> NVIDIA Deep Learning certified laboratory, Computer Vision, Neural Networks, Natural Language Processing, and Generative AI research labs.<br>
      • <strong>Average Package:</strong> ₹10.2 LPA for AI & Data Science batch.`,
      actions: [
        { label: 'View Syllabus', link: 'courses.html' },
        { label: 'Inquire Now', link: 'admission.html#enquiry-form' }
      ]
    },
    {
      id: 'course_management',
      keywords: ['mba', 'bba', 'business', 'management', 'marketing', 'finance', 'hr'],
      response: `<strong>Management Programs at AITM Business School:</strong><br><br>
      <strong>1. BBA (Bachelor of Business Administration):</strong><br>
      • 3 Years | 10+2 Any stream with 50%+ | Fee: ₹90,000/yr<br><br>
      <strong>2. MBA (Master of Business Administration):</strong><br>
      • 2 Years | Graduation in any discipline with 50%+ & CAT/MAT/AITMAT scorecard | Fee: ₹1,60,000/yr<br>
      • <strong>Dual Specializations:</strong> Business Analytics, FinTech, Marketing, HR, and Supply Chain Management.<br>
      • 100% summer internships with stipend.`,
      actions: [
        { label: 'Explore MBA/BBA', link: 'courses.html' },
        { label: 'Apply for MBA', link: 'admission.html#enquiry-form' }
      ]
    },
    {
      id: 'course_bca_mca',
      keywords: ['bca', 'mca', 'computer applications', 'programming'],
      response: `<strong>School of Computer Applications:</strong><br><br>
      <strong>1. BCA (Bachelor of Computer Applications):</strong><br>
      • Duration: 3 Years | 10+2 with Mathematics/Computer/IT (Min 50%) | Fee: ₹85,000/yr.<br><br>
      <strong>2. MCA (Master of Computer Applications):</strong><br>
      • Duration: 2 Years | BCA/B.Sc IT or Graduate with Math at 10+2/Degree (Min 50%) | Fee: ₹1,10,000/yr.<br>
      • Focuses on Enterprise Cloud Applications, Cybersecurity, Mobile Apps, and AI integration.`,
      actions: [
        { label: 'View Computer Courses', link: 'courses.html' }
      ]
    },
    {
      id: 'eligibility',
      keywords: ['eligibility', 'criteria', 'cutoff', 'cut off', 'marks required', 'percentage', 'qualification', '12th marks', 'minimum marks', 'eligible'],
      response: `<strong>Eligibility Criteria for Admissions 2026-27:</strong><br><br>
      • <strong>B.Tech (All Branches):</strong> Passed 10+2 examination with Physics and Mathematics as compulsory subjects along with Chemistry/CS. Minimum 60% aggregate (55% for reserved categories). Valid JEE Main or State CET score preferred.<br>
      • <strong>BCA / BBA:</strong> Passed 10+2 from recognized board in any stream with minimum 50% marks (Math/IT required for BCA).<br>
      • <strong>MBA:</strong> Bachelor's degree (3 or 4 years) in any discipline with at least 50% aggregate (45% for SC/ST). Valid CAT / MAT / CMAT / State CET score.<br>
      • <strong>MCA:</strong> Passed BCA / B.Sc (CS/IT) or equivalent with minimum 50% marks.<br>
      • <strong>M.Tech:</strong> B.E. / B.Tech in relevant branch with 55%+ and valid GATE or College Entrance test score.`,
      actions: [
        { label: 'Check Your Eligibility', link: 'admission.html' }
      ]
    },
    {
      id: 'admission_process',
      keywords: ['admission process', 'procedure', 'how to apply', 'steps to apply', 'application process', 'admission procedure', 'counseling', 'registration', 'enroll'],
      response: `<strong>4-Step Simple Admission Procedure:</strong><br><br>
      1️⃣ <strong>Step 1 - Online Registration:</strong> Fill out the Admission Enquiry / Application form on our website and upload required educational credentials.<br>
      2️⃣ <strong>Step 2 - Entrance / Merit Assessment:</strong> Appear for AITM Entrance Test (AITMET) or submit National/State test scores (JEE/CAT/GATE).<br>
      3️⃣ <strong>Step 3 - Counseling & Document Verification:</strong> Attend one-on-one academic counseling and verify original certificates at the admission office.<br>
      4️⃣ <strong>Step 4 - Seat Allocation & Fee Payment:</strong> Confirm your branch, pay the seat confirmation fee, and receive your Student ID and Welcome Kit!`,
      actions: [
        { label: 'Start Application Now', link: 'admission.html#enquiry-form' },
        { label: 'Required Documents', link: 'admission.html#documents' }
      ]
    },
    {
      id: 'fees_structure',
      keywords: ['fee', 'fees', 'fee structure', 'cost', 'tuition fee', 'annual fee', 'semester fee', 'charges', 'installment', 'payment modes'],
      response: `<strong>Annual Tuition Fee Overview (2026-27 Session):</strong><br><br>
      • <strong>B.Tech (CSE / AI & ML):</strong> ₹1,45,000 - ₹1,55,000 / year<br>
      • <strong>B.Tech (ECE / Mech):</strong> ₹1,20,000 / year<br>
      • <strong>BCA:</strong> ₹85,000 / year<br>
      • <strong>BBA:</strong> ₹90,000 / year<br>
      • <strong>MBA:</strong> ₹1,60,000 / year<br>
      • <strong>MCA:</strong> ₹1,10,000 / year<br><br>
      💡 <em>Notes:</em> Fees can be paid in 2 equal semester installments. A one-time refundable caution deposit of ₹10,000 is applicable at the time of admission. Education loan support available with SBI, HDFC, and PNB.`,
      actions: [
        { label: 'Scholarship Details', link: 'admission.html' },
        { label: 'Contact Accounts', link: 'contact.html' }
      ]
    },
    {
      id: 'scholarships',
      keywords: ['scholarship', 'scholarships', 'financial aid', 'fee concession', 'waiver', 'merit scholarship', 'sports quota', 'discount', 'free seat'],
      response: `<strong>AITM Merit & Special Scholarships (Up to 100% Fee Waiver):</strong><br><br>
      🏆 <strong>Merit-Based Scholarships (UG/PG):</strong><br>
      • 95%+ in 10+2 / Graduation: <strong>100% Tuition Fee Waiver</strong><br>
      • 90% - 94.9%: <strong>50% Tuition Fee Waiver</strong><br>
      • 85% - 89.9%: <strong>25% Tuition Fee Waiver</strong><br><br>
      🏅 <strong>Special Category Scholarships:</strong><br>
      • <strong>National/State Sports Quota:</strong> Up to 50% waiver for medalists.<br>
      • <strong>Beti Padhao (Women Empowerment):</strong> Special 15% concession for female students.<br>
      • <strong>Defense Personnel Ward Quota:</strong> 20% concession for children of armed forces.<br>
      • Government scholarships (Post-Matric, SC/ST/OBC/Minority) fully facilitated.`,
      actions: [
        { label: 'Inquire for Scholarship', link: 'admission.html#enquiry-form' }
      ]
    },
    {
      id: 'documents',
      keywords: ['document', 'documents', 'documents required', 'certificates', 'marksheets', 'papers', 'verification', 'id proof', 'photo'],
      response: `<strong>Mandatory Documents for Admission Verification:</strong><br><br>
      📄 <strong>Academic Records:</strong><br>
      1. Class 10th Mark Sheet & Passing Certificate (Proof of Date of Birth)<br>
      2. Class 12th Mark Sheet & Passing Certificate<br>
      3. Graduation Degree & All Semester Marksheets (For PG candidates)<br>
      4. Valid Entrance Exam Scorecard (JEE / CET / CAT / GATE)<br><br>
      🏛️ <strong>Institutional Documents:</strong><br>
      5. School/College Transfer Certificate (TC) & Character Certificate<br>
      6. Migration Certificate (Original)<br>
      7. Category / Caste Certificate (if seeking reservation/scholarship)<br>
      8. 6 recent passport-size color photographs<br>
      9. Copy of Aadhaar Card or Passport (Photo ID Proof)`,
      actions: [
        { label: 'Download Checklist', link: 'admission.html#documents' }
      ]
    },
    {
      id: 'hostel',
      keywords: ['hostel', 'hostels', 'accommodation', 'living', 'mess', 'food', 'room', 'dorm', 'stay', 'boarding', 'ac room', 'curfew'],
      response: `<strong>On-Campus Hostel & Residential Facilities:</strong><br><br>
      • Separate high-security hostels for Boys and Girls within campus boundaries.<br>
      • <strong>Room Types:</strong> 2-Seater & 3-Seater with both AC and Non-AC options.<br>
      • <strong>Hostel Fees:</strong> ₹75,000 - ₹95,000 per year (includes 4-time buffet meals, electricity, Wi-Fi & laundry).<br>
      • <strong>Amenities:</strong> 24/7 Power backup, 1 Gbps high-speed Wi-Fi, modern gymnasium, recreational indoor games room, RO drinking water, and round-the-clock medical warden.`,
      actions: [
        { label: 'Campus Tour', link: 'about.html' },
        { label: 'Inquire Hostel', link: 'contact.html' }
      ]
    },
    {
      id: 'transport',
      keywords: ['transport', 'transportation', 'bus', 'buses', 'route', 'routes', 'commute', 'pickup', 'metro', 'travel'],
      response: `<strong>Transportation & Bus Fleet Services:</strong><br><br>
      • Fleet of 40+ air-conditioned and GPS-tracked college buses covering all major points of the city and surrounding suburbs.<br>
      • Dedicated bus marshals and emergency SOS features.<br>
      • Annual bus fee ranges between ₹18,000 to ₹26,000 depending on distance.<br>
      • Free shuttle service between the nearest Metro Station (Central Line) and the Campus every 15 minutes during peak hours.`,
      actions: [
        { label: 'Contact Transport Desk', link: 'contact.html' }
      ]
    },
    {
      id: 'placements',
      keywords: ['placement', 'placements', 'jobs', 'companies', 'salary', 'package', 'highest package', 'average package', 'recruiters', 'recruitment', 'internship'],
      response: `<strong>Placement & Corporate Relations Highlights (2025-26):</strong><br><br>
      🌟 <strong>Key Metrics:</strong><br>
      • <strong>Overall Placement Rate:</strong> 95.4%<br>
      • <strong>Highest Package Offered:</strong> ₹44.5 LPA (International Tech Giant)<br>
      • <strong>Average Package:</strong> ₹8.6 LPA across engineering & management<br>
      • <strong>Total Companies Visited:</strong> 220+ Corporates<br><br>
      💼 <strong>Top Recruiters:</strong><br>
      Google, Microsoft, Amazon, Cisco, TCS Digital, Infosys, Deloitte, Capgemini, Accenture, Wipro, ICICI Bank, and EY.<br>
      • Mandatory corporate summer internships and soft-skill development bootcamps from 2nd year onwards.`,
      actions: [
        { label: 'Explore Courses', link: 'courses.html' },
        { label: 'Apply Now', link: 'admission.html#enquiry-form' }
      ]
    },
    {
      id: 'facilities_library',
      keywords: ['facilities', 'facility', 'library', 'labs', 'laboratories', 'campus', 'infrastructure', 'sports', 'gym', 'cafeteria', 'canteen', 'auditorium'],
      response: `<strong>World-Class Campus Infrastructure:</strong><br><br>
      📚 <strong>Central Digital Library:</strong> 65,000+ volumes, 150+ national/international journals, IEEE/ScienceDirect e-access, 24/7 quiet study halls.<br>
      🔬 <strong>Laboratories:</strong> Apple Mac Lab, NVIDIA AI Research Center, IoT & Robotics Lab, 3D Prototyping Workshop.<br>
      ⚽ <strong>Sports Complex:</strong> FIFA-standard football ground, indoor badminton courts, Olympic-size swimming pool, and basketball arena.<br>
      ☕ <strong>Cafeteria & Food Court:</strong> Multi-cuisine hygienic cafeterias including CCD, Subway, and healthy juice counters.<br>
      🏥 <strong>Health Center:</strong> 24/7 on-campus ambulance, resident doctor, and medical dispensary.`,
      actions: [
        { label: 'About Campus Life', link: 'about.html' }
      ]
    },
    {
      id: 'important_dates',
      keywords: ['dates', 'important dates', 'deadline', 'deadlines', 'last date', 'schedule', 'when does admission start', 'session start', 'entrance date'],
      response: `<strong>Important Admission Dates for Academic Session 2026-27:</strong><br><br>
      📅 <strong>Phase-1 Online Registration:</strong> Open Now (Closes June 30, 2026)<br>
      📅 <strong>AITM Entrance Test (AITMET) Phase 1:</strong> July 12, 2026<br>
      📅 <strong>Merit List Declaration:</strong> July 20, 2026<br>
      📅 <strong>Phase-1 Counseling & Seat Allotment:</strong> July 24 - July 30, 2026<br>
      📅 <strong>Orientation & Commencement of Classes:</strong> August 18, 2026<br><br>
      ⚠️ <em>Early applicants receive priority choice in elective specializations and hostel allocations.</em>`,
      actions: [
        { label: 'Register Before Deadline', link: 'admission.html#enquiry-form' }
      ]
    },
    {
      id: 'contact_info',
      keywords: ['contact', 'phone', 'email', 'helpline', 'address', 'location', 'call', 'admission office', 'timing', 'visiting hours', 'where is college'],
      response: `<strong>Apex Institute of Technology & Management (AITM) Contact Details:</strong><br><br>
      📍 <strong>Campus Address:</strong> Apex Knowledge City, Sector 62, Innovation Expressway, Tech Corridor, State - 400001.<br>
      📞 <strong>Toll-Free Helpline:</strong> +91 (0) 1800-246-8000<br>
      📱 <strong>Admission Cell:</strong> +91 98765 43210 / +91 98765 43211<br>
      ✉️ <strong>Admissions Email:</strong> admissions@apextech.edu.in<br>
      🕒 <strong>Visiting Hours:</strong> Monday - Saturday: 9:00 AM – 5:00 PM`,
      actions: [
        { label: 'Open Contact Page', link: 'contact.html' },
        { label: 'Book Campus Visit', link: 'contact.html#contact-form' }
      ]
    },
    {
      id: 'gratitude',
      keywords: ['thank you', 'thanks', 'thx', 'thank u', 'appreciate', 'great', 'awesome', 'good job', 'bye', 'goodbye', 'see you'],
      response: `You are very welcome! 😊 I am always here to guide you toward an exciting academic journey at AITM.<br><br>If you need any further assistance, feel free to ask anytime. We look forward to seeing you on campus! 🎓✨`,
      actions: [
        { label: 'Apply for Admission', link: 'admission.html' }
      ]
    }
  ];

  // Fallback response when no intent matches with sufficient confidence
  const FALLBACK_RESPONSE = {
    response: `I'm sorry, I couldn't find an exact match for that specific question in my admission database.<br><br>Here are a few common topics you can ask me about:<br>
    • <em>"What courses are available?"</em><br>
    • <em>"What is the eligibility for B.Tech CSE?"</em><br>
    • <em>"What is the fee structure and scholarship?"</em><br>
    • <em>"Tell me about hostel and placements"</em><br><br>
    Alternatively, our human admission counselors are available Monday-Saturday (9 AM - 5 PM) at <strong>+91 98765 43210</strong> or via email at <strong>admissions@apextech.edu.in</strong>.`,
    actions: [
      { label: 'View All Courses', link: 'courses.html' },
      { label: 'Submit Admission Query', link: 'admission.html#enquiry-form' },
      { label: 'Contact Helpdesk', link: 'contact.html' }
    ]
  };

  // --------------------------------------------------------------------------
  // 2. CHATBOT STATE & CONSTANTS
  // --------------------------------------------------------------------------
  const STORAGE_KEY = 'aitm_chatbot_messages_v1';
  let chatHistory = [];
  let isTyping = false;
  let isSoundEnabled = true;

  // DOM Elements cache
  let widgetContainer, launcherBtn, chatWindow, chatBody, chatForm, chatInput, micBtn, clearBtn, soundBtn, closeBtn, suggestionsBar;

  // --------------------------------------------------------------------------
  // 3. SOUND SYNTHESIZER (Web Audio API - No external mp3 files needed)
  // --------------------------------------------------------------------------
  function playPopChime() {
    if (!isSoundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880.00, ctx.currentTime + 0.12); // A5

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch (e) {
      // Audio autoplay policy or unsupported - silent fallback
    }
  }

  // --------------------------------------------------------------------------
  // 4. RULE-BASED MATCHING ENGINE
  // --------------------------------------------------------------------------
  function findBestIntent(userText) {
    if (!userText || typeof userText !== 'string') return null;

    // Clean & normalize user input
    const normalized = userText
      .toLowerCase()
      .replace(/[^\w\s]/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!normalized) return null;

    let bestMatch = null;
    let highestScore = 0;

    for (const item of KNOWLEDGE_BASE) {
      let score = 0;
      for (const kw of item.keywords) {
        const kwLower = kw.toLowerCase();
        
        // Exact full phrase match
        if (normalized === kwLower) {
          score += 50;
        } 
        // Substring match
        else if (normalized.includes(kwLower)) {
          // If keyword is multi-word, give higher weight
          score += (kwLower.split(' ').length > 1) ? 25 : 10;
        } 
        // Token match
        else {
          const userWords = normalized.split(' ');
          const kwWords = kwLower.split(' ');
          for (const uw of userWords) {
            if (kwWords.includes(uw) && uw.length > 2) {
              score += 5;
            }
          }
        }
      }

      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    }

    // Minimum threshold for confident match
    return (highestScore >= 5) ? bestMatch : null;
  }

  // --------------------------------------------------------------------------
  // 5. LOCALSTORAGE PERSISTENCE
  // --------------------------------------------------------------------------
  function loadChatHistory() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        chatHistory = JSON.parse(stored);
      } else {
        // Default initial greeting if no previous history
        chatHistory = [
          {
            sender: 'bot',
            text: `Hello! 👋 Welcome to <strong>Apex Institute of Technology & Management</strong>.<br><br>I am <strong>AURA</strong>, your 24/7 AI Admission Assistant. How can I help you today? Feel free to ask about courses, eligibility, fees, scholarships, or the application process.`,
            time: formatCurrentTime(),
            actions: [
              { label: 'What courses are available?', query: 'What courses are available?' },
              { label: 'What is the fee structure?', query: 'What is the fee structure?' },
              { label: 'How to apply?', query: 'What is the admission process?' }
            ]
          }
        ];
        saveChatHistory();
      }
    } catch (e) {
      chatHistory = [];
    }
  }

  function saveChatHistory() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(chatHistory.slice(-40))); // Keep last 40 messages
    } catch (e) {
      console.warn('Failed to save chat to localStorage', e);
    }
  }

  function formatCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 12-hour format
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
  }

  // --------------------------------------------------------------------------
  // 6. UI RENDERING FUNCTIONS
  // --------------------------------------------------------------------------
  function renderAllMessages() {
    if (!chatBody) return;
    chatBody.innerHTML = '';

    // Date Divider
    const dateDiv = document.createElement('div');
    dateDiv.className = 'chat-date-divider';
    dateDiv.innerHTML = '<span>Today • Admission Helpdesk</span>';
    chatBody.appendChild(dateDiv);

    chatHistory.forEach(msg => {
      appendMessageToDOM(msg, false);
    });

    scrollToBottom();
  }

  function appendMessageToDOM(msg, shouldScroll = true) {
    if (!chatBody) return;

    const row = document.createElement('div');
    row.className = `chat-msg-row ${msg.sender}`;

    if (msg.sender === 'bot') {
      const avatarDiv = document.createElement('div');
      avatarDiv.className = 'chat-msg-avatar';
      avatarDiv.innerHTML = `<img src="assets/images/bot-avatar.svg" alt="AURA Bot">`;
      row.appendChild(avatarDiv);
    }

    const bubbleWrap = document.createElement('div');
    bubbleWrap.className = 'chat-msg-bubble-wrap';

    const bubble = document.createElement('div');
    bubble.className = 'chat-msg-bubble';
    bubble.innerHTML = msg.text;

    // Render interactive action links or prompt buttons if present
    if (msg.actions && msg.actions.length > 0) {
      const actionsWrap = document.createElement('div');
      actionsWrap.className = 'bot-action-links';

      msg.actions.forEach(action => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'bot-action-link';
        btn.innerHTML = `<i class="fa-solid fa-arrow-right"></i> ${action.label}`;

        btn.addEventListener('click', () => {
          if (action.link) {
            window.location.href = action.link;
          } else if (action.query) {
            handleUserMessage(action.query);
          }
        });

        actionsWrap.appendChild(btn);
      });

      bubble.appendChild(actionsWrap);
    }

    const timeSpan = document.createElement('span');
    timeSpan.className = 'chat-msg-timestamp';
    timeSpan.textContent = msg.time || formatCurrentTime();

    bubbleWrap.appendChild(bubble);
    bubbleWrap.appendChild(timeSpan);
    row.appendChild(bubbleWrap);

    chatBody.appendChild(row);

    if (shouldScroll) {
      scrollToBottom();
    }
  }

  function showTypingIndicator() {
    if (document.getElementById('typing-indicator-row')) return;

    const row = document.createElement('div');
    row.id = 'typing-indicator-row';
    row.className = 'chat-msg-row bot typing-indicator-row';

    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'chat-msg-avatar';
    avatarDiv.innerHTML = `<img src="assets/images/bot-avatar.svg" alt="AURA Bot">`;
    row.appendChild(avatarDiv);

    const bubble = document.createElement('div');
    bubble.className = 'typing-bubble';
    bubble.innerHTML = `
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    `;

    row.appendChild(bubble);
    chatBody.appendChild(row);
    scrollToBottom();
  }

  function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator-row');
    if (indicator) {
      indicator.remove();
    }
  }

  function scrollToBottom() {
    if (chatBody) {
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }

  // --------------------------------------------------------------------------
  // 7. MESSAGE PROCESSING & BOT LOGIC
  // --------------------------------------------------------------------------
  function handleUserMessage(text) {
    if (!text || isTyping) return;
    const cleanText = text.trim();
    if (!cleanText) return;

    // 1. Add user message
    const userMsg = {
      sender: 'user',
      text: escapeHTML(cleanText),
      time: formatCurrentTime()
    };
    chatHistory.push(userMsg);
    saveChatHistory();
    appendMessageToDOM(userMsg, true);

    // Clear input
    if (chatInput) chatInput.value = '';

    // 2. Set typing state
    isTyping = true;
    showTypingIndicator();

    // 3. Process query with realistic simulated delay (600ms - 900ms)
    const simulatedDelay = Math.floor(Math.random() * 300) + 600;

    setTimeout(() => {
      removeTypingIndicator();

      const matched = findBestIntent(cleanText);
      const botResponseData = matched || FALLBACK_RESPONSE;

      const botMsg = {
        sender: 'bot',
        text: botResponseData.response,
        time: formatCurrentTime(),
        actions: botResponseData.actions || []
      };

      chatHistory.push(botMsg);
      saveChatHistory();
      appendMessageToDOM(botMsg, true);
      playPopChime();

      isTyping = false;
    }, simulatedDelay);
  }

  function escapeHTML(str) {
    const p = document.createElement('p');
    p.textContent = str;
    return p.innerHTML;
  }

  // --------------------------------------------------------------------------
  // 8. VOICE SPEECH RECOGNITION (Web Speech API)
  // --------------------------------------------------------------------------
  function setupSpeechRecognition() {
    if (!micBtn) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      micBtn.title = 'Voice speech recognition not supported in this browser';
      micBtn.style.opacity = '0.5';
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    let isListening = false;

    micBtn.addEventListener('click', () => {
      if (isListening) {
        recognition.stop();
        return;
      }
      try {
        recognition.start();
        micBtn.classList.add('listening');
        micBtn.title = 'Listening... Speak your query';
        isListening = true;
      } catch (err) {
        console.warn('Speech recognition start failed', err);
      }
    });

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (chatInput) {
        chatInput.value = transcript;
        handleUserMessage(transcript);
      }
    };

    recognition.onspeechend = () => {
      recognition.stop();
    };

    recognition.onend = () => {
      micBtn.classList.remove('listening');
      micBtn.title = 'Voice input (Click and speak)';
      isListening = false;
    };

    recognition.onerror = () => {
      micBtn.classList.remove('listening');
      isListening = false;
    };
  }

  // --------------------------------------------------------------------------
  // 9. CHATBOT WIDGET DOM INJECTION & EVENT WIRING
  // --------------------------------------------------------------------------
  function injectChatbotMarkup() {
    // Check if container already exists
    if (document.getElementById('chatbot-widget-container')) return;

    const wrapper = document.createElement('div');
    wrapper.id = 'chatbot-widget-container';
    wrapper.className = 'chatbot-widget-container';

    wrapper.innerHTML = `
      <!-- Floating Tooltip Pill -->
      <div class="launcher-tooltip-pill">
        Need Admission Help? <strong>Chat with AI</strong>
      </div>

      <!-- Floating Launcher Button -->
      <button class="chatbot-launcher-btn" id="chatbot-launcher-btn" aria-label="Open Admission AI Chatbot" title="Chat with Admission Assistant">
        <span class="launcher-pulse-ring"></span>
        <span class="launcher-notification-pill">1</span>
        <i class="fa-solid fa-graduation-cap launcher-icon-open"></i>
        <i class="fa-solid fa-xmark launcher-icon-close"></i>
      </button>

      <!-- Chat Window Modal -->
      <div class="chat-window" id="chat-window" role="dialog" aria-labelledby="chat-bot-title">
        <!-- Header -->
        <div class="chat-header">
          <div class="chat-header-profile">
            <div class="chat-bot-avatar">
              <img src="assets/images/bot-avatar.svg" alt="AURA AI Assistant">
              <span class="chat-online-dot"></span>
            </div>
            <div class="chat-header-meta">
              <h4 id="chat-bot-title">AURA • Admission AI</h4>
              <p><i class="fa-solid fa-circle-check" style="color: #38bdf8; font-size: 0.7rem;"></i> Online • Instant Responses</p>
            </div>
          </div>
          <div class="chat-header-actions">
            <button type="button" class="chat-action-btn" id="chat-sound-btn" title="Toggle Sound Chime" aria-label="Toggle Sound">
              <i class="fa-solid fa-volume-high"></i>
            </button>
            <button type="button" class="chat-action-btn" id="chat-clear-btn" title="Clear Conversation" aria-label="Clear Conversation">
              <i class="fa-solid fa-trash-can"></i>
            </button>
            <button type="button" class="chat-action-btn" id="chat-close-btn" title="Minimize Chat" aria-label="Close Chat">
              <i class="fa-solid fa-chevron-down"></i>
            </button>
          </div>
        </div>

        <!-- Suggestion Chips Bar -->
        <div class="chat-suggestions-bar" id="chat-suggestions-bar">
          <button type="button" class="suggestion-chip" data-query="What courses are available?">
            <i class="fa-solid fa-book-open"></i> Courses Available
          </button>
          <button type="button" class="suggestion-chip" data-query="What is the admission process?">
            <i class="fa-solid fa-list-check"></i> Admission Process
          </button>
          <button type="button" class="suggestion-chip" data-query="What are the eligibility criteria?">
            <i class="fa-solid fa-id-badge"></i> Eligibility Criteria
          </button>
          <button type="button" class="suggestion-chip" data-query="What is the fee structure?">
            <i class="fa-solid fa-indian-rupee-sign"></i> Fee Structure
          </button>
          <button type="button" class="suggestion-chip" data-query="Are scholarships available?">
            <i class="fa-solid fa-award"></i> Scholarships
          </button>
          <button type="button" class="suggestion-chip" data-query="What documents are required?">
            <i class="fa-solid fa-file-invoice"></i> Documents Required
          </button>
          <button type="button" class="suggestion-chip" data-query="What are the placement opportunities?">
            <i class="fa-solid fa-briefcase"></i> Placements
          </button>
          <button type="button" class="suggestion-chip" data-query="Hostel and Mess facilities">
            <i class="fa-solid fa-bed"></i> Hostels & Mess
          </button>
          <button type="button" class="suggestion-chip" data-query="What are the important dates and deadlines?">
            <i class="fa-solid fa-calendar-days"></i> Important Dates
          </button>
          <button type="button" class="suggestion-chip" data-query="College contact and helpline">
            <i class="fa-solid fa-phone"></i> Contact Helpline
          </button>
        </div>

        <!-- Scrollable Messages Body -->
        <div class="chat-body" id="chat-body"></div>

        <!-- Footer Input Form -->
        <div class="chat-footer">
          <form class="chat-input-form" id="chat-input-form" autocomplete="off">
            <input 
              type="text" 
              class="chat-input-field" 
              id="chat-input-field" 
              placeholder="Ask about courses, fees, cutoff, dates..." 
              aria-label="Student query input" 
              required
            >
            <button type="button" class="chat-mic-btn" id="chat-mic-btn" title="Voice input (Click and speak)" aria-label="Voice input">
              <i class="fa-solid fa-microphone"></i>
            </button>
            <button type="submit" class="chat-send-btn" id="chat-send-btn" title="Send Message" aria-label="Send query">
              <i class="fa-solid fa-paper-plane"></i>
            </button>
          </form>
          <div class="chatfootnote">
            <small class="chat-footnote" style="display:block; text-align:center; color:#94a3b8; font-size:0.675rem; margin-top:0.35rem;">
              Rule-Based Student Assistant • Academic Project Demo
            </small>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(wrapper);
  }

  function initChatbot() {
    injectChatbotMarkup();

    // Cache elements
    widgetContainer = document.getElementById('chatbot-widget-container');
    launcherBtn = document.getElementById('chatbot-launcher-btn');
    chatWindow = document.getElementById('chat-window');
    chatBody = document.getElementById('chat-body');
    chatForm = document.getElementById('chat-input-form');
    chatInput = document.getElementById('chat-input-field');
    micBtn = document.getElementById('chat-mic-btn');
    clearBtn = document.getElementById('chat-clear-btn');
    soundBtn = document.getElementById('chat-sound-btn');
    closeBtn = document.getElementById('chat-close-btn');
    suggestionsBar = document.getElementById('chat-suggestions-bar');

    // Load persisted history
    loadChatHistory();
    renderAllMessages();

    // Event Listeners
    launcherBtn.addEventListener('click', toggleChatbot);
    closeBtn.addEventListener('click', closeChatbot);

    // Form submit
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleUserMessage(chatInput.value);
    });

    // Clear chat button
    clearBtn.addEventListener('click', () => {
      if (confirm('Clear chat history and reset conversation with AURA?')) {
        chatHistory = [];
        localStorage.removeItem(STORAGE_KEY);
        loadChatHistory();
        renderAllMessages();
      }
    });

    // Sound toggle button
    soundBtn.addEventListener('click', () => {
      isSoundEnabled = !isSoundEnabled;
      soundBtn.innerHTML = isSoundEnabled ? `<i class="fa-solid fa-volume-high"></i>` : `<i class="fa-solid fa-volume-xmark"></i>`;
      soundBtn.title = isSoundEnabled ? 'Mute Chimes' : 'Unmute Chimes';
    });

    // Suggestion chip clicks
    if (suggestionsBar) {
      suggestionsBar.addEventListener('click', (e) => {
        const chip = e.target.closest('.suggestion-chip');
        if (chip && chip.dataset.query) {
          handleUserMessage(chip.dataset.query);
        }
      });
    }

    // Voice recognition setup
    setupSpeechRecognition();

    // Global helper exposed to window so course cards & hero buttons can trigger query
    window.openChatWithQuery = function (queryText) {
      openChatbot();
      if (queryText) {
        setTimeout(() => {
          handleUserMessage(queryText);
        }, 350);
      }
    };
  }

  function toggleChatbot() {
    if (widgetContainer.classList.contains('active')) {
      closeChatbot();
    } else {
      openChatbot();
    }
  }

  function openChatbot() {
    widgetContainer.classList.add('active');
    // Hide unread notification badge once opened
    const badge = widgetContainer.querySelector('.launcher-notification-pill');
    if (badge) badge.style.display = 'none';

    setTimeout(() => {
      if (chatInput) chatInput.focus();
      scrollToBottom();
    }, 250);
  }

  function closeChatbot() {
    widgetContainer.classList.remove('active');
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
  } else {
    initChatbot();
  }

})();
