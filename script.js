/* -------------------------------------------------------------
   UNIVERSAL PUBLIC SCHOOL (UPS GOTEGAON) - JAVASCRIPT LOGIC
   Optimized for Zero-Lag, Ultra-Responsive Mobile Performance
   ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

    // 1. OPTIMIZED STICKY NAVBAR & SCROLL THROTTLING
    const header = document.querySelector('.header');
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false;
    let ticking = false;

    function handleScroll() {
        const scrollY = window.scrollY;

        // Sticky header class
        if (header) {
            if (scrollY > 40) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Counter animation check
        if (!countersAnimated) {
            const statsSection = document.querySelector('.stats-section');
            if (statsSection) {
                const sectionPos = statsSection.getBoundingClientRect().top;
                const screenPos = window.innerHeight / 1.15;

                if (sectionPos < screenPos) {
                    countersAnimated = true;
                    statNumbers.forEach(counter => {
                        const target = +counter.getAttribute('data-target');
                        const suffix = counter.getAttribute('data-suffix') || '';
                        let count = 0;
                        const step = Math.max(1, Math.ceil(target / 45));

                        const updateCount = () => {
                            count += step;
                            if (count < target) {
                                counter.innerText = count + suffix;
                                requestAnimationFrame(updateCount);
                            } else {
                                counter.innerText = target + suffix;
                            }
                        };
                        requestAnimationFrame(updateCount);
                    });
                }
            }
        }

        ticking = false;
    }

    // High performance scroll listener using requestAnimationFrame & passive listener
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(handleScroll);
            ticking = true;
        }
    }, { passive: true });

    // Initial check
    handleScroll();

    // 2. MOBILE NAVIGATION MENU TOGGLE & BODY SCROLL LOCK
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    function closeMobileMenu() {
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
            if (mobileToggle) {
                const icon = mobileToggle.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
            }
        }
    }

    function openMobileMenu() {
        if (navLinks) {
            navLinks.classList.add('active');
            document.body.classList.add('menu-open');
            if (mobileToggle) {
                const icon = mobileToggle.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-xmark';
            }
        }
    }

    if (mobileToggle) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (navLinks.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    // Close menu when clicking any nav link or mobile action button
    document.querySelectorAll('.nav-link, .mobile-nav-actions button').forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Close mobile menu if clicked outside
    document.addEventListener('click', (e) => {
        if (navLinks && navLinks.classList.contains('active') && !navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // 3. HERO SLIDER AUTO-ROTATE & MOBILE TOUCH SWIPE GESTURES
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const heroSlider = document.querySelector('.hero-slider');
    let currentSlide = 0;
    let sliderInterval;

    function showSlide(index) {
        if (slides.length === 0) return;
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    function startSlider() {
        if (slides.length <= 1) return;
        clearInterval(sliderInterval);
        sliderInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5500);
    }

    if (slides.length > 0) {
        showSlide(0);
        startSlider();

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                showSlide(currentSlide + 1);
                startSlider();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                showSlide(currentSlide - 1);
                startSlider();
            });
        }

        // Touch Swipe Gesture Handling for Mobile Devices
        if (heroSlider) {
            let touchStartX = 0;
            let touchEndX = 0;

            heroSlider.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            heroSlider.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });

            function handleSwipe() {
                const swipeThreshold = 40; // minimum pixels to trigger swipe
                if (touchEndX < touchStartX - swipeThreshold) {
                    // Swiped Left -> Next Slide
                    showSlide(currentSlide + 1);
                    startSlider();
                } else if (touchEndX > touchStartX + swipeThreshold) {
                    // Swiped Right -> Previous Slide
                    showSlide(currentSlide - 1);
                    startSlider();
                }
            }
        }
    }

    // 4. ACADEMIC TABS SWITCHER WITH SMOOTH FADE
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            if (!tabId) return;

            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const targetTab = document.getElementById(tabId);
            if (targetTab) {
                targetTab.classList.add('active');
            }
        });
    });

    // 5. GALLERY CATEGORY FILTER
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 6. LIGHTBOX MODAL FOR GALLERY
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img && lightbox && lightboxImg) {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
                document.body.classList.add('menu-open');
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }

    // 7. ADMISSION APPLICATION WIZARD MODAL
    const admissionModal = document.getElementById('admissionModal');
    const openAdmissionBtns = document.querySelectorAll('.open-admission-modal');
    const closeAdmissionModal = document.getElementById('closeAdmissionModal');
    const admissionForm = document.getElementById('admissionForm');

    openAdmissionBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            closeMobileMenu();
            if (admissionModal) {
                admissionModal.classList.add('active');
                document.body.classList.add('menu-open');
            }
        });
    });

    if (closeAdmissionModal) {
        closeAdmissionModal.addEventListener('click', () => {
            if (admissionModal) admissionModal.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    }

    if (admissionForm) {
        admissionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const studentName = document.getElementById('admStudentName')?.value || 'Student';
            const refNo = 'UPS-2026-' + Math.floor(1000 + Math.random() * 9000);

            alert(`🎉 Admission Inquiry Submitted Successfully!\n\nThank you, ${studentName}.\nYour Reference Number is: ${refNo}\n\nOur Gotegaon Admission Desk will contact you within 24 hours.`);

            admissionForm.reset();
            if (admissionModal) admissionModal.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    }

    // 8. PARENT PORTAL LOGIN MODAL
    const portalModal = document.getElementById('portalModal');
    const openPortalBtns = document.querySelectorAll('.open-portal-modal');
    const closePortalModal = document.getElementById('closePortalModal');
    const portalForm = document.getElementById('portalForm');

    openPortalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            closeMobileMenu();
            if (portalModal) {
                portalModal.classList.add('active');
                document.body.classList.add('menu-open');
            }
        });
    });

    if (closePortalModal) {
        closePortalModal.addEventListener('click', () => {
            if (portalModal) portalModal.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    }

    if (portalForm) {
        portalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const userId = document.getElementById('portalUser')?.value || 'UPS/2026/101';

            alert(`🎉 Login Successful! Welcome to UPS Gotegaon Parent ERP Portal.\n\n` +
                  `👤 Student Name: Aarav Sharma\n` +
                  `🆔 Admission No: ${userId}\n` +
                  `🏫 Class: X - Science Section A\n` +
                  `📊 Attendance Status: 94.5% (Present)\n` +
                  `💰 Fee Status: Paid (Quarter 1 Cleared)\n` +
                  `📝 Recent Result: Mid-Term Rank #3 (92.4%)\n\n` +
                  `Redirecting to live parent dashboard...`);

            if (portalModal) portalModal.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    }

    // 9. CONTACT FORM SUBMISSION
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('✉️ Thank you for reaching out to Universal Public School Gotegaon!\nYour message has been sent to our office.');
            contactForm.reset();
        });
    }
});
