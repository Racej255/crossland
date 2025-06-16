// --- JS extracted from both HTML files ---

// Gallery functionality
var galleryImages = [
  "gallery/camp.png",
  "gallery/Gambling.png",
  "gallery/house.png",
  "gallery/gala.png"
];
var currentGalleryIndex = 0;

function openLightbox(event, src) {
  event.stopPropagation();
  currentGalleryIndex = galleryImages.indexOf(src);
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
  document.body.style.overflow = 'auto';
}

function nextGalleryImage(event) {
  event.stopPropagation();
  currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
  document.getElementById('lightbox-img').src = galleryImages[currentGalleryIndex];
}

function prevGalleryImage(event) {
  event.stopPropagation();
  currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
  document.getElementById('lightbox-img').src = galleryImages[currentGalleryIndex];
}

// History toggle
function toggleHistory() {
  var historyContent = document.getElementById('historyContent');
  historyContent.style.display =
    historyContent.style.display === 'block' ? 'none' : 'block';
}

// Soup modal
function openSoupModal() {
  var soupModal = document.getElementById('soupModal');
  soupModal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeSoupModal(event) {
  if (event) event.stopPropagation();
  document.getElementById('soupModal').style.display = 'none';
  document.body.style.overflow = 'auto';
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.back-to-top').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  document.getElementById('soupModal').addEventListener('click', closeSoupModal);
});
