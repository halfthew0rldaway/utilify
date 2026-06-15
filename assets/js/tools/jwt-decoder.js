document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    const headerOutput = document.getElementById('header-output');
    const payloadOutput = document.getElementById('payload-output');
    const details = document.getElementById('details');
    const clearBtn = document.getElementById('clear-btn');

    function decode() {
        const token = input.value.trim();
        if (!token) { headerOutput.textContent = ''; payloadOutput.textContent = ''; details.innerHTML = ''; return; }
        const parts = token.split('.');
        if (parts.length !== 3) { headerOutput.textContent = 'Invalid JWT'; payloadOutput.textContent = ''; details.innerHTML = '<span style=\"color:#ef4444\">Token must have 3 parts separated by dots.</span>'; return; }
        try {
            const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
            const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
            headerOutput.textContent = JSON.stringify(header, null, 2);
            payloadOutput.textContent = JSON.stringify(payload, null, 2);
            let html = '';
            if (payload.exp) {
                const expDate = new Date(payload.exp * 1000);
                const now = new Date();
                const expired = expDate < now;
                html += '<div style=\"margin-bottom:8px\"><strong>Expires:</strong> ' + expDate.toLocaleString() + (expired ? ' <span style=\"color:#ef4444\">(Expired)</span>' : ' <span style=\"color:#22c55e\">(Valid)</span>') + '</div>';
            }
            if (payload.iat) html += '<div style=\"margin-bottom:8px\"><strong>Issued:</strong> ' + new Date(payload.iat * 1000).toLocaleString() + '</div>';
            if (payload.iss) html += '<div style=\"margin-bottom:8px\"><strong>Issuer:</strong> ' + payload.iss + '</div>';
            if (payload.sub) html += '<div><strong>Subject:</strong> ' + payload.sub + '</div>';
            details.innerHTML = html || '<span style=\"color:var(--color-text-tertiary)\">No additional details.</span>';
        } catch (e) {
            headerOutput.textContent = 'Error decoding';
            payloadOutput.textContent = '';
            details.innerHTML = '<span style=\"color:#ef4444\">' + e.message + '</span>';
        }
    }

    input.addEventListener('input', decode);
    clearBtn.addEventListener('click', () => { input.value = ''; decode(); });

    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = document.getElementById(btn.dataset.target);
            if (target && target.textContent) App.copyText(target.textContent, 'Copied');
        });
    });
});