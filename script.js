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

// Dictionary for Languages (ትርጉሞች)
const translations = {
    en: {
        welcomeTitle: "Welcome to Bota Solutions App",
        welcomeSub: "Professional Telegram Mini App",
        startBtn: "Get Started",
        loginTitle: "Login",
        phonePlace: "Phone Number",
        loginBtn: "Login",
        homeTitle: "Welcome to Home Dashboard",
        homeSub: "You are on the main page.",
        balanceLabel: "Available Balance",
        phoneLabel: "User Phone Number",
        bidTitle: "Featured Items",
        howLowTitle: "HowLow Auction Platform",
        howLowSub: "Bid Low! Win Big!",
        howLowDesc: "HOWLOW is a Lowest Unique Bid Auction where the participant who submits the lowest unique bid wins. For instance, if ETB 1.00 is submitted twice, ETB 2.00 once, ETB 3.00 twice, and ETB 4.00 once, the lowest unique bid is ETB 2.00, so it wins!",
        termsLabel: "I agree to the Terms and Conditions",
        submitBidBtn: "Submit a Bid Amount",
        ticketTitle: "Available Tickets",
        profileTitle: "My Profile",
        logoutBtn: "Logout",
        alertPhone: "Please enter your phone number!",
        alertTerms: "Please accept the Terms and Conditions first!",
        alertBidSuccess: "🎉 Success! Your Lowest Unique Bid has been submitted!"
    },
    am: {
        welcomeTitle: "እንኳን ወደ ቦታ ሶሉሽንስ አፕ መጡ",
        welcomeSub: "ፕሮፌሽናል የቴሌግራም ሚኒ አፕ",
        startBtn: "ይጀምሩ",
        loginTitle: "ይግቡ (Login)",
        phonePlace: "የስልክ ቁጥር",
        loginBtn: "ግባ",
        homeTitle: "እንኳን ወደ ዋናው ገጽ መጡ",
        homeSub: "አሁን በዋናው ዳሽቦርድ ገጽ ላይ ይገኛሉ።",
        balanceLabel: "ያሎት ቀሪ ሂሳብ",
        phoneLabel: "የተጠቃሚ ስልክ ቁጥር",
        bidTitle: "ልዩ ጨረታዎች",
        howLowTitle: "የሃውሎው ጨረታ ፕላትፎርም",
        howLowSub: "በትንሽ ዋጋ ይጫረቱ! በትልቅ ያሸንፉ!",
        howLowDesc: "ሃውሎው (HOWLOW) ማለት ዝቅተኛ እና ብቸኛ (Lowest Unique Bid) የሆነ ዋጋ ያቀረበ ተጫራች የሚያሸንፍበት ዘዴ ነው። ለምሳሌ 1.00 ብር ሁለት ሰው፣ 2.00 ብር አንድ ሰው፣ 3.00 ብር ሁለት ሰው ካቀረቡ፤ ዝቅተኛውና ከአንድ ሰው ብቻ የቀረበው 2.00 ብር ስለሆነ እሱ ያሸንፋል!",
        termsLabel: "በሕግና ደንቦቹ ሙሉ በሙሉ እስማማለሁ",
        submitBidBtn: "ጨረታውን አስገባ",
        ticketTitle: "የሚገኙ ትኬቶች",
        profileTitle: "የእኔ ፕሮፋይል",
        logoutBtn: "ውጣ",
        alertPhone: "እባክዎ መጀመሪያ የስልክ ቁጥር ያስገቡ!",
        alertTerms: "እባክዎ መጀመሪያ በሕግና ደንቦቹ መስማማትዎን ያረጋግጡ!",
        alertBidSuccess: "🎉 እንኳን ደስ አለዎት! የጨረታ ዋጋዎ በተሳካ ሁኔታ ገብቷል!"
    },
    om: {
        welcomeTitle: "Baga Gara Bota Solutions App Nagaan Dhuftan",
        welcomeSub: "Telegram Mini App Ogummaa",
        startBtn: "Eegali",
        loginTitle: "Seeni (Login)",
        phonePlace: "Lakkofsa Bilbilaa",
        loginBtn: "Seeni",
        homeTitle: "Baga Gara Fuula Duraa Nagaan Dhuftan",
        homeSub: "Amma fuula guddaa irra jirtu.",
        balanceLabel: "Hanga Maallaqa Keessanii",
        phoneLabel: "Lakkofsa Bilbila Fayyadamaa",
        bidTitle: "Mo'attonni Filataman",
        howLowTitle: "Sirna Caalbaasii HowLow",
        howLowSub: "Gatii Gadi Bu'aan Caalbaasii Mo'adhu!",
        howLowDesc: "HOWLOW jechuun caalbaasii gatii baay'ee gadi bu'aa fi adda ta'e (Lowest Unique Bid) itti dhiyeessan kanaan mo'atani dha. Fakkeenyaaf, namni lama ETB 1.00, namni tokko ETB 2.00, namni lama ammoo ETB 3.00 yoo dhiyeessan, gatiin gadi bu'aan namni biraa hin dhiyeessin ETB 2.00 waan ta'eef innis ni mo'ata!",
        termsLabel: "Waliigaltee fi Seerota hundaatti nan walii gala",
        submitBidBtn: "Gatii Caalbaasii Galchi",
        ticketTitle: "Tikkeettii Argaman",
        profileTitle: "Profaayilii Koo",
        logoutBtn: "Ba'i",
        alertPhone: "Maaloo lakkofsa bilbila keessani galchaa!",
        alertTerms: "Maaloo jalqaba waliigaltee seeraa mirkaneessaa!",
        alertBidSuccess: "🎉 Milkaa'ina! Gatiin caalbaasii keessanii ilksan galmaa'ee jira!"
    }
};

