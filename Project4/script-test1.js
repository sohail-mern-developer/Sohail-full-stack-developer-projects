const txtFrom = document.getElementById('txtFrom');
const selFrom = document.getElementById('selFrom');
const txtTo = document.getElementById('txtTo');
const selTo = document.getElementById('selTo');
const detail = document.getElementById('detail');


const from = selFrom.value;
const to = selTo.value;

console.log(from, to);

function calculate() {
    fetch(`https://v6.exchangerate-api.com/v6/882e7a51ba4782eb27675138/pair/${from}/${to}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            const conRate = data.conversion_rate;
            const amt2 = new Intl.NumberFormat().format((txtFrom.value * conRate).toFixed(2));
            const am = txtFrom * conRate;
            console.log(amt2);
            detail.innerText = `1 ${from} is equal to ${amt2} ${to}`;
            txtTo.value = amt2;
        });

}

calculate();