// DOM Elements
const welcomePhase = document.getElementById('welcomePhase');
const languagePhase = document.getElementById('languagePhase');
const loginPhase = document.getElementById('loginPhase');
const homePhase = document.getElementById('homePhase');
const bidPhase = document.getElementById('bidPhase');
const ticketPhase = document.getElementById('ticketPhase');
const profilePhase = document.getElementById('profilePhase');
const navBar = document.getElementById('navBar');

const startBtn = document.getElementById('startBtn');
const langBtn = document.getElementById('langBtn');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');

const hlSubmitBidBtn = document.getElementById('hlSubmitBidBtn');
const stepMinus = document.getElementById('stepMinus');
const stepPlus = document.getElementById('stepPlus');
const hlBidAmount = document.getElementById('hlBidAmount');
const acceptTermsCheckbox = document.getElementById('acceptTermsCheckbox');

const phoneInput = document.getElementById('phoneInput');
const displayPhone = document.getElementById('displayPhone');
const profilePhoneVal = document.getElementById('profilePhoneVal');
const profileLangVal = document.getElementById('profileLangVal');
const langSelect = document.getElementById('langSelect');

const navHome = document.getElementById('navHome');
const navBid = document.getElementById('navBid');
const navTicket = document.getElementById('navTicket');
const navProfile = document.getElementById('navProfile');

// Navigation Tabs Array
const phases = [homePhase, bidPhase, ticketPhase, profilePhase];
const navItems = [navHome, navBid, navTicket, navProfile];

// 1. Welcome -> Language
startBtn.addEventListener('click', () => {
    welcomePhase.classList.add('hidden');
    languagePhase.classList.remove('hidden');
});

// 2. Language -> Login
langBtn.addEventListener('click', () => {
    languagePhase.classList.add('hidden');
    loginPhase.classList.remove('hidden');
});

// 3. Login -> Home Dashboard
loginBtn.addEventListener('click', () => {
    const phone = phoneInput.value.trim();
    if (phone === '') {
        alert('Please enter your phone number / እባክዎ ስልክ ቁጥር ያስገቡ');
        return;
    }

    if(displayPhone) displayPhone.innerText = phone;
    if(profilePhoneVal) profilePhoneVal.innerText = phone;
    
    const selectedLang = langSelect.options[langSelect.selectedIndex].text;
    if(profileLangVal) profileLangVal.innerText = selectedLang;

    loginPhase.classList.add('hidden');
    homePhase.classList.remove('hidden');
    navBar.classList.remove('hidden');
});

// Stepper Logic (+ and - buttons)
stepPlus.addEventListener('click', () => {
    let currentVal = parseFloat(hlBidAmount.value);
    hlBidAmount.value = (currentVal + 0.05).toFixed(2);
});

stepMinus.addEventListener('click', () => {
    let currentVal = parseFloat(hlBidAmount.value);
    if (currentVal > 0.05) {
        hlBidAmount.value = (currentVal - 0.05).toFixed(2);
    }
});

// Submit Bid Logic with Terms validation
hlSubmitBidBtn.addEventListener('click', () => {
    if (!acceptTermsCheckbox.checked) {
        alert('Please accept the Terms and Conditions first! / እባክዎ መጀመሪያ በሕግና ደንቦቹ መስማማትዎን ያረጋግጡ!');
        return;
    }

    const finalBid = hlBidAmount.value;
    alert(`🎉 Success! Your Lowest Unique Bid of ${finalBid} Br has been submitted!`);
});

// Tab Switching Logic
function switchTab(targetPhase, activeNav) {
    phases.forEach(phase => phase.classList.add('hidden'));
    navItems.forEach(item => item.classList.remove('active'));

    targetPhase.classList.remove('hidden');
    activeNav.classList.add('active');
}

navHome.addEventListener('click', () => switchTab(homePhase, navHome));
navBid.addEventListener('click', () => switchTab(bidPhase, navBid));
navTicket.addEventListener('click', () => switchTab(ticketPhase, navTicket));
navProfile.addEventListener('click', () => switchTab(profilePhase, navProfile));

// Logout
logoutBtn.addEventListener('click', () => {
    phases.forEach(phase => phase.classList.add('hidden'));
    navBar.classList.add('hidden');
    phoneInput.value = '';
    welcomePhase.classList.remove('hidden');
});

// Countdown Timer Logic (Exactly matches the 7d countdown)
setInterval(() => {
    const timerText = document.getElementById('hlTimerText');
    if(timerText) {
        let text = timerText.innerText;
        let parts = text.match(/\d+/g);
        if(parts) {
            let days = parseInt(parts[0]);
            let hours = parseInt(parts[1]);
            let minutes = parseInt(parts[2]);
            let seconds = parseInt(parts[3]);

            seconds--;
            if(seconds < 0) { seconds = 59; minutes--; }
            if(minutes < 0) { minutes = 59; hours--; }
            if(hours < 0) { hours = 23; days--; }
            if(days < 0) { days = 0; hours = 0; minutes = 0; seconds = 0; }

            timerText.innerText = `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
        }
    }
}, 1000);
