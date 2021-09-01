// Get DOM Elements
const main = document.getElementById('main');
const selectVoices = document.getElementById('voices');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');
const customText = document.getElementById('text');
const readBtn = document.getElementById('read');
const customTextDiv = document.getElementById('custom-text');

// Array for holding all images and text to be read
const data = [
    // For Angry Image
    {
        image: './img/angry.jpg',
        text: "I'm Angry"
    },
    // For Drink Image
    {
        image: './img/drink.jpg',
        text: "I'm Thirsty"
    },
    // For Food Image
    {
        image: './img/food.jpg',
        text: "I'm Hungry"
    },
    // For Grandma Image
    {
        image: './img/grandma.jpg',
        text: "I'm Miss Grandma"
    },
    // For Happy Image
    {
        image: './img/happy.jpg',
        text: "I'm Happy"
    },
    // For Home Image
    {
        image: './img/home.jpg',
        text: "I want to go home"
    },
    // For Hurt Image
    {
        image: './img/hurt.jpg',
        text: "I'm Hurt"
    },
    // For Outside Image
    {
        image: './img/outside.jpg',
        text: "I like the outdoors"
    },
    // For Sad Image
    {
        image: './img/sad.jpg',
        text: "I don't like being sad"
    },
    // For Scared Image
    {
        image: './img/scared.jpg',
        text: "I'm scary"
    },
    // For School Image
    {
        image: './img/school.jpg',
        text: "I went to school"
    },
    // For Tired Image
    {
        image: './img/tired.jpg',
        text: "I'm so tired"
    },
];

// Array for all Web speech API voices
let voices = [];

// Create a box for each object in the data array
data.forEach(createBox);

// Functions
// 1. Function to create speech boxes
function createBox(imageObj) {
    console.log(imageObj);
    // Create empty div for image in main div
    const box = document.createElement('div');
    // Get the image url and image in the data array
    const { image, text } = imageObj;
    console.log(image);
    // Add the css class to the new div
    box.classList.add('box');
    // Add the image into the box
    box.innerHTML = `
        <img src="${image}" alt="${text}" />
        <p class="imageInfo">${text}</p>
    `;
    // Add event for speaking text
    box.addEventListener('click', () => {
        setMessage(text);
        speakText(); 
    });
    
    // Add the new box into the DOM
    main.appendChild(box);  
};

// Initialize speech sysnthesis
const message = new SpeechSynthesisUtterance();

// 2. Function to get voices from Web Speech API
function populateVoiceList() {
    // Get voices from webspeech API
    voices = speechSynthesis.getVoices();
    // Add voices from select box
    voices.forEach(voice => {
        // create an option Element
        const option = document.createElement('option');
        // Give option value
        option.value = voice.name;
        // set display text for option
        option.innerText = `${voice.name} ${voice.lang}`;
        // Add the option into select box
        selectVoices.appendChild(option);
    });
}

// 3- set the text for speech synthesis
function setMessage(text) {
    message.text = text;
}

// 4- To speak the text
function speakText() {
    speechSynthesis.speak(message);
}


// Event Listners
// 1- Toggle button
toggleBtn.addEventListener('click', () => {
    customTextDiv.classList.toggle('show');
});

// 2- Close Btn in custom text Div
closeBtn.addEventListener('click', () => {
    customTextDiv.classList.remove('show');
});

// 3- Event listner for changing voices
speechSynthesis.addEventListener('voiceschanged', populateVoiceList);