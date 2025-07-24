document.addEventListener('DOMContentLoaded', () => {

    // --- Universal Converter ---
    const unitCategory = document.getElementById('unitCategory');
    const unitFrom = document.getElementById('unitFrom');
    const unitTo = document.getElementById('unitTo');
    const unitInput = document.getElementById('unitInput');
    const unitOutput = document.getElementById('unitOutput');

    const conversions = {
        Length: {
            Meters: 1,
            Kilometers: 1000,
            Centimeters: 0.01,
            Millimeters: 0.001,
            Miles: 1609.34,
            Yards: 0.9144,
            Feet: 0.3048,
            Inches: 0.0254,
        },
        Weight: {
            Kilograms: 1,
            Grams: 0.001,
            Milligrams: 1e-6,
            Pounds: 0.453592,
            Ounces: 0.0283495,
        },
        Temperature: { // Special handling needed
            Celsius: 'c',
            Fahrenheit: 'f',
            Kelvin: 'k',
        },
        Speed: {
            'Meters/sec': 1,
            'Km/hour': 0.277778,
            'Miles/hour': 0.44704,
            'Knots': 0.514444,
        }
    };

    function populateCategories() {
        for (const category in conversions) {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            unitCategory.appendChild(option);
        }
        populateUnits();
    }

    function populateUnits() {
        const category = unitCategory.value;
        const units = Object.keys(conversions[category]);
        unitFrom.innerHTML = '';
        unitTo.innerHTML = '';
        units.forEach(unit => {
            const optFrom = document.createElement('option');
            optFrom.value = unit;
            optFrom.textContent = unit;
            unitFrom.appendChild(optFrom);

            const optTo = document.createElement('option');
            optTo.value = unit;
            optTo.textContent = unit;
            unitTo.appendChild(optTo);
        });
        unitTo.value = units[1] || units[0];
        convertUnits();
    }

    function convertUnits() {
        const val = parseFloat(unitInput.value);
        if (isNaN(val)) {
            unitOutput.value = '';
            return;
        }

        const category = unitCategory.value;
        const from = unitFrom.value;
        const to = unitTo.value;

        if (category === 'Temperature') {
            let tempInC;
            if (from === 'Celsius') tempInC = val;
            if (from === 'Fahrenheit') tempInC = (val - 32) * 5 / 9;
            if (from === 'Kelvin') tempInC = val - 273.15;

            let result;
            if (to === 'Celsius') result = tempInC;
            if (to === 'Fahrenheit') result = (tempInC * 9 / 5) + 32;
            if (to === 'Kelvin') result = tempInC + 273.15;
            unitOutput.value = result.toFixed(2);
        } else {
            const fromFactor = conversions[category][from];
            const toFactor = conversions[category][to];
            const result = val * fromFactor / toFactor;
            unitOutput.value = result.toLocaleString(undefined, { maximumFractionDigits: 5 });
        }
    }

    unitCategory.addEventListener('change', populateUnits);
    unitInput.addEventListener('input', convertUnits);
    unitFrom.addEventListener('change', convertUnits);
    unitTo.addEventListener('change', convertUnits);
    populateCategories();


    // --- Text Transformer ---
    const textFormatterInput = document.getElementById('textFormatterInput');
    const formatterBtns = document.querySelectorAll('.formatter-btn');

    formatterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const format = btn.dataset.format;
            let text = textFormatterInput.value;
            switch (format) {
                case 'uppercase': text = text.toUpperCase(); break;
                case 'lowercase': text = text.toLowerCase(); break;
                case 'camelCase': text = text.replace(/(?:^\w|[A-Z]|\b\w)/g, (w, i) => i === 0 ? w.toLowerCase() : w.toUpperCase()).replace(/\s+/g, ''); break;
                case 'snake_case': text = text.toLowerCase().replace(/\s+/g, '_'); break;
                case 'kebab-case': text = text.toLowerCase().replace(/\s+/g, '-'); break;
                case 'titleCase': text = text.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '); break;
            }
            textFormatterInput.value = text;
        });
    });
    
    document.querySelector('button[data-format="copy"]').addEventListener('click', (e) => {
        if (textFormatterInput.value) {
            navigator.clipboard.writeText(textFormatterInput.value).then(() => {
                e.target.textContent = 'Copied!';
                setTimeout(() => e.target.textContent = 'Copy', 2000);
            });
        }
    });

    document.querySelector('button[data-format="clear"]').addEventListener('click', () => {
        textFormatterInput.value = '';
    });


    // --- Content Analyzer ---
    const charCounterInput = document.getElementById('charCounterInput');
    const charCount = document.getElementById('charCount');
    const wordCount = document.getElementById('wordCount');
    const lineCount = document.getElementById('lineCount');
    const sentenceCount = document.getElementById('sentenceCount');

    charCounterInput.addEventListener('input', () => {
        const text = charCounterInput.value;
        charCount.textContent = text.length;
        const words = text.trim().split(/\s+/).filter(item => item);
        wordCount.textContent = text.trim() === '' ? 0 : words.length;
        lineCount.textContent = text.split('\n').length;
        const sentences = text.match(/[\w|)][.?!](\s|$)/g);
        sentenceCount.textContent = sentences ? sentences.length : 0;
    });


    // --- Global Time-shifter ---
    const timeZoneInput = document.getElementById('timeZoneInput');
    const timeZoneSelect = document.getElementById('timeZoneSelect');
    const timeZoneOutput = document.getElementById('timeZoneOutput');

    const timezones = Intl.supportedValuesOf('timeZone');
    timezones.forEach(tz => {
        const option = document.createElement('option');
        option.value = tz;
        option.textContent = tz.replace(/_/g, ' ');
        timeZoneSelect.appendChild(option);
    });

    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    timeZoneInput.value = now.toISOString().slice(0, 16);
    timeZoneSelect.value = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    function convertTime() {
        if (!timeZoneInput.value) {
            timeZoneOutput.innerHTML = '&nbsp;';
            return;
        }
        const inputDate = new Date(timeZoneInput.value);
        const targetTimeZone = timeZoneSelect.value;
        const formatter = new Intl.DateTimeFormat('en-US', {
            year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit', timeZone: targetTimeZone,
            hour12: true
        });
        timeZoneOutput.textContent = formatter.format(inputDate);
    }

    timeZoneInput.addEventListener('change', convertTime);
    timeZoneSelect.addEventListener('change', convertTime);
    convertTime();

    // --- Placeholder Generator ---
    const generateLoremBtn = document.getElementById('generateLorem');
    const loremOutput = document.getElementById('loremOutput');
    const copyLoremBtn = document.getElementById('copyLorem');
    const loremDictionary = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(" ");

    function generateLoremText(count, type) {
        let result = [];
        if (type === 'words') {
            for (let i = 0; i < count; i++) result.push(loremDictionary[Math.floor(Math.random() * loremDictionary.length)]);
            return result.join(' ');
        } else if (type === 'sentences') {
            for (let i = 0; i < count; i++) {
                const sentLength = Math.floor(Math.random() * 10) + 8; // 8-18 words
                let sentence = [];
                for (let j = 0; j < sentLength; j++) sentence.push(loremDictionary[Math.floor(Math.random() * loremDictionary.length)]);
                result.push(sentence.join(' ').charAt(0).toUpperCase() + sentence.join(' ').slice(1) + '.');
            }
            return result.join(' ');
        } else { // paragraphs
            for (let i = 0; i < count; i++) {
                const paraLength = Math.floor(Math.random() * 4) + 3; // 3-7 sentences
                let paragraph = [];
                for (let j = 0; j < paraLength; j++) {
                    const sentLength = Math.floor(Math.random() * 10) + 8;
                    let sentence = [];
                    for (let k = 0; k < sentLength; k++) sentence.push(loremDictionary[Math.floor(Math.random() * loremDictionary.length)]);
                    paragraph.push(sentence.join(' ').charAt(0).toUpperCase() + sentence.join(' ').slice(1) + '.');
                }
                result.push(paragraph.join(' '));
            }
            return result.join('\n\n');
        }
    }
    
    generateLoremBtn.addEventListener('click', () => {
        const count = document.getElementById('loremCount').value;
        const type = document.getElementById('loremType').value;
        loremOutput.value = generateLoremText(count, type);
    });

    copyLoremBtn.addEventListener('click', (e) => {
        if (loremOutput.value) {
            navigator.clipboard.writeText(loremOutput.value).then(() => {
                e.target.textContent = 'Copied!';
                setTimeout(() => e.target.textContent = 'Copy to Clipboard', 2000);
            });
        }
    });
});
