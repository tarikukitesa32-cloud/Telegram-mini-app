// ==========================================
// 1. STATE & LOCALSTORAGE AUTHENTICATION
// ==========================================
let userData = JSON.parse(localStorage.getItem('bota_user_data')) || null;
let pendingTransactions = []; // Holds requests sent to admin in memory for demo

// Elements
const signUpScreen = document.getElementById('signUpScreen');
const loginScreen = document.getElementById('loginScreen');
const mainAppContainer = document.getElementById('mainAppContainer');

document.addEventListener("DOMContentLoaded", () => {
    initAuthFlow();
    
    // Language Dropdown
    document.getElementById('langSelect').addEventListener('change', (e) => {
        applyLanguage(e.target.value);
    });
    applyLanguage("en");
});

function initAuthFlow() {
    if (!userData) {
        // No account found -> Show Sign Up Screen
        signUpScreen.classList.remove('hidden');
        loginScreen.classList.add('hidden');
        mainAppContainer.classList.add('hidden');
    } else {
        // Account exists -> Show PIN Login Screen
        signUpScreen.classList.add('hidden');
        loginScreen.classList.remove('hidden');
        mainAppContainer.classList.add('hidden');
    }
}

// Handle Sign Up
document.getElementById('btnSubmitRegister').addEventListener('click', () => {
    const fullName = document.getElementById('regFullName').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const pin = document.getElementById('regPin').value.trim();

    if (!fullName || !phone || pin.length !== 4) {
        alert("Please fill all fields correctly. PIN must be 4 digits.");
        return;
    }

    userData = { fullName, phone, pin };
    localStorage.setItem('bota_user_data', JSON.stringify(userData));
    
    signUpScreen.classList.add('hidden');
    loadMainApplication();
});

// Handle Login PIN Verification
document.getElementById('btnSubmitLogin').addEventListener('click', () => {
    const enteredPin = document.getElementById('loginPin').value.trim();
    
    if (enteredPin === userData.pin) {
        loginScreen.classList.add('hidden');
        loadMainApplication();
    } else {
        alert("❌ Incorrect PIN! Please try again.");
        document.getElementById('loginPin').value = "";
    }
});

function loadMainApplication() {
    mainAppContainer.classList.remove('hidden');
    
    // Sync User Interface Data
    document.getElementById('headerUserName').innerText = userData.fullName.split(' ')[0];
    document.getElementById('profileFullName').innerText = userData.fullName;
    document.getElementById('profilePhoneOrUsername').innerText = userData.phone;
    
    document.getElementById('buyerFullName').value = userData.fullName;
    document.getElementById('buyerPhone').value = userData.phone;
}

