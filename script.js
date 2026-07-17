// DOM Elements
const welcomePhase = document.getElementById('welcomePhase');
const languagePhase = document.getElementById('languagePhase');
const loginPhase = document.getElementById('loginPhase');
const homePhase = document.getElementById('homePhase');
const ticketPhase = document.getElementById('ticketPhase');
const profilePhase = document.getElementById('profilePhase');
const navBar = document.getElementById('navBar');

const startBtn = document.getElementById('startBtn');
const langBtn = document.getElementById('langBtn');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');

const phoneInput = document.getElementById('phoneInput');
const displayPhone = document.getElementById('displayPhone');
const profilePhoneVal = document.getElementById('profilePhoneVal');
const profileLangVal = document.getElementById('profileLangVal');
const langSelect = document.getElementById('langSelect');

const navHome = document.getElementById('navHome');
const navTicket = document.getElementById('navTicket');
const navProfile = document.getElementById('navProfile');

// Navigation Tabs Array
const phases = [homePhase, ticketPhase, profilePhase];
const navItems = [navHome, navTicket, navProfile];

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

    // ስልክ ቁጥሩን እና ቋንቋውን በየቦታው መተካት
    if(displayPhone) displayPhone.innerText = phone;
    if(profilePhoneVal) profilePhoneVal.innerText = phone;
    
    const selectedLang = langSelect.options[langSelect.selectedIndex].text;
    if(profileLangVal) profileLangVal.innerText = selectedLang;

    // ገጾቹን መቀያየር
    loginPhase.classList.add('hidden');
    homePhase.classList.remove('hidden');
    navBar.classList.remove('hidden');
});

// Navigation Menu Clicking Logic
function switchTab(targetPhase, activeNav) {
    phases.forEach(phase => phase.classList.add('hidden'));
    navItems.forEach(item => item.classList.remove('active'));

    targetPhase.classList.remove('hidden');
    activeNav.classList.add('active');
}

navHome.addEventListener('click', () => switchTab(homePhase, navHome));
navTicket.addEventListener('click', () => switchTab(ticketPhase, navTicket));
navProfile.addEventListener('click', () => switchTab(profilePhase, navProfile));

// Logout Function
logoutBtn.addEventListener('click', () => {
    // ሁሉንም ደብቆ ወደ መጀመሪያው መመለስ
    homePhase.classList.add('hidden');
    ticketPhase.classList.add('hidden');
    profilePhase.classList.add('hidden');
    navBar.classList.add('hidden');
    
    phoneInput.value = ''; // የነበረውን ስልክ ማጽዳት
    welcomePhase.classList.remove('hidden');
});
