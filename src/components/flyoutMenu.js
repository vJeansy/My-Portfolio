const burgerBtn = document.getElementById('burger-btn');
const mobileMenu = document.getElementById('mobile-menu');
const closeBtn = document.getElementById('close-menu');

function openMenu() {
    mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
    mobileMenu.classList.add('opacity-100', 'pointer-events-auto');
}
function closeMenu() {
    mobileMenu.classList.add('opacity-0', 'pointer-events-none');
    mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');
}

burgerBtn.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeMenu();
    }
});