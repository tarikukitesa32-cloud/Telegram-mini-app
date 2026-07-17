// 1. የገጾቹን መለያዎች ማግኛ
const welcomePhase = document.getElementById('welcomePhase');
const languagePhase = document.getElementById('languagePhase');
const loginPhase = document.getElementById('loginPhase');
const homePhase = document.getElementById('homePhase');
const ticketPhase = document.getElementById('ticketPhase');
const profilePhase = document.getElementById('profilePhase');
const navBar = document.getElementById('navBar');

// 2. የበተኖቹን መለያዎች ማግኛ
const startBtn = document.getElementById('startBtn');
const langBtn = document.getElementById('langBtn');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');

// 3. የNavigation ሜኑዎች ማግኛ
const navHome = document.getElementById('navHome');
const navTicket = document.getElementById('navTicket');
const navProfile = document.getElementById('navProfile');

// የትርጉም ዳታቤዝ
const translations = {
    en: {
        welcomeTitle: "Welcome to Bota Solutions App",
        welcomeSub: "Professional Telegram Mini App",
        startBtn: "Get Started",
        langTitle: "Select Language / ቋንቋ ይምረጡ",
        langBtn: "Next",
        loginTitle: "Login",
        phonePlaceholder: "Phone Number",
        loginBtn: "Login",
        homeTitle: "Welcome to Home Dashboard",
        homeSub: "You are on the main page.",
        alertPhone: "Please enter your phone number!",
        ticketTitle: "Available Tickets",
        profileTitle: "My Profile",
        statusText: "Status: Verified Member",
        payAlert: "Redirecting to Chapa Secure Payment for "
    },
    am: {
        welcomeTitle: "ወደ ቦታ ሶሉሽንስ አፕ እንኳን በደህና መጡ",
        welcomeSub: "ፕሮፌሽናል የቴሌግራም ሚኒ አፕ",
        startBtn: "ይጀምሩ",
        langTitle: "ቋንቋ ይምረጡ / Select Language",
        langBtn: "ቀጣይ",
        loginTitle: "ይግቡ (Login)",
        phonePlaceholder: "የስልክ ቁጥር",
        loginBtn: "ይግቡ",
        homeTitle: "ወደ ዋናው ዳሽቦርድ እንኳን በደህና መጡ",
        homeSub: "አሁን በዋናው ገጽ ላይ ነዎት።",
        alertPhone: "እባክዎ መጀመሪያ የስልክ ቁጥር ያስገቡ!",
        ticketTitle: "የሚገኙ ቲኬቶች",
        profileTitle: "የእኔ መገለጫ",
        statusText: "ደረጃ፡ የተረጋገጠ አባል",
        payAlert: "ደህንነቱ ወደተጠበቀው የቻፓ ክፍያ ገጽ በመሸጋገር ላይ ለ "
    },
    om: {
        welcomeTitle: "Baga Garasitti Nagaan Dhuftan",
        welcomeSub: "Telegram Mini App Ogummaa",
        startBtn: "Jalqabi",
        langTitle: "Laga Filadhudha / Select Language",
        langBtn: "Itti Fufi",
        loginTitle: "Seeni (Login)",
        phonePlaceholder: "Lakkoofsa Bilbilaa",
        loginBtn: "Seeni",
        homeTitle: "Gara Daashboordii Jalqabaatti Nagaan Dhuftan",
        homeSub: "Amma daashboordii gubbaa jirtu.",
        alertPhone: "Maaloo dura lakkoofsa bilbilaa keessan galchaa!",
        ticketTitle: "Tikkitoota Jiran",
        profileTitle: "Profaayili Kiyya",
        statusText: "Sadarkaa: Miseensa Mirkanaaye",
        payAlert: "Gara fuula kaffaltii Chapa tti cehaa jira map "
    }
};

let currentLang = 'en';
let userPhoneNumber = "";

// "Get Started" -> ቋንቋ ገጽ
startBtn.addEventListener('click', () => {
    welcomePhase.classList.add('hidden');
    languagePhase.classList.remove('hidden');
});

// ቋንቋ መርጦ "Next" -> Login ገጽ
langBtn.addEventListener('click', () => {
    currentLang = document.getElementById('langSelect').value;
    applyTranslations();
    languagePhase.classList.add('hidden');
    loginPhase.classList.remove('hidden');
});

