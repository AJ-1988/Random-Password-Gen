// Dom Elements
var resultEl = document.getElementById("result");
var lengthEl = document.getElementById("length");
var uppercaseEl = document.getElementById("uppercase");
var lowercaseEl = document.getElementById("lowercase");
var numbersEl = document.getElementById("numbers");
var symbolsEl = document.getElementById("symbols");
var generateEl = document.getElementById("generate");
var clipboardEl = document.getElementById("clipboard");
var sliderEl = document.getElementById("slider");
var sliderBar = document.querySelector(".slider-bar");
var copiedAlert = document.querySelector(".copied-alert");

// Number
lengthEl.addEventListener("input", function() {
    var length = parseInt(lengthEl.value);
    var lengthMax = parseInt(lengthEl.max);
    var hasLower = lowercaseEl.checked;
    var hasUpper = uppercaseEl.checked;
    var hasNumber = numbersEl.checked;
    var hasSymbols = symbolsEl.checked;

    sliderEl.value = lengthEl.value;
    
    // Init Slider Postion 
    currentSliderPos()

    // Check If Result Box Is Empty
    if (resultEl.innerText != "") {
        // Init Password Strength Bar
        passwordStrBar(length)

        // Init Generator Password Function
        resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbols, length);
    }

    // Check If Length Is Past 50
    if(lengthEl.value > lengthMax) {
        lengthEl.value = lengthMax;
    }
});

// Slider
sliderEl.addEventListener("input", function() {
    var length = parseInt(lengthEl.value);
    var hasLower = lowercaseEl.checked;
    var hasUpper = uppercaseEl.checked;
    var hasNumber = numbersEl.checked;
    var hasSymbols = symbolsEl.checked;

    lengthEl.value = sliderEl.value;
    
    // Init Slider Postion 
    currentSliderPos()

    if (resultEl.innerText != "") {
        // Init Password Strength Bar
        passwordStrBar(length)

        // Init Generator Password Function
        resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbols, length);
    }
});

// On Load Slider Pos
window.addEventListener("load", currentSliderPos());

// Current Slidder Pos Function
function currentSliderPos() {
    var currentSliderPosEl = Math.floor(sliderEl.value / (sliderEl.max - sliderEl.min) * 100 - 2);
    sliderBar.style.width = currentSliderPosEl + "%";
}

// Password Strenth Bar Function
function passwordStrBar(len) {
    var passwordStrenghbar = document.querySelector(".password-strength-bar");

    if (len >= 11) {
        passwordStrenghbar.style.width = 100 + "%";
        passwordStrenghbar.style.background = "#00C851";
        
    } else if (len >= 9 && len <= 10) {
        passwordStrenghbar.style.width = 75 + "%";
        passwordStrenghbar.style.background = "#00C851";

    } else if (len >= 7 && len <= 8) {
        passwordStrenghbar.style.width = 45 + "%";
        passwordStrenghbar.style.background = "#ffbb33";

    } else if (len >= 5 && len <= 6) {
        passwordStrenghbar.style.width = 35 + "%";
        passwordStrenghbar.style.background = "#ff8800";

    } else if (len <= 4) {
        passwordStrenghbar.style.width = 15 + "%";
        passwordStrenghbar.style.background = "#ff4444";
    } 
}

// Function Object
const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbols
};

// Click Listener
generateEl.addEventListener("click", function() {
    var length = parseInt(lengthEl.value);
    var hasLower = lowercaseEl.checked;
    var hasUpper = uppercaseEl.checked;
    var hasNumber = numbersEl.checked;
    var hasSymbols = symbolsEl.checked;
    
    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbols, length);

    // Copied Pop Up
    copiedAlert.classList.remove("active");

    // Init Password Strength Bar
    passwordStrBar(length);
});

// Generate Password Function
function generatePassword(lower, upper, number, symbol, length) {
    var generatedPassword = "";

    var typesCount = lower + upper + number + symbol;

    var typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
    
    if(typesCount === 0) {
        return '';
    }

    for(let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            var funcName = Object.keys(type);
            generatedPassword += randomFunc[funcName]();
        });
    }

    var finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
}

// Copy password to clipboard
clipboardEl.addEventListener('click', () => {
    var textarea = document.createElement('textarea');
    var password = result.innerText;

    if(!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();

    // Copied Pop Up
    copiedAlert.classList.add("active");

    // Copied Pop Up Set time out
    setTimeout(() => {
        copiedAlert.classList.remove("active");
    }, 1800);
});

// Generator Functions

// Random Lower
function getRandomLower() {
    var randomLower = Math.floor(Math.random() * 26) + 97;
    return String.fromCharCode(randomLower);
}

// Random Upper
function getRandomUpper() {
    var randomUpper = Math.floor(Math.random() * 26) + 65
    return String.fromCharCode(randomUpper);
}

// Random Number
function getRandomNumber() {
    var randomNumber = Math.floor(Math.random() * 10) + 48
    return String.fromCharCode(randomNumber);
}

// Random Symbol
function getRandomSymbols() {
    var symbols = "!@#$%^&*";
    return symbols[Math.floor(Math.random() * symbols.length)];
}

// Modal
var modalBody = document.getElementById("modal");
var footerPrivacy = document.getElementById("privacy-policy");
var termsoOfService = document.getElementById("terms-of-service");
var modalClose = document.querySelectorAll(".modal-close");

var modalBodyClass = document.querySelectorAll(".modal");


// Modal Open
var modalPrivacy = document.querySelector(".modal-privacy");
footerPrivacy.addEventListener("click", function(e) {
    e.preventDefault();
    modalPrivacy.classList.add("modal-visible");
});

var modalTerms = document.querySelector(".modal-terms");
termsoOfService.addEventListener("click", function(e) {
    e.preventDefault();
    modalTerms.classList.add("modal-visible");
});

// Close Modal
for (var mc of modalClose) {
    mc.addEventListener("click", function() {
        for (var mbc of modalBodyClass) {
            mbc.classList.remove("modal-visible");
        }
    });
};

// Close Modal Body
for (var mbc of modalBodyClass) {
    modalBodyClose(mbc);
};

function modalBodyClose(mbc) {
    mbc.addEventListener("click", function(e) {
        if(e.target.className == "modal-inner" || e.target.className == "modal-h2"  || e.target.id == "modal") {
            mbc.classList.remove("modal-visible");
        }
    })
};

// Copyright Date
var newdDate = new Date();
var currentYear = newdDate.getFullYear();
var copyrightYear = document.getElementById("copyright-container-year");

copyrightYear.innerHTML = currentYear;