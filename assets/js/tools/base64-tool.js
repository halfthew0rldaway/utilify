document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    const encodeBtn = document.getElementById('encode-btn');
    const decodeBtn = document.getElementById('decode-btn');
    const copyBtn = document.getElementById('copy-btn');
    const clearBtn = document.getElementById('clear-btn');

    encodeBtn.addEventListener('click', () => { try { output.value = btoa(unescape(encodeURIComponent(input.value))); } catch (e) { output.value = 'Error: ' + e.message; } });
    decodeBtn.addEventListener('click', () => { try { output.value = decodeURIComponent(escape(atob(input.value))); } catch (e) { output.value = 'Error: Invalid Base64'; } });
    copyBtn.addEventListener('click', () => { if (output.value) App.copyText(output.value, 'Copied'); });
    clearBtn.addEventListener('click', () => { input.value = ''; output.value = ''; });
});