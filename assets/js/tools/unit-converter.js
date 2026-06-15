document.addEventListener('DOMContentLoaded', () => {
    const categorySelect = document.getElementById('category');
    const fromUnit = document.getElementById('from-unit');
    const toUnit = document.getElementById('to-unit');
    const fromValue = document.getElementById('from-value');
    const toValue = document.getElementById('to-value');
    const swapBtn = document.getElementById('swap-btn');

    const conversions = {
        Length: { Meters: 1, Kilometers: 1000, Centimeters: 0.01, Millimeters: 0.001, Miles: 1609.34, Yards: 0.9144, Feet: 0.3048, Inches: 0.0254 },
        Weight: { Kilograms: 1, Grams: 0.001, Milligrams: 1e-6, Pounds: 0.453592, Ounces: 0.0283495 },
        Temperature: { Celsius: 'c', Fahrenheit: 'f', Kelvin: 'k' },
        Area: { 'Sq Meters': 1, 'Sq Kilometers': 1e6, 'Sq Feet': 0.092903, 'Sq Inches': 0.00064516, 'Sq Miles': 2.59e+6, Acres: 4046.86, Hectares: 10000 },
        Volume: { Liters: 1, Milliliters: 0.001, 'Cubic Meters': 1000, Gallons: 3.78541, Quarts: 0.946353, Cups: 0.236588, 'Fl Ounces': 0.0295735 }
    };

    Object.keys(conversions).forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat; opt.textContent = cat;
        categorySelect.appendChild(opt);
    });

    function populateUnits() {
        const cat = categorySelect.value;
        const units = Object.keys(conversions[cat]);
        [fromUnit, toUnit].forEach(sel => { sel.innerHTML = ''; units.forEach(u => { const o = document.createElement('option'); o.value = u; o.textContent = u; sel.appendChild(o); }); });
        toUnit.value = units[1] || units[0];
        convert();
    }

    function convert() {
        const val = parseFloat(fromValue.value);
        if (isNaN(val)) { toValue.value = ''; return; }
        const cat = categorySelect.value;
        const from = fromUnit.value, to = toUnit.value;
        if (cat === 'Temperature') {
            let c = from === 'Celsius' ? val : from === 'Fahrenheit' ? (val - 32) * 5/9 : val - 273.15;
            toValue.value = (to === 'Celsius' ? c : to === 'Fahrenheit' ? c * 9/5 + 32 : c + 273.15).toFixed(2);
        } else {
            toValue.value = (val * conversions[cat][from] / conversions[cat][to]).toLocaleString(undefined, { maximumFractionDigits: 6 });
        }
    }

    categorySelect.addEventListener('change', populateUnits);
    fromValue.addEventListener('input', convert);
    fromUnit.addEventListener('change', convert);
    toUnit.addEventListener('change', convert);
    swapBtn.addEventListener('click', () => { const tmp = fromUnit.value; fromUnit.value = toUnit.value; toUnit.value = tmp; convert(); });
    populateUnits();
});