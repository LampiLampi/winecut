//whoever is reading this... you will be doomed for eternity 
// zum glück braucht man das file nicht mehr... schrecklicher code 
const departmentNames = document.getElementsByClassName('department-name');
const aboutRole = document.getElementsByClassName('role');
const unorderedList = document.getElementsByClassName('ul')[0];
const header = document.getElementsByClassName('header')[0];
const navbarList = document.getElementsByClassName('li');
const navbarLinks = document.getElementsByClassName('navbar-link');
const navDescription = document.getElementsByClassName('navDescription');
const writingElement = document.getElementsByClassName('welcome-description')[0];
const minWidth = 550;
let count = 0;
let index = 0;
let currentColor;
let colorIndex = 0;

const defaultTransition = '0.4s ease-in-out';
const colors = [
    '#2aa7d8',
    '#60822d',
    '#d2d430',
    '#e47e3b',
    '#ce4242',
    '#833383',
];


function syncColors() {
    unorderedList.style.borderBottom = '1px solid ' + currentColor;
    unorderedList.style.boxShadow = '20px 0px ' + currentColor;
    unorderedList.style.transition = defaultTransition

    for (let i = 0; i < departmentNames.length; i++) {
        departmentNames[i].style.borderBottom = '1px solid' + currentColor;
        departmentNames[i].style.transition = '1s ease-in-out';
    }

    for (let i = 0; i < aboutRole.length; i++) {
        aboutRole[i].style.transition = '1s ease-in-out'
        aboutRole[i].style.backgroundColor = currentColor;

    }
}

function colorText(bool) {
    let written = document.getElementsByClassName('written')[0];
    if (bool) {

        colorIndex++;

        if (colorIndex === colors.length) {
            colorIndex = 0;
        }
        currentColor = colors[colorIndex];

        written.style.color = currentColor;
        syncColors()

    } else {
        writingElement.style.borderBottom = 'none';
    }
}

function changeColorCylce() {
    let written = document.getElementsByClassName('written')[0];
}

function writeText(words) {
    colorText(false);
    writingElement.innerHTML = ''
    if (count === words.length) {
        count = 0;
    }

    currentText = words[count];
    letters = currentText.slice(0, ++index);

    writingElement.innerHTML += `<code class="written">${letters}</code>`;

    if (letters.length === currentText.length) {
        count++;
        index = 0;
        colorText(true);
        setTimeout(writeText.bind(this, words), 4000);

    } else {
        setTimeout(writeText.bind(this, words), randint(30, 160));
    }
}

function randint(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function isMobile() {
    if (window.innerWidth <= minWidth) {
        return true;
    }

    return false;
}

// makes it so the icons on the navbar are beeing 
// synced to the color cycle, described where the 
// interval was created for that function
function syncColorsNavIcons() {
    for (let item of navbarLinks) {
        item.style.color = currentColor;
    };
}

// navbar header -> hover 
header.addEventListener('mouseout', () => {
    // removing the padding of the li
    // from the hover function (reverting it to normal)
    for (let item of navbarList) {
        item.style.padding = '0.5% 4%'
    };

    // removing the description of the link
    // when unhovered (also reverting back to normal)
    for (let item of navDescription) {
        item.style.opacity = '0';
        item.style.margin = '0';
    }

    // when hovered the description and 
    for (let item of navbarLinks) {
        item.style.color = 'white';
    };

    // when unhovering the effect of fitting the current color cycle 
    // is not nedded anymore, so the interval can be closed
    clearInterval(navbarIconsSyncInverval);
});


// todo: adding functionality for mobile 
// dropDownMobile.addEventListener('click', (e) => {})

//navbar header -> unhover
header.addEventListener('mouseover', () => {
    if (isMobile()) {
        return;
    }

    for (let item of navbarList) {
        item.style.padding = '2% 4%';
    }
    if (!isMobile()) {
        for (let item of navDescription) {
            item.style.opacity = '1';
            item.style.padding = '0.5%';
            item.style.margin = '0 0 0 30%';
        }
    }

    // when hovered the color of the icons would not change to the 
    // current cycle color so this has to be done while hovering the 
    // header, after unhovering the color should change back to white
    // see down below in the (unhover) mouseout function
    navbarIconsSyncInverval = setInterval(syncColorsNavIcons, 50);

});

writeText(["sheesh", "sus", "digga", "akkurat", "cringe", "papatastisch"]);