let currentLang = 'om'; // Default language

// Function to apply translations dynamically
function applyLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];

    // Welcome Screen
    document.querySelector('.main-title').innerText = t.welcomeTitle;
    document.querySelector('.subtitle').innerText = t.welcomeSub;
    startBtn.innerText = t.startBtn;

    // Login Screen
    document.querySelector('#loginPhase h2').innerText = t.loginTitle;
    phoneInput.placeholder = t.phonePlace;
    loginBtn.innerText = t.loginBtn;

    // Home Screen
    document.querySelector('.premium-card-text p').innerText = t.phoneLabel;
    document.querySelector('.balance-section p').innerText = t.balanceLabel;
    document.getElementById('homeWelcomeTitle').innerText = t.homeTitle;
    document.getElementById('homeWelcomeSub').innerText = t.homeSub;

    // Bids Screen
    document.querySelector('.how-low-info h3').innerText = t.howLowTitle;
    document.querySelector('.how-low-info h4').innerText = t.howLowSub;
    document.querySelector('.how-low-info p').innerText = t.howLowDesc;
    document.querySelector('.terms-checkbox-container label').innerText = t.termsLabel;
    document.querySelector('#bidPhase h3').innerText = t.bidTitle;
    hlSubmitBidBtn.innerText = t.submitBidBtn;

    // Tickets Screen
    document.getElementById('ticketTitle').innerText = t.ticketTitle;

    // Profile Screen
    document.getElementById('profileTitle').innerText = t.profileTitle;
    document.querySelector('#profilePhase .premium-card-text p').innerText = t.phonePlace;
    logoutBtn.innerText = t.logoutBtn;
}

// Navigation Tabs Array
const phases = [homePhase, bidPhase, ticketPhase, profilePhase];
const navItems = [navHome, navBid, navTicket, navProfile];

// 1. Welcome -> Language
startBtn.addEventListener('click', () => {
    welcomePhase.classList.add('hidden');
    languagePhase.classList.remove('hidden');
});

// 2. Language Selected -> Login
langBtn.addEventListener('click', () => {
    const selectedValue = langSelect.value; // 'om', 'am', or 'en'
    applyLanguage(selectedValue); // ቋንቋውን ቀይር

    languagePhase.classList.add('hidden');
    loginPhase.classList.remove('hidden');
});

// 3. Login -> Home Dashboard
loginBtn.addEventListener('click', () => {
    const phone = phoneInput.value.trim();
    if (phone === '') {
        alert(translations[currentLang].alertPhone);
        return;
    }

    if(displayPhone) displayPhone.innerText = phone;
    if(profilePhoneVal) profilePhoneVal.innerText = phone;
    
    const selectedLangText = langSelect.options[langSelect.selectedIndex].text;
    if(profileLangVal) profileLangVal.innerText = selectedLangText;

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

// Submit Bid Logic
hlSubmitBidBtn.addEventListener('click', () => {
    if (!acceptTermsCheckbox.checked) {
        alert(translations[currentLang].alertTerms);
        return;
    }
    alert(translations[currentLang].alertBidSuccess);
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

// Countdown Timer
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
