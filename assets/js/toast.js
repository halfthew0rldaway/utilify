/* ========================================
   UTILIFY V2 — Toast Notifications
   ======================================== */

const Toast = (() => {
    let container = null;

    function ensureContainer() {
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
    }

    function show(message, duration = 2500) {
        ensureContainer();
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('removing');
            toast.addEventListener('animationend', () => toast.remove());
        }, duration);
    }

    return { show };
})();
