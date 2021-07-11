const container = document.getElementById('container');
const playBtn = document.getElementById('play');
const previousBtn = document.getElementById('previous');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressBar = document.getElementById('progress-bar');
const title = document.getElementById('song-title');
const albumArt = document.getElementById('album-art');

// Songs Array
const tracks = ['janam', 'panda'];

// Index of currently Playing Songs
let trackIndex = 1;

//Load the initial track 
loadTrack(tracks[trackIndex]);

// function to load the current track
function loadTrack(track) {
    //update the tect of title track
    title.innerText = track;
    //update the src of audio element
    audio.src = `music/${track}.mp3`;
    //update the src of image element
    albumArt.src = `images/${track}.jpg`;
};

// Function to play song
function playTrack() {
    container.classList.add('play');
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    //Play the track
    audio.play();
};

// Function to play song
function pauseTrack() {
    container.classList.remove('play');
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    //Pause the track
    audio.pause();
};

function prevTrack() {
    container.classList.remove('play');
    // Decrement the value of track index
    trackIndex --;
    // Check if selected index less than 0
    if( trackIndex < 0) {
        // Reassign the last track inthe track Array
        trackIndex = tracks.length - 1;
    }
    // Load the Selected track
    loadTrack(tracks[trackIndex]);

    playTrack();
};


function nextTrack() {
    // Decrement the value of track index
    trackIndex ++;
    // Check if selected index greater than track length
    if( trackIndex > tracks.length - 1) {
        // Reassign the last track inthe track Array
        trackIndex = 0;
    }
    // Load the Selected track
    loadTrack(tracks[trackIndex]);

    playTrack();
};



function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;

    const progressPercentage = currentTime / duration * 100;
    
    progressBar.style.width = `${progressPercentage}%`;
};



function setProress(e) {
    // Get the oveerall width in px of progress container
    const Width = this.clientWidth;
    // Get the X-axis px value for the location on the progress bar
    const clickLocation = e.offsetX;
    // Get the total duration of track
    const duration = audio.duration;
    // Reassign the current time of audio track
    audio.currentTime = clickLocation / Width * duration;
};



//Event Listners

//1 - Listten for click Play Button
playBtn.addEventListener('click', () => {
    
    // check if song play
    const isPlaying = container.classList.contains('play');
    if(isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }

});

// 2 - Listen for click the previus button
previousBtn.addEventListener('click', prevTrack);

// 3 - Listen for click the next button
nextBtn.addEventListener('click', nextTrack);

// 4 - Listen for time update on audio element

audio.addEventListener('timeupdate', updateProgress);

// 5 - Listen for click on progress
progress.addEventListener('click', setProress);

// 6 - Listen for end of playback for current Track
audio.addEventListener('ended', nextTrack);

