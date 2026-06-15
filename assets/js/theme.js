/* ========================================
   UTILIFY V2 — Theme Manager
   ======================================== */

const Theme = (() => {
    const STORAGE_KEY = 'utilify-theme';

    function get() {
        return localStorage.getItem(STORAGE_KEY) || 'auto';
    }

    function set(theme) {
        localStorage.setItem(STORAGE_KEY, theme);
        apply(theme);
    }

    function apply(theme) {
        if (theme === 'auto') {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', theme);
        }
    }

    function resolved() {
        const theme = get();
        if (theme !== 'auto') return theme;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function toggle() {
        set(resolved() === 'dark' ? 'light' : 'dark');
    }

    function init() {
        apply(get());

        // Listen for system preference changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            if (get() === 'auto') apply('auto');
        });
    }

    return { get, set, toggle, resolved, init };
})();

// Init on load
Theme.init();
