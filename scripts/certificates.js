// Certificate lightbox functionality
document.addEventListener('DOMContentLoaded', () => {
  // Create lightbox element
  const lightbox = document.createElement('div')
  lightbox.className = 'certificate-lightbox'
  lightbox.innerHTML = `
    <button class="certificate-lightbox-close" aria-label="Close">&times;</button>
    <img src="" alt="Certificate expanded view">
  `
  document.body.appendChild(lightbox)

  const lightboxImg = lightbox.querySelector('img')
  const closeBtn = lightbox.querySelector('.certificate-lightbox-close')

  // Add click event to all certificate images
  const certificateImages = document.querySelectorAll('.certificate-img')
  certificateImages.forEach((img) => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src
      lightboxImg.alt = img.alt
      lightbox.classList.add('active')
      document.body.style.overflow = 'hidden' // Prevent scrolling
    })
  })

  // Close lightbox on click
  const closeLightbox = () => {
    lightbox.classList.remove('active')
    document.body.style.overflow = '' // Restore scrolling
  }

  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation()
    closeLightbox()
  })

  lightbox.addEventListener('click', closeLightbox)

  // Prevent closing when clicking the image itself
  lightboxImg.addEventListener('click', (e) => {
    e.stopPropagation()
  })

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox()
    }
  })
})
