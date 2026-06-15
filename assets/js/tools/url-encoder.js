document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    const encodeBtn = document.getElementById('encode-btn');
    const decodeBtn = document.getElementById('decode-btn');
    const encodeCompBtn = document.getElementById('encode-comp-btn');
    const copyBtn = document.getElementById('copy-btn');
    const clearBtn = document.getElementById('clear-btn');

    encodeBtn.addEventListener('click', () => { output.value = encodeURI(input.value); });
    decodeBtn.addEventListener('click', () => { try { output.value = decodeURI(input.value); } catch (e) { output.value = 'Error: ' + e.message; } });
    encodeCompBtn.addEventListener('click', () => { output.value = encodeURIComponent(input.value); });
    copyBtn.addEventListener('click', () => { if (output.value) App.copyText(output.value, 'Copied'); });
    clearBtn.addEventListener('click', () => { input.value = ''; output.value = ''; });
});