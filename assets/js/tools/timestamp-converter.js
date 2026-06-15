document.addEventListener('DOMContentLoaded', () => {
    const currentUnix = document.getElementById('current-unix');
    const currentIso = document.getElementById('current-iso');
    const currentUtc = document.getElementById('current-utc');
    const currentLocal = document.getElementById('current-local');
    const unixInput = document.getElementById('unix-input');
    const unixResult = document.getElementById('unix-result');
    const humanInput = document.getElementById('human-input');
    const humanResult = document.getElementById('human-result');

    function updateCurrent() {
        const now = new Date();
        currentUnix.textContent = Math.floor(now.getTime() / 1000);
        currentIso.textContent = now.toISOString();
        currentUtc.textContent = now.toUTCString();
        currentLocal.textContent = now.toLocaleString();
    }
    updateCurrent();
    setInterval(updateCurrent, 1000);

    unixInput.addEventListener('input', () => {
        const val = unixInput.value.trim();
        if (!val) { unixResult.textContent = ''; return; }
        const ts = val.length > 10 ? parseInt(val) : parseInt(val) * 1000;
        const d = new Date(ts);
        if (isNaN(d.getTime())) { unixResult.textContent = 'Invalid timestamp'; return; }
        unixResult.innerHTML = '<strong>UTC:</strong> ' + d.toUTCString() + '<br><strong>Local:</strong> ' + d.toLocaleString() + '<br><strong>ISO:</strong> ' + d.toISOString();
    });

    humanInput.addEventListener('change', () => {
        if (!humanInput.value) { humanResult.textContent = ''; return; }
        const d = new Date(humanInput.value);
        humanResult.innerHTML = '<strong>Unix:</strong> ' + Math.floor(d.getTime() / 1000) + '<br><strong>UTC:</strong> ' + d.toUTCString();
    });

    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    humanInput.value = now.toISOString().slice(0, 16);
});