// ==========================================
// 2. MULTI-LANGUAGE TRANSLATION DICTIONARY
// ==========================================
const translations = {
    en: {
        newBadge: "NEW", promoSubtitle: "Time Grey Edition", timeRemaining: "🔥 TIME REMAINING",
        days: "DAYS", hours: "HRS", mins: "MIN", secs: "SEC", soldLabel: "1,676 sold",
        filledPercent: "48% filled", ticketPriceLabel: "TICKET PRICE", chooseLuckyBtn: "🎯 Choose Your Lucky Numbers",
        quickPickBtn: "⚡ Quick Pick", selectBtn: "🛡️ Select", myTicketsTitle: "My Tickets & History",
        myTicketsSubtitle: "Track your lottery entries", lblStatActive: "Active", lblStatPending: "Pending",
        lblStatWon: "Won 🏆", lblStatTotal: "Total", txtGridSelectionHeading: "Select Your Lucky Numbers (Max: {max})",
        txtHistoryTableHeading: "📜 Ticket Participation Logs", thRound: "Round/Item", thNumbers: "Numbers", thStatus: "Status",
        txtLatestWinnersTitle: "Latest Winners 🏆", txtNoMoreWinners: "No more winners announced yet for this week.",
        txtUserProfileTitle: "User Profile", txtUserIdentityLabel: "User Identity", nvHome: "Home", nvTickets: "Tickets",
        nvWinners: "Winners", nvProfile: "Profile", txtModalTitleHeading: "Complete Your Purchase", lblFullNameField: "Full Name",
        lblPhoneField: "Phone Number", lblUploadReceiptHeading: "Proof of Payment", lblDropzoneTitle: "Upload Payment Receipt",
        lblDropzoneSub: "Click to simulate upload", lblSuccessHeading: "Submitted to Admin!",
        lblSuccessSub: "Your payment verification request is sent to the Admin panel for approval.", btnContinue: "Continue &rsaquo;", btnBack: "Back", btnDone: "Done ✓"
    },
    am: {
        newBadge: "አዲስ", promoSubtitle: "ታይም ግሬይ እትም", timeRemaining: "🔥 የቀረው ጊዜ",
        days: "ቀናት", hours: "ሰዓት", mins: "ደቂቃ", secs: "ሰከንድ", soldLabel: "1,676 ተሽጧል",
        filledPercent: "48% ተሞልቷል", ticketPriceLabel: "የዕጣ ዋጋ", chooseLuckyBtn: "🎯 የዕድል ቁጥርህን ምረጥ",
        quickPickBtn: "⚡ ፈጣን ምርጫ", selectBtn: "🛡️ ይምረጡ", myTicketsTitle: "የእኔ ትኬቶች እና ታሪክ",
        myTicketsSubtitle: "የእጣ ተሳትፎዎን ይከታተሉ", lblStatActive: "የነቃ", lblStatPending: "በጥበቃ ላይ",
        lblStatWon: "ያሸነፈ 🏆", lblStatTotal: "ጠቅላላ", txtGridSelectionHeading: "የዕድል ቁጥሮችዎን ይምረጡ (ከፍተኛ: {max})",
        txtHistoryTableHeading: "📜 የትኬት ተሳትፎ መዝገቦች", thRound: "ዙር/ዕቃ", thNumbers: "ቁጥሮች", thStatus: "ሁኔታ",
        txtLatestWinnersTitle: "የመጨረሻ አሸናፊዎች 🏆", txtNoMoreWinners: "ለዚህ ሳምንት ተጨማሪ አሸናፊዎች አልታወጁም።",
        txtUserProfileTitle: "የተጠቃሚ መገለጫ", txtUserIdentityLabel: "የተጠቃሚ ማንነት", nvHome: "መነሻ", nvTickets: "ትኬቶች",
        nvWinners: "አሸናፊዎች", nvProfile: "መገለጫ", txtModalTitleHeading: "ግዢዎን ያጠናቅቁ", lblFullNameField: "ሙሉ ስም",
        lblPhoneField: "የስልክ ቁጥር", lblUploadReceiptHeading: "የክፍያ ማረጋገጫ", lblDropzoneTitle: "የክፍያ ደረሰኝ ይስቀሉ",
        lblDropzoneSub: "ለመስቀል እዚህ ይጫኑ", lblSuccessHeading: "ለአድሚን ተልኳል!",
        lblSuccessSub: "የክፍያ ማረጋገጫ ጥያቄዎ ለማጽደቅ ወደ አድሚን ዳሽቦርድ ተልኳል።", btnContinue: "ቀጥል &rsaquo;", btnBack: "ተመለስ", btnDone: "ተጠናቀቀ ✓"
    },
    om: {
        newBadge: "HAARA", promoSubtitle: "Maxxansa Diimilaa", timeRemaining: "🔥 YEROO HAFE",
        days: "GUYYAA", hours: "SA'AATII", mins: "DAQIIQAA", secs: "SEKONDII", soldLabel: "1,676 gurgurame",
        filledPercent: "48% guutame", ticketPriceLabel: "GATII TIKKEETTII", chooseLuckyBtn: "🎯 Lakkoofsa Kee Filadhu",
        quickPickBtn: "⚡ Filannoo Ariifachiisaa", selectBtn: "🛡️ Filadhu", myTicketsTitle: "Tikkeettii & Seenaa Koo",
        myTicketsSubtitle: "Hirmaannaa tikkeettii keessan hordofaa", lblStatActive: "Hojirra", lblStatPending: "Eeggachaa",
        lblStatWon: "Mo'ate 🏆", lblStatTotal: "Waliigala", txtGridSelectionHeading: "Lakkoofsa Carraa Keessan Filadhaa (Max: {max})",
        txtHistoryTableHeading: "📜 Seenaa Tikkeettii Keessanii", thRound: "Marsaa/Meeshaa", thNumbers: "Lakkoofsota", thStatus: "Haala",
        txtLatestWinnersTitle: "Mo'attoota Dhumaa 🏆", txtNoMoreWinners: "Torban kanaaf mo'attoonni dabalataa hin beeksifamne.",
        txtUserProfileTitle: "Ibsa Fayyadamaa", txtUserIdentityLabel: "Eenyummaa Fayyadamaa", nvHome: "Ka'umsa", nvTickets: "Tikkeettii",
        nvWinners: "Mo'attoota", nvProfile: "Ibsa Koo", txtModalTitleHeading: "Bitannaa Keessan Xumuraa", lblFullNameField: "Maqaa Guutuu",
        lblPhoneField: "Lakk Bilbilaa", lblUploadReceiptHeading: "Ragaa Kaffaltii", lblDropzoneTitle: "Nagahee Kaffaltii Olfe'i",
        lblDropzoneSub: "Olfe'uuf as tuqi", lblSuccessHeading: "Eegama Jira!",
        lblSuccessSub: "Ragaan kaffaltii keessan mirkaneessaaf gara bulchiinsaatti ergameera.", btnContinue: "Itti Fufi &rsaquo;", btnBack: "Deebi'i", btnDone: "Xumurame ✓"
    }
};

