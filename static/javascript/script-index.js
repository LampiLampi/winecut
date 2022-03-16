// tristan ich hoffe du stirbst, ich weiß selbst nicht mehr genau was das alles soll,
// aber es hat sicher einen grund :)
// der full stack dev redet grade.
const welcomeDescription = document.getElementsByClassName('welcome-description')[0];
const allText = document.getElementsByClassName('text');
const contactBorderLine = document.getElementsByClassName('contact')[0];
const aboutBorderLine = document.getElementsByClassName('about')[0];
const projectBorderLine = document.getElementsByClassName('project')[0];
const navbarLinks = document.getElementsByClassName('navbar-link');
const header = document.getElementsByClassName('header')[0];
const navbarList = document.getElementsByClassName('li');
const unorderedList = document.getElementsByClassName('ul')[0];
const navDescription = document.getElementsByClassName('navDescription');
const footerHeaders = document.getElementsByClassName('footerBorder');
const ourProductsLink = document.getElementById('our-products-link');

const preNavBarPadding = '0.5% 4%'
const postNavBarPadding = '2% 4%'
const defaultTransition = '0.7s ease-in-out';
const minWidth = 550;
const minWritingSpeed = 70;
const maxWritingSpeed = 90;

let colorBorderSync = undefined;
let navbarIconsSyncInterval = undefined;
let currentColor;
let count = 0;
let index = 0;
let colorIndex = 0;

const descriptions = [
    '{upcycled glass.}',
    '{fancy decoration.}',
    '{adorable candles.}',
    '{austrian quality}',
    '{the sustainable change.}',
    '{a green / clean cut.}',
];

const colors = [
    '#2aa7d8',
    '#60822d',
    '#d2d430',
    '#e47e3b',
    '#ce4242',
    '#833383',
];

function isMobile() {
    if (window.innerWidth <= minWidth) {
        console.log('mobile')
        return true;
    }

    return false;
}

function randint(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function syncColorsNavIcons(mobile = false) {
    for (let item of navbarLinks) {
        item.style.color = currentColor;
    };
}

function syncColors() {
    for (let i = 0; i < allText.length; i++) {
        allText[i].style.transition = defaultTransition;
        allText[i].style.borderBottom = '3px solid' + currentColor;
        allText[i].style.borderLeft = '3px solid' + currentColor;
    }

    for (let i = 0; i < footerHeaders.length; i++) {
        footerHeaders[i].style.borderBottom = '1px solid' + currentColor;
    }

    ourProductsLink.style.backgroundColor = currentColor;

    //contactBorderLine.style.transition = '1s ease-in-out';
    //projectBorderLine.style.transition = '1s ease-in-out';
    //aboutBorderLine.style.transition = '1s ease-in-out';
    
    //contactBorderLine.style.borderBottom = '5px solid' + currentColor;
    //projectBorderLine.style.borderBottom = '5px solid' + currentColor;
    //projectBorderLine.style.borderTop = '5px solid' + currentColor;
    //aboutBorderLine.style.borderBottom = '5px solid' + currentColor;

}

function underlineAnimation(bool) {
    let written = document.getElementsByClassName('written')[0];
    if (bool) {

        colorIndex++;

        if (colorIndex === colors.length) {
            colorIndex = 0;
        }
        currentColor = colors[colorIndex];

        if (colorBorderSync) {
            clearInterval(colorBorderSync);
        }

        unorderedList.style.borderBottom = '1px solid ' + currentColor;
        unorderedList.style.boxShadow = '20px 0px ' + currentColor;
        unorderedList.style.transition = defaultTransition
        written.style.color = currentColor;

        colorBorderSnyc = setInterval(syncColors, 50);

    } else {
        welcomeDescription.style.borderBottom = 'none';
    }
}

function newDescription() {
    underlineAnimation(false);
    welcomeDescription.innerHTML = ''
    if (count === descriptions.length) {
        count = 0;
    }

    currentText = descriptions[count];
    letters = currentText.slice(0, ++index);

    welcomeDescription.innerHTML += `<code class="written">${letters}</code>`;

    if (letters.length === currentText.length) {
        count++;
        index = 0;
        setTimeout(newDescription, 4000);
        underlineAnimation(true);
    } else {
        setTimeout(newDescription, randint(minWritingSpeed, maxWritingSpeed));
    }
}

function choice(array) {
    if (typeof array === typeof []) {
        return array[Math.floor(Math.random() * array.length)];
    }
}

header.addEventListener('mouseover', () => {
    if (!isMobile()) {
        for (let item of navbarList) {
            item.style.padding = '2% 4%';
        }

        for (let item of navDescription) {
            item.style.opacity = '1';
            item.style.padding = '0.5%';
            item.style.margin = '0 0 0 30%';
        }
    }

    navbarIconsSyncInterval = setInterval(syncColorsNavIcons, 50);

});

header.addEventListener('mouseout', () => {
    for (let item of navbarList) {
        item.style.padding = '0.5% 4%';
    };

    for (let item of navDescription) {
        item.style.opacity = '0';
        item.style.margin = '0';
    }

    for (let item of navbarLinks) {
        item.style.color = 'white';
    };

    clearInterval(navbarIconsSyncInterval);
});


if (isMobile()) {
    navbarIconsSyncInterval = setInterval(syncColorsNavIcons.bind(mobile = true), 50);
}

newDescription();