const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function checkLength(input, min, max) {
    if(input.value.length < min) {
        showError(input, `${input.id.charAt(0).toUpperCase() + input.id.slice(1)} is more than ${min} characters`);
    } else if(input.value.length > max) {
        showError(input, `${input.id.charAt(0).toUpperCase() + input.id.slice(1)} needs to be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
}

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //return re.test(String(email).toLowerCase());
    if(re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, `${getFieldId(input)} is not a valid email`);
    }
}


function getFieldId(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1); 
}


function checkRequired(inputArray) {
    inputArray.forEach(function(input) {
        if(input.value === '') {
            showError(input, `${getFieldId(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}

function checkPasswordMatch(password1, password2) {
    if(password1.value !== password2.value) {
        showError(password2,  "password don't matched.");
    }
}

form.addEventListener('submit', function(e){
    e.preventDefault();

   checkRequired([username,email,password,password2]) 
   checkEmail(email);
   checkLength(username,3,20);
   checkLength(password,6,20);
   checkPasswordMatch(password, password2);
});