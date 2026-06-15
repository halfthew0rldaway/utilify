/* ========================================
   UTILIFY V2 — Search & Command Palette
   ======================================== */

const CommandPalette = (() => {
    let overlay, input, results, selectedIndex;
    let tools = [];

    const toolList = [
        { name: 'JSON Formatter', slug: 'json-formatter', category: 'Developer', keywords: 'json format minify validate' },
        { name: 'Markdown Preview', slug: 'markdown-preview', category: 'Text', keywords: 'markdown md render preview' },
        { name: 'Regex Tester', slug: 'regex-tester', category: 'Developer', keywords: 'regex regular expression match' },
        { name: 'JWT Decoder', slug: 'jwt-decoder', category: 'Developer', keywords: 'jwt token json web decode' },
        { name: 'Hash Generator', slug: 'hash-generator', category: 'Developer', keywords: 'hash md5 sha sha256 sha512' },
        { name: 'UUID Generator', slug: 'uuid-generator', category: 'Developer', keywords: 'uuid guid unique identifier' },
        { name: 'Password Generator', slug: 'password-generator', category: 'Utilities', keywords: 'password secure random strong' },
        { name: 'Base64 Tool', slug: 'base64-tool', category: 'Developer', keywords: 'base64 encode decode' },
        { name: 'URL Encoder', slug: 'url-encoder', category: 'Developer', keywords: 'url encode decode percent' },
        { name: 'Timestamp Converter', slug: 'timestamp-converter', category: 'Developer', keywords: 'timestamp unix epoch date time' },
        { name: 'QR Generator', slug: 'qr-generator', category: 'Utilities', keywords: 'qr code generate barcode' },
        { name: 'QR Scanner', slug: 'qr-scanner', category: 'Utilities', keywords: 'qr scan read decode camera' },
        { name: 'Unit Converter', slug: 'unit-converter', category: 'Utilities', keywords: 'unit convert length weight temperature' },
        { name: 'Timezone Converter', slug: 'timezone-converter', category: 'Utilities', keywords: 'timezone time zone convert' },
        { name: 'Slug Generator', slug: 'slug-generator', category: 'Text', keywords: 'slug url friendly dash' },
        { name: 'Lorem Ipsum Generator', slug: 'lorem-generator', category: 'Text', keywords: 'lorem ipsum placeholder text dummy' },
        { name: 'Text Analyzer', slug: 'text-analyzer', category: 'Text', keywords: 'text analyze count words characters reading' },
        { name: 'Case Converter', slug: 'case-converter', category: 'Text', keywords: 'case uppercase lowercase camel snake kebab title' },
        { name: 'Color Palette Generator', slug: 'color-palette', category: 'Design', keywords: 'color palette generate random scheme' },
        { name: 'Gradient Generator', slug: 'gradient-generator', category: 'Design', keywords: 'gradient css linear radial' },
        { name: 'Contrast Checker', slug: 'contrast-checker', category: 'Design', keywords: 'contrast wcag accessibility aa aaa' },
        { name: 'Color Converter', slug: 'color-converter', category: 'Design', keywords: 'color hex rgb hsl convert' },
        { name: 'Box Shadow Generator', slug: 'box-shadow-generator', category: 'Design', keywords: 'box shadow css drop shadow' },
        { name: 'Border Radius Generator', slug: 'border-radius-generator', category: 'Design', keywords: 'border radius round corner css' },
    ];

    function init() {
        tools = toolList;
        overlay = document.getElementById('command-overlay');
        if (!overlay) return;

        input = overlay.querySelector('.command-input');
        results = overlay.querySelector('.command-results');

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) close();
        });

        input.addEventListener('input', () => renderResults(input.value));

        input.addEventListener('keydown', (e) => {
            const items = results.querySelectorAll('.command-item');
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
                updateActive(items);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                selectedIndex = Math.max(selectedIndex - 1, 0);
                updateActive(items);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (items[selectedIndex]) {
                    const slug = items[selectedIndex].dataset.slug;
                    navigateToTool(slug);
                }
            } else if (e.key === 'Escape') {
                close();
            }
        });

        // Global keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl+K or Cmd+K
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                isOpen() ? close() : open();
            }
            // "/" when not typing in an input
            if (e.key === '/' && !isOpen() && !isTyping(e)) {
                e.preventDefault();
                open();
            }
            // Escape
            if (e.key === 'Escape' && isOpen()) {
                close();
            }
        });
    }

    function isTyping(e) {
        const tag = e.target.tagName;
        return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || e.target.isContentEditable;
    }

    function isOpen() {
        return overlay && overlay.classList.contains('open');
    }

    function open() {
        if (!overlay) return;
        overlay.classList.add('open');
        input.value = '';
        selectedIndex = 0;
        renderResults('');
        requestAnimationFrame(() => input.focus());
    }

    function close() {
        if (!overlay) return;
        overlay.classList.remove('open');
    }

    function renderResults(query) {
        const q = query.toLowerCase().trim();
        let filtered = tools;

        if (q) {
            filtered = tools.filter(t =>
                t.name.toLowerCase().includes(q) ||
                t.category.toLowerCase().includes(q) ||
                t.keywords.includes(q)
            );
        }

        selectedIndex = 0;

        if (filtered.length === 0) {
            results.innerHTML = '<div class="command-empty">No tools found</div>';
            return;
        }

        // Group by category
        const groups = {};
        filtered.forEach(t => {
            if (!groups[t.category]) groups[t.category] = [];
            groups[t.category].push(t);
        });

        let html = '';
        let idx = 0;
        for (const [cat, items] of Object.entries(groups)) {
            html += `<div class="command-group-label">${cat}</div>`;
            items.forEach(t => {
                html += `<div class="command-item${idx === 0 ? ' active' : ''}" data-slug="${t.slug}" data-index="${idx}">
                    <span class="item-label">${t.name}</span>
                    <span class="item-category">${t.category}</span>
                    <span class="item-arrow">→</span>
                </div>`;
                idx++;
            });
        }

        results.innerHTML = html;

        // Add click handlers
        results.querySelectorAll('.command-item').forEach(item => {
            item.addEventListener('click', () => {
                navigateToTool(item.dataset.slug);
            });
            item.addEventListener('mouseenter', () => {
                selectedIndex = parseInt(item.dataset.index);
                updateActive(results.querySelectorAll('.command-item'));
            });
        });
    }

    function updateActive(items) {
        items.forEach((item, i) => {
            item.classList.toggle('active', i === selectedIndex);
        });
        if (items[selectedIndex]) {
            items[selectedIndex].scrollIntoView({ block: 'nearest' });
        }
    }

    function navigateToTool(slug) {
        close();
        // Track recently used
        App.addRecent(slug);
        // Navigate with view transition
        const inPagesDir = window.location.pathname.includes('/pages/');
        const url = inPagesDir ? `${slug}.html` : `pages/${slug}.html`;
        if (document.startViewTransition) {
            document.startViewTransition(() => {
                window.location.href = url;
            });
        } else {
            window.location.href = url;
        }
    }

    return { init, open, close, isOpen, toolList };
})();
