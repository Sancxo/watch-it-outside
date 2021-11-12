// HTML Elements :
const rootFontSize = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('font-size'));
const header = document.querySelector('header');
const navLinks = document.querySelectorAll(".navbar .nav-link");
const heroImg = document.querySelector('.hero-img');
const footer = document.querySelector('footer');

// Style :
heroImg.style.marginTop = `${header.offsetHeight}px`; // Hero img margin

if (window.innerWidth >= 1200) {
    heroImg.style.height = `calc(100vh - ${header.offsetHeight}px)`; // Hero img size 
}

// Navigation functions : 
const goTo = e => { // we scroll smoothly to the section of the link we clicked
    e.preventDefault();
    let elPos = document.querySelector(e.target.hash).offsetTop - (header.offsetHeight + rootFontSize);
    window.scrollTo({top: elPos, behavior: "smooth"});
}
const activeLinkOnScroll = () => { // when we scroll over a section, the link in the navbar become active
    let scrollPos = window.scrollY + (header.offsetHeight + (rootFontSize * 2));
    navLinks.forEach(link => {
        let sectionHash = document.querySelector(link.hash);
        if (scrollPos === 0) navLinks[0].classList.add('active');
        (scrollPos >= sectionHash.offsetTop && scrollPos <= (sectionHash.offsetTop + sectionHash.offsetHeight)) ? 
            link.classList.add('active') : 
            link.classList.remove('active');
        if (scrollPos >= footer.offsetTop) navLinks[--navLinks.length].classList.add('active');
    })
}

// Event listeners :
window.onload = () => activeLinkOnScroll();
document.addEventListener('scroll', () => activeLinkOnScroll());
navLinks.forEach(link => link.addEventListener('click', e => goTo(e)))