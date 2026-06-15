document.addEventListener('DOMContentLoaded', () => {
    const preview = document.getElementById('gradient-preview');
    const color1 = document.getElementById('color1');
    const color1Text = document.getElementById('color1-text');
    const color2 = document.getElementById('color2');
    const color2Text = document.getElementById('color2-text');
    const angle = document.getElementById('angle');
    const angleVal = document.getElementById('angle-val');
    const cssOutput = document.getElementById('css-output');
    const copyBtn = document.getElementById('copy-btn');

    function update() {
        const css = 'linear-gradient(' + angle.value + 'deg, ' + color1.value + ', ' + color2.value + ')';
        preview.style.background = css;
        cssOutput.textContent = 'background: ' + css + ';';
        angleVal.textContent = angle.value + '°';
    }

    color1.addEventListener('input', () => { color1Text.value = color1.value; update(); });
    color2.addEventListener('input', () => { color2Text.value = color2.value; update(); });
    color1Text.addEventListener('input', () => { if (/^#[0-9a-fA-F]{6}$/.test(color1Text.value)) { color1.value = color1Text.value; update(); } });
    color2Text.addEventListener('input', () => { if (/^#[0-9a-fA-F]{6}$/.test(color2Text.value)) { color2.value = color2Text.value; update(); } });
    angle.addEventListener('input', update);
    copyBtn.addEventListener('click', () => App.copyText(cssOutput.textContent, 'CSS copied'));
    update();
});