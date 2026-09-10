// Open Booking Modal
function openModal(doctorName = '') {
  const modal = document.getElementById('bookingModal');
  const formView = document.getElementById('bookingFormView');
  const receiptView = document.getElementById('confirmationView');
  const doctorInput = document.getElementById('doctorName');

  if (modal) {
    // Modal open karein
    modal.style.display = 'flex';
    
    // Har bar click karne par Form dikhayein aur Purani Receipt HIDE karein
    if (formView) formView.style.display = 'block';
    if (receiptView) receiptView.style.display = 'none';

    // Doctor ka naam field mein set karein
    if (doctorInput) {
      doctorInput.value = doctorName || 'General Consultation';
    }
  }
}

// Close Modal
function closeModal() {
  document.getElementById('bookingModal').style.display = 'none';
}

// Filter Doctors Live Search
function filterDoctors() {
  let input = document.getElementById('searchInput').value.toLowerCase();
  let cards = document.getElementsByClassName('doctor-card');

  for (let card of cards) {
    let name = card.getElementsByTagName('h3')[0].innerText.toLowerCase();
    let specialty = card.getAttribute('data-specialty').toLowerCase();

    if (name.includes(input) || specialty.includes(input)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  }
}

// Save Appointment to LocalStorage
// Save Appointment & Show Receipt Slip
function saveAppointment(e) {
  e.preventDefault();
  
  const doctor = document.getElementById('doctorName').value;
  const patient = document.getElementById('patientName').value;
  const date = document.getElementById('appDate').value;

  if (!patient || !date) {
    alert('Please fill in all fields!');
    return;
  }

  // Unique Booking ID generate karne ke liye
  const randomID = '#CP-' + Math.floor(1000 + Math.random() * 9000);

  const appointment = { doctor, patient, date, bookingId: randomID };

  // LocalStorage mein save karna
  let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
  appointments.push(appointment);
  localStorage.setItem('appointments', JSON.stringify(appointments));

  // Receipt HTML elements mein data insert karna
  document.getElementById('resDoctor').innerText = doctor;
  document.getElementById('resPatient').innerText = patient;
  document.getElementById('resDate').innerText = date;
  document.getElementById('resId').innerText = randomID;

  // Alert popup ki jagah Receipt Display karna
  document.getElementById('bookingFormView').style.display = 'none';
  document.getElementById('confirmationView').style.display = 'block';
  
  // Form reset karna
  document.getElementById('appointmentForm').reset();
}
// My Appointments Link Click Handler
function openAppointmentsModal() {
  const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
  
  if (appointments.length === 0) {
    alert('Aap ki koi booking saved nahi hai.');
    return;
  }

  let listText = "--- YOUR APPOINTMENTS ---\n\n";
  appointments.forEach((app, index) => {
    listText += `${index + 1}. Patient: ${app.patient} | Doctor: ${app.doctor} | Date: ${app.date}\n`;
  });

  alert(listText);
}
// Open Appointments Modal with Professional Cards
function openAppointmentsModal() {
  const modal = document.getElementById('myAppointmentsModal');
  const container = document.getElementById('appointmentsList');
  const appointments = JSON.parse(localStorage.getItem('appointments')) || [];

  container.innerHTML = '';

  if (appointments.length === 0) {
    container.innerHTML = '<p class="no-bookings">No appointments booked yet.</p>';
  } else {
    appointments.forEach((app, index) => {
      const card = document.createElement('div');
      card.className = 'appointment-card-item';
      card.innerHTML = `
        <div class="app-id">${app.bookingId || '#CP-' + (1000 + index)}</div>
        <div class="app-row">
          <span>Patient:</span>
          <strong>${app.patient}</strong>
        </div>
        <div class="app-row">
          <span>Doctor:</span>
          <strong>${app.doctor}</strong>
        </div>
        <div class="app-row">
          <span>Date:</span>
          <strong>${app.date}</strong>
        </div>
      `;
      container.appendChild(card);
    });
  }

  if (modal) {
    modal.style.display = 'flex';
  }
}

// Close Appointments Modal
function closeAppointmentsModal() {
  const modal = document.getElementById('myAppointmentsModal');
  if (modal) {
    modal.style.display = 'none';
  }
}