let currentLang = "en";
function applyLanguage(lang) {
    currentLang = lang; const t = translations[lang];
    document.getElementById('txtNewBadge').innerText = t.newBadge;
    document.getElementById('txtPromoSubtitle').innerText = t.promoSubtitle;
    document.getElementById('txtTimeRemaining').innerText = t.timeRemaining;
    document.getElementById('lblDays').innerText = t.days; document.getElementById('lblHours').innerText = t.hours;
    document.getElementById('lblMins').innerText = t.mins; document.getElementById('lblSecs').innerText = t.secs;
    document.getElementById('txtSoldLabel').innerText = t.soldLabel; document.getElementById('txtFilledPercent').innerText = t.filledPercent;
    document.getElementById('txtTicketPriceLabel').innerText = t.ticketPriceLabel;
    document.getElementById('chooseLuckyBtn').innerText = t.chooseLuckyBtn;
    document.getElementById('quickPickBtn').innerText = t.quickPickBtn; document.getElementById('selectBtn').innerText = t.selectBtn;
    document.getElementById('txtMyTicketsTitle').innerText = t.myTicketsTitle; document.getElementById('txtMyTicketsSubtitle').innerText = t.myTicketsSubtitle;
    document.getElementById('lblStatActive').innerText = t.lblStatActive; document.getElementById('lblStatPending').innerText = t.lblStatPending;
    document.getElementById('lblStatWon').innerText = t.lblStatWon; document.getElementById('lblStatTotal').innerText = t.lblStatTotal;
    updateGridHeading();
    document.getElementById('txtHistoryTableHeading').innerText = t.txtHistoryTableHeading;
    document.getElementById('thRound').innerText = t.thRound; document.getElementById('thNumbers').innerText = t.thNumbers; document.getElementById('thStatus').innerText = t.thStatus;
    document.getElementById('txtLatestWinnersTitle').innerText = t.txtLatestWinnersTitle; document.getElementById('txtNoMoreWinners').innerText = t.txtNoMoreWinners;
    document.getElementById('txtUserProfileTitle').innerText = t.txtUserProfileTitle; document.getElementById('txtUserIdentityLabel').innerText = t.txtUserIdentityLabel;
    document.getElementById('nvHome').innerText = t.nvHome; document.getElementById('nvTickets').innerText = t.nvTickets;
    document.getElementById('nvWinners').innerText = t.nvWinners; document.getElementById('nvProfile').innerText = t.nvProfile;
    document.getElementById('txtModalTitleHeading').innerText = t.txtModalTitleHeading; document.getElementById('lblFullNameField').innerText = t.lblFullNameField;
    document.getElementById('lblPhoneField').innerText = t.lblPhoneField; document.getElementById('lblUploadReceiptHeading').innerText = t.lblUploadReceiptHeading;
    document.getElementById('lblDropzoneTitle').innerText = t.lblDropzoneTitle; document.getElementById('lblDropzoneSub').innerText = t.lblDropzoneSub;
    document.getElementById('lblSuccessHeading').innerText = t.lblSuccessHeading; document.getElementById('lblSuccessSub').innerText = t.lblSuccessSub;
    updateModalButtonsUI();
}
function updateGridHeading() {
    document.getElementById('txtGridSelectionHeading').innerHTML = translations[currentLang].txtGridSelectionHeading.replace("{max}", `<span id="lblMaxAllowed">${ticketCount}</span>`);
}

