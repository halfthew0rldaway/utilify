document.addEventListener('DOMContentLoaded', () => {
    const preview = document.getElementById('shadow-preview');
    const xOff = document.getElementById('x-offset');
    const yOff = document.getElementById('y-offset');
    const blur = document.getElementById('blur');
    const spread = document.getElementById('spread');
    const shadowColor = document.getElementById('shadow-color');
    const opacity = document.getElementById('opacity');
    const cssOutput = document.getElementById('css-output');
    const copyBtn = document.getElementById('copy-btn');

    function hexToRgba(hex, alpha) {
        const n = parseInt(hex.replace('#', ''), 16);
        return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + alpha + ')';
    }

    function update() {
        document.getElementById('x-val').textContent = xOff.value;
        document.getElementById('y-val').textContent = yOff.value;
        document.getElementById('blur-val').textContent = blur.value;
        document.getElementById('spread-val').textContent = spread.value;
        const alpha = (opacity.value / 100).toFixed(2);
        const color = hexToRgba(shadowColor.value, alpha);
        const shadow = xOff.value + 'px ' + yOff.value + 'px ' + blur.value + 'px ' + spread.value + 'px ' + color;
        preview.style.boxShadow = shadow;
        cssOutput.textContent = 'box-shadow: ' + shadow + ';';
    }

    [xOff, yOff, blur, spread, opacity].forEach(el => el.addEventListener('input', update));
    shadowColor.addEventListener('input', update);
    copyBtn.addEventListener('click', () => App.copyText(cssOutput.textContent, 'CSS copied'));
    update();
});