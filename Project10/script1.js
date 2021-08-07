const container = document.getElementById('container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('previous');
const nextBtn = document.getElementById('next');
const albumArt = document.getElementById('album-art');
const title = document.getElementById('song-title');
const progress = document.getElementById('progress');
const progressBar = document.getElementById('progress-bar');


const tracks = ['janam', 'panda'];

let trackIndex = 1;

loadTrack(tracks[trackIndex]);

function loadTrack(track) {
    title.innerText = track;

    audio.src = `music/${track}.mp3`;

    albumArt.src = `images/${track}.jpg`;
    
};

function pauseTrack() {
    container.classList.remove('play');
    playBtn.innerHTML = '<i class="fas fa-play large"></i>';
    audio.pause();
};


function playTrack() {
    container.classList.add('play');
    playBtn.innerHTML = '<i class="fas fa-pause large"></i>';
    audio.play();
};


function prevTrack() {
    trackIndex--;

    if(trackIndex < 0) {
        trackIndex = tracks.length - 1;
    }

    loadTrack(tracks[trackIndex]);

    playTrack();
};


function nextTrack() {
    trackIndex++;

    if(trackIndex > tracks.length - 1) {
        trackIndex = 0;
    }

    loadTrack(tracks[trackIndex]);

    playTrack();
};

function updateProgress(e) {
    const { duration, currentTime} = e.srcElement;

    const progressPercentage = currentTime / duration * 100;

    progressBar.style.width = `${progressPercentage}%`;
};

function setProgress(e) {

    const width = this.clientWidth;

    const clickLocation = e.offsetX;

    const duration = audio.duration;

    audio.currentTime = clickLocation / width * duration;
};

playBtn.addEventListener('click', () => {
    
    const isPlay = container.classList.contains('play');

    if(isPlay) {
        pauseTrack();
    } else {
        playTrack();
    }
});

prevBtn.addEventListener('click', prevTrack);

nextBtn.addEventListener('click', nextTrack);

audio.addEventListener('timeupdate', updateProgress);

progress.addEventListener('click', setProgress);

audio.addEventListener('ended', nextTrack);