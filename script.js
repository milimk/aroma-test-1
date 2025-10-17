let currentDate = new Date();
const today = new Date();

// Add workshops here
const workshops = [
  { date: '2025-10-20', title: 'Roll-On Serenity', location: 'Burnaby Market', dateDisplay: 'October 20th, 2025', description: 'Create your own calming roll-on blends using natural essential oils.' },
  { date: '2025-10-25', title: 'Soothing Soap Making', location: 'Community Centre', dateDisplay: 'October 25th, 2025', description: 'Learn to make gentle, natural soap bars perfect for relaxation.' },
  { date: '2025-11-02', title: 'Diffuser Blends', location: 'Local Artisan Fair', dateDisplay: 'November 2nd, 2025', description: 'Mix your own diffuser oils for a stress-free home atmosphere.' },
  { date: '2025-11-15', title: 'Stress Relief Candles', location: 'Community Hall', dateDisplay: 'November 15th, 2025', description: 'Make aromatherapy candles for home relaxation.' }
];

function toggleMenu() {
  const nav = document.querySelector('nav ul');
  nav.classList.toggle('show');
}

// Calendar rendering
function renderCalendar() {
  const calendar = document.getElementById('calendar-days');
  const detailsDiv = document.getElementById('workshop-details');
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  document.getElementById('month-year').textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  calendar.innerHTML = '';

  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement('div');
    empty.classList.add('empty');
    calendar.appendChild(empty);
  }

  for (let d = 1; d <= lastDate; d++) {
    const day = document.createElement('div');
    day.textContent = d;
    day.classList.add('day');

    // Highlight today
    if (d === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
      day.classList.add('today');
    }

    // Match workshops
    const workshop = workshops.find(w => {
      const wDate = new Date(w.date + 'T00:00:00');
      return wDate.getFullYear() === year && wDate.getMonth() === month && wDate.getDate() === d;
    });

    if (workshop) {
      day.classList.add('available');
      day.title = `${workshop.title} - ${workshop.location}`;
      day.addEventListener('click', () => {
        detailsDiv.innerHTML = `<h3>${workshop.title}</h3>@ ${workshop.location}<br>${workshop.dateDisplay}<br><br>${workshop.description}`;
      });
    }

    calendar.appendChild(day);
  }

  detailsDiv.innerHTML = '';
}

function prevMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
}

function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
}

// Gallery drag scroll
document.addEventListener('DOMContentLoaded', () => {
  renderCalendar();

  const gallery = document.querySelector('.gallery-scroll');
  let isDown = false;
  let startX;
  let scrollLeft;

  gallery.addEventListener('mousedown', (e) => {
    isDown = true;
    gallery.classList.add('active');
    startX = e.pageX - gallery.offsetLeft;
    scrollLeft = gallery.scrollLeft;
  });

  gallery.addEventListener('mouseleave', () => {
    isDown = false;
    gallery.classList.remove('active');
  });

  gallery.addEventListener('mouseup', () => {
    isDown = false;
    gallery.classList.remove('active');
  });

  gallery.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - gallery.offsetLeft;
    const walk = (x - startX) * 2;
    gallery.scrollLeft = scrollLeft - walk;
  });

  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you! Your message has been sent.');
    form.reset();
  });
});

// How to make the contact form functional
// Go to https://formspree.io
// Sign up for free and create a form.
// You’ll get a unique form endpoint like this:
// https://formspree.io/f/mwkdjezz
// Replace the action value in your HTML:
// <form action="https://formspree.io/f/mwkdjezz" method="POST">
// Save and deploy your site — submissions will go to your email.