const timedPopup = document.getElementById('timedPopup');
const closeTimedBtn = document.getElementById('closeTimedBtn');
const acceptOfferBtn = document.getElementById('acceptOfferBtn');

const popupClosed = localStorage.getItem('timedPopupClosed');

if (!popupClosed) {
  setTimeout(() => {
    timedPopup.classList.add('active');
    document.body.style.overflow = 'hidden';
  }, 30000);
}

closeTimedBtn.addEventListener('click', closeTimedPopup);
timedPopup.addEventListener('click', (e) => {
  if (e.target === timedPopup) {
    closeTimedPopup();
  }
});

acceptOfferBtn.addEventListener('click', () => {
  alert('Спасибо за интерес к нашему предложению!');
  closeTimedPopup();
});

function closeTimedPopup() {
  timedPopup.classList.remove('active');
  document.body.style.overflow = '';
  localStorage.setItem('timedPopupClosed', 'true');
}