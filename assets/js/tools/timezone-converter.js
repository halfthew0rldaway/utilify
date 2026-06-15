document.addEventListener('DOMContentLoaded', () => {
    const datetimeInput = document.getElementById('datetime-input');
    const sourceTz = document.getElementById('source-tz');
    const results = document.getElementById('timezone-results');

    const timezones = Intl.supportedValuesOf('timeZone');
    const commonTz = ['America/New_York', 'America/Chicago', 'America/Los_Angeles', 'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Asia/Tokyo', 'Asia/Shanghai', 'Asia/Kolkata', 'Asia/Dubai', 'Australia/Sydney', 'Pacific/Auckland'];

    timezones.forEach(tz => {
        const opt = document.createElement('option');
        opt.value = tz; opt.textContent = tz.replace(/_/g, ' ');
        sourceTz.appendChild(opt);
    });

    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    datetimeInput.value = now.toISOString().slice(0, 16);
    sourceTz.value = Intl.DateTimeFormat().resolvedOptions().timeZone;

    function convert() {
        if (!datetimeInput.value) { results.textContent = ''; return; }
        const inputDate = new Date(datetimeInput.value);
        results.innerHTML = commonTz.map(tz => {
            const formatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: tz, hour12: true });
            const isSource = tz === sourceTz.value;
            return '<div style=\"display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--color-border)\' + (isSource ? ';font-weight:600' : '') + '\"><span>' + tz.replace(/_/g, ' ') + '</span><span style=\"font-family:var(--font-mono);font-size:0.875rem\">' + formatter.format(inputDate) + '</span></div>';
        }).join('');
    }

    datetimeInput.addEventListener('change', convert);
    sourceTz.addEventListener('change', convert);
    convert();
});