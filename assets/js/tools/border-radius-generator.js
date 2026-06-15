document.addEventListener('DOMContentLoaded', () => {
    const preview = document.getElementById('radius-preview');
    const tl = document.getElementById('tl');
    const tr = document.getElementById('tr');
    const br = document.getElementById('br');
    const bl = document.getElementById('bl');
    const cssOutput = document.getElementById('css-output');
    const copyBtn = document.getElementById('copy-btn');
    const linkBtn = document.getElementById('link-btn');
    let linked = false;

    function update() {
        document.getElementById('tl-val').textContent = tl.value;
        document.getElementById('tr-val').textContent = tr.value;
        document.getElementById('br-val').textContent = br.value;
        document.getElementById('bl-val').textContent = bl.value;
        const radius = tl.value + 'px ' + tr.value + 'px ' + br.value + 'px ' + bl.value + 'px';
        preview.style.borderRadius = radius;
        // Simplify if all same
        if (tl.value === tr.value && tr.value === br.value && br.value === bl.value) {
            cssOutput.textContent = 'border-radius: ' + tl.value + 'px;';
        } else if (tl.value === br.value && tr.value === bl.value) {
            cssOutput.textContent = 'border-radius: ' + tl.value + 'px ' + tr.value + 'px;';
        } else {
            cssOutput.textContent = 'border-radius: ' + radius + ';';
        }
    }

    function onSlider(e) {
        if (linked) {
            const val = e.target.value;
            tl.value = tr.value = br.value = bl.value = val;
        }
        update();
    }

    [tl, tr, br, bl].forEach(el => el.addEventListener('input', onSlider));
    linkBtn.addEventListener('click', () => {
        linked = !linked;
        linkBtn.textContent = linked ? '🔗 Unlink' : '🔗 Link All Corners';
        if (linked) { const val = tl.value; tl.value = tr.value = br.value = bl.value = val; update(); }
    });
    copyBtn.addEventListener('click', () => App.copyText(cssOutput.textContent, 'CSS copied'));
    update();
});