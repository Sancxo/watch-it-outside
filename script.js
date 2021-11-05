// HTML Elements
const header = document.querySelector('header');
const heroImg = document.querySelector('.hero-img');

// State variables
const navState = localStorage.getItem('navState') || '#home';

// Style functions
window.onload = () => {
    const hash = window.location.hash || "#home";
    const setLinkActive = (() => {document.querySelector(`a[href="${hash}"]`).classList.add("active")})();
    localStorage.setItem('navState', hash);

}
function onClickNav (newActiveLink) {
    const formerActiveLink = document.querySelector('a.active');
    formerActiveLink ? formerActiveLink.classList.remove('active') : null ;
    newActiveLink.classList.add('active');
    localStorage.setItem('navState', newActiveLink.hash);
}
heroImg.style.marginTop = `${header.offsetHeight}px`; // Hero img margin