// "Login" -> Home Dashboard
loginBtn.addEventListener('click', () => {
    const phone = document.getElementById('phoneInput').value;
    if (phone.trim() === "") {
        alert(translations[currentLang].alertPhone);
        return;
    }
    
    userPhoneNumber = phone;
    
    // ዳታዎችን በየቦታው ማሳየት
    document.getElementById('displayPhone').innerText = phone;
    document.getElementById('profilePhoneVal').innerText = phone;
    document.getElementById('profileLangVal').innerText = currentLang === 'am' ? 'አማርኛ' : (currentLang === 'om' ? 'Afaan Oromoo' : 'English');

    loginPhase.classList.add('hidden');
    homePhase.classList.remove('hidden');
    navBar.classList.remove('hidden');
    showTab('home');
});

// Navigation መቆጣጠሪያ ታቦች
navHome.addEventListener('click', () => showTab('home'));
navTicket.addEventListener('click', () => showTab('ticket'));
navProfile.addEventListener('click', () => showTab('profile'));

function showTab(tabName) {
    homePhase.classList.add('hidden');
    ticketPhase.classList.add('hidden');
    profilePhase.classList.add('hidden');
    
    navHome.classList.remove('active');
    navTicket.classList.remove('active');
    navProfile.classList.remove('active');
    
    if (tabName === 'home') {
        homePhase.classList.remove('hidden');
        navHome.classList.add('active');
    } else if (tabName === 'ticket') {
        ticketPhase.classList.remove('hidden');
        navTicket.classList.add('active');
    } else if (tabName === 'profile') {
        profilePhase.classList.remove('hidden');
        navProfile.classList.add('active');
    }
}

// Logout መውጫ
logoutBtn.addEventListener('click', () => {
    profilePhase.classList.add('hidden');
    navBar.classList.add('hidden');
    document.getElementById('phoneInput').value = "";
    welcomePhase.classList.remove('hidden');
});

function applyTranslations() {
    const data = translations[currentLang];
    
    document.querySelector('#welcomePhase .main-title').innerText = data.welcomeTitle;
    document.querySelector('#welcomePhase .subtitle').innerText = data.welcomeSub;
    startBtn.innerText = data.startBtn;
    
    document.querySelector('#languagePhase h2').innerText = data.langTitle;
    langBtn.innerText = data.langBtn;
    
    document.querySelector('#loginPhase h2').innerText = data.loginTitle;
    document.getElementById('phoneInput').placeholder = data.phonePlaceholder;
    loginBtn.innerText = data.loginBtn;
    
    document.getElementById('homeWelcomeTitle').innerText = data.homeTitle;
    document.getElementById('homeWelcomeSub').innerText = data.homeSub;
    document.getElementById('ticketTitle').innerText = data.ticketTitle;
    document.getElementById('profileTitle').innerText = data.profileTitle;
    document.getElementById('userStatus').innerText = data.statusText;
}

// ==========================================
// PHASE 5: CHAPA INTEGRATION (ክፍያ መቆጣጠሪያ)
// ==========================================
document.addEventListener('click', function(e) {
    if(e.target && e.target.classList.contains('buy-now-btn')) {
        const amount = e.target.innerText; // '50 ETB' ወይም '150 ETB'
        alert(translations[currentLang].payAlert + amount);
        
        // ማሳሰቢያ፡ እውነተኛ የቻፓ API የኋሊት መስመር (Backend) ሰርቨር ይፈልጋል።
        // ለሙከራ ያህል ተጠቃሚውን ወደ ቻፓ ማሳያ (Demo Checkout) ሊንክ በቀጥታ እንልከዋለን።
        
        const cleanAmount = amount.replace(' ETB', '');
        const tx_ref = "bota-sol-" + Date.now();
        
        // እውነተኛ የቻፓ ሊንክ ለመስራት ስትፈልግ ይህንን በሰርቨርህ API ትተካዋለህ
        const chapaDemoUrl = `https://checkout.chapa.co/checkout/payment-link`; 
        
        // ለጊዜው ወደ ቻፓ ዋና ድረገጽ ወይም መክፈያ አስመስለን እንልከዋለን
        window.location.href = `https://chapa.co`; 
    }
});
