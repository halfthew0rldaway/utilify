document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    const charCount = document.getElementById('char-count');
    const wordCount = document.getElementById('word-count');
    const sentenceCount = document.getElementById('sentence-count');
    const paragraphCount = document.getElementById('paragraph-count');
    const readingTime = document.getElementById('reading-time');
    const readingLevel = document.getElementById('reading-level');
    const clearBtn = document.getElementById('clear-btn');

    function analyze() {
        const text = input.value;
        charCount.textContent = text.length;

        const words = text.trim() === '' ? [] : text.trim().split(/\s+/);
        wordCount.textContent = words.length;

        const sentences = text.match(/[^.!?]+[.!?]+[\s]*/g) || [];
        sentenceCount.textContent = sentences.length;

        const paragraphs = text.trim() === '' ? [] : text.trim().split(/\n\s*\n/);
        paragraphCount.textContent = paragraphs.length;

        const mins = Math.ceil(words.length / 200);
        readingTime.textContent = mins;

        // Simple reading level estimate
        if (words.length === 0) {
            readingLevel.textContent = '—';
        } else {
            const avgSentenceLen = words.length / Math.max(sentences.length, 1);
            const syllables = words.reduce((sum, w) => sum + countSyllables(w), 0);
            const avgSyllables = syllables / words.length;
            const score = 0.39 * avgSentenceLen + 11.8 * avgSyllables - 15.59;
            if (score < 6) readingLevel.textContent = 'Easy';
            else if (score < 10) readingLevel.textContent = 'Medium';
            else readingLevel.textContent = 'Hard';
        }
    }

    function countSyllables(word) {
        word = word.toLowerCase().replace(/[^a-z]/g, '');
        if (word.length <= 3) return 1;
        word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
        word = word.replace(/^y/, '');
        const m = word.match(/[aeiouy]{1,2}/g);
        return m ? m.length : 1;
    }

    input.addEventListener('input', analyze);
    clearBtn.addEventListener('click', () => { input.value = ''; analyze(); });
});
