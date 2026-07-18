// ==========================================
// 1. STATE & AUTHENTICATION WITH ADMIN CHECK
// ==========================================
let userData = JSON.parse(localStorage.getItem('bota_user_data')) || null;
let pendingTransactions = [];

// 🚨 የአንተ ቁጥር ብቻ አድሚን እንዲሆን የተደረገበት ህግ
const ADMIN_PHONE = "0911325430";

// App Settings (can be dynamically changed by admin)
let appSettings = {
    productTitle: "HP EliteBook 840 G8 Laptop",
    productSubtitle: "Intel Core i5 11th Gen | 16GB RAM | 512GB SSD",
    productImg: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500",
    ticketPrice: 3000,
    daysRemaining: 9
};

const signUpScreen = document.getElementById('signUpScreen');
const loginScreen = document.getElementById('loginScreen');
const mainAppContainer = document.getElementById('mainAppContainer');

document.addEventListener("DOMContentLoaded", () => {
    initAuthFlow();
    document.getElementById('langSelect').addEventListener('change', (e) => applyLanguage(e.target.value));
    applyLanguage("en");
    updateDashboardUI(); // Load current item details
});

function initAuthFlow() {
    if (!userData) {
        signUpScreen.classList.remove('hidden');
    } else {
        loginScreen.classList.remove('hidden');
    }
}

// Handle Sign Up
document.getElementById('btnSubmitRegister').addEventListener('click', () => {
    const fullName = document.getElementById('regFullName').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const pin = document.getElementById('regPin').value.trim();

    if (!fullName || !phone || pin.length !== 4) {
        alert("Please fill all fields. PIN must be 4 digits.");
        return;
    }

    userData = { fullName, phone, pin };
    localStorage.setItem('bota_user_data', JSON.stringify(userData));
    signUpScreen.classList.add('hidden');
    loadMainApplication();
});

// Handle Login PIN
document.getElementById('btnSubmitLogin').addEventListener('click', () => {
    const enteredPin = document.getElementById('loginPin').value.trim();
    if (enteredPin === userData.pin) {
        loginScreen.classList.add('hidden');
        loadMainApplication();
    } else {
        alert("❌ Incorrect PIN!");
    }
});

function loadMainApplication() {
    mainAppContainer.classList.remove('hidden');
    document.getElementById('headerUserName').innerText = userData.fullName.split(' ')[0];
    document.getElementById('profileFullName').innerText = userData.fullName;
    document.getElementById('profilePhoneOrUsername').innerText = userData.phone;
    document.getElementById('buyerFullName').value = userData.fullName;
    document.getElementById('buyerPhone').value = userData.phone;

    // 🛡️ ቁጥርህ 0911325430 ከሆነ ብቻ የ Admin አዝራር እንዲታይ እና እንዲሰራ ያደርጋል
    if (userData.phone === ADMIN_PHONE) {
        document.getElementById('btnAdminAccess').classList.remove('hidden');
    }
}

// ==========================================
// 🛡️ 2. DYNAMIC ADMIN CONTROL SYSTEM (አዲስ)
// ==========================================
document.getElementById('btnSaveAdminChanges').addEventListener('click', () => {
    // አድሚኑ ከፎርሙ የሞላቸውን አዳዲስ እሴቶች መሰብሰብ
    appSettings.productTitle = document.getElementById('inputProdTitle').value.trim();
    appSettings.productSubtitle = document.getElementById('inputProdSubtitle').value.trim();
    appSettings.productImg = document.getElementById('inputProdImg').value.trim();
    appSettings.ticketPrice = parseInt(document.getElementById('inputProdPrice').value) || 3000;
    appSettings.daysRemaining = parseInt(document.getElementById('inputProdDays').value) || 9;

    d = appSettings.daysRemaining; // Reset countdown days

    // በዋናው ገጽ ላይ በቅጽበት መለወጥ
    updateDashboardUI();
    alert("🎯 System Settings Updated Successfully!");
    switchTab(phases[0], document.getElementById('navHome')); // Go back to Home
});

function updateDashboardUI() {
    document.getElementById('displayProductTitle').innerText = appSettings.productTitle;
    document.getElementById('displayProductSubtitle').innerText = appSettings.productSubtitle;
    document.getElementById('displayProductImg').src = appSettings.productImg;
    document.getElementById('txtPanelPriceValue').innerText = `${appSettings.ticketPrice.toLocaleString()} Birr`;
    document.getElementById('modalSummaryTitle').innerText = appSettings.productTitle;
}

