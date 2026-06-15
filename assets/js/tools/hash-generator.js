document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    const generateBtn = document.getElementById('generate-btn');
    const clearBtn = document.getElementById('clear-btn');

    async function hash(algorithm, text) {
        const data = new TextEncoder().encode(text);
        const hashBuffer = await crypto.subtle.digest(algorithm, data);
        return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
    }

    generateBtn.addEventListener('click', async () => {
        const text = input.value;
        if (!text) { Toast.show('Enter text first'); return; }
        document.getElementById('sha256').textContent = await hash('SHA-256', text);
        document.getElementById('sha384').textContent = await hash('SHA-384', text);
        document.getElementById('sha512').textContent = await hash('SHA-512', text);
        document.getElementById('sha1').textContent = await hash('SHA-1', text);
    });

    document.querySelectorAll('.copy-hash').forEach(btn => {
        btn.addEventListener('click', () => {
            const el = document.getElementById(btn.dataset.target);
            if (el && el.textContent && el.textContent !== '—') App.copyText(el.textContent, 'Hash copied');
        });
    });

    if (clearBtn) clearBtn.addEventListener('click', () => { input.value = ''; ['sha256','sha384','sha512','sha1'].forEach(id => document.getElementById(id).textContent = '—'); });
});