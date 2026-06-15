document.addEventListener('DOMContentLoaded', () => {
    const palette = document.getElementById('palette');
    const generateBtn = document.getElementById('generate-btn');
    const locked = new Set();

    function randomColor() {
        const h = Math.floor(Math.random() * 360);
        const s = 50 + Math.floor(Math.random() * 30);
        const l = 40 + Math.floor(Math.random() * 30);
        return { h, s, l, hex: hslToHex(h, s, l) };
    }

    function hslToHex(h, s, l) {
        s /= 100; l /= 100;
        const a = s * Math.min(l, 1 - l);
        const f = n => { const k = (n + h / 30) % 12; return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1); };
        return '#' + [f(0), f(8), f(4)].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('');
    }

    let colors = [];
    function generate() {
        colors = Array.from({length: 5}, (_, i) => locked.has(i) ? colors[i] : randomColor());
        render();
    }

    function render() {
        palette.innerHTML = colors.map((c, i) => {
            const textColor = c.l > 55 ? '#000' : '#fff';
            return '<div style=\"background:' + c.hex + ';border-radius:var(--radius-lg);padding:var(--space-xl);display:flex;flex-direction:column;justify-content:flex-end;min-height:200px;cursor:pointer;transition:transform 0.2s\" class=\"hover-lift\" data-index=\"' + i + '\">' +
                '<div style=\"display:flex;justify-content:space-between;align-items:center\">' +
                '<span style=\"color:' + textColor + ';font-family:var(--font-mono);font-size:0.875rem;font-weight:500\">' + c.hex.toUpperCase() + '</span>' +
                '<div style=\"display:flex;gap:6px\">' +
                '<button class=\"lock-btn\" data-index=\"' + i + '\" style=\"background:rgba(0,0,0,0.15);color:' + textColor + ';border:none;border-radius:6px;padding:6px 10px;font-size:0.75rem;cursor:pointer\">' + (locked.has(i) ? '🔒' : '🔓') + '</button>' +
                '<button class=\"copy-color\" data-hex=\"' + c.hex + '\" style=\"background:rgba(0,0,0,0.15);color:' + textColor + ';border:none;border-radius:6px;padding:6px 10px;font-size:0.75rem;cursor:pointer\">Copy</button>' +
                '</div></div></div>';
        }).join('');

        palette.querySelectorAll('.lock-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const idx = parseInt(btn.dataset.index);
                locked.has(idx) ? locked.delete(idx) : locked.add(idx);
                render();
            });
        });

        palette.querySelectorAll('.copy-color').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                App.copyText(btn.dataset.hex.toUpperCase(), 'Color copied');
            });
        });
    }

    generateBtn.addEventListener('click', generate);
    document.addEventListener('keydown', (e) => { if (e.code === 'Space' && e.target === document.body) { e.preventDefault(); generate(); } });
    generate();
});