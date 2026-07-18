// ==========================================
// 1. TELEGRAM WEBAPP API INITIALIZATION
// ==========================================
const tg = window.Telegram ? window.Telegram.WebApp : null;

let currentUserName = "Getachew Fikadu Jirata";
let currentUserPhone = "251978893232";

if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
    const user = tg.initDataUnsafe.user;
    currentUserName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || "Telegram User";
    if (user.username) {
        currentUserPhone = "@" + user.username;
    }
    tg.ready();
    tg.expand();
}

// ==========================================
// 2. COMPLETE DICTIONARY FOR MULTI-LANGUAGE TRANSLATION
// ==========================================
const translations = {
    en: {
        premiumBadge: "Premium User", newBadge: "NEW", promoSubtitle: "Time Grey Edition",
        timeRemaining: "🔥 TIME REMAINING", days: "DAYS", hours: "HRS", mins: "MIN", secs: "SEC",
        soldLabel: "1,676 sold", filledPercent: "48% filled", ticketPriceLabel: "TICKET PRICE",
        chooseLuckyBtn: "🎯 Choose Your Lucky Numbers", quickPickBtn: "⚡ Quick Pick", selectBtn: "🛡️ Select",
        myTicketsTitle: "My Tickets & History", myTicketsSubtitle: "Track your lottery entries and winning history",
        btnSearch: "🔍 Search", lblStatActive: "Active", lblStatPending: "Pending", lblStatWon: "Won 🏆", lblStatTotal: "Total",
        txtGridSelectionHeading: "Select Your Lucky Numbers (Max: {max})",
        txtHistoryTableHeading: "📜 Ticket Participation Logs", thRound: "Round/Item", thNumbers: "Numbers", thStatus: "Status",
        txtLatestWinnersTitle: "Latest Winners 🏆", txtNoMoreWinners: "No more winners announced yet for this week.",
        txtUserProfileTitle: "User Profile", txtUserIdentityLabel: "User Identity",
        nvHome: "Home", nvTickets: "Tickets", nvWinners: "Winners", nvProfile: "Profile",
        txtModalTitleHeading: "Complete Your Purchase", lblFullNameField: "Full Name", lblPhoneField: "Phone Number / Contact",
        lblUploadReceiptHeading: "Proof of Payment", lblDropzoneTitle: "Upload Payment Receipt", lblDropzoneSub: "PNG, JPG up to 10MB",
        lblSenderAccountField: "Sender Account Number (Optional)", lblWarningNoticeText: "After transferring the money, upload your payment receipt or transaction screenshot.",
        lblSuccessHeading: "Submission Successful!", lblSuccessSub: "Your payment proof has been uploaded. Administrators will verify it and activate your ticket shortly.",
        btnContinue: "Continue &rsaquo;", btnBack: "Back", btnDone: "Done ✓"
    },
    am: {
        premiumBadge: "ልዩ ተጠቃሚ", newBadge: "አዲስ", promoSubtitle: "ታይም ግሬይ እትም",
        timeRemaining: "🔥 የቀረው ጊዜ", days: "ቀናት", hours: "ሰዓት", mins: "ደቂቃ", secs: "ሰከንድ",
        soldLabel: "1,676 ተሽጧል", filledPercent: "48% ተሞልቷል", ticketPriceLabel: "የዕጣ ዋጋ",
        chooseLuckyBtn: "🎯 የዕድል ቁጥርህን ምረጥ", quickPickBtn: "⚡ ፈጣን ምርጫ", selectBtn: "🛡️ ይምረጡ",
        myTicketsTitle: "የእኔ ትኬቶች እና ታሪክ", myTicketsSubtitle: "የእጣ ተሳትፎዎን እና የማሸነፍ ታሪክዎን ይከታተሉ",
        btnSearch: "🔍 ፈልግ", lblStatActive: "የነቃ", lblStatPending: "በጥበቃ ላይ", lblStatWon: "ያሸነፈ 🏆", lblStatTotal: "ጠቅላላ",
        txtGridSelectionHeading: "የዕድል ቁጥሮችዎን ይምረጡ (ከፍተኛ: {max})",
        txtHistoryTableHeading: "📜 የትኬት ተሳትፎ መዝገቦች", thRound: "ዙር/ዕቃ", thNumbers: "ቁጥሮች", thStatus: "ሁኔታ",
        txtLatestWinnersTitle: "የመጨረሻ አሸናፊዎች 🏆", txtNoMoreWinners: "ለዚህ ሳምንት ተጨማሪ አሸናፊዎች አልታወጁም።",
        txtUserProfileTitle: "የተጠቃሚ መገለጫ", txtUserIdentityLabel: "የተጠቃሚ ማንነት",
        nvHome: "መነሻ", nvTickets: "ትኬቶች", nvWinners: "አሸናፊዎች", nvProfile: "መገለጫ",
        txtModalTitleHeading: "ግዢዎን ያጠናቅቁ", lblFullNameField: "ሙሉ ስም", lblPhoneField: "የስልክ ቁጥር / አድራሻ",
        lblUploadReceiptHeading: "የክፍያ ማረጋገጫ", lblDropzoneTitle: "የክፍያ ደረሰኝ ይስቀሉ", lblDropzoneSub: "PNG, JPG እስከ 10MB",
        lblSenderAccountField: "የላኪ ሂሳብ ቁጥር (አማራጭ)", lblWarningNoticeText: "ገንዘቡን ካስተላለፉ በኋላ የክፍያ ደረሰኝዎን ወይም የግብይት ስክሪንሾትዎን ይስቀሉ::",
        lblSuccessHeading: "በተሳካ ሁኔታ ተልኳል!", lblSuccessSub: "የክፍያ ማረጋገጫዎ ተሰቅሏል። አስተዳዳሪዎች አረጋግጠው ትኬትዎን በቅርቡ ያነቃቁታል።",
        btnContinue: "ቀጥል &rsaquo;", btnBack: "ተመለስ", btnDone: "ተጠናቀቀ ✓"
    },
    om: {
        premiumBadge: "Fayyadamaa Addaa", newBadge: "HAARA", promoSubtitle: "Maxxansa Diimilaa",
        timeRemaining: "🔥 YEROO HAFE", days: "GUYYAA", hours: "SA'AATII", mins: "DAQIIQAA", secs: "SEKONDII",
        soldLabel: "1,676 gurgurame", filledPercent: "48% guutame", ticketPriceLabel: "GATII TIKKEETTII",
        chooseLuckyBtn: "🎯 Lakkoofsa Kee Filadhu", quickPickBtn: "⚡ Filannoo Ariifachiisaa", selectBtn: "🛡️ Filadhu",
        myTicketsTitle: "Tikkeettii & Seenaa Koo", myTicketsSubtitle: "Hirmaannaa tikkeettii fi seenaa injifannoo keessan hordofaa",
        btnSearch: "🔍 Barbaadi", lblStatActive: "Hojirra", lblStatPending: "Eeggachaa", lblStatWon: "Mo'ate 🏆", lblStatTotal: "Waliigala",
        txtGridSelectionHeading: "Lakkoofsa Carraa Keessan Filadhaa (Max: {max})",
        txtHistoryTableHeading: "📜 Seenaa Tikkeettii Keessanii", thRound: "Marsaa/Meeshaa", thNumbers: "Lakkoofsota", thStatus: "Haala",
        txtLatestWinnersTitle: "Mo'attoota Dhumaa 🏆", txtNoMoreWinners: "Torban kanaaf mo'attoonni dabalataa hin beeksifamne.",
        txtUserProfileTitle: "Ibsa Fayyadamaa", txtUserIdentityLabel: "Eenyummaa Fayyadamaa",
        nvHome: "Ka'umsa", nvTickets: "Tikkeettii", nvWinners: "Mo'attoota", nvProfile: "Ibsa Koo",
        txtModalTitleHeading: "Bitannaa Keessan Xumuraa", lblFullNameField: "Maqaa Guutuu", lblPhoneField: "Lakk Bilbilaa / Quunnamtii",
        lblUploadReceiptHeading: "Ragaa Kaffaltii", lblDropzoneTitle: "Nagahee Kaffaltii Olfe'i", lblDropzoneSub: "PNG, JPG hanga 10MB",
        lblSenderAccountField: "Lakk Herrega Ergitootaa (Filannoo)", lblWarningNoticeText: "Erga maallaqa dabarsitani dhumatee booda, nagahee kaffaltii ykn fakkii kaffaltii olfe'aa.",
        lblSuccessHeading: "Milkiidhaan Ergameera!", lblSuccessSub: "Ragaan kaffaltii keessan olfe'ameera. Bulchitoonni mirkaneessanii tikkeettii keessan dhiheenyatti ni banu.",
        btnContinue: "Itti Fufi &rsaquo;", btnBack: "Deebi'i", btnDone: "Xumurame ✓"
    }
};

