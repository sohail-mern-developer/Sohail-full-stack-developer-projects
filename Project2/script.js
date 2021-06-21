const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const movieName = document.getElementById('movie-name');
const tPrice = document.getElementById('ticket-price');
const selSeats = document.getElementById('sel-seats');
const totalPrice = document.getElementById('total-price'); 

populateUI();

let ticketPrice = +movieSelect.value;

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('seatIndex'));
    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
        const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
        console.log(selectedMovieIndex);
        if(selectedMovieIndex !== null) {
            movieSelect.selectedIndex = selectedMovieIndex;
    }
    }
}

function updateSelectedCount() {
    if(movieSelect.value !== '') {
        const selectedSeats = document.querySelectorAll('.row .seat.selected');
        const seatIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
        console.log(seatIndex);
        const selectedSeatsCount = selectedSeats.length;
        count.innerText = selectedSeatsCount;
        total.innerText = selectedSeatsCount * ticketPrice;
        movieName.innerText = movieSelect.options[movieSelect.selectedIndex].text;
        tPrice.innerText = ticketPrice;
        selSeats.innerText = selectedSeatsCount;
        totalPrice.innerText = selectedSeatsCount * ticketPrice;
        localStorage.setItem('seatIndex', JSON.stringify(seatIndex));
        console.log();
    }
}

function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('moviePrice', moviePrice);
}

container.addEventListener('click', e => {
    if(movieSelect.value !== '') {
        if(e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')) {
            e.target.classList.toggle('selected');
            updateSelectedCount();
        }
    }
});

movieSelect.addEventListener('change', e => {
    ticketPrice = e.target.value;
    updateSelectedCount();
    setMovieData(e.target.selectedIndex, e.target.value);
});

updateSelectedCount();