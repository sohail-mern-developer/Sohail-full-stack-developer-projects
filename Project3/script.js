// Get DOM Elements
const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

// Create function on clicking Video 
function toggleVideoStatus() {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// Create function for updating play / pause icons
function updatePlayIcon() {
    if(video.paused) {
        play.innerHTML = '<i class="fab fa-google-play fa-2x"></i>'
    } else {
        play.innerHTML = '<i class="fas fa-pause fa-2x"></i>';
    }
}

// Create function for update progress
function updateProgress() {
    //progress.value = (video.currentTime / video.duration) * 100;

    let mins = Math.floor(video.currentTime / 60);
    if(mins < 10) {
        mins = '0' + String(mins);
    }

    let secs = Math.floor(video.currentTime % 60);
    if(secs < 10) {
        secs = '0' + String(secs);
    }
    timestamp.innerHTML = `${mins}:${secs}`;
}

// create function to stop the video
function stopVideo() {
    video.currentTime = 0;
    video.pause();
    progress.value = 0;
}

// create function to update the video progress using the slider
function setVideoProgress() {
    video.currentTime = (+progress.value  / video.duration) * 100;
}

// Event Listneres
// 1- Event listner for video player
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

// 2- Evenr listner for Play button
play.addEventListener('click', toggleVideoStatus);

// 3- Event Listner for stop button
stop.addEventListener('click', stopVideo);

// 4- Event Listner for Progress bar
progress.addEventListener('change', setVideoProgress);