let currentLang = "en";

// Function to apply translation across UI elements dynamically
function applyLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];
    
    document.getElementById('txtPremiumBadge').innerText = t.premiumBadge;
    document.getElementById('txtNewBadge').innerText = t.newBadge;
    document.getElementById('txtPromoSubtitle').innerText = t.promoSubtitle;
    document.getElementById('txtTimeRemaining').innerText = t.timeRemaining;
    
    document.getElementById('lblDays').innerText = t.days;
    document.getElementById('lblHours').innerText = t.hours;
    document.getElementById('lblMins').innerText = t.mins;
    document.getElementById('lblSecs').innerText = t.secs;
    
    document.getElementById('txtSoldLabel').innerText = t.soldLabel;
    document.getElementById('txtFilledPercent').innerText = t.filledPercent;
    document.getElementById('txtTicketPriceLabel').innerText = t.ticketPriceLabel;
    
    document.getElementById('chooseLuckyBtn').innerText = t.chooseLuckyBtn;
    document.getElementById('quickPickBtn').innerText = t.quickPickBtn;
    document.getElementById('selectBtn').innerText = t.selectBtn;
    
    document.getElementById('txtMyTicketsTitle').innerText = t.myTicketsTitle;
    document.getElementById('txtMyTicketsSubtitle').innerText = t.myTicketsSubtitle;
    document.getElementById('btnSearch').innerText = t.btnSearch;
    
    document.getElementById('lblStatActive').innerText = t.lblStatActive;
    document.getElementById('lblStatPending').innerText = t.lblStatPending;
    document.getElementById('lblStatWon').innerText = t.lblStatWon;
    document.getElementById('lblStatTotal').innerText = t.lblStatTotal;
    
    updateGridHeading();
    
    document.getElementById('txtHistoryTableHeading').innerText = t.txtHistoryTableHeading;
    document.getElementById('thRound').innerText = t.thRound;
    document.getElementById('thNumbers').innerText = t.thNumbers;
    document.getElementById('thStatus').innerText = t.thStatus;
    
    document.getElementById('txtLatestWinnersTitle').innerText = t.txtLatestWinnersTitle;
    document.getElementById('txtNoMoreWinners').innerText = t.txtNoMoreWinners;
    document.getElementById('txtUserProfileTitle').innerText = t.txtUserProfileTitle;
    document.getElementById('txtUserIdentityLabel').innerText = t.txtUserIdentityLabel;
    
    document.getElementById('nvHome').innerText = t.nvHome;
    document.getElementById('nvTickets').innerText = t.nvTickets;
    document.getElementById('nvWinners').innerText = t.nvWinners;
    document.getElementById('nvProfile').innerText = t.nvProfile;
    
    document.getElementById('txtModalTitleHeading').innerText = t.txtModalTitleHeading;
    document.getElementById('lblFullNameField').innerText = t.lblFullNameField;
    document.getElementById('lblPhoneField').innerText = t.lblPhoneField;
    document.getElementById('lblUploadReceiptHeading').innerText = t.lblUploadReceiptHeading;
    document.getElementById('lblDropzoneTitle').innerText = t.lblDropzoneTitle;
    document.getElementById('lblDropzoneSub').innerText = t.lblDropzoneSub;
    document.getElementById('lblSenderAccountField').innerText = t.lblSenderAccountField;
    document.getElementById('lblWarningNoticeText').innerText = t.lblWarningNoticeText;
    document.getElementById('lblSuccessHeading').innerText = t.lblSuccessHeading;
    document.getElementById('lblSuccessSub').innerText = t.lblSuccessSub;
    
    updateModalButtonsUI();
}

