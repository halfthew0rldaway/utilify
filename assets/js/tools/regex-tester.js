document.addEventListener('DOMContentLoaded', () => {
    const patternInput = document.getElementById('pattern');
    const flagsInput = document.getElementById('flags');
    const input = document.getElementById('input');
    const highlightOutput = document.getElementById('highlight-output');
    const matchCount = document.getElementById('match-count');

    function test() {
        const pattern = patternInput.value;
        const flags = flagsInput.value;
        const text = input.value;
        if (!pattern || !text) { highlightOutput.innerHTML = escapeHtml(text) || '<span style=\"color:var(--color-text-tertiary)\">Matches will be highlighted here…</span>'; matchCount.textContent = '0 matches'; return; }
        try {
            const regex = new RegExp(pattern, flags);
            const matches = text.match(regex) || [];
            matchCount.textContent = matches.length + ' match' + (matches.length !== 1 ? 'es' : '');
            let highlighted = text.replace(new RegExp(pattern, flags.includes('g') ? flags : flags + 'g'), '<mark style=\"background:rgba(250,204,21,0.4);color:inherit;padding:1px 2px;border-radius:2px\">$&</mark>');
            highlightOutput.innerHTML = highlighted;
        } catch (e) {
            highlightOutput.innerHTML = '<span style=\"color:#ef4444\">' + e.message + '</span>';
            matchCount.textContent = 'Error';
        }
    }

    function escapeHtml(t) { return t.replace(/&/g,'&').replace(/</g,'<').replace(/>/g,'>'); }

    patternInput.addEventListener('input', test);
    flagsInput.addEventListener('input', test);
    input.addEventListener('input', test);
    test();
});