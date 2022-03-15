const navbarLinks = document.getElementsByClassName('navbar-link');
const header = document.getElementsByClassName('header')[0];
const navbarList = document.getElementsByClassName('li');
const unorderedList = document.getElementsByClassName('ul')[0];
const navDescription = document.getElementsByClassName('navDescription');
const footerHeaders = document.getElementsByClassName('footerBorder');
const defaultTransition = '0.7s ease-in-out';
const minWidth = 550;
const colors = [
    '#2aa7d8',
    '#60822d',
    '#833383',
    '#d2d430',  
    '#e47e3b'
];

let colorBorderSync = undefined;
let navbarIconsSyncInverval = undefined;
// defines the starting color -> winecut green
let currentColor = '#60822d';


function isMobile() {
    if (window.innerWidth <= minWidth) {
        return true;
    }

    return false;
}

function colorCycle() {
    currentColor = choice(colors);
    for (let i = 0; i < footerHeaders.length; i++) {
        footerHeaders[i].style.borderBottom = '1px solid' + currentColor;
    }

    unorderedList.style.borderBottom = '1px solid ' + currentColor;
    unorderedList.style.transition = defaultTransition
}

function choice(array) {
    if (typeof array === typeof []) {
        return array[Math.floor(Math.random() * array.length)];
    }
}


header.addEventListener('mouseover', () => {
    if (isMobile()) {
        return;
    }

    for (let item of navbarList) {
        item.style.padding = '2% 4%';
    }

    for (let item of navDescription) {
        item.style.opacity = '1';
        item.style.padding = '0.5%';
        item.style.margin = '0 0 0 30%';
    }

    navbarIconsSyncInverval = setInterval(syncColorsNavIcons, 50);

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

    clearInterval(navbarIconsSyncInverval);
});

function syncColorsNavIcons() {
    for (let item of navbarLinks) {
        item.style.color = currentColor;
    };
}

setInterval(colorCycle, 7000);