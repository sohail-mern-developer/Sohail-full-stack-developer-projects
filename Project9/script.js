// Get DOM Elements
const balance = document.getElementById('balance');
const moneyCredit = document.getElementById('money-credit');
const moneyDebit = document.getElementById('money-debit');
const list = document.getElementById('list');
const form = document.getElementById('add-form');
const reason = document.getElementById('reason');
const amount = document.getElementById('amount');

const Transactions = [

    

];

let transactions = Transactions;

function displayTransaction(transaction) {
    
    if(transaction.reason !== null) {
        const type = transaction.amount > 0 ? '+' : '-';

        const transactionLI = document.createElement('li');

        transactionLI.classList.add(transaction.amount > 0 ? 'credit' : 'debit');

        transactionLI.innerHTML = `${transaction.reason} <span>${transaction.amount}</span><button class="delete-btn">X</button>`;

        list.appendChild(transactionLI);
    } else {
        list.innerHTML = '<li class = "credit">No records...<span class = "credit"></span><button class="delete-btn"></button></li>';
    }
}



function updateBalance() {
    // Create a new array with just the amounts from the transactions array
    const transactionAmounts = transactions.map( transaction => transaction.amount );
    // Calculate total balance value
    const totalBalance = transactionAmounts.reduce( (acc, amount) => ( acc += amount), 0 );
    // Calculate total credit balance value
    const creditBalance = transactionAmounts
                            .filter(amount => amount > 0)
                            .reduce( (acc, amount) => (acc += amount), 0 );
    // Calculate total debit balance value
    const debitBalance = transactionAmounts
                            .filter(amount => amount < 0)
                            .reduce( (acc, amount) => (acc += amount), 0 );
    // Update values in the DOM for overall balance, credit balance, and debit balance
    balance.innerText = `$${totalBalance}`;
    moneyCredit.innerText = `$${creditBalance}`;
    moneyDebit.innerText = `$${debitBalance}`;
};

function addTransaction(e) {
    e.preventDefault();

    if(reason.value.trim() === '' || amount.value.trim() === '') {
        alert('Please provide a valid reason and transaction amount.')
    } else {
        

        const transaction = {
            id: createID(),
            reason: reason.value,
            amount: +amount.value
        }

        localStorage.setItem('reason', transaction.reason);
        localStorage.setItem('amount', transaction.amount);

        transactions.push(transaction);
        displayTransaction(transaction);
        updateBalance();
        reason.value = '';
        amount.value = '';
    }
}

function createID() {
    return Math.floor(Math.random() * 100000);
}

function init() {
    list.innerHTML = '';
    transactions.forEach(displayTransaction);
    updateBalance();
}

form.addEventListener('submit', addTransaction);

init();
