document.addEventListener('DOMContentLoaded', () => {
    const fgPicker = document.getElementById('fg-picker');
    const fgInput = document.getElementById('fg-input');
    const bgPicker = document.getElementById('bg-picker');
    const bgInput = document.getElementById('bg-input');
    const previewBox = document.getElementById('preview-box');
    const previewLarge = document.getElementById('preview-large');
    const previewSmall = document.getElementById('preview-small');
    const ratioEl = document.getElementById('ratio');
    const aaNormal = document.getElementById('aa-normal');
    const aaLarge = document.getElementById('aa-large');
    const aaaNormal = document.getElementById('aaa-normal');
    const aaaLarge = document.getElementById('aaa-large');

    function hexToRgb(hex) {
        hex = hex.replace('#', '');
        if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
        const n = parseInt(hex, 16);
        return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    }

    function luminance(r, g, b) {
        const [rs, gs, bs] = [r, g, b].map(c => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); });
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    }

    function contrastRatio(fg, bg) {
        const l1 = Math.max(fg, bg);
        const l2 = Math.min(fg, bg);
        return (l1 + 0.05) / (l2 + 0.05);
    }

    function check(fg, bg) {
        const [fr, ffb, fb] = hexToRgb(fg);
        const [br, bg2, bb] = hexToRgb(bg);
        const fgLum = luminance(fr, ffb, fb);
        const bgLum = luminance(br, bg2, bb);
        const ratio = contrastRatio(fgLum, bgLum);

        previewBox.style.background = bg;
        previewBox.style.color = fg;
        ratioEl.textContent = ratio.toFixed(2) + ':1';

        const pass = (r) => r >= 4.5 ? '✓ Pass' : '✗ Fail';
        const passLarge = (r) => r >= 3 ? '✓ Pass' : '✗ Fail';
        const passAAA = (r) => r >= 7 ? '✓ Pass' : '✗ Fail';
        const passAAALarge = (r) => r >= 4.5 ? '✓ Pass' : '✗ Fail';

        aaNormal.textContent = pass(ratio);
        aaNormal.style.color = ratio >= 4.5 ? '#22c55e' : '#ef4444';
        aaLarge.textContent = passLarge(ratio);
        aaLarge.style.color = ratio >= 3 ? '#22c55e' : '#ef4444';
        aaaNormal.textContent = passAAA(ratio);
        aaaNormal.style.color = ratio >= 7 ? '#22c55e' : '#ef4444';
        aaaLarge.textContent = passAAALarge(ratio);
        aaaLarge.style.color = ratio >= 4.5 ? '#22c55e' : '#ef4444';
    }

    function sync() { check(fgInput.value, bgInput.value); }

    fgPicker.addEventListener('input', () => { fgInput.value = fgPicker.value; sync(); });
    bgPicker.addEventListener('input', () => { bgInput.value = bgPicker.value; sync(); });
    fgInput.addEventListener('input', () => { 
        if (/^#[0-9A-F]{6}$/i.test(fgInput.value)) fgPicker.value = fgInput.value;
        sync(); 
    });
    bgInput.addEventListener('input', () => { 
        if (/^#[0-9A-F]{6}$/i.test(bgInput.value)) bgPicker.value = bgInput.value;
        sync(); 
    });
    sync();
});