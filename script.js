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

// work in progress function to add a new line in the form to book another show
/* 
const addAnotherShow = () => {
    let counter = 1;
    counter ++;
    let formInputs = {
        0: {
            'input': {
                'class': 'form-control',
                'type': 'date', 
                'id': 'date-input' + counter, 
                'name': 'date', 
                'min': '2022-08-05', 
                'max': '2022-08-08', 
                'value': '2022-08-05', 
                'required': 'true'
            },
            'label': {'for': 'date-input' + counter, 'class': 'ms-2'}
        },
        1: {
            'select': {
                'class': 'form-select',
                'id': 'movie-select' + counter, 
                'name': 'show',
                'aria-label': 'Movie select input',
                'required': 'true'
            },
            'label': {'for': 'movie-select' + counter, 'class': 'ms-2'}
        },
        2: {
            'input': {
                'class': 'form-control',
                'type': 'number',
                'id': 'number-input' + counter,
                'name': 'number',
                'min': '1',
                'value': '1',
                'required': 'true'
            },
            'label': {'for': 'number-input' + counter, 'class': 'ms-2'}
        }
    }

    let divInputList = []

    // 3 fois :
    for (let i = 0; i < 3; i++) {

        // On créé une div.form-floating
        let divInputCtn = document.createElement('div');
        divInputCtn.classList.add('form-floating', 'mb-3', 'col-lg');

        let elementList = [];

        for (const [index, element] of Object.entries(formInputs)) {
            let inputAndLabel = [];
            for (const [elementName, attributes] of Object.entries(element)) {
                
                let htmlElement = document.createElement(elementName);
                for (const [attributeName, value] of Object.entries(attributes)) {
                    htmlElement.setAttribute(attributeName, value);
                }
                inputAndLabel.push(htmlElement);
            }
            elementList.push(inputAndLabel);
        }

        // On append à la div.form-floating les 3 inputs contenus dans la liste d'input
        //elementList.forEach(element => divInputCtn.appendChild(element));
        elementList.forEach((list, index) => {
            index === i ? list.forEach(element => {
                divInputCtn.appendChild(element);
            }) : null;
        })
        // On veut append à 3 div.form-floating chacun des 3 inputs et des 3 labels contenu dans la liste
         

        // on pousse la div.form-floating dans une liste de div
        divInputList.push(divInputCtn);
    }

    // On créé la div.row
    let divRow = document.createElement('div');
    divRow.classList.add('row');

    // On lui append les 3 div.form-floating
    divInputList.forEach(element => divRow.appendChild(element));

    // On append la div.row à son container
    inputRowContainer.appendChild(divRow);
} 
*/

// Event listeners :
window.onload = () => {activeLinkOnScroll(); dateInput.value="2022-08-05"; addMovieSelectOptions(dateInput.value)};
document.addEventListener('scroll', () => {activeLinkOnScroll(); displayArrowUp()});
navLinks.forEach(link => link.addEventListener('click', e => goTo(e)));
dateInput.addEventListener('change', () => addMovieSelectOptions(dateInput.value))