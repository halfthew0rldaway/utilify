document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('password-output');
    const lengthSlider = document.getElementById('length');
    const lengthVal = document.getElementById('length-val');
    const strengthBar = document.getElementById('strength-bar');
    const strengthLabel = document.getElementById('strength-label');
    const copyBtn = document.getElementById('copy-btn');
    const generateBtn = document.getElementById('generate-btn');

    const toggles = {
        upper: { el: document.getElementById('toggle-upper'), chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
        lower: { el: document.getElementById('toggle-lower'), chars: 'abcdefghijklmnopqrstuvwxyz' },
        numbers: { el: document.getElementById('toggle-numbers'), chars: '0123456789' },
        symbols: { el: document.getElementById('toggle-symbols'), chars: '!@#$%^&*()_+-=[]{}|;:,.<>?' }
    };

    Object.values(toggles).forEach(t => {
        t.el.addEventListener('click', () => { t.el.classList.toggle('on'); generate(); });
    });

    function generate() {
        let chars = '';
        Object.values(toggles).forEach(t => { if (t.el.classList.contains('on')) chars += t.chars; });
        if (!chars) { output.textContent = 'Select at least one option'; return; }
        const len = parseInt(lengthSlider.value);
        const arr = new Uint32Array(len);
        crypto.getRandomValues(arr);
        let pw = '';
        for (let i = 0; i < len; i++) pw += chars[arr[i] % chars.length];
        output.textContent = pw;
        updateStrength(pw, chars.length);
    }

    function updateStrength(pw, poolSize) {
        const entropy = pw.length * Math.log2(poolSize);
        let strength, color, width;
        if (entropy < 28) { strength = 'Weak'; color = '#ef4444'; width = '25%'; }
        else if (entropy < 60) { strength = 'Fair'; color = '#f59e0b'; width = '50%'; }
        else if (entropy < 128) { strength = 'Strong'; color = '#22c55e'; width = '75%'; }
        else { strength = 'Very Strong'; color = '#059669'; width = '100%'; }
        strengthBar.style.width = width;
        strengthBar.style.background = color;
        strengthLabel.textContent = strength + ' (' + Math.round(entropy) + ' bits)';
    }

    lengthSlider.addEventListener('input', () => { lengthVal.textContent = lengthSlider.value; generate(); });
    generateBtn.addEventListener('click', generate);
    copyBtn.addEventListener('click', () => { if (output.textContent && !output.textContent.includes('Select')) App.copyText(output.textContent, 'Password copied'); });
    generate();
});