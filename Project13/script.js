// Get Dom Elements
const addCArdBtn = document.getElementById('add-card');
const clearCardsBtn = document.getElementById('clear-cards');
const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const currentCardNav = document.getElementById('current-card');
const cancelBtn = document.getElementById('cancel-btn');
const questionInput = document.getElementById('question');
const answerInput = document.getElementById('answer');
const addCArdSubmitBtn = document.getElementById('add-card-btn');
const addCardContainer = document.getElementById('add-card-container');

// ID of current card
let currentCardID = 0;

// Collection of cards DOM Elements
const cards = [];

// Collection of cardsdata
const cardData = getCardData();

/*const cardData = [
    {
        id: 1,
        question: 'What is your name?',
        answer: 'My name is Sohail.'
    },
    {
        id: 2,
        question: 'What is your Father name?',
        answer: 'A.Qadir'
    },
    {
        id: 3,
        question: 'What is your Freind name?',
        answer: 'Muslim'
    },
];
*/

function getCardData() {
    // get cards data from local storage
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
};

// Function fore current card Nav
function updateCurrentCardNav() {
    currentCardNav.innerText = `${currentCardID + 1} / ${cardData.length}`;
}

// Function to generate cards based on card data
function generateCards() {
    // Iterate over card data and generate cards
    cardData.forEach( ( data, index ) => generateCard(data, index) )
}

// Function to generate single card 
function generateCard(data, index) {
    // Create a div element for the card
    const card = document.createElement('div');
    // assign the class card
    card.classList.add('card');
    // only make the first card active
    if(index === 0) {
        // if the first class assign active class
        card.classList.add('active');
    }
    // Create the card content structure
    card.innerHTML = `
        <div class="inside-card">
            <div class="card-front">
                <p>
                    ${data.question}
                </p>
            </div>
            <div class="card-back">
                <p>
                    ${data.answer}
                </p>
            </div>
        </div>

    `;
    //Listen for click on card
    card.addEventListener('click', () => card.classList.toggle('show-answer'));
     
    // Add the card into the DOM
    cards.push(card);
    
    // Append the card into the cards container
    cardsContainer.appendChild(card);

    // Update current card Nav
    updateCurrentCardNav();
};

// function to save card to local storage

function saveCardData(cardData) {
    localStorage.setItem('cards', JSON.stringify(cardData));
    window.location.reload();
}

// Event Listners
// 1- Listen for click on the next button
nextBtn.addEventListener('click', () => {
    // update the class for current card inactive
    cards[currentCardID].className = 'card left';
    // Increament currentCardID by 1
    currentCardID++;
    if(currentCardID > cards.length - 1) {
        currentCardID = 0;
    }
    // Now make the newly selected card active
    cards[currentCardID].className = 'card active';
    updateCurrentCardNav();
});

// 2- Listen for click on the previous button
prevBtn.addEventListener('click', () => {
    // update the class for current card inactive
    cards[currentCardID].className = 'card right';
    // Increament currentCardID by 1
    currentCardID--;
    if(currentCardID < 0 ) {
        currentCardID = cards.length -1;
    }
    // Now make the newly selected card active
    cards[currentCardID].className = 'card active';
    updateCurrentCardNav();
});

// 3- Listen for click add card button
addCArdBtn.addEventListener('click', () => addCardContainer.classList.add('active'));

// 4- Listen for click cancel button
cancelBtn.addEventListener('click', () => addCardContainer.classList.remove('active'));

// 5- Listen for click add card submit button button
addCArdSubmitBtn.addEventListener('click', () => {
    const question = questionInput.value;
    const answer = answerInput.value;
    // check if values are valid
    if( question.trim() && answer.trim() ) {
        // Create an object with question & answer
        const nextCard = { question, answer };
        // Generate a new card using nextCard object
        generateCard(nextCard);
        // Clear the form fields
        questionInput.value = '';
        answerInput.value = '';
        addCardContainer.classList.remove('active');
        cardData.push(nextCard);
        // save to localstorage
        saveCardData(cardData);
    }
});

// listen foor click clear cards
clearCardsBtn.addEventListener('click', () => {
    // Remove cards from local storage
    localStorage.clear();
    // clear cardscvontainer
    cardsContainer.innerHTML = '';
    // reload page
    window.location.reload();
});


generateCards();