function updateGridHeading() {
    const headingText = translations[currentLang].txtGridSelectionHeading;
    document.getElementById('txtGridSelectionHeading').innerHTML = headingText.replace("{max}", `<span id="lblMaxAllowed">${ticketCount}</span>`);
}

// ==========================================
// 3. DOM ELEMENTS SELECTORS
// ==========================================
const homePhase = document.getElementById('homePhase');
const ticketPhase = document.getElementById('ticketPhase');
const winnersPhase = document.getElementById('winnersPhase');
const profilePhase = document.getElementById('profilePhase');

const navHome = document.getElementById('navHome');
const navTicket = document.getElementById('navTicket');
const navWinners = document.getElementById('navWinners');
const navProfile = document.getElementById('navProfile');

const phases = [homePhase, ticketPhase, winnersPhase, profilePhase];
const navItems = [navHome, navTicket, navWinners, navProfile];

// Multi-Step Modal Controls
const purchaseModal = document.getElementById('purchaseModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalContinueBtn = document.getElementById('modalContinueBtn');
const modalBackBtn = document.getElementById('modalBackBtn');

const modalStep1 = document.getElementById('modalStep1');
const modalStep2 = document.getElementById('modalStep2');
const modalStep3 = document.getElementById('modalStep3');

const stepLine1 = document.getElementById('stepLine1');
const stepLine2 = document.getElementById('stepLine2');
const stepLine3 = document.getElementById('stepLine3');
const modalStepLabel = document.getElementById('modalStepLabel');

// Stepper and Quick Controls
const stepMinusBtn = document.getElementById('stepMinusBtn');
const stepPlusBtn = document.getElementById('stepPlusBtn');
const ticketCountDisplay = document.getElementById('ticketCountDisplay');
const chooseLuckyBtn = document.getElementById('chooseLuckyBtn');
const quickPickBtn = document.getElementById('quickPickBtn');
const selectBtn = document.getElementById('selectBtn');

// Upload Systems
const uploadZone = document.getElementById('uploadZone');
const fileInputControl = document.getElementById('fileInputControl');
const uploadStatusText = document.getElementById('uploadStatusText');

// Logic States
let ticketCount = 1;
const pricePerTicket = 3000;
let currentModalStep = 1;

// ==========================================
// 4. INITIALIZATION & DATA SYNC ON LOAD
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // Language Dropdown Event Listener
    document.getElementById('langSelect').addEventListener('change', (e) => {
        applyLanguage(e.target.value);
    });

    // Populate user profile info dynamically
    const headerNameEl = document.getElementById('headerUserName');
    if (headerNameEl) headerNameEl.innerText = currentUserName.split(' ')[0];

    document.getElementById('profileFullName').innerText = currentUserName;
    document.getElementById('profilePhoneOrUsername').innerText = currentUserPhone;
    document.getElementById('copyrightName').innerText = currentUserName;
    document.getElementById('buyerFullName').value = currentUserName;
    document.getElementById('buyerPhone').value = currentUserPhone;

    // Apply default language
    applyLanguage("en");
});

