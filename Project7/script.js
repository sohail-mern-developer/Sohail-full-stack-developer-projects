const word = document.getElementById('word');
const incorrectLetters = document.getElementById('incorrect-letters');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const popup = document.getElementById('popup-container');
const playBtn = document.getElementById('play-btn');

const figureParts = document.querySelectorAll('.figure-part');

const words = ["sohail","aqib"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLettersArray = [];
const incorrectLettersArray = [];

function displayWord() {
    // Display the selected word
    word.innerHTML = `
        ${selectedWord
            .split('')
            .map(letter => `
                <span class="letter" >
                    ${correctLettersArray.includes(letter) ? letter : '' }
                </span>
                `
            )
            .join('')
        }
    `;

    // Replace new line character and form inner word
    const innerWord = word.innerText.replace(/\n/g, '');
        
    // Compare inner word to selected word, if it's the same then game over and user won
    if(innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulations! You won!'
        popup.style.display = 'flex';
    }

};

function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

window.addEventListener('keydown', e => {
    if(e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;
        if(selectedWord.includes(letter)) {
            if(!correctLettersArray.includes(letter)) {
                correctLettersArray.push(letter);

                displayWord();
            } else {
                showNotification();
            }
        } else {
            if(!incorrectLettersArray.includes(letter)) {
                incorrectLettersArray.push(letter);
                updateIncorrectLetters();
            } else {
                showNotification();
            }
        }
    }
});

// Function to update incorrect letters
function updateIncorrectLetters() {
    // Display the Incorrect letters 
    incorrectLetters.innerHTML = `
        ${incorrectLettersArray.length > 0 ? '<h3>Incorrect Letters</h3>' : ''}
        ${incorrectLettersArray.map(letter => `<span>${letter}</span>`)}
            
    `;

    // Display the hangman part
    
    figureParts.forEach((part, index) => {
        const errors = incorrectLettersArray.length;
        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    // if lost

    if(incorrectLettersArray.length === figureParts.length) {
        finalMessage.innerText = 'You Lost';
        popup.style.display = 'flex';
    }
}

// Event Listners
// 1 - Listen for click Play Button

playBtn.addEventListener('click', e => {
    correctLettersArray.splice(0);
    incorrectLettersArray.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    updateIncorrectLetters();

    popup.style.display = 'none';
    displayWord();
});

displayWord();