// ==========================================
// 3. TRANSLATIONS DICTIONARY
// ==========================================
const translations = {
    en: {
        newBadge: "NEW", timeRemaining: "🔥 TIME REMAINING", days: "DAYS", hours: "HRS", mins: "MIN", secs: "SEC",
        ticketPriceLabel: "TICKET PRICE", chooseLuckyBtn: "🎯 Choose Your Lucky Numbers", quickPickBtn: "⚡ Quick Pick",
        selectBtn: "🛡️ Select", myTicketsTitle: "My Tickets & History", myTicketsSubtitle: "Track your lottery entries",
        lblStatActive: "Active", lblStatPending: "Pending", lblStatWon: "Won 🏆", lblStatTotal: "Total",
        txtHistoryTableHeading: "📜 Ticket Participation Logs", thRound: "Round/Item", thNumbers: "Numbers", thStatus: "Status",
        txtLatestWinnersTitle: "Latest Winners 🏆", txtNoMoreWinners: "No more winners announced yet for this week.",
        txtUserProfileTitle: "User Profile", txtUserIdentityLabel: "User Identity", nvHome: "Home", nvTickets: "Tickets",
        nvWinners: "Winners", nvProfile: "Profile"
    },
    am: {
        newBadge: "አዲስ", timeRemaining: "🔥 የቀረው ጊዜ", days: "ቀናት", hours: "ሰዓት", mins: "ደቂቃ", secs: "ሰከንድ",
        ticketPriceLabel: "የዕጣ ዋጋ", chooseLuckyBtn: "🎯 የዕድል ቁጥርህን ምረጥ", quickPickBtn: "⚡ ፈጣን ምርጫ",
        selectBtn: "🛡️ ይምረጡ", myTicketsTitle: "የእኔ ትኬቶች እና ታሪክ", myTicketsSubtitle: "የእጣ ተሳትፎዎን ይከታተሉ",
        lblStatActive: "የነቃ", lblStatPending: "በጥበቃ ላይ", lblStatWon: "ያሸነፈ 🏆", lblStatTotal: "ጠቅላላ",
        txtHistoryTableHeading: "📜 የትኬት ተሳትፎ መዝገቦች", thRound: "ዙር/ዕቃ", thNumbers: "ቁጥሮች", thStatus: "ሁኔታ",
        txtLatestWinnersTitle: "የመጨረሻ አሸናፊዎች 🏆", txtNoMoreWinners: "ለዚህ ሳምንት ተጨማሪ አሸናፊዎች አልታወጁም።",
        txtUserProfileTitle: "የተጠቃሚ መገለጫ", txtUserIdentityLabel: "የተጠቃሚ ማንነት", nvHome: "መነሻ", nvTickets: "ትኬቶች",
        nvWinners: "አሸናፊዎች", nvProfile: "መገለጫ"
    },
    om: {
        newBadge: "HAARA", timeRemaining: "🔥 YEROO HAFE", days: "GUYYAA", hours: "SA'AATII", mins: "DAQIIQAA", secs: "SEKONDII",
        ticketPriceLabel: "GATII TIKKEETTII", chooseLuckyBtn: "🎯 Lakkoofsa Kee Filadhu", quickPickBtn: "⚡ Filannoo Ariifachiisaa",
        selectBtn: "🛡️ Filadhu", myTicketsTitle: "Tikkeettii & Seenaa Koo", myTicketsSubtitle: "Hirmaannaa tikkeettii keessan hordofaa",
        lblStatActive: "Hojirra", lblStatPending: "Eeggachaa", lblStatWon: "Mo'ate 🏆", lblStatTotal: "Waliigala",
        txtHistoryTableHeading: "📜 Seenaa Tikkeettii Keessanii", thRound: "Marsaa/Meeshaa", thNumbers: "Lakkoofsota", thStatus: "Haala",
        txtLatestWinnersTitle: "Mo'attoota Dhumaa 🏆", txtNoMoreWinners: "Torban kanaaf mo'attoonni dabalataa hin beeksifamne.",
        txtUserProfileTitle: "Ibsa Fayyadamaa", txtUserIdentityLabel: "Eenyummaa Fayyadamaa", nvHome: "Ka'umsa", nvTickets: "Tikkeettii",
        nvWinners: "Mo'attoota", nvProfile: "Ibsa Koo"
    }
};