// ==========================================
// 5. NAVIGATION SYSTEMS
// ==========================================
function switchTab(targetPhase, activeNav) {
    phases.forEach(phase => phase.classList.add('hidden'));
    navItems.forEach(item => item.classList.remove('active'));
    targetPhase.classList.remove('hidden');
    activeNav.classList.add('active');
}

navHome.addEventListener('click', () => switchTab(homePhase, navHome));
navTicket.addEventListener('click', () => {
    switchTab(ticketPhase, navTicket);
    generateTicketNumbersGrid();
});
navWinners.addEventListener('click', () => switchTab(winnersPhase, navWinners));
navProfile.addEventListener('click', () => switchTab(profilePhase, navProfile));

// Stepper Up / Down Functions
stepPlusBtn.addEventListener('click', () => {
    ticketCount++;
    ticketCountDisplay.innerText = ticketCount;
    updateGridHeading();
});

stepMinusBtn.addEventListener('click', () => {
    if (ticketCount > 1) {
        ticketCount--;
        ticketCountDisplay.innerText = ticketCount;
        updateGridHeading();
        resetGridSelectionIfOverlimit();
    }
});

// ==========================================
// 6. ENHANCED LUCKY NUMBER GRID WITH SELECTION LIMITS
// ==========================================
const numbersGrid100 = document.getElementById('numbersGrid100');
const countActive = document.getElementById('countActive');
const countPending = document.getElementById('countPending');
const countTotal = document.getElementById('countTotal');
const gridWarningMessage = document.getElementById('gridWarningMessage');

