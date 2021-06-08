// Get DOM Elements
const word = document.getElementById('word');
const incorrectLetters = document.getElementById('incorrect-letters');
const popup = document.getElementById('popup-container');
const playBtn = document.getElementById('play-btn');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

// Get DO< Elements for Hangman
const figureParts = document.querySelectorAll('.figure-part');

// This is the Pool of Selectedd words
const words = ["behavior","nice","changing","keep","frozen","plate",
"pitch","dress","apartment","research","copy","herd",
"would","highest","natural","longer","toy","play",
"far","because","music","sleep","give","obtain",
"daily","safe","eat","warn","bound","clothes",
"strip","wing","fourth","shade","desk","bring",
"mice","examine","fuel","what","of","enemy"];

//const words = ['cat', 'no'];

// Select a random word from random array
const selectedWord = words[Math.floor(Math.random() * words.length)];

//Tracking arays for correct / incorrect letters
const correctLettersArray = ['a','b','c','d','e','i','z','t'];
const incorrectLettersArray = [];

// Function to display the seleected word  in the DOM
function displayWord() {
    //Display the selected word
    word.innerHTML = `
        ${selectedWord
            .split('')
            .map(letter => `
                <span class = "letter">
                ${correctLettersArray.includes(letter) ? letter : ''}
                </span>
            `)
            .join('')
        }
    `;
    const innerWord = word.innerText.replace(/\n/g, '');
    
    //console.log(word.innerText);
    //console.log(innerWord);

    if(innerWord === selectedWord) {
        finalMessage.innerText = 'Cogratulations! You Won...';
        popup.style.display = 'flex';
        //console.log(innerWord, selectedWord);
    }
}

// Event Lisners
window.addEventListener('keydown', e => {
    //Check if key press is letter
    if(e.keyCode >= 65 && e.keyCode <= 90) {
     const letter = e.key;  
     // check if letter is in the selected word
        if(selectedWord.includes(letter)) {
     //check if letter is already in CORRECTlETTERSaRRAY
        if(!correctLettersArray.includes(letter)) {
            correctLettersArray.push(letter)
            displayWord();
        }else {
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

displayWord();