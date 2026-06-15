/* ========================================
   UTILIFY V2 — Transitions & Scroll Reveals
   ======================================== */

const Transitions = (() => {
    function initReveals() {
        const elements = document.querySelectorAll('.reveal, .reveal-stagger');
        if (!elements.length) return;

        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            elements.forEach(el => el.classList.add('revealed'));
            return;
        }

        // Fix hero visibility: force reveal immediately
        const hero = document.querySelector('.hero.reveal');
        if (hero) {
            requestAnimationFrame(() => {
                setTimeout(() => hero.classList.add('revealed'), 50);
            });
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        elements.forEach(el => observer.observe(el));
    }

    function initPageNav() {
        // Intercept link clicks for view transitions
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href]');
            if (!link) return;

            const href = link.getAttribute('href');
            // Only handle internal links
            if (!href || href.startsWith('http') || href.startsWith('//') || href.startsWith('#') || href.startsWith('mailto:')) return;

            // Skip if modifier keys held
            if (e.ctrlKey || e.metaKey || e.shiftKey) return;

            e.preventDefault();
            navigate(href);
        });
    }

    function navigate(url) {
        if (document.startViewTransition) {
            document.startViewTransition(() => {
                window.location.href = url;
            });
        } else {
            window.location.href = url;
        }
    }

    function initMagnetic() {
        const buttons = document.querySelectorAll('.magnetic');
        buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }

    function init() {
        initReveals();
        initPageNav();
        initMagnetic();
    }

    return { init, navigate };
})();