function generateTicketNumbersGrid() {
    if (numbersGrid100.children.length > 0) return;
    for (let i = 1; i <= 100; i++) {
        const cell = document.createElement('div');
        cell.className = 'num-cell';
        cell.innerText = i;
        cell.addEventListener('click', () => {
            const selectedCells = document.querySelectorAll('.num-cell.selected');
            if (cell.classList.contains('selected')) {
                cell.classList.remove('selected');
                gridWarningMessage.classList.add('hidden');
            } else {
                if (selectedCells.length < ticketCount) {
                    cell.classList.add('selected');
                    gridWarningMessage.classList.add('hidden');
                } else {
                    gridWarningMessage.classList.remove('hidden');
                }
            }
            updateGridStatsCount();
        });
        numbersGrid100.appendChild(cell);
    }
}

function resetGridSelectionIfOverlimit() {
    const selectedCells = document.querySelectorAll('.num-cell.selected');
    if (selectedCells.length > ticketCount) {
        selectedCells.forEach(cell => cell.classList.remove('selected'));
        gridWarningMessage.classList.add('hidden');
    }
    updateGridStatsCount();
}

function updateGridStatsCount() {
    const selectedCount = document.querySelectorAll('.num-cell.selected').length;
    countActive.innerText = selectedCount;
    // Count total based on active + 1 won static item
    countTotal.innerText = selectedCount + parseInt(countPending.innerText) + 1;
}

// ==========================================
// 7. MULTI-STEP MODAL WORKFLOW
// ==========================================
function openPurchaseModalWorkflow() {
    currentModalStep = 1;
    updateModalStepUI();
    
    const totalCost = ticketCount * pricePerTicket;
    document.getElementById('ticketCalcLabel').innerText = `${ticketCount} Tickets × 3,000 Birr`;
    document.getElementById('ticketTotalLabel').innerText = `${totalCost.toLocaleString()} Birr`;
    
    purchaseModal.classList.remove('hidden');
}

quickPickBtn.addEventListener('click', openPurchaseModalWorkflow);
selectBtn.addEventListener('click', openPurchaseModalWorkflow);
chooseLuckyBtn.addEventListener('click', () => {
    switchTab(ticketPhase, navTicket);
    generateTicketNumbersGrid();
});

closeModalBtn.addEventListener('click', () => purchaseModal.classList.add('hidden'));

modalContinueBtn.addEventListener('click', () => {
    if (currentModalStep === 1) {
        currentModalStep = 2;
        updateModalStepUI();
    } else if (currentModalStep === 2) {
        currentModalStep = 3;
        updateModalStepUI();
        
        // Push newly purchased records into dynamic view table history logs
        appendSelectedTicketsToHistoryLogs();
    } else if (currentModalStep === 3) {
        purchaseModal.classList.add('hidden');
    }
});

