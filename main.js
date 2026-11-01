/**
 * ============================================================================
 * SMART COLLEGE ADMISSION ASSISTANT - MAIN JAVASCRIPT
 * Apex Institute of Technology & Management (AITM)
 * 
 * Features:
 * - Responsive Mobile Navigation Drawer & Sticky Header
 * - Active Page Navigation Indicator
 * - Smooth Number Counters for Academic & Placement Stats
 * - Course Catalog Filtering & Real-Time Search System
 * - Form Validation & Admission Application Processing
 * - Dynamic Tracking ID Generation & LocalStorage Application Vault
 * - Application Status Lookup Feature (For Demo & Viva Presentation)
 * - Accessible FAQ Accordion Interaction
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. MOBILE NAVIGATION & STICKY HEADER
  // --------------------------------------------------------------------------
  const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
  const navMenu = document.getElementById('nav-menu');
  const siteHeader = document.getElementById('site-header');

  if (mobileToggleBtn && navMenu) {
    mobileToggleBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      mobileToggleBtn.innerHTML = isOpen 
        ? '<i class="fa-solid fa-xmark"></i>' 
        : '<i class="fa-solid fa-bars"></i>';
      mobileToggleBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking outside or clicking any nav link
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggleBtn.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileToggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        mobileToggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Header shadow on scroll
  window.addEventListener('scroll', () => {
    if (siteHeader) {
      if (window.scrollY > 20) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }
  });

  // --------------------------------------------------------------------------
  // 2. ACTIVE NAVIGATION LINK HIGHLIGHTING
  // --------------------------------------------------------------------------
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // --------------------------------------------------------------------------
  // 3. ANIMATED NUMBER COUNTERS (FOR STATS SECTIONS)
  // --------------------------------------------------------------------------
  const counterElements = document.querySelectorAll('.counter-val');

  if (counterElements.length > 0 && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const targetNum = parseFloat(el.getAttribute('data-target')) || 0;
          const prefix = el.getAttribute('data-prefix') || '';
          const suffix = el.getAttribute('data-suffix') || '';
          const duration = 1800; // ms
          const stepTime = 25;
          const totalSteps = duration / stepTime;
          let currentStep = 0;

          const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / totalSteps;
            const currentVal = Math.round(targetNum * Math.min(progress, 1));
            el.textContent = `${prefix}${currentVal}${suffix}`;

            if (currentStep >= totalSteps) {
              clearInterval(timer);
              el.textContent = `${prefix}${targetNum}${suffix}`;
            }
          }, stepTime);

          observer.unobserve(el);
        }
      });
    }, { threshold: 0.2 });

    counterElements.forEach(el => counterObserver.observe(el));
  }

  // --------------------------------------------------------------------------
  // 4. COURSE CATALOG FILTERING & SEARCH (COURSES PAGE)
  // --------------------------------------------------------------------------
  const courseSearchInput = document.getElementById('course-search-input');
  const courseFilterBtns = document.querySelectorAll('.filter-tab-btn');
  const courseCards = document.querySelectorAll('.course-card');

  function filterCourses() {
    if (!courseCards.length) return;

    const searchTerm = (courseSearchInput ? courseSearchInput.value : '').toLowerCase().trim();
    const activeFilterBtn = document.querySelector('.filter-tab-btn.active');
    const selectedCategory = activeFilterBtn ? activeFilterBtn.getAttribute('data-category') : 'all';

    let visibleCount = 0;

    courseCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category') || '';
      const cardTitle = (card.querySelector('.course-title')?.textContent || '').toLowerCase();
      const cardDesc = (card.querySelector('.course-description')?.textContent || '').toLowerCase();

      const matchesCategory = (selectedCategory === 'all' || cardCategory === selectedCategory);
      const matchesSearch = !searchTerm || cardTitle.includes(searchTerm) || cardDesc.includes(searchTerm);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Handle no results message
    const noResultsMsg = document.getElementById('no-courses-found');
    if (noResultsMsg) {
      noResultsMsg.style.display = (visibleCount === 0) ? 'block' : 'none';
    }
  }

  if (courseFilterBtns.length > 0) {
    courseFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        courseFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterCourses();
      });
    });
  }

  if (courseSearchInput) {
    courseSearchInput.addEventListener('input', filterCourses);
  }

  // "Ask Bot about this course" button triggers
  document.addEventListener('click', (e) => {
    const askBotBtn = e.target.closest('.btn-ask-bot');
    if (askBotBtn) {
      const query = askBotBtn.getAttribute('data-bot-query');
      if (typeof window.openChatWithQuery === 'function') {
        window.openChatWithQuery(query);
      }
    }
  });

  // --------------------------------------------------------------------------
  // 5. URL PARAMETER HANDLER (FOR COURSE AUTO-SELECTION)
  // --------------------------------------------------------------------------
  const urlParams = new URLSearchParams(window.location.search);
  const preselectedCourse = urlParams.get('course');
  const programSelect = document.getElementById('enquiry-course');

  if (preselectedCourse && programSelect) {
    for (let i = 0; i < programSelect.options.length; i++) {
      if (programSelect.options[i].value.toLowerCase().includes(preselectedCourse.toLowerCase())) {
        programSelect.selectedIndex = i;
        break;
      }
    }
  }

  // --------------------------------------------------------------------------
  // 6. ADMISSION ENQUIRY & APPLICATION FORM VALIDATION & PROCESSING
  // --------------------------------------------------------------------------
  const admissionForm = document.getElementById('admission-enquiry-form');
  const receiptModal = document.getElementById('application-receipt-modal');
  const modalCloseBtns = document.querySelectorAll('.modal-close-trigger');

  if (admissionForm) {
    admissionForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Inputs
      const fullNameInput = document.getElementById('enquiry-name');
      const emailInput = document.getElementById('enquiry-email');
      const phoneInput = document.getElementById('enquiry-phone');
      const courseInput = document.getElementById('enquiry-course');
      const marksInput = document.getElementById('enquiry-marks');
      const stateInput = document.getElementById('enquiry-state');

      // Helper to toggle error
      function validateField(input, condition, errorId, errorText) {
        const errorEl = document.getElementById(errorId);
        if (!condition) {
          input.classList.add('error');
          if (errorEl) {
            errorEl.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${errorText}`;
            errorEl.classList.add('visible');
          }
          isValid = false;
        } else {
          input.classList.remove('error');
          if (errorEl) {
            errorEl.classList.remove('visible');
          }
        }
      }

      // Name check
      const nameVal = fullNameInput.value.trim();
      validateField(
        fullNameInput, 
        nameVal.length >= 3 && /^[a-zA-Z\s.]+$/.test(nameVal), 
        'name-error', 
        'Please enter a valid full name (letters only).'
      );

      // Email check
      const emailVal = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      validateField(
        emailInput, 
        emailRegex.test(emailVal), 
        'email-error', 
        'Please enter a valid email address.'
      );

      // Phone check (10 digits)
      const phoneVal = phoneInput.value.trim();
      const phoneRegex = /^[0-9]{10}$/;
      validateField(
        phoneInput, 
        phoneRegex.test(phoneVal), 
        'phone-error', 
        'Please enter a valid 10-digit mobile number.'
      );

      // Course select check
      validateField(
        courseInput, 
        courseInput.value !== '', 
        'course-error', 
        'Please select a program of interest.'
      );

      // Marks check
      const marksVal = parseFloat(marksInput.value);
      validateField(
        marksInput, 
        !isNaN(marksVal) && marksVal >= 35 && marksVal <= 100, 
        'marks-error', 
        'Please enter a percentage between 35% and 100%.'
      );

      if (!isValid) {
        return;
      }

      // Generate dynamic tracking ID: AITM-2026-XXXX
      const randomSeq = Math.floor(1000 + Math.random() * 9000);
      const applicationId = `AITM-2026-${randomSeq}`;
      const submissionDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      // Construct application record object
      const applicationData = {
        id: applicationId,
        name: nameVal,
        email: emailVal,
        phone: phoneVal,
        course: courseInput.options[courseInput.selectedIndex].text,
        marks: `${marksVal}%`,
        state: stateInput ? stateInput.value.trim() : 'N/A',
        date: submissionDate,
        status: 'Under Review by Academic Cell'
      };

      // Save to localStorage vault
      try {
        const existingVault = JSON.parse(localStorage.getItem('aitm_applications_vault') || '[]');
        existingVault.push(applicationData);
        localStorage.setItem('aitm_applications_vault', JSON.stringify(existingVault));
      } catch (err) {
        console.warn('Could not save to localStorage', err);
      }

      // Populate Receipt Modal
      document.getElementById('receipt-app-id').textContent = applicationId;
      document.getElementById('receipt-name').textContent = applicationData.name;
      document.getElementById('receipt-email').textContent = applicationData.email;
      document.getElementById('receipt-phone').textContent = applicationData.phone;
      document.getElementById('receipt-course').textContent = applicationData.course;
      document.getElementById('receipt-marks').textContent = applicationData.marks;
      document.getElementById('receipt-date').textContent = applicationData.date;

      // Show receipt modal
      if (receiptModal) {
        receiptModal.classList.add('active');
      }

      // Reset Form
      admissionForm.reset();
    });
  }

  // Modal Close buttons
  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (receiptModal) receiptModal.classList.remove('active');
    });
  });

  // Print Receipt Button
  const printReceiptBtn = document.getElementById('btn-print-receipt');
  if (printReceiptBtn) {
    printReceiptBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // --------------------------------------------------------------------------
  // 7. APPLICATION STATUS LOOKUP TOOL
  // --------------------------------------------------------------------------
  const statusLookupForm = document.getElementById('status-lookup-form');
  const statusResultCard = document.getElementById('status-result-card');

  if (statusLookupForm && statusResultCard) {
    statusLookupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const searchKey = document.getElementById('lookup-input').value.trim().toUpperCase();
      const vault = JSON.parse(localStorage.getItem('aitm_applications_vault') || '[]');

      const match = vault.find(app => 
        app.id.toUpperCase() === searchKey || 
        app.phone.includes(searchKey) ||
        app.email.toUpperCase() === searchKey
      );

      statusResultCard.style.display = 'block';

      if (match) {
        statusResultCard.innerHTML = `
          <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:12px; padding:1.25rem;">
            <div style="display:flex; align-items:center; gap:0.5rem; color:#065f46; font-weight:700; font-size:1.05rem; margin-bottom:0.75rem;">
              <i class="fa-solid fa-circle-check"></i> Application Found & Verified!
            </div>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:0.75rem; font-size:0.875rem;">
              <div><strong>Application ID:</strong> <span style="color:#1e3a8a; font-weight:700;">${match.id}</span></div>
              <div><strong>Candidate Name:</strong> ${match.name}</div>
              <div><strong>Program:</strong> ${match.course}</div>
              <div><strong>Applied On:</strong> ${match.date}</div>
              <div><strong>Qualifying Marks:</strong> ${match.marks}</div>
              <div><strong>Current Status:</strong> <span class="status-pill status-active">${match.status}</span></div>
            </div>
          </div>
        `;
      } else {
        statusResultCard.innerHTML = `
          <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:12px; padding:1.25rem; color:#991b1b;">
            <div style="font-weight:700; margin-bottom:0.35rem;">
              <i class="fa-solid fa-triangle-exclamation"></i> No Record Found
            </div>
            <p style="font-size:0.875rem; margin:0;">
              No application matched "<strong>${escapeHtml(searchKey)}</strong>". Please double check your Application ID (e.g. <em>AITM-2026-XXXX</em>) or registered phone number. You can submit a new enquiry above.
            </p>
          </div>
        `;
      }
    });
  }

  // --------------------------------------------------------------------------
  // 8. CONTACT FORM SUBMISSION HANDLER
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('college-contact-form');
  const contactSuccessNotice = document.getElementById('contact-success-notice');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !subject || !message) {
        alert('Please complete all required fields.');
        return;
      }

      // Show friendly confirmation notice
      if (contactSuccessNotice) {
        contactSuccessNotice.style.display = 'block';
        contactSuccessNotice.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        alert(`Thank you, ${name}! Your inquiry has been routed to the Admissions Desk. Reference: AITM-INQ-${Math.floor(1000 + Math.random() * 9000)}.`);
      }

      contactForm.reset();
    });
  }

  // --------------------------------------------------------------------------
  // 9. FAQ ACCORDION INTERACTION
  // --------------------------------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    const answerPanel = item.querySelector('.faq-answer-panel');

    if (questionBtn && answerPanel) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherPanel = otherItem.querySelector('.faq-answer-panel');
            if (otherPanel) otherPanel.style.maxHeight = null;
          }
        });

        // Toggle current item
        if (isActive) {
          item.classList.remove('active');
          answerPanel.style.maxHeight = null;
        } else {
          item.classList.add('active');
          answerPanel.style.maxHeight = answerPanel.scrollHeight + 'px';
        }
      });
    }
  });

  // Utility helper
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
});
