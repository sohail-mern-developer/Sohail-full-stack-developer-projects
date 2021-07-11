const word = document.getElementById('word');
const incorrectLetters = document.getElementById('incorrect-letters');
const popup = document.getElementById('popup-container');
const finalMessage = document.getElementById('final-message');
const playBtn = document.getElementById('play-btn');
const notification = document.getElementById('notification-container');

const figureParts = document.querySelectorAll('.figure-part');

const words = ["over","triangle","safe","bicycle","not","alone",
"doing","outside","coat","without","whose","manufacturing",
"further","wire","sang","tea","bring","behind",
"explanation","she","orange","itself","growth","mostly",
"slabs","biggest","teeth","design","crew","without",
"young","hung","example","possible","pleasant","entirely",
"judge","smooth","clock","smoke","walk","effect"];

//const words = ["aei","hgj"];

let selectedWord = words[Math.floor(Math.random() * words.length)];
//console.log(words[selectedWord]);

const correctLettersArray = ['a','e','i','o','u'];
const incorrectLettersArray = [''];

function displayWord() {
    word.innerHTML = `
        ${selectedWord
            .split('')
            .map(letter => `
                <span class = "letter">
                    ${correctLettersArray.includes(letter) ? letter : ''}
                </span>
            `
            )
            .join('')
        }
    `;
    const innerWord = word.innerText.replace(/\n/g, '');
    
    if(innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulations! You Won...';
        popup.style.display = 'flex';
    }
};

function showNotification() {
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

function updateIncorrectLetters() {
    //Display incorrect letters
    incorrectLetters.innerHTML = `
        ${incorrectLettersArray.length > 0 ? '<p>Incorrect letters</p>' : ''}
        ${incorrectLettersArray.map(letter => `<span>${letter}</span>`)}
    `;
    //display the hangman part


    
        figureParts.forEach((part, index) => {
        // How many incorrect letters has the user guessed
        const errors = incorrectLettersArray.length;
        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
        });        
    if(figureParts.length === incorrectLettersArray.length) {
        finalMessage.innerText = "You Lost!";
        popup.style.display = 'flex';
    }
}

window.addEventListener('keydown', e => {
    //console.log(e.keyCode, e.key);
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

playBtn.addEventListener('click', () => {
    correctLettersArray.splice(0);
    incorrectLettersArray.splice(0);
    selectedWord = words[Math.floor(Math.random() * words.length)];
    updateIncorrectLetters();
    popup.style.display = 'none';
    displayWord();
    
});



displayWord();
