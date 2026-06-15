document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    const status = document.getElementById('status');
    const formatBtn = document.getElementById('format-btn');
    const minifyBtn = document.getElementById('minify-btn');
    const copyBtn = document.getElementById('copy-btn');
    const clearBtn = document.getElementById('clear-btn');

    function setStatus(text, ok) {
        status.textContent = text;
        status.style.background = ok ? 'var(--color-accent-subtle)' : 'rgba(239,68,68,0.1)';
        status.style.color = ok ? 'var(--color-text-secondary)' : '#ef4444';
    }

    formatBtn.addEventListener('click', () => {
        try {
            const obj = JSON.parse(input.value);
            output.value = JSON.stringify(obj, null, 2);
            setStatus('Valid JSON ✓', true);
        } catch (e) {
            setStatus(e.message, false);
            output.value = '';
        }
    });

    minifyBtn.addEventListener('click', () => {
        try {
            const obj = JSON.parse(input.value);
            output.value = JSON.stringify(obj);
            setStatus('Minified ✓', true);
        } catch (e) {
            setStatus(e.message, false);
        }
    });

    copyBtn.addEventListener('click', () => { if (output.value) App.copyText(output.value, 'JSON copied'); });
    clearBtn.addEventListener('click', () => { input.value = ''; output.value = ''; setStatus('Ready', true); });
});