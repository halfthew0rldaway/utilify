document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    const copyBtn = document.getElementById('copy-btn');
    const clearBtn = document.getElementById('clear-btn');

    function slugify(text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
    }

    function update() { output.textContent = slugify(input.value) || '—'; }
    input.addEventListener('input', update);
    copyBtn.addEventListener('click', () => { if (output.textContent && output.textContent !== '—') App.copyText(output.textContent, 'Slug copied'); });
    clearBtn.addEventListener('click', () => { input.value = ''; update(); });
    update();
});