modalBackBtn.addEventListener('click', () => {
    if (currentModalStep === 2) {
        currentModalStep = 1;
        updateModalStepUI();
    }
});

function appendSelectedTicketsToHistoryLogs() {
    const selectedCells = document.querySelectorAll('.num-cell.selected');
    let numbersText = [];
    selectedCells.forEach(c => numbersText.push(c.innerText));
    
    if(numbersText.length === 0) {
        for(let a=0; a < ticketCount; a++) { numbersText.push("Auto"); }
    }

    countPending.innerText = ticketCount;
    updateGridStatsCount();

    const historyTableBody = document.getElementById('historyTableBody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>Round #13 (BYD Yuan)</td>
        <td><span class="badge-num">${numbersText.join(', ')}</span></td>
        <td><span class="status-tag pending">PENDING</span></td>
    `;
    historyTableBody.insertBefore(newRow, historyTableBody.firstChild);
}

function updateModalStepUI() {
    modalStep1.classList.add('hidden');
    modalStep2.classList.add('hidden');
    modalStep3.classList.add('hidden');
    modalBackBtn.classList.add('hidden');
    
    stepLine1.classList.remove('active');
    stepLine2.classList.remove('active');
    stepLine3.classList.remove('active');

    if (currentModalStep === 1) {
        modalStep1.classList.remove('hidden');
        stepLine1.classList.add('active');
        modalStepLabel.innerText = currentLang === "am" ? "ደረጃ 1 ከ 3" : (currentLang === "om" ? "Tarkaanfii 1 keessaa 3" : "Step 1 of 3");
    } else if (currentModalStep === 2) {
        modalStep2.classList.remove('hidden');
        modalBackBtn.classList.remove('hidden');
        stepLine1.classList.add('active');
        stepLine2.classList.add('active');
        modalStepLabel.innerText = currentLang === "am" ? "ደረጃ 2 ከ 3" : (currentLang === "om" ? "Tarkaanfii 2 keessaa 3" : "Step 2 of 3");
    } else if (currentModalStep === 3) {
        modalStep3.classList.remove('hidden');
        stepLine1.classList.add('active');
        stepLine2.classList.add('active');
        stepLine3.classList.add('active');
        modalStepLabel.innerText = currentLang === "am" ? "ደረጃ 3 ከ 3" : (currentLang === "om" ? "Tarkaanfii 3 keessaa 3" : "Step 3 of 3");
    }
    updateModalButtonsUI();
}

function updateModalButtonsUI() {
    const t = translations[currentLang];
    modalBackBtn.innerText = t.btnBack;
    if (currentModalStep === 3) {
        modalContinueBtn.innerHTML = t.btnDone;
    } else {
        modalContinueBtn.innerHTML = t.btnContinue;
    }
}

// Upload Emulation Trigger Interface
uploadZone.addEventListener('click', () => fileInputControl.click());
fileInputControl.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        uploadStatusText.innerText = `📄 ${e.target.files[0].name} selected!`;
    }
});

// ==========================================
// 8. TICKER LIVE COUNTDOWN WATCHER
// ==========================================
let d = 9, h = 9, m = 54, s = 20;
const countdownInterval = setInterval(() => {
    s--;
    if (s < 0) { s = 59; m--; }
    if (m < 0) { m = 59; h--; }
    if (h < 0) { h = 23; d--; }
    
    if (d < 0) { 
        clearInterval(countdownInterval);
        d = 0; h = 0; m = 0; s = 0;
        document.getElementById('txtTimeRemaining').innerText = currentLang === "am" ? "🔥 ጊዜው አብቅቷል!" : (currentLang === "om" ? "🔥 YEROON RAWWATE!" : "🔥 TIME EXPIRED!");
    }

    document.getElementById('daysBox').innerText = String(d).padStart(2, '0');
    document.getElementById('hoursBox').innerText = String(h).padStart(2, '0');
    document.getElementById('minsBox').innerText = String(m).padStart(2, '0');
    document.getElementById('secsBox').innerText = String(s).padStart(2, '0');
}, 1000);
