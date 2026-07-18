// ==========================================
// 1. DATABASE & SESSION STATE (TELEBIRR STYLE)
// ==========================================
// የሁሉንም ተመዝጋቢዎች ዳታቤዝ እና የአሁኑን ተጠቃሚ ሴሽን መያዣ
let registeredUsers = JSON.parse(localStorage.getItem('bota_users_db')) || {};
let currentUserSession = JSON.parse(localStorage.getItem('bota_current_session')) || null;
let pendingTransactions = [];

const ADMIN_PHONE = "0911325430";

let appSettings = {
    productTitle: "HP EliteBook 840 G8 Laptop",
    productSubtitle: "Intel Core i5 11th Gen | 16GB RAM | 512GB SSD",
    productImg: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500",
    ticketPrice: 3000,
    daysRemaining: 9
};

// Screens
const gatewayScreen = document.getElementById('gatewayScreen');
const signUpScreen = document.getElementById('signUpScreen');
const loginScreen = document.getElementById('loginScreen');
const mainAppContainer = document.getElementById('mainAppContainer');

let tempPhoneHolder = ""; // ስልክ ቁጥርን ለጊዜው ማቆያ

document.addEventListener("DOMContentLoaded", () => {
    initAuthFlow();
    document.getElementById('langSelect').addEventListener('change', (e) => applyLanguage(e.target.value));
    updateDashboardUI();
});

// የትኛውን የመግቢያ ስክሪን ማሳየት እንዳለበት መወሰኛ
function initAuthFlow() {
    // ቀድሞ የገባ ተጠቃሚ ካለ በቀጥታ ወደ አፑ ይወስደዋል
    if (currentUserSession) {
        hideAllAuthScreens();
        loadMainApplication(currentUserSession);
    } else {
        // ሴሽን ከሌለ መጀመሪያ ስልክ ቁጥር መጠየቂያውን ያሳያል
        hideAllAuthScreens();
        gatewayScreen.classList.remove('hidden');
    }
}

function hideAllAuthScreens() {
    gatewayScreen.classList.add('hidden');
    signUpScreen.classList.add('hidden');
    loginScreen.classList.add('hidden');
}

// 📱 1. GATEWAY STEP: 'Next' በተን ሲጫን የሚሰራ
document.getElementById('btnGateNext').addEventListener('click', () => {
    const phone = document.getElementById('gatePhone').value.trim();
    if (!phone) {
        alert("Please enter a valid phone number.");
        return;
    }
    tempPhoneHolder = phone;

    hideAllAuthScreens();
    // ተጠቃሚው ቀድሞ ከተመዘገበ በቀጥታ PIN ብቻ ወደ መጠየቂያው (Login) ይሄዳል
    if (registeredUsers[phone]) {
        document.getElementById('loginGreeting').innerText = `Welcome Back, ${registeredUsers[phone].fullName.split(' ')[0]}!`;
        loginScreen.classList.remove('hidden');
    } else {
        // አዲስ ተጠቃሚ ከሆነ ስም እና ፒን መፍጠሪያው (Register) ጋር ይሄዳል
        signUpScreen.classList.remove('hidden');
    }
});

// 📝 2. REGISTER SUBMIT STEP
document.getElementById('btnSubmitRegister').addEventListener('click', () => {
    const fullName = document.getElementById('regFullName').value.trim();
    const pin = document.getElementById('regPin').value.trim();

    if (!fullName || pin.length !== 4) {
        alert("Please provide your full name and a 4-digit PIN.");
        return;
    }

    // አዲሱን ተጠቃሚ ወደ ዳታቤዝ መዝግብ
    const newUser = { fullName, phone: tempPhoneHolder, pin };
    registeredUsers[tempPhoneHolder] = newUser;
    localStorage.setItem('bota_users_db', JSON.stringify(registeredUsers));

    // የአሁኑን ሴሽን ክፈት
    currentUserSession = newUser;
    localStorage.setItem('bota_current_session', JSON.stringify(currentUserSession));

    hideAllAuthScreens();
    loadMainApplication(currentUserSession);
});

// 🔑 3. PIN LOGIN SUBMIT STEP
document.getElementById('btnSubmitLogin').addEventListener('click', () => {
    const enteredPin = document.getElementById('loginPin').value.trim();
    const storedUser = registeredUsers[tempPhoneHolder];

    if (storedUser && enteredPin === storedUser.pin) {
        currentUserSession = storedUser;
        localStorage.setItem('bota_current_session', JSON.stringify(currentUserSession));
        hideAllAuthScreens();
        loadMainApplication(currentUserSession);
    } else {
        alert("❌ Incorrect PIN! Please try again.");
    }
});

