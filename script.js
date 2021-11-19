// HTML Elements :
const rootFontSize = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('font-size'));
const header = document.querySelector('header');
const navLinks = document.querySelectorAll(".navbar .nav-link");
const heroImg = document.querySelector('.jumbotron');
const inputRowContainer = document.querySelector('#row-container');
const dateInput = document.querySelector('#date-input');
const movieSelect = document.querySelector('#movie-select');
const footer = document.querySelector('footer');
const arrowUp = document.querySelector('#arrow-up');

// Style :
heroImg.style.marginTop = `${header.offsetHeight}px`; // Hero img dynamic margin
if (window.innerWidth >= 1200) {
    heroImg.style.height = `calc(100vh - ${header.offsetHeight}px)`; // Hero img dynamic  size 
}

// Navigation behaviour : 
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
const displayArrowUp = () => {
    if(window.scrollY <= 100) arrowUp.style.display = 'none';
    else if (window.scrollY > 100) arrowUp.style.display = 'block';
}
const goTop = () => window.scrollTo({top: 0, behavior: "smooth"});

// Form behaviour
const addMovieSelectOptions = (dateInputValue) => {
    let childList = movieSelect.hasChildNodes ? [...movieSelect.childNodes] : []; // we need to convert the nodeList into an actual array (/w destructuration)
    childList.forEach(childNode => {
        movieSelect.removeChild(childNode);
    });
    const movieLists = {
        "2022-08-05": ['Shadows - 6 p.m.', 'Sunset Boulevard - 8 p.m.', 'Mean Streets - 10 p.m.'],
        "2022-08-06": ['Deep Red - 6 p.m.', 'Santa Sangre - 8 p.m.', 'Driller Killer - 10 p.m.'],
        "2022-08-07": ['Dead Man - 6 p.m.', 'El Topo - 8 p.m.', 'The Great Silence - 10 p.m.'],
        "2022-08-08": ['Psycho - 6 p.m.', 'Raising Cain - 8 p.m.', 'Spider - 10 p.m.']
    }

    const optionList = [];

    Object.keys(movieLists).includes(dateInputValue) ?
    movieLists[dateInputValue].forEach((show, index) => {
        let values = {0: '6', 1: '8', 2: '10'};
        let option = document.createElement('option');
        Object.keys(values).includes(String(index)) ? option.setAttribute('value', values[index]) : null;
        option.innerHTML = show;
        optionList.push(option);
    }) : null;
    optionList.forEach(option => {
        movieSelect.appendChild(option); 
    })
} 
const bookScreen = (date, time) => {
    let formPos = document.querySelector('#register').offsetTop - (header.offsetHeight + rootFontSize);
    window.scrollTo({top: formPos, behavior: "smooth"});

    dateInput.value = date;

    addMovieSelectOptions(date);

    let formerSelectedMovie = movieSelect.querySelector('option[selected="true"]');
    formerSelectedMovie ? formerSelectedMovie.removeAttribute('selected') : null;

    let selectNewMovie = movieSelect.querySelector(`option[value='${time}']`);
    selectNewMovie.setAttribute('selected', 'true');
}
const addAnotherShow = () => {
    let formInputs = [
        {
            'input': {
                'class': 'form-control',
                'type': 'date', 
                'id': 'date-input', 
                'name': 'date', 
                'min': '2022-08-05', 
                'max': '2022-08-08', 
                'value': '2022-08-05', 
                'required': 'true'
            },
            'label': {'for': 'date-input', 'class': 'ms-2'}
        },
        {
            'select': {
                'class': 'form-select',
                'id': 'movie-select', 
                'name': 'show',
                'aria-label': 'Movie select input',
                'required': 'true'
            },
            'label': {'for': 'movie-select', 'class': 'ms-2'}
        },
        {
            'input': {
                'class': 'form-control',
                'type': 'number',
                'id': 'number-input',
                'name': 'number',
                'min': '1',
                'value': '1',
                'required': 'true'
            },
            'label': {'for': 'number-input', 'class': 'ms-2'}
        }
    ]

    let elementList = [];


    for (const {element, attributes} of formInputs) {
        console.log(attributes);
        console.log(object[attributes]);

        let htmlElement = document.createElement(element);
        for (const {name, value} in attributes) {
            htmlElement.setAttribute(name, value);
        }
        elementList.push(htmlElement);
    }

    let divInputList = []

    for (let i = 0; i < 3; i++) {
        let divInputCtn = document.createElement('div');
        divInputCtn.classList.add('form-floating', 'mb-3', 'col-lg');
        
    //    let input = document.createElement('input');
    //    input.classList.add = 'form-control';
    //    input.setAttribute('required', 'true');

    //    let label = document.createElement('label');
    //    label.classList.add = 'ms-2';

        elementList.forEach(element => divInputCtn.appendChild(element));

        divInputList.push(divInputCtn);
    }

    let divRow = document.createElement('div');
    divRow.classList.add('row');

    divInputList.forEach(element => divRow.appendChild(element));

    inputRowContainer.appendChild(divRow);
}

// Event listeners :
window.onload = () => {activeLinkOnScroll(); addAnotherShow(); dateInput.value="2022-08-05"; addMovieSelectOptions(dateInput.value)};
document.addEventListener('scroll', () => {activeLinkOnScroll(); displayArrowUp()});
navLinks.forEach(link => link.addEventListener('click', e => goTo(e)));
dateInput.addEventListener('change', () => addMovieSelectOptions(dateInput.value))