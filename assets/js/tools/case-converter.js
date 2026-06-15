document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    const copyBtn = document.getElementById('copy-btn');
    const clearBtn = document.getElementById('clear-btn');

    function toTitleCase(str) {
        return str.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
    }

    function toSentenceCase(str) {
        return str.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, c => c.toUpperCase());
    }

    function toCamelCase(str) {
        return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()).replace(/\s+/g, '');
    }

    function toSnakeCase(str) {
        return str.replace(/([a-z])([A-Z])/g, '$1_$2').replace(/[\s\-]+/g, '_').toLowerCase();
    }

    function toKebabCase(str) {
        return str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[\s_]+/g, '-').toLowerCase();
    }

    document.querySelectorAll('[data-case]').forEach(btn => {
        btn.addEventListener('click', () => {
            const text = input.value;
            const caseType = btn.dataset.case;
            let result = '';
            switch (caseType) {
                case 'upper': result = text.toUpperCase(); break;
                case 'lower': result = text.toLowerCase(); break;
                case 'title': result = toTitleCase(text); break;
                case 'sentence': result = toSentenceCase(text); break;
                case 'camel': result = toCamelCase(text); break;
                case 'snake': result = toSnakeCase(text); break;
                case 'kebab': result = toKebabCase(text); break;
            }
            output.value = result;
        });
    });

    copyBtn.addEventListener('click', () => {
        if (output.value) App.copyText(output.value, 'Copied to clipboard');
    });

    clearBtn.addEventListener('click', () => {
        input.value = '';
        output.value = '';
    });
});
