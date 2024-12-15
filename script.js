// Constants
const rows = 7; // Regular rows
const eliteRows = 5; // Elite rows
const eliteCols = 10; // Elite cols
const cols = 8; // Columns in each row
const seatRowLabels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const seatCost = 200; // Regular seat cost
const eliteSeatCost = 250; // Elite seat cost

// DOM Elements
const seatsLeftContainer = document.getElementById('seats-left');
const seatsRightContainer = document.getElementById('seats-right');
const eliteSeatsContainer = document.getElementById('elite-seats');
const selectedSeatsText = document.getElementById('selected-seats');
const totalAmountText = document.getElementById('total-amount');
const finalSummary = document.getElementById('final-summary');
const bookSeatsButton = document.getElementById('book-seats');

// Seat Data
let seats = [];

// Initialize regular seat data
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    seats.push({
      id: `${seatRowLabels[i]}-${j + 1}`,
      status: Math.random() < 0.2 ? 'booked' : 'available', // Randomly book ~20% seats
      type: 'regular',
    });
  }
}

// Initialize elite seat data
for (let i = rows; i < rows + eliteRows; i++) {
  for (let j = 0; j < cols; j++) {
    seats.push({
      id: `${seatRowLabels[i]}-${j + 1}`,
      status: Math.random() < 0.2 ? 'booked' : 'available', // Randomly book ~20% seats
      type: 'elite',
    });
  }
}

// Render seats
function renderSeats() {
  const seatsLeftContainer = document.getElementById('seats-left');
  const seatsRightContainer = document.getElementById('seats-right');
  const eliteSeatsContainer = document.getElementById('elite-seats');
  seatsLeftContainer.innerHTML = '';
  seatsRightContainer.innerHTML = '';
  eliteSeatsContainer.innerHTML = '';

  seats.forEach((seat, index) => {
    const seatElement = document.createElement('div');
    seatElement.classList.add('seat', seat.status);
    if (seat.type === 'elite') seatElement.classList.add('elite');
    seatElement.setAttribute('data-id', seat.id);

    if (seat.status === 'available' || seat.status === 'selected') {
      seatElement.addEventListener('click', () => toggleSeatSelection(seat.id));
    }

    if (seat.type === 'elite') {
      eliteSeatsContainer.appendChild(seatElement);
    } else if (index % cols < cols / 2) {
      seatsLeftContainer.appendChild(seatElement);
    } else {
      seatsRightContainer.appendChild(seatElement);
    }
  });
}

// Toggle seat selection
function toggleSeatSelection(seatId) {
  const seat = seats.find((s) => s.id === seatId);

  if (seat.status === 'available') {
    seat.status = 'selected';
  } else if (seat.status === 'selected') {
    seat.status = 'available';
  }

  updateSummary();
  renderSeats();
}

// Update summary
function updateSummary() {
  const selectedSeats = seats.filter((seat) => seat.status === 'selected');
  const totalAmount = selectedSeats.reduce(
    (sum, seat) => sum + (seat.type === 'elite' ? eliteSeatCost : seatCost),
    0
  );

  selectedSeatsText.textContent = `Selected Seats: ${
    selectedSeats.map((seat) => seat.id).join(', ') || 'None'
  }`;
  totalAmountText.textContent = `Total Amount: Rs. ${totalAmount}`;
}

// Book seats
// Book seats
function bookSeats() {
  const selectedSeats = seats.filter((seat) => seat.status === 'selected');

  if (selectedSeats.length === 0) {
    alert('Please select at least one seat to book.');
    return;
  }

  selectedSeats.forEach((seat) => (seat.status = 'booked'));

  finalSummary.textContent = `Seats Booked: ${
    selectedSeats.map((seat) => seat.id).join(', ')
  } for Rs. ${
    selectedSeats.reduce(
      (sum, seat) => sum + (seat.type === 'elite' ? eliteSeatCost : seatCost),
      0
    )
  }`;

  finalSummary.style.fontSize = '30px'; // Set font size for final summary
  finalSummary.style.fontWeight = 'bold'; // Make text bold
  finalSummary.style.color = '#00bcd4';

  renderSeats(); // Re-render seats instantly
  updateSummary();
}


// Initialize application
document.getElementById("book-seats").addEventListener("click", bookSeats);
renderSeats();

