// Tab Elements
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

// Multi-Step Purchase Modal Elements
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

// Home Interactive Controls
const stepMinusBtn = document.getElementById('stepMinusBtn');
const stepPlusBtn = document.getElementById('stepPlusBtn');
const ticketCountDisplay = document.getElementById('ticketCountDisplay');
const chooseLuckyBtn = document.getElementById('chooseLuckyBtn');
const quickPickBtn = document.getElementById('quickPickBtn');
const selectBtn = document.getElementById('selectBtn');

// Uploading Control Inputs
const uploadZone = document.getElementById('uploadZone');
const fileInputControl = document.getElementById('fileInputControl');
const uploadStatusText = document.getElementById('uploadStatusText');

// Ticket State counters
const countActive = document.getElementById('countActive');
const countPending = document.getElementById('countPending');
const countTotal = document.getElementById('countTotal');
const numbersGrid100 = document.getElementById('numbersGrid100');

let ticketCount = 1;
const pricePerTicket = 3000;
let currentModalStep = 1;

// Navigation tab functionality
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

// Stepper Logic for tickets count incrementation
stepPlusBtn.addEventListener('click', () => {
    ticketCount++;
    ticketCountDisplay.innerText = ticketCount;
});

stepMinusBtn.addEventListener('click', () => {
    if (ticketCount > 1) {
        ticketCount--;
        ticketCountDisplay.innerText = ticketCount;
    }
});

// Triggering the purchase workflows step overlay popups
function openPurchaseModalWorkflow() {
    currentModalStep = 1;
    updateModalStepUI();
    
    // Dynamic recalculations for summary cards inside modal step 1
    const totalCost = ticketCount * pricePerTicket;
    document.getElementById('ticketCalcLabel').innerText = `${ticketCount} Tickets × 3,000 Birr`;
    document.getElementById('ticketTotalLabel').innerText = `${totalCost.toLocaleString()} Birr`;
    
    purchaseModal.classList.remove('hidden');
}

quickPickBtn.addEventListener('click', openPurchaseModalWorkflow);
chooseLuckyBtn.addEventListener('click', () => {
    switchTab(ticketPhase, navTicket);
    generateTicketNumbersGrid();
});
selectBtn.addEventListener('click', openPurchaseModalWorkflow);

closeModalBtn.addEventListener('click', () => purchaseModal.classList.add('hidden'));

// Control flows inside purchasing step wizard modal overlays
modalContinueBtn.addEventListener('click', () => {
    if (currentModalStep === 1) {
        currentModalStep = 2;
        updateModalStepUI();
    } else if (currentModalStep === 2) {
        currentModalStep = 3;
        updateModalStepUI();
        
        // Simulating receipt validation status updates to Ticket tab layout counter state
        countPending.innerText = ticketCount;
        countTotal.innerText = ticketCount;
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

// Updating rendering classes visually inside purchase dialog flow steps
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
        modalStepLabel.innerText = "Step 1 of 3";
        modalContinueBtn.innerHTML = "Continue &rsaquo;";
    } else if (currentModalStep === 2) {
        modalStep2.classList.remove('hidden');
        modalBackBtn.classList.remove('hidden');
        stepLine1.classList.add('active');
        stepLine2.classList.add('active');
        modalStepLabel.innerText = "Step 2 of 3";
        modalContinueBtn.innerHTML = "Continue &rsaquo;";
    } else if (currentModalStep === 3) {
        modalStep3.classList.remove('hidden');
        stepLine1.classList.add('active');
        stepLine2.classList.add('active');
        stepLine3.classList.add('active');
        modalStepLabel.innerText = "Step 3 of 3";
        modalContinueBtn.innerHTML = "Done ✓";
    }
}

// Emulating screenshot uploading features trigger clicks
uploadZone.addEventListener('click', () => fileInputControl.click());
fileInputControl.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        uploadStatusText.innerText = `📄 ${e.target.files[0].name} selected successfully!`;
    }
});

// Generating ticket numbers sequence cells 1 to 100 dynamically
function generateTicketNumbersGrid() {
    if (numbersGrid100.children.length > 0) return;
    for (let i = 1; i <= 100; i++) {
        const cell = document.createElement('div');
        cell.className = 'num-cell';
        cell.innerText = i;
        cell.addEventListener('click', () => {
            cell.classList.toggle('selected');
            const selectedCount = document.querySelectorAll('.num-cell.selected').length;
            countActive.innerText = selectedCount;
            countTotal.innerText = selectedCount + parseInt(countPending.innerText);
        });
        numbersGrid100.appendChild(cell);
    }
}

// Product countdown live clock configuration setup
let d = 9, h = 9, m = 54, s = 20;
setInterval(() => {
    s--;
    if (s < 0) { s = 59; m--; }
    if (m < 0) { m = 59; h--; }
    if (h < 0) { h = 23; d--; }
    if (d < 0) { d = 0; h = 0; m = 0; s = 0; }

    document.getElementById('daysBox').innerText = String(d).padStart(2, '0');
    document.getElementById('hoursBox').innerText = String(h).padStart(2, '0');
    document.getElementById('minsBox').innerText = String(m).padStart(2, '0');
    document.getElementById('secsBox').innerText = String(s).padStart(2, '0');
}, 1000);
