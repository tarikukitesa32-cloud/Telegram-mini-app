// 1. የገጾቹን መለያዎች (IDs) ከ HTML ማግኛ
const welcomePhase = document.getElementById('welcomePhase');
const languagePhase = document.getElementById('languagePhase');
const loginPhase = document.getElementById('loginPhase');
const homePhase = document.getElementById('homePhase');
const navBar = document.getElementById('navBar');

// 2. የበተኖቹን መለያዎች (IDs) ከ HTML ማግኛ
const startBtn = document.getElementById('startBtn');
const langBtn = document.getElementById('langBtn');
const loginBtn = document.getElementById('loginBtn');

// 3. የቋንቋ መቆጣጠሪያ (Localization) ዳታቤዝ
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
        alertPhone: "Please enter your phone number!"
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
        homeTitle: "ወደ ዋናው ገጽ እንኳን በደህና መጡ",
        homeSub: "አሁን በዋናው ዳሽቦርድ ላይ ነዎት።",
        alertPhone: "እባክዎ መጀመሪያ የስልክ ቁጥር ያስገቡ!"
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
        homeTitle: "Gara Fuula Jalqabaatti Nagaan Dhuftan",
        homeSub: "Amma daashboordii gubbaa jirtu.",
        alertPhone: "Maaloo dura lakkoofsa bilbilaa keessan galchaa!"
    }
};

// የአሁኑ ቋንቋ (Default English ነው)
let currentLang = 'en';

// 4. ገጾቹን የመቀያየር ተግባራት (Event Listeners)

// ሀ. "Get Started" ሲነካ -> ወደ ቋንቋ ገጽ መሸጋገሪያ
startBtn.addEventListener('click', () => {
    welcomePhase.classList.add('hidden');
    languagePhase.classList.remove('hidden');
});

// ለ. ቋንቋ መርጦ "Next" ሲነካ -> ቋንቋውን ቀይሮ ወደ Login ገጽ መሸጋገሪያ
langBtn.addEventListener('click', () => {
    const langSelect = document.getElementById('langSelect').value;
    currentLang = langSelect; // የተመረጠውን ቋንቋ መያዝ
    
    // በምርጫው መሠረት ጽሑፎቹን መቀየር
    applyTranslations();

    languagePhase.classList.add('hidden');
    loginPhase.classList.remove('hidden');
});

// ሐ. "Login" ሲነካ -> ስልክ ቁጥሩን አረጋግጦ ወደ ዋናው ገጽ (Home) መሸጋገሪያ
loginBtn.addEventListener('click', () => {
    const phoneInput = document.getElementById('phoneInput');
    
    // ስልክ ቁጥር ባዶ ከሆነ ማስጠንቀቂያ መስጫ
    if (phoneInput.value.trim() === "") {
        alert(translations[currentLang].alertPhone);
        return;
    }
    
    // በተሳካ ሁኔታ ካለፈ ወደ Home ማሳለፍ
    loginPhase.classList.add('hidden');
    homePhase.classList.remove('hidden');
    navBar.classList.remove('hidden'); // የታችኛውን ሜኑ አሳይ
});


// 5. ጽሑፎችን በተመረጠው ቋንቋ የመቀየሪያ Function
function applyTranslations() {
    const data = translations[currentLang];
    
    // Welcome Phase ጽሑፎች
    document.querySelector('#welcomePhase .main-title').innerText = data.welcomeTitle;
    document.querySelector('#welcomePhase .subtitle').innerText = data.welcomeSub;
    startBtn.innerText = data.startBtn;
    
    // Language Phase ጽሑፎች
    document.querySelector('#languagePhase h2').innerText = data.langTitle;
    langBtn.innerText = data.langBtn;
    
    // Login Phase ጽሑፎች
    document.querySelector('#loginPhase h2').innerText = data.loginTitle;
    document.getElementById('phoneInput').placeholder = data.phonePlaceholder;
    loginBtn.innerText = data.loginBtn;
    
    // Home Phase ጽሑፎች
    document.querySelector('#homePhase h2').innerText = data.homeTitle;
    document.querySelector('#homePhase p').innerText = data.homeSub;
}
