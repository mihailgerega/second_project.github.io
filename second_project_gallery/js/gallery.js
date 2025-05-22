const galleryItems = document.querySelectorAll('.gallery-item');
const galleryPopup = document.getElementById('galleryPopup');
const popupImage = document.getElementById('popupImage');
const closeGalleryBtn = document.getElementById('closeGalleryBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentImageIndex = 0;
const totalImages = galleryItems.length;

galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    const imgSrc = item.querySelector('img').src;
    openGalleryPopup(imgSrc, index);
  });
});

closeGalleryBtn.addEventListener('click', closeGalleryPopup);
galleryPopup.addEventListener('click', (e) => {
  if (e.target === galleryPopup) {
    closeGalleryPopup();
  }
});

prevBtn.addEventListener('click', showPreviousImage);
nextBtn.addEventListener('click', showNextImage);

document.addEventListener('keydown', (e) => {
  if (!galleryPopup.classList.contains('active')) return;
  
  if (e.key === 'Escape') {
    closeGalleryPopup();
  } else if (e.key === 'ArrowLeft') {
    showPreviousImage();
  } else if (e.key === 'ArrowRight') {
    showNextImage();
  }
});

function openGalleryPopup(imgSrc, index) {
  popupImage.src = imgSrc;
  currentImageIndex = index;
  galleryPopup.classList.add('active');
  document.body.style.overflow = 'hidden';
  updateNavigationButtons();
}

function closeGalleryPopup() {
  galleryPopup.classList.remove('active');
  document.body.style.overflow = '';
}

function showPreviousImage() {
  if (currentImageIndex > 0) {
    currentImageIndex--;
    const prevImgSrc = galleryItems[currentImageIndex].querySelector('img').src;
    popupImage.src = prevImgSrc;
    updateNavigationButtons();
  }
}

function showNextImage() {
  if (currentImageIndex < totalImages - 1) {
    currentImageIndex++;
    const nextImgSrc = galleryItems[currentImageIndex].querySelector('img').src;
    popupImage.src = nextImgSrc;
    updateNavigationButtons();
  }
}

function updateNavigationButtons() {
  if (currentImageIndex === 0) {
    prevBtn.classList.add('hidden');
  } else {
    prevBtn.classList.remove('hidden');
  }
  if (currentImageIndex === totalImages - 1) {
    nextBtn.classList.add('hidden');
  } else {
    nextBtn.classList.remove('hidden');
  }
}
