document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    const preview = document.getElementById('preview');
    const copyHtmlBtn = document.getElementById('copy-html-btn');
    const clearBtn = document.getElementById('clear-btn');

    function parseMarkdown(md) {
        let html = md
            // Code blocks
            .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
            // Inline code
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            // Headings
            .replace(/^### (.+)$/gm, '<h3>$1</h3>')
            .replace(/^## (.+)$/gm, '<h2>$1</h2>')
            .replace(/^# (.+)$/gm, '<h1>$1</h1>')
            // Bold & Italic
            .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            // Blockquote
            .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
            // HR
            .replace(/^---$/gm, '<hr>')
            // Links
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
            // Images
            .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">')
            // Unordered lists
            .replace(/^[\-\*] (.+)$/gm, '<li>$1</li>')
            // Ordered lists
            .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
            // Paragraphs
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>');

        // Wrap loose <li> in <ul>
        html = html.replace(/((?:<li>.*<\/li>\s*)+)/g, '<ul>$1</ul>');

        // Clean up
        html = '<p>' + html + '</p>';
        html = html.replace(/<p><\/p>/g, '');
        html = html.replace(/<p>(<h[1-6]>)/g, '$1').replace(/(<\/h[1-6]>)<\/p>/g, '$1');
        html = html.replace(/<p>(<pre>)/g, '$1').replace(/(<\/pre>)<\/p>/g, '$1');
        html = html.replace(/<p>(<ul>)/g, '$1').replace(/(<\/ul>)<\/p>/g, '$1');
        html = html.replace(/<p>(<blockquote>)/g, '$1').replace(/(<\/blockquote>)<\/p>/g, '$1');
        html = html.replace(/<p>(<hr>)/g, '$1');

        return html;
    }

    function render() {
        preview.innerHTML = input.value ? parseMarkdown(input.value) : '<p style="color:var(--color-text-tertiary)">Preview will appear here…</p>';
    }

    input.addEventListener('input', render);
    clearBtn.addEventListener('click', () => { input.value = ''; render(); });
    copyHtmlBtn.addEventListener('click', () => {
        App.copyText(preview.innerHTML, 'HTML copied to clipboard');
    });

    render();
});