let currentLang = "en";
function applyLanguage(lang) {
    currentLang = lang; const t = translations[lang];
    document.getElementById('txtNewBadge').innerText = t.newBadge;
    document.getElementById('txtTimeRemaining').innerText = t.timeRemaining;
    document.getElementById('lblDays').innerText = t.days; document.getElementById('lblHours').innerText = t.hours;
    document.getElementById('lblMins').innerText = t.mins; document.getElementById('lblSecs').innerText = t.secs;
    document.getElementById('txtTicketPriceLabel').innerText = t.ticketPriceLabel;
    document.getElementById('chooseLuckyBtn').innerText = t.chooseLuckyBtn;
    document.getElementById('quickPickBtn').innerText = t.quickPickBtn; document.getElementById('selectBtn').innerText = t.selectBtn;
    document.getElementById('txtMyTicketsTitle').innerText = t.myTicketsTitle; document.getElementById('txtMyTicketsSubtitle').innerText = t.myTicketsSubtitle;
    document.getElementById('lblStatActive').innerText = t.lblStatActive; document.getElementById('lblStatPending').innerText = t.lblStatPending;
    document.getElementById('lblStatWon').innerText = t.lblStatWon; document.getElementById('lblStatTotal').innerText = t.lblStatTotal;
    document.getElementById('thRound').innerText = t.thRound; document.getElementById('thNumbers').innerText = t.thNumbers; document.getElementById('thStatus').innerText = t.thStatus;
    document.getElementById('txtLatestWinnersTitle').innerText = t.txtLatestWinnersTitle; document.getElementById('txtNoMoreWinners').innerText = t.txtNoMoreWinners;
    document.getElementById('txtUserProfileTitle').innerText = t.txtUserProfileTitle; document.getElementById('txtUserIdentityLabel').innerText = t.txtUserIdentityLabel;
    document.getElementById('nvHome').innerText = t.nvHome; document.getElementById('nvTickets').innerText = t.nvTickets;
    document.getElementById('nvWinners').innerText = t.nvWinners; document.getElementById('nvProfile').innerText = t.nvProfile;
}

// ==========================================
// 4. TAB ROUTER & NAVIGATION
// ==========================================
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
    renderAdminTable();
});

// Steppers
let ticketCount = 1;
document.getElementById('stepPlusBtn').addEventListener('click', () => { ticketCount++; document.getElementById('ticketCountDisplay').innerText = ticketCount; });
document.getElementById('stepMinusBtn').addEventListener('click', () => { if (ticketCount > 1) { ticketCount--; document.getElementById('ticketCountDisplay').innerText = ticketCount; } });

// ==========================================
// 5. LUCKY NUMBER GRID
// ==========================================
const numbersGrid100 = document.getElementById('numbersGrid100');
function generateTicketNumbersGrid() {
    if (numbersGrid100.children.length > 0) return;
    for (let i = 1; i <= 100; i++) {
        const cell = document.createElement('div'); cell.className = 'num-cell'; cell.innerText = i;
        cell.addEventListener('click', () => {
            const selected = document.querySelectorAll('.num-cell.selected');
            if (cell.classList.contains('selected')) { cell.classList.remove('selected'); }
            else if (selected.length < ticketCount) { cell.classList.add('selected'); }
            updateGridStatsCount();
        });
        numbersGrid100.appendChild(cell);
    }
}
function updateGridStatsCount() {
    const active = document.querySelectorAll('.status-tag.success').length;
    const pending = document.querySelectorAll('.status-tag.pending').length;
    document.getElementById('countActive').innerText = active;
    document.getElementById('countPending').innerText = pending;
    document.getElementById('countTotal').innerText = active + pending;
}

// ==========================================
// 6. PURCHASE MODAL WIZARD
// ==========================================
const purchaseModal = document.getElementById('purchaseModal');
let currentModalStep = 1;

function openModal() {
    currentModalStep = 1; updateModalStepUI();
    document.getElementById('ticketCalcLabel').innerText = `${ticketCount} Tickets × ${appSettings.ticketPrice} Birr`;
    document.getElementById('ticketTotalLabel').innerText = `${(ticketCount * appSettings.ticketPrice).toLocaleString()} Birr`;
    purchaseModal.classList.remove('hidden');
}
quickPickBtn.addEventListener('click', openModal);
selectBtn.addEventListener('click', openModal);
chooseLuckyBtn.addEventListener('click', () => { switchTab(phases[1], navTicket); generateTicketNumbersGrid(); });
closeModalBtn.addEventListener('click', () => purchaseModal.classList.add('hidden'));

