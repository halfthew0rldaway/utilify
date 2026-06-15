document.addEventListener('DOMContentLoaded', () => {
    const countInput = document.getElementById('count');
    const generateBtn = document.getElementById('generate-btn');
    const copyAllBtn = document.getElementById('copy-all-btn');
    const output = document.getElementById('output');

    function uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0;
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    function generate() {
        const n = parseInt(countInput.value) || 1;
        const uuids = Array.from({length: n}, uuid);
        output.innerHTML = uuids.map(u => '<div style=\"padding:4px 0\"><code>' + u + '</code></div>').join('');
        output.dataset.uuids = uuids.join('\n');
    }

    generateBtn.addEventListener('click', generate);
    copyAllBtn.addEventListener('click', () => { if (output.dataset.uuids) App.copyText(output.dataset.uuids, 'All UUIDs copied'); });
    generate();
});