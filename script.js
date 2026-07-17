// DOM Elements Setup
const homePhase = document.getElementById('homePhase');
const ticketPhase = document.getElementById('ticketPhase');
const winnersPhase = document.getElementById('winnersPhase');
const profilePhase = document.getElementById('profilePhase');

const navHome = document.getElementById('navHome');
const navTicket = document.getElementById('navTicket');
const navWinners = document.getElementById('navWinners');
const navProfile = document.getElementById('navProfile');

const homeBuyTicketBtn = document.getElementById('homeBuyTicketBtn');
const randomPickBtn = document.getElementById('randomPickBtn');
const numbersGrid100 = document.getElementById('numbersGrid100');

const countActive = document.getElementById('countActive');
const countPending = document.getElementById('countPending');
const countTotal = document.getElementById('countTotal');

const phases = [homePhase, ticketPhase, winnersPhase, profilePhase];
const navItems = [navHome, navTicket, navWinners, navProfile];

// Tab Swapper implementation 
function switchTab(targetPhase, activeNav) {
    phases.forEach(phase => phase.classList.add('hidden'));
    navItems.forEach(item => item.classList.remove('active'));
    targetPhase.classList.remove('hidden');
    activeNav.classList.add('active');
}

navHome.addEventListener('click', () => switchTab(homePhase, navHome));
navTicket.addEventListener('click', () => {
    switchTab(ticketPhase, navTicket);
    generateNumbersGrid(); // Generate 1-100 squares dynamically
});
navWinners.addEventListener('click', () => switchTab(winnersPhase, navWinners));
navProfile.addEventListener('click', () => switchTab(profilePhase, navProfile));

// Redirect click action button from home straight to tickets grid
homeBuyTicketBtn.addEventListener('click', () => {
    switchTab(ticketPhase, navTicket);
    generateNumbersGrid();
});

// Dynamic generator for numbers grid (1 to 100 customer entries)
function generateNumbersGrid() {
    if (numbersGrid100.children.length > 0) return; // Prevent duplicate generation
    
    for (let i = 1; i <= 100; i++) {
        const cell = document.createElement('div');
        cell.className = 'num-cell';
        cell.innerText = i;
        
        cell.addEventListener('click', () => {
            // Toggle selection layout highlight
            document.querySelectorAll('.num-cell').forEach(c => c.classList.remove('selected'));
            cell.classList.add('selected');
            updateTicketStats(1);
            alert(`Selected Ticket Number: ${i}. Processing status...`);
        });
        
        numbersGrid100.appendChild(cell);
    }
}

// Random Generator for Customer Selections 
randomPickBtn.addEventListener('click', () => {
    const totalCells = 100;
    const luckyNum = Math.floor(Math.random() * totalCells) + 1;
    
    document.querySelectorAll('.num-cell').forEach(c => c.classList.remove('selected'));
    
    const allCells = numbersGrid100.children;
    if(allCells.length > 0) {
        allCells[luckyNum - 1].classList.add('selected');
        allCells[luckyNum - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    updateTicketStats(1);
    alert(`🎲 Randomly picked Lucky Ticket Number: ${luckyNum}`);
});

function updateTicketStats(activeCount) {
    countActive.innerText = activeCount;
    countTotal.innerText = parseInt(countActive.innerText) + parseInt(countPending.innerText);
}

// Global Live countdown setup countdown clock for car product
let days = 9, hours = 10, minutes = 9, seconds = 50;
setInterval(() => {
    seconds--;
    if (seconds < 0) { seconds = 59; minutes--; }
    if (minutes < 0) { minutes = 59; hours--; }
    if (hours < 0) { hours = 23; days--; }
    if (days < 0) { days = 0; hours = 0; minutes = 0; seconds = 0; }

    document.getElementById('daysBox').innerText = String(days).padStart(2, '0');
    document.getElementById('hoursBox').innerText = String(hours).padStart(2, '0');
    document.getElementById('minsBox').innerText = String(minutes).padStart(2, '0');
    document.getElementById('secsBox').innerText = String(seconds).padStart(2, '0');
}, 1000);

// Basic logout feature
document.getElementById('logoutBtn').addEventListener('click', () => {
    alert("Profile logging out...");
});