// 🚪 4. LOGOUT BUTTON LOGIC
document.getElementById('btnProfileLogout').addEventListener('click', () => {
    if(confirm("Are you sure you want to logout?")) {
        currentUserSession = null;
        localStorage.removeItem('bota_current_session'); // ሴሽኑን ማጥፋት
        document.getElementById('loginPin').value = ""; // ያለፈውን ፒን ማጽዳት
        mainAppContainer.classList.add('hidden');
        initAuthFlow(); // ወደ መጀመሪያው ስልክ ቁጥር መግቢያ መመለስ
    }
});

// LOADING MAIN HOME CONTENT
function loadMainApplication(user) {
    mainAppContainer.classList.remove('hidden');
    document.getElementById('headerUserName').innerText = user.fullName.split(' ')[0];
    document.getElementById('profileFullName').innerText = user.fullName;
    document.getElementById('profilePhoneOrUsername').innerText = user.phone;

    if (user.phone === ADMIN_PHONE) {
        document.getElementById('btnAdminAccess').classList.remove('hidden');
    } else {
        document.getElementById('btnAdminAccess').classList.add('hidden');
    }
}

// ==========================================
// 🛡️ 5. DYNAMIC ADMIN & OTHER LOGICS
// ==========================================
document.getElementById('btnSaveAdminChanges').addEventListener('click', () => {
    appSettings.productTitle = document.getElementById('inputProdTitle').value.trim();
    appSettings.productSubtitle = document.getElementById('inputProdSubtitle').value.trim();
    appSettings.productImg = document.getElementById('inputProdImg').value.trim();
    appSettings.ticketPrice = parseInt(document.getElementById('inputProdPrice').value) || 3000;
    appSettings.daysRemaining = parseInt(document.getElementById('inputProdDays').value) || 9;
    d = appSettings.daysRemaining;
    updateDashboardUI();
    alert("🎯 System Settings Updated Successfully!");
    switchTab(phases[0], document.getElementById('navHome'));
});

function updateDashboardUI() {
    document.getElementById('displayProductTitle').innerText = appSettings.productTitle;
    document.getElementById('displayProductSubtitle').innerText = appSettings.productSubtitle;
    document.getElementById('displayProductImg').src = appSettings.productImg;
    document.getElementById('txtPanelPriceValue').innerText = `${appSettings.ticketPrice.toLocaleString()} Birr`;
}

// TAB NAVIGATION CONTROL
const phases = [document.getElementById('homePhase'), document.getElementById('ticketPhase'), document.getElementById('winnersPhase'), document.getElementById('profilePhase'), document.getElementById('adminPhase')];
const navItems = [document.getElementById('navHome'), document.getElementById('navTicket'), document.getElementById('navWinners'), document.getElementById('navProfile')];

function switchTab(targetPhase, activeNav) {
    phases.forEach(p => p.classList.add('hidden'));
    navItems.forEach(n => n?.classList.remove('active'));
    targetPhase.classList.remove('hidden');
    if(activeNav) activeNav.classList.add('active');
}

navHome.addEventListener('click', () => switchTab(phases[0], navHome));
navTicket.addEventListener('click', () => { switchTab(phases[1], navTicket); generateTicketNumbersGrid(); });
navWinners.addEventListener('click', () => switchTab(phases[2], navWinners));
navProfile.addEventListener('click', () => switchTab(phases[3], navProfile));

document.getElementById('btnAdminAccess').addEventListener('click', () => {
    switchTab(document.getElementById('adminPhase'), null);
});

// (ቀሪው የቁጥር Grid እና የትኬት Stepper ኮዶች ከቀድሞው ጋር ተመሳሳይ ሆነው ይቀጥላሉ...)
let ticketCount = 1;
document.getElementById('stepPlusBtn').addEventListener('click', () => { ticketCount++; document.getElementById('ticketCountDisplay').innerText = ticketCount; });
document.getElementById('stepMinusBtn').addEventListener('click', () => { if (ticketCount > 1) { ticketCount--; document.getElementById('ticketCountDisplay').innerText = ticketCount; } });

function generateTicketNumbersGrid() {
    const grid = document.getElementById('numbersGrid100');
    if (grid.children.length > 0) return;
    for (let i = 1; i <= 100; i++) {
        const cell = document.createElement('div'); cell.className = 'num-cell'; cell.innerText = i;
        cell.addEventListener('click', () => {
            if (cell.classList.contains('selected')) { cell.classList.remove('selected'); }
            else { cell.classList.add('selected'); }
        });
        grid.appendChild(cell);
    }
}

let d = 9, h = 9, m = 54, s = 20;
setInterval(() => {
    s--; if (s < 0) { s = 59; m--; } if (m < 0) { m = 59; h--; }
    document.getElementById('daysBox').innerText = String(d).padStart(2, '0');
    document.getElementById('hoursBox').innerText = String(h).padStart(2, '0');
    document.getElementById('minsBox').innerText = String(m).padStart(2, '0');
    document.getElementById('secsBox').innerText = String(s).padStart(2, '0');
}, 1000);
