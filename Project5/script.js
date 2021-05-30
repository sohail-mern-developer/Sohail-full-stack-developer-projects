// Get DOM Elements
const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const millionaresBtn = document.getElementById('millionaires');
const sortBtn = document.getElementById('sort');
const sumBtn = document.getElementById('sum');

// initialize user data array
let data = [];

//fetch random user from randomuser.me API
async function getRandomUser() {
    //Wait from the result of API
    const res = await fetch('https://randomuser.me/api/')
    //Wait for the response to convert into JSON
    const data = await res.json();
    
    //Get the User Data
    const user = data.results[0];
    
    //Get user name
    const newUser = {
        name: `${user.name.title} ${user.name.first} ${user.name.last}`,
        balance: Math.floor(Math.random() * 100000)
    }
    
    //Add the new user to the data Array
    addData(newUser);
}

//function to add data into user data array
function addData(newUser) {
    //add data into user data array
    data.push(newUser);
    //Update DOM to display user into data array
    updateDOM();
}

//Update the UI with data from the user data array
function updateDOM(userData = data) {
    //clear previous UI
    main.innerHTML = '<h2><strong>User</strong>Wealth</h2>';   
    //Loop through userData and render in the UI
    userData.forEach(user => {
        //create the new div element for the user
        const userDiv = document.createElement('div');
        //Apply the user class to the new div
        userDiv.classList.add('user');
        //Add inner HTML to the user div
        userDiv.innerHTML = `<strong>${user.name}</strong>${user.balance}`;
        //Add the newelement into the Dom
        main.appendChild(userDiv);
    }); 
}

getRandomUser();
getRandomUser();
getRandomUser();
