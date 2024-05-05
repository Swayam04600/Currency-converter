// script.js
const apiKey = 'c7fdbd7bf046e814fe665ed3'; // Your provided API key
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

let rates = {};

async function fetchRates() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.result === "success") {
            rates = data.conversion_rates;
            populateCurrencyOptions();
        } else {
            console.error('Error fetching exchange rates:', data.error);
        }
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
    }
}

function populateCurrencyOptions() {
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    
    // Clear previous options
    fromCurrency.innerHTML = '';
    toCurrency.innerHTML = '';
    
    for (const currency in rates) {
        const option1 = document.createElement('option');
        option1.value = currency;
        option1.textContent = currency;
        fromCurrency.appendChild(option1);
        
        const option2 = document.createElement('option');
        option2.value = currency;
        option2.textContent = currency;
        toCurrency.appendChild(option2);
    }
    
    // Set default values
    fromCurrency.value = 'USD';
    toCurrency.value = 'EUR';
}

function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (!amount || isNaN(amount)) {
        document.getElementById('result').innerText = 'Please enter a valid amount.';
        return;
    }

    const rate = rates[toCurrency] / rates[fromCurrency];
    const result = amount * rate;

    document.getElementById('result').innerText = `${amount} ${fromCurrency} is equal to ${result.toFixed(2)} ${toCurrency}`;
}

// Fetch exchange rates on page load
fetchRates();
