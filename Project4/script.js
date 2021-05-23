// Get DOM Element
const currencyOne = document.getElementById('currency-one');
const amountCurrencyOne = document.getElementById('amount-one');
const currencyTwo = document.getElementById('currency-two');
const amountCurrencyTwo = document.getElementById('amount-two');
const swap = document.getElementById('swap');
const rate = document.getElementById('rate');

// Get Exchange rates & update the DOM
function calculate() {
    // Get the cuurenct code for currency 1 & 2
    const currencyOneCode = currencyOne.value;
    const currencyTwoCode = currencyTwo.value;

    // Send request to ExchangeRate API for conversion rate for currenct one
    fetch(`https://v6.exchangerate-api.com/v6/882e7a51ba4782eb27675138/pair/${currencyOneCode}/${currencyTwoCode}`)
    .then(res => res.json())
    .then(data => {
        // Get the conversion rate from currency one to currency two
        const conversionRate = data.conversion_rate;
        //update the DOM to display conversion rate
        rate.innerText = `1 ${currencyOneCode} is equal to ${conversionRate} ${currencyTwoCode}`;
        // Update currenct two Amount
        amountCurrencyTwo.value = amountCurrencyOne.value * conversionRate; 
    });
    
}

// Event Lisners
// Recalculate when Currency One change
currencyOne.addEventListener('change', calculate);

// Recalculate when currency one amount changed
amountCurrencyOne.addEventListener('input', calculate);

// Recalculate when Currency One change
currencyTwo.addEventListener('change', calculate);

// Recalculate when currency one amount changed
amountCurrencyTwo.addEventListener('input', calculate);

// Execute calculation function on pagge load
calculate();