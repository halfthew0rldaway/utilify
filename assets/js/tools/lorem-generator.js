document.addEventListener('DOMContentLoaded', () => {
    const type = document.getElementById('type');
    const count = document.getElementById('count');
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const output = document.getElementById('output');

    const words = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum'.split(' ');

    function randomWord() { return words[Math.floor(Math.random() * words.length)]; }

    function generateSentence() {
        const len = 8 + Math.floor(Math.random() * 12);
        let s = Array.from({ length: len }, randomWord).join(' ');
        return s.charAt(0).toUpperCase() + s.slice(1) + '.';
    }

    function generateParagraph() {
        const len = 3 + Math.floor(Math.random() * 5);
        return Array.from({ length: len }, generateSentence).join(' ');
    }

    function generate() {
        const n = parseInt(count.value) || 1;
        let result = '';
        switch (type.value) {
            case 'paragraphs':
                result = Array.from({ length: n }, generateParagraph).join('\n\n');
                break;
            case 'sentences':
                result = Array.from({ length: n }, generateSentence).join(' ');
                break;
            case 'words':
                result = Array.from({ length: n }, randomWord).join(' ');
                break;
        }
        output.textContent = result;
    }

    generateBtn.addEventListener('click', generate);
    copyBtn.addEventListener('click', () => {
        if (output.textContent) App.copyText(output.textContent, 'Copied to clipboard');
    });

    generate();
});
