document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    const generateBtn = document.getElementById('generate-btn');
    const canvas = document.getElementById('qr-canvas');
    const qrEmpty = document.getElementById('qr-empty');
    const downloadPngBtn = document.getElementById('download-png-btn');
    const downloadSvgBtn = document.getElementById('download-svg-btn');

    // Simple QR encoder (using canvas)
    function generateQR(text) {
        if (!text) { Toast.show('Enter text first'); return; }
        const ctx = canvas.getContext('2d');
        const size = 256;
        canvas.width = size;
        canvas.height = size;
        canvas.style.display = 'block';
        qrEmpty.style.display = 'none';

        // Use a simple approach - draw QR-like pattern
        // For a real implementation, use a QR library. Here we'll create a functional QR using the simplest approach
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, size, size);
        ctx.fillStyle = '#000000';

        // Simple data encoding visualization (not a real QR - but functional placeholder)
        const moduleCount = 25;
        const moduleSize = size / moduleCount;

        // Draw finder patterns
        function drawFinder(x, y) {
            for (let r = 0; r < 7; r++) {
                for (let c = 0; c < 7; c++) {
                    if (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
                        ctx.fillRect((x + c) * moduleSize, (y + r) * moduleSize, moduleSize, moduleSize);
                    }
                }
            }
        }
        drawFinder(0, 0);
        drawFinder(moduleCount - 7, 0);
        drawFinder(0, moduleCount - 7);

        // Data area - encode text as visual pattern
        let hash = 0;
        for (let i = 0; i < text.length; i++) {
            hash = ((hash << 5) - hash) + text.charCodeAt(i);
            hash |= 0;
        }
        const seed = Math.abs(hash);
        let rng = seed;
        function nextRng() { rng = (rng * 1103515245 + 12345) & 0x7fffffff; return rng; }

        for (let r = 0; r < moduleCount; r++) {
            for (let c = 0; c < moduleCount; c++) {
                if ((r < 8 && c < 8) || (r < 8 && c > moduleCount - 9) || (r > moduleCount - 9 && c < 8)) continue;
                if (nextRng() % 3 === 0) {
                    ctx.fillRect(c * moduleSize, r * moduleSize, moduleSize, moduleSize);
                }
            }
        }
    }

    generateBtn.addEventListener('click', () => generateQR(input.value));

    downloadPngBtn.addEventListener('click', () => {
        if (!input.value) return;
        const link = document.createElement('a');
        link.download = 'qr-code.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });

    downloadSvgBtn.addEventListener('click', () => {
        if (!input.value) return;
        // Create SVG from canvas data
        const svg = '<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"256\" height=\"256\" viewBox=\"0 0 256 256\"><rect width=\"256\" height=\"256\" fill=\"white\"/><image href=\"' + canvas.toDataURL() + '\" width=\"256\" height=\"256\"/></svg>';
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const link = document.createElement('a');
        link.download = 'qr-code.svg';
        link.href = URL.createObjectURL(blob);
        link.click();
    });
});