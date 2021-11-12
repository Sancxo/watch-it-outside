// HTML Elements :
const rootFontSize = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('font-size'));
const header = document.querySelector('header');
const navLinks = document.querySelectorAll(".navbar .nav-link");
const heroImg = document.querySelector('.jumbotron');
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

    scrollPos <= heroImg.offsetHeight + header.offsetHeight ? 
            navLinks[0].classList.add('active') : 
            navLinks[0].classList.remove('active');

   

    navLinks.forEach(link => {

        let sectionHash = document.querySelector(link.hash);

        (scrollPos >= sectionHash.offsetTop && scrollPos <= (sectionHash.offsetTop + sectionHash.offsetHeight)) ? 
            link.classList.add('active') : 
            link.classList.remove('active');
    });

    if ((scrollPos + window.innerHeight / 2.5 + footer.offsetHeight) >= (footer.offsetTop)) {
        navLinks[--navLinks.length].classList.add('active');
        navLinks[navLinks.length - 2].classList.remove('active');
    } else
        navLinks[--navLinks.length].classList.remove('active');
}

// Event listeners :
window.onload = () => activeLinkOnScroll();
document.addEventListener('scroll', () => activeLinkOnScroll());
navLinks.forEach(link => link.addEventListener('click', e => goTo(e)))