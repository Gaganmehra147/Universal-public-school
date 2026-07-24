/* -------------------------------------------------------------
   UNIVERSAL PUBLIC SCHOOL (UPS GOTEGAON) - JAVASCRIPT LOGIC
   Handles interactive features: Slider, Counters, Modals, Forms
   ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

    // 1. STICKY NAVBAR SCROLL EFFECT
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. MOBILE MENU TOGGLE
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });
    }

    // Close mobile menu on clicking any link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (mobileToggle) {
                    mobileToggle.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
                }
            }
        });
    });

    // 3. HERO SLIDER AUTO-ROTATE
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    let currentSlide = 0;
    let sliderInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    function startSlider() {
        sliderInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    }

    if (slides.length > 0) {
        startSlider();

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                clearInterval(sliderInterval);
                showSlide(currentSlide + 1);
                startSlider();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                clearInterval(sliderInterval);
                showSlide(currentSlide - 1);
                startSlider();
            });
        }
    }

    // 4. ANIMATED STAT COUNTERS ON SCROLL
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    function animateCounters() {
        const statsSection = document.querySelector('.stats-section');
        if (!statsSection) return;

        const sectionPos = statsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.2;

        if (sectionPos < screenPos && !animated) {
            animated = true;
            statNumbers.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const suffix = counter.getAttribute('data-suffix') || '';
                let count = 0;
                const speed = target / 60; // Animation speed

                const updateCount = () => {
                    count += speed;
                    if (count < target) {
                        counter.innerText = Math.ceil(count) + suffix;
                        setTimeout(updateCount, 25);
                    } else {
                        counter.innerText = target + suffix;
                    }
                };
                updateCount();
            });
        }
    }

    window.addEventListener('scroll', animateCounters);

    // 5. ACADEMIC TABS SWITCHER
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // 6. GALLERY CATEGORY FILTER
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

    // 7. LIGHTBOX MODAL FOR GALLERY
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            if (lightbox && lightboxImg) {
                lightboxImg.src = imgSrc;
                lightbox.classList.add('active');
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
    }

    // 8. ADMISSION APPLICATION WIZARD MODAL
    const admissionModal = document.getElementById('admissionModal');
    const openAdmissionBtns = document.querySelectorAll('.open-admission-modal');
    const closeAdmissionModal = document.getElementById('closeAdmissionModal');
    const admissionForm = document.getElementById('admissionForm');

    openAdmissionBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (admissionModal) admissionModal.classList.add('active');
        });
    });

    if (closeAdmissionModal) {
        closeAdmissionModal.addEventListener('click', () => {
            admissionModal.classList.remove('active');
        });
    }

    if (admissionForm) {
        admissionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const studentName = document.getElementById('admStudentName').value;
            const refNo = 'UPS-2026-' + Math.floor(1000 + Math.random() * 9000);

            alert(`🎉 Admission Inquiry Submitted Successfully!\n\nThank you, ${studentName}.\nYour Reference Number is: ${refNo}\n\nOur Gotegaon Admission Desk will contact you within 24 hours.`);

            admissionForm.reset();
            admissionModal.classList.remove('active');
        });
    }

    // 9. PARENT PORTAL LOGIN MODAL
    const portalModal = document.getElementById('portalModal');
    const openPortalBtns = document.querySelectorAll('.open-portal-modal');
    const closePortalModal = document.getElementById('closePortalModal');
    const portalForm = document.getElementById('portalForm');

    openPortalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (portalModal) portalModal.classList.add('active');
        });
    });

    if (closePortalModal) {
        closePortalModal.addEventListener('click', () => {
            portalModal.classList.remove('active');
        });
    }

    if (portalForm) {
        portalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const userId = document.getElementById('portalUser').value || 'UPS/2026/101';
            
            alert(`🎉 Login Successful! Welcome to UPS Gotegaon Parent ERP Portal.\n\n` +
                  `👤 Student Name: Aarav Sharma\n` +
                  `🆔 Admission No: ${userId}\n` +
                  `🏫 Class: X - Science Section A\n` +
                  `📊 Attendance Status: 94.5% (Present)\n` +
                  `💰 Fee Status: Paid (Quarter 1 Cleared)\n` +
                  `📝 Recent Result: Mid-Term Rank #3 (92.4%)\n\n` +
                  `Redirecting to live parent dashboard...`);
            
            portalModal.classList.remove('active');
        });
    }

    // 10. CONTACT FORM SUBMISSION
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('✉️ Thank you for reaching out to Universal Public School Gotegaon!\nYour message has been sent to our office.');
            contactForm.reset();
        });
    }
});