// ==========================================
// 3. TAB ROUTER & NAVIGATION
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

// Admin Toggle Button
document.getElementById('btnAdminAccess').addEventListener('click', () => {
    switchTab(document.getElementById('adminPhase'), null);
    renderAdminTable();
});

// Steppers
let ticketCount = 1; const pricePerTicket = 3000;
document.getElementById('stepPlusBtn').addEventListener('click', () => { ticketCount++; document.getElementById('ticketCountDisplay').innerText = ticketCount; updateGridHeading(); });
document.getElementById('stepMinusBtn').addEventListener('click', () => { if (ticketCount > 1) { ticketCount--; document.getElementById('ticketCountDisplay').innerText = ticketCount; updateGridHeading(); resetGridSelectionIfOverlimit(); } });

// ==========================================
// 4. LUCKY NUMBER GRID
// ==========================================
const numbersGrid100 = document.getElementById('numbersGrid100');
function generateTicketNumbersGrid() {
    if (numbersGrid100.children.length > 0) return;
    for (let i = 1; i <= 100; i++) {
        const cell = document.createElement('div'); cell.className = 'num-cell'; cell.innerText = i;
        cell.addEventListener('click', () => {
            const selected = document.querySelectorAll('.num-cell.selected');
            if (cell.classList.contains('selected')) {
                cell.classList.remove('selected');
            } else if (selected.length < ticketCount) {
                cell.classList.add('selected');
            } else {
                document.getElementById('gridWarningMessage').classList.remove('hidden');
                setTimeout(() => document.getElementById('gridWarningMessage').classList.add('hidden'), 2000);
            }
            updateGridStatsCount();
        });
        numbersGrid100.appendChild(cell);
    }
}
function resetGridSelectionIfOverlimit() {
    document.querySelectorAll('.num-cell.selected').forEach(c => c.classList.remove('selected'));
    updateGridStatsCount();
}
function updateGridStatsCount() {
    const active = document.querySelectorAll('.status-tag.success').length;
    const pending = document.querySelectorAll('.status-tag.pending').length;
    document.getElementById('countActive').innerText = active;
    document.getElementById('countPending').innerText = pending;
    document.getElementById('countTotal').innerText = active + pending;
}

// ==========================================
// 5. PURCHASE MODAL WIZARD & ADMIN WORKFLOW
// ==========================================
const purchaseModal = document.getElementById('purchaseModal');
let currentModalStep = 1;

function openModal() {
    currentModalStep = 1; updateModalStepUI();
    document.getElementById('ticketCalcLabel').innerText = `${ticketCount} Tickets × 3,000 Birr`;
    document.getElementById('ticketTotalLabel').innerText = `${(ticketCount * pricePerTicket).toLocaleString()} Birr`;
    purchaseModal.classList.remove('hidden');
}
document.getElementById('quickPickBtn').addEventListener('click', openModal);
document.getElementById('selectBtn').addEventListener('click', openModal);
document.getElementById('chooseLuckyBtn').addEventListener('click', () => { switchTab(phases[1], navTicket); generateTicketNumbersGrid(); });
document.getElementById('closeModalBtn').addEventListener('click', () => purchaseModal.classList.add('hidden'));

document.getElementById('modalContinueBtn').addEventListener('click', () => {
    if (currentModalStep === 1) { currentModalStep = 2; updateModalStepUI(); }
    else if (currentModalStep === 2) {
        currentModalStep = 3; updateModalStepUI();
        sendToAdminPanel();
    } else { purchaseModal.classList.add('hidden'); }
});
document.getElementById('modalBackBtn').addEventListener('click', () => { if (currentModalStep === 2) { currentModalStep = 1; updateModalStepUI(); } });

