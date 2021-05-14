const conntainer = document.querySelector('.container');

conntainer.addEventListener('click', e => {
    if(e.target.classList.contains('projects')) {
        e.target.classList.add('show');
    }
});