document.getElementById('modalContinueBtn').addEventListener('click', () => {
    if (currentModalStep === 1) { currentModalStep = 2; updateModalStepUI(); }
    else if (currentModalStep === 2) { currentModalStep = 3; updateModalStepUI(); sendToAdminPanel(); }
    else { purchaseModal.classList.add('hidden'); }
});
document.getElementById('modalBackBtn').addEventListener('click', () => { if (currentModalStep === 2) { currentModalStep = 1; updateModalStepUI(); } });

function updateModalStepUI() {
    document.getElementById('modalStep1').classList.add('hidden'); document.getElementById('modalStep2').classList.add('hidden'); document.getElementById('modalStep3').classList.add('hidden'); document.getElementById('modalBackBtn').classList.add('hidden');
    if (currentModalStep === 1) { document.getElementById('modalStep1').classList.remove('hidden'); }
    else if (currentModalStep === 2) { document.getElementById('modalStep2').classList.remove('hidden'); document.getElementById('modalBackBtn').classList.remove('hidden'); }
    else { document.getElementById('modalStep3').classList.remove('hidden'); }
}

document.getElementById('uploadZone').addEventListener('click', () => {
    document.getElementById('uploadStatusText').innerText = "📄 Receipt_Screenshot.png attached!";
});

// ==========================================
// 7. ADMIN ACTION PROCESSING
// ==========================================
function sendToAdminPanel() {
    const selectedCells = document.querySelectorAll('.num-cell.selected');
    let numbers = []; selectedCells.forEach(c => numbers.push(c.innerText));
    if(numbers.length === 0) { for(let i=0; i<ticketCount; i++) numbers.push("QP"); }

    const tx = { user: userData.fullName, phone: userData.phone, count: ticketCount, numbers: numbers.join(', '), status: 'PENDING', item: appSettings.productTitle };
    pendingTransactions.push(tx);
    renderUserTable();
}

function renderUserTable() {
    const body = document.getElementById('historyTableBody'); body.innerHTML = "";
    pendingTransactions.forEach(tx => {
        const row = document.createElement('tr');
        let badge = `<span class="status-tag pending">PENDING</span>`;
        if(tx.status === 'APPROVED') badge = `<span class="status-tag success">ACTIVE 👍</span>`;
        if(tx.status === 'REJECTED') badge = `<span class="status-tag rejected">REJECTED ❌</span>`;
        row.innerHTML = `<td>${tx.item}</td><td><span class="badge-num">${tx.numbers}</span></td><td>${badge}</td>`;
        body.appendChild(row);
    });
    updateGridStatsCount();
}

function renderAdminTable() {
    const body = document.getElementById('adminTableBody'); body.innerHTML = "";
    if(pendingTransactions.filter(t => t.status === 'PENDING').length === 0) {
        body.innerHTML = `<tr><td colspan="3" style="text-align:center; color:#8da19c;">No pending payments</td></tr>`; return;
    }
    pendingTransactions.forEach((tx, index) => {
        if(tx.status !== 'PENDING') return;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><b>${tx.user}</b><br><span style="font-size:10px;">${tx.phone}</span></td>
            <td>${tx.count} Tix<br><span class="badge-num">${tx.numbers}</span></td>
            <td>
                <button class="admin-btn-approve" onclick="adminAction(${index}, 'APPROVED')">✓</button>
                <button class="admin-btn-reject" onclick="adminAction(${index}, 'REJECTED')">✕</button>
            </td>
        `;
        body.appendChild(row);
    });
}

window.adminAction = function(index, action) {
    pendingTransactions[index].status = action;
    renderAdminTable(); renderUserTable();
};

// Countdown Timer Logic
let d = 9, h = 9, m = 54, s = 20;
setInterval(() => {
    s--; if (s < 0) { s = 59; m--; } if (m < 0) { m = 59; h--; } if (h < 0) { h = 23; d--; }
    if (d < 0) { d = 0; h = 0; m = 0; s = 0; }
    document.getElementById('daysBox').innerText = String(d).padStart(2, '0');
    document.getElementById('hoursBox').innerText = String(h).padStart(2, '0');
    document.getElementById('minsBox').innerText = String(m).padStart(2, '0');
    document.getElementById('secsBox').innerText = String(s).padStart(2, '0');
}, 1000);
