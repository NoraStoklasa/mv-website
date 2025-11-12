// Close mobile menu when a navigation link is clicked
document.addEventListener('DOMContentLoaded', function () {
  // Header mobile menu
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle')
  const navLinks = document.querySelectorAll('.nav__list a, .language-select a')

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (mobileMenuToggle && mobileMenuToggle.checked) {
        mobileMenuToggle.checked = false
      }
    })
  })

  // Footer mobile menu
  const footerMenuToggle = document.getElementById('footer-menu-toggle')
  const footerLinks = document.querySelectorAll('.footer__nav a')

  footerLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (footerMenuToggle && footerMenuToggle.checked) {
        footerMenuToggle.checked = false
      }
    })
  })

  // Close menu when clicking outside (on overlay)
  const mobileMenuIcon = document.querySelector('.mobile-menu-icon')
  if (mobileMenuIcon) {
    mobileMenuIcon.addEventListener('click', (e) => {
      // Only handle clicks on the overlay pseudo-element area
      if (e.target === mobileMenuIcon && mobileMenuToggle.checked) {
        const rect = mobileMenuIcon.getBoundingClientRect()
        const clickX = e.clientX

        // If click is far from the burger icon itself, close menu
        if (clickX < rect.left - 50 || clickX > rect.right + 50) {
          mobileMenuToggle.checked = false
        }
      }
    })
  }
})
