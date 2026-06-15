document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const uploadBtn = document.getElementById('upload-btn');
    const previewImg = document.getElementById('preview-img');
    const result = document.getElementById('result');
    const copyBtn = document.getElementById('copy-btn');

    uploadBtn.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('click', (e) => { if (e.target === dropZone || e.target.tagName === 'P') fileInput.click(); });

    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.style.borderColor = 'var(--color-text)'; });
    dropZone.addEventListener('dragleave', () => { dropZone.style.borderColor = 'var(--color-border)'; });
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--color-border)';
        if (e.dataTransfer.files.length) processFile(e.dataTransfer.files[0]);
    });

    fileInput.addEventListener('change', () => { if (fileInput.files.length) processFile(fileInput.files[0]); });

    function processFile(file) {
        if (!file.type.startsWith('image/')) { result.textContent = 'Please upload an image file.'; return; }
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImg.src = e.target.result;
            previewImg.style.display = 'block';
            scanQR(e.target.result);
        };
        reader.readAsDataURL(file);
    }

    function scanQR(dataUrl) {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            // Try using BarcodeDetector API if available
            if ('BarcodeDetector' in window) {
                const detector = new BarcodeDetector({ formats: ['qr_code'] });
                detector.detect(canvas).then(barcodes => {
                    if (barcodes.length > 0) {
                        result.textContent = barcodes[0].rawValue;
                        copyBtn.style.display = '';
                    } else {
                        result.textContent = 'No QR code detected in the image.';
                        copyBtn.style.display = 'none';
                    }
                }).catch(() => {
                    result.textContent = 'BarcodeDetector not supported or failed. Try a different image.';
                });
            } else {
                result.textContent = 'QR scanning requires a browser with BarcodeDetector support (Chrome/Edge). Try a different browser.';
            }
        };
        img.src = dataUrl;
    }

    copyBtn.addEventListener('click', () => {
        if (result.textContent && !result.textContent.includes('No QR') && !result.textContent.includes('requires')) {
            App.copyText(result.textContent, 'Copied');
        }
    });
});