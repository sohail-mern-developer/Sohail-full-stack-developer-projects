// GET Dom Elements
const balance = document.getElementById('balance');
const moneyCredit = document.getElementById('money-credit');
const moneyDebit = document.getElementById('money-debit');
const list = document.getElementById('list');
const form = document.getElementById('add-form');
const reason = document.getElementById('reason');
const amount = document.getElementById('amount');

const LSid = localStorage.getItem('id');
const LSreason = localStorage.getItem('reason');
const LSamount = localStorage.getItem('amount');

const Transactions = [
    //{ id : LSid, reason: LSreason, amount: LSamount},
    { id : 2, reason: 'Lunch', amount: -400},
    { id : 3, reason: 'Break Fast', amount: -200},
    { id : 4, reason: 'Dinner', amount: -300},
]

let transactions = Transactions;

function updateBalance() {
    const transactionAmount = transactions.map(transaction => transaction.amount);
    const totalBalance = transactionAmount.reduce( (acc, amount) => acc += amount, 0 );
    const creditBalance = transactionAmount.filter(amount => amount > 0)
                                           .reduce( (acc, amount) => acc += amount, 0 );
    const debitBalance = transactionAmount.filter(amount => amount < 0)
                                           .reduce( (acc, amount) => acc += amount, 0 );
    balance.innerText = totalBalance;
    moneyCredit.innerText = creditBalance;
    moneyDebit.innerText = debitBalance;
}

function deleteTransaction(id) {
    console.log(id);
    alert('delete');
    const transactions = transactions.filter(transaction => transaction !== id);
    init();
}

// function to display transaction
function displayTransaction(transaction) {
    const type = transaction.amount > 0 ? '+' : '-';
    const transactionLI = document.createElement('li');
    transactionLI.classList.add(transaction.amount > 0 ? 'credit' : 'debit');
    transactionLI.innerHTML = `
    ${transaction.reason} <span>$${transaction.amount}</span>
    <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">X</button>
    `;
    list.appendChild(transactionLI);
}

function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    
    init();
}

//Initialize Application
function init() {
    list.innerHTML = '';
    transactions.forEach(displayTransaction);
    updateBalance();
}

function createID() {
    return Math.floor(Math.random() * 100000);
}

function addTransaction(e) {
    // Stop the page reload
    e.preventDefault();
    // Check if form has valid data
    if ( reason.value.trim() === '' || amount.value.trim() === '' ) {
        // Display error message if form is not complete
        alert('Please provide a valid reason and transaction amount.')
    } else {
        // Create an object for the transaction containing id, 
        // text for the reason, and the transaction amount

        localStorage.setItem('id', createID());
        localStorage.setItem('reason', reason.value);
        localStorage.setItem('amount', amount.value);

        const transaction = {
            id: createID(),
            reason: reason.value,
            amount: +amount.value
        }

        
        // Push the new transaction into the transactions array
        transactions.push(transaction);
        // Display the new transaction in the DOM
        displayTransaction(transaction);
        // Update all balances
        updateBalance();
        // Clear form fields
        reason.value = '';
        amount.value = '';
    }
};


form.addEventListener('submit', addTransaction);

init();