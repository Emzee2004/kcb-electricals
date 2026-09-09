document.addEventListener('DOMContentLoaded', () => {

    /* ===================================================
       1. THEME TOGGLE (DARK / LIGHT MODE)
    =================================================== */
    const themeToggleBtn = document.getElementById('themeToggle') || document.querySelector('.theme-toggle-btn');
    
    // Check saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        if (themeToggleBtn) {
            const icon = themeToggleBtn.querySelector('i');
            if (icon) {
                if (theme === 'dark') {
                    icon.className = 'fas fa-sun'; // Sun icon for switching back to light mode
                } else {
                    icon.className = 'fas fa-moon'; // Moon icon for switching to dark mode
                }
            }
        }
    }

    /* ===================================================
       2. POWERPOINT STYLE HERO CAROUSEL
    =================================================== */
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots = document.querySelectorAll('#heroDots .dot');
    const heroPrev = document.getElementById('heroPrev');
    const heroNext = document.getElementById('heroNext');
    let currentHeroIndex = 0;
    const totalHeroSlides = heroSlides.length;
    let heroTimer;

    function showHeroSlide(index) {
        if (totalHeroSlides === 0) return;

        heroSlides.forEach(slide => slide.classList.remove('active'));
        heroDots.forEach(dot => dot.classList.remove('active'));
        
        currentHeroIndex = (index + totalHeroSlides) % totalHeroSlides;
        
        if (heroSlides[currentHeroIndex]) heroSlides[currentHeroIndex].classList.add('active');
        if (heroDots[currentHeroIndex]) heroDots[currentHeroIndex].classList.add('active');
    }

    function startHeroAutoSlide() {
        if (totalHeroSlides > 1) {
            heroTimer = setInterval(() => {
                showHeroSlide(currentHeroIndex + 1);
            }, 6000); // Transitions every 6 seconds
        }
    }

    function resetHeroTimer() {
        clearInterval(heroTimer);
        startHeroAutoSlide();
    }

    if (heroPrev && heroNext) {
        heroNext.addEventListener('click', () => {
            showHeroSlide(currentHeroIndex + 1);
            resetHeroTimer();
        });

        heroPrev.addEventListener('click', () => {
            showHeroSlide(currentHeroIndex - 1);
            resetHeroTimer();
        });
    }

    heroDots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            showHeroSlide(idx);
            resetHeroTimer();
        });
    });

    startHeroAutoSlide();

    /* ===================================================
       3. AUTOMATIC MULTI-IMAGE PORTFOLIO GALLERIES
    =================================================== */
    const galleries = document.querySelectorAll('.gallery-wrapper');

    galleries.forEach((gallery) => {
        const slides = gallery.querySelector('.gallery-slides');
        if (!slides) return;

        const images = slides.querySelectorAll('img');
        const prevBtn = gallery.querySelector('.gal-prev');
        const nextBtn = gallery.querySelector('.gal-next');
        const dots = gallery.querySelectorAll('.g-dot');
        
        let currentIndex = 0;
        const totalImages = images.length;
        let galTimer;

        function updateGallery(index) {
            if (totalImages === 0) return;

            currentIndex = (index + totalImages) % totalImages;
            slides.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            dots.forEach(d => d.classList.remove('active'));
            if (dots[currentIndex]) {
                dots[currentIndex].classList.add('active');
            }
        }

        function startGalAutoSlide() {
            if (totalImages > 1) {
                galTimer = setInterval(() => {
                    updateGallery(currentIndex + 1);
                }, 4000); // Slides images every 4 seconds
            }
        }

        function resetGalTimer() {
            clearInterval(galTimer);
            startGalAutoSlide();
        }

        if (prevBtn && nextBtn) {
            nextBtn.addEventListener('click', () => {
                updateGallery(currentIndex + 1);
                resetGalTimer();
            });

            prevBtn.addEventListener('click', () => {
                updateGallery(currentIndex - 1);
                resetGalTimer();
            });
        }

        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                updateGallery(idx);
                resetGalTimer();
            });
        });

        startGalAutoSlide();
    });

    /* ===================================================
       4. SCROLL REVEAL OBSERVER
    =================================================== */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

});