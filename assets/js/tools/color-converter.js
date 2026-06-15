document.addEventListener('DOMContentLoaded', () => {
    const colorPicker = document.getElementById('color-picker');
    const hexInput = document.getElementById('hex-input');
    const colorPreview = document.getElementById('color-preview');
    const hexVal = document.getElementById('hex-val');
    const rgbVal = document.getElementById('rgb-val');
    const hslVal = document.getElementById('hsl-val');

    function hexToRgb(hex) {
        hex = hex.replace('#', '');
        if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
        const n = parseInt(hex, 16);
        return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
    }

    function rgbToHsl(r, g, b) {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        if (max === min) { h = s = 0; }
        else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                case g: h = ((b - r) / d + 2) / 6; break;
                case b: h = ((r - g) / d + 4) / 6; break;
            }
        }
        return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
    }

    function update(hex) {
        if (!/^#?[0-9a-fA-F]{3,6}$/.test(hex)) return;
        if (!hex.startsWith('#')) hex = '#' + hex;
        colorPreview.style.background = hex;
        colorPicker.value = hex.length === 4 ? '#' + hex[1]+hex[1]+hex[2]+hex[2]+hex[3]+hex[3] : hex;
        const rgb = hexToRgb(hex);
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        hexVal.textContent = hex.toUpperCase();
        rgbVal.textContent = 'rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')';
        hslVal.textContent = 'hsl(' + hsl.h + ', ' + hsl.s + '%, ' + hsl.l + '%)';
    }

    colorPicker.addEventListener('input', () => { hexInput.value = colorPicker.value; update(colorPicker.value); });
    hexInput.addEventListener('input', () => update(hexInput.value));

    document.querySelectorAll('.copy-val').forEach(btn => {
        btn.addEventListener('click', () => {
            const el = document.getElementById(btn.dataset.target);
            if (el && el.textContent && el.textContent !== '—') App.copyText(el.textContent, 'Copied');
        });
    });

    update('#3b82f6');
});