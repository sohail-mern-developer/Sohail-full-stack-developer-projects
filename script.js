const menuToggle = document.getElementById('toggle');
const close1 = document.getElementById('close');
const open1 = document.getElementById('open');
const modal = document.getElementById('modal');

menuToggle.addEventListener('click', e => {
    document.body.classList.toggle('show-nav');
});


open1.addEventListener('click', () => modal.classList.add('show-modal') );

close1.addEventListener('click', () => modal.classList.remove('show-modal') );