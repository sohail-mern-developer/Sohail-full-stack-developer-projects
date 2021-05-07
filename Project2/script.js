//GET DOM ELEMENTS
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

// setPrice onLoad
populateUI();

let ticketPrice = +movieSelect.value;


function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats !== null && selectedSeats.length > -1) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
    const selectedMovieIndex = localStorage.getItem('setMovieIndex');
    if(selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

//update Seats Count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const seatIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    //console.log(seatIndex);
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
    localStorage.setItem('selectedSeats', JSON.stringify(seatIndex));
}

// set movie data

function setMovieData(setMovieIndex, setMoviePrice) {
    localStorage.setItem('setMovieIndex', setMovieIndex);
    localStorage.setItem('setMoviePrice', setMoviePrice);
}

// call event on click
container.addEventListener('click', e => {
    if(e.target.classList.contains('seat') && (
        !e.target.classList.contains('occupied'))
    ) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

// call event on change
movieSelect.addEventListener('change', e => {
    ticketPrice = e.target.value;
    updateSelectedCount();
    setMovieData(e.target.selectedIndex, e.target.value);
});

updateSelectedCount();