function updateModalStepUI() {
    document.getElementById('modalStep1').classList.add('hidden'); document.getElementById('modalStep2').classList.add('hidden'); document.getElementById('modalStep3').classList.add('hidden'); document.getElementById('modalBackBtn').classList.add('hidden');
    document.getElementById('stepLine1').classList.remove('active'); document.getElementById('stepLine2').classList.remove('active'); document.getElementById('stepLine3').classList.remove('active');
    if (currentModalStep === 1) { document.getElementById('modalStep1').classList.remove('hidden'); document.getElementById('stepLine1').classList.add('active'); document.getElementById('modalStepLabel').innerText = "Step 1 of 3"; }
    else if (currentModalStep === 2) { document.getElementById('modalStep2').classList.remove('hidden'); document.getElementById('modalBackBtn').classList.remove('hidden'); document.getElementById('stepLine1').classList.add('active'); document.getElementById('stepLine2').classList.add('active'); document.getElementById('modalStepLabel').innerText = "Step 2 of 3"; }
    else { document.getElementById('modalStep3').classList.remove('hidden'); document.getElementById('stepLine1').classList.add('active'); document.getElementById('stepLine2').classList.add('active'); document.getElementById('stepLine3').classList.add('active'); document.getElementById('modalStepLabel').innerText = "Success"; }
    updateModalButtonsUI();
}
function updateModalButtonsUI() {
    document.getElementById('modalBackBtn').innerText = translations[currentLang].btnBack;
    document.getElementById('modalContinueBtn').innerHTML = (currentModalStep === 3) ? translations[currentLang].btnDone : translations[currentLang].btnContinue;
}

// Dropzone simulation
document.getElementById('uploadZone').addEventListener('click', () => {
    document.getElementById('uploadStatusText').innerText = "📄 Receipt_Screenshot.png uploaded successfully!";
});

// ==========================================
// 6. ADMIN SYSTEM CORE LOGIC
// ==========================================
function sendToAdminPanel() {
    const selectedCells = document.querySelectorAll('.num-cell.selected');
    let numbers = []; selectedCells.forEach(c => numbers.push(c.innerText));
    if(numbers.length === 0) { for(let i=0; i<ticketCount; i++) numbers.push("QP"); }

    const txId = Math.floor(1000 + Math.random() * 9000);
    const tx = { id: txId, user: userData.fullName, phone: userData.phone, count: ticketCount, numbers: numbers.join(', '), status: 'PENDING' };
    
    pendingTransactions.push(tx);
    renderUserTable();
}

function renderUserTable() {
    const body = document.getElementById('historyTableBody');
    body.innerHTML = "";
    pendingTransactions.forEach(tx => {
        const row = document.createElement('tr');
        let statusBadge = `<span class="status-tag pending">PENDING</span>`;
        if(tx.status === 'APPROVED') statusBadge = `<span class="status-tag success">ACTIVE 👍</span>`;
        if(tx.status === 'REJECTED') statusBadge = `<span class="status-tag rejected">REJECTED ❌</span>`;
        
        row.innerHTML = `<td>Round #13 (BYD)</td><td><span class="badge-num">${tx.numbers}</span></td><td>${statusBadge}</td>`;
        body.appendChild(row);
    });
    updateGridStatsCount();
}

function renderAdminTable() {
    const body = document.getElementById('adminTableBody');
    body.innerHTML = "";
    if(pendingTransactions.length === 0) { body.innerHTML = `<tr><td colspan="3" style="text-align:center; color:#8da19c;">No pending payments</td></tr>`; return; }

    pendingTransactions.forEach((tx, index) => {
        if(tx.status !== 'PENDING') return;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><b>${tx.user}</b><br><span style="font-size:10px; color:#8da19c;">${tx.phone}</span></td>
            <td>${tx.count} Tix<br><span class="badge-num">${tx.numbers}</span></td>
            <td>
                <button class="admin-btn-approve" onclick="adminAction(${index}, 'APPROVED')">Approve</button>
                <button class="admin-btn-reject" onclick="adminAction(${index}, 'REJECTED')">Reject</button>
            </td>
        `;
        body.appendChild(row);
    });
}

window.adminAction = function(index, action) {
    pendingTransactions[index].status = action;
    alert(`Transaction has been ${action.toLowerCase()}!`);
    renderAdminTable();
    renderUserTable();
};

// Countdown
let d = 9, h = 9, m = 54, s = 20;
setInterval(() => {
    s--; if (s < 0) { s = 59; m--; } if (m < 0) { m = 59; h--; } if (h < 0) { h = 23; d--; }
    if (d < 0) { d = 0; h = 0; m = 0; s = 0; }
    document.getElementById('daysBox').innerText = String(d).padStart(2, '0');
    document.getElementById('hoursBox').innerText = String(h).padStart(2, '0');
    document.getElementById('minsBox').innerText = String(m).padStart(2, '0');
    document.getElementById('secsBox').innerText = String(s).padStart(2, '0');
}, 1000);
