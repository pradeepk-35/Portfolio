/* ==========================================================================
   Pradeepa K PORTFOLIO - INTERACTIVE JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    const navLinkItems = document.querySelectorAll('.nav-link');

    const resumeBtn = document.getElementById('resumeBtn');
    const resumeModal = document.getElementById('resumeModal');
    const closeResumeModal = document.getElementById('closeResumeModal');
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');

    const projectModal = document.getElementById('projectModal');
    const closeProjectModal = document.getElementById('closeProjectModal');
    const closeProjectModalBtn = document.getElementById('closeProjectModalBtn');
    const openDemoBtns = document.querySelectorAll('.open-demo-btn');
    const modalProjectTitle = document.getElementById('modalProjectTitle');
    const modalProjectDesc = document.getElementById('modalProjectDesc');

    const filterBtns = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');

    // --- 1. Sticky Navbar on Scroll ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Highlight active nav item based on scroll position
        highlightActiveNav();
    });

    // --- 2. Mobile Menu Toggle ---
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('open');
        });

        // Close menu when clicking any link
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('open');
            });
        });
    }

    // --- 3. Scroll Section Highlighting ---
    const sections = document.querySelectorAll('section[id]');
    function highlightActiveNav() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const targetNavLink = document.querySelector(`.nav-links a[href*=${sectionId}]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinkItems.forEach(link => link.classList.remove('active'));
                if (targetNavLink) targetNavLink.classList.add('active');
            }
        });
    }

    // --- 4. Skills Category Filtering ---
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });

    // --- 5. Modals Management ---
    // Helper to open modal
    function openModal(modal) {
        if (modal) {
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    }

    // Helper to close modal
    function closeModal(modal) {
        if (modal) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    // Resume Modal Triggers
    if (resumeBtn) {
        resumeBtn.addEventListener('click', () => openModal(resumeModal));
    }
    if (closeResumeModal) {
        closeResumeModal.addEventListener('click', () => closeModal(resumeModal));
    }

    // Project Preview Modal Triggers
    openDemoBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const title = btn.getAttribute('data-title');
            const desc = btn.getAttribute('data-desc');

            if (modalProjectTitle) modalProjectTitle.textContent = title;
            if (modalProjectDesc) modalProjectDesc.textContent = desc;

            openModal(projectModal);
        });
    });

    if (closeProjectModal) {
        closeProjectModal.addEventListener('click', () => closeModal(projectModal));
    }
    if (closeProjectModalBtn) {
        closeProjectModalBtn.addEventListener('click', () => closeModal(projectModal));
    }

    // Close modal on clicking backdrop
    [resumeModal, projectModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal(modal);
                }
            });
        }
    });

    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal(resumeModal);
            closeModal(projectModal);
        }
    });

    // Download PDF Action Simulation
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', () => {
            showToast("Resume download started! (PDF)");
            closeModal(resumeModal);
        });
    }

    // --- 6. Contact Form Submission ---
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;

            // Submit animation feedback
            const submitBtn = contactForm.querySelector('.form-submit');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = `<span>Sending...</span>`;
            submitBtn.disabled = true;

            setTimeout(() => {
                showToast(`Thank you, ${name}! Your message has been sent.`);
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1200);
        });
    }

    // --- 7. Toast Notification Utility ---
    function showToast(message) {
        if (toast && toastMsg) {
            toastMsg.textContent = message;
            toast.classList.add('show');

            setTimeout(() => {
                toast.classList.remove('show');
            }, 4000);
        }
    }

    // --- 8. Smooth Scrolling offset for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + (window.scrollY || window.pageYOffset) - headerOffset;

                window.scrollTo({
                    top: Math.max(0, offsetPosition),
                    behavior: 'smooth'
                });
            }
        });
    });
});
