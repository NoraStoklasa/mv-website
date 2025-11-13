// Ensure mobile menus close when a link is clicked or when clicking away
document.addEventListener('DOMContentLoaded', () => {
  /**
   * Attach click handlers to links so they close a checkbox-controlled menu.
   * @param {string} toggleId - The checkbox input controlling visibility
   * @param {string} linkSelector - Selector for all links that should close the menu
   */
  function attachMenuAutoClose(toggleId, linkSelector) {
    const toggle = document.getElementById(toggleId)
    if (!toggle) return

    document.querySelectorAll(linkSelector).forEach((link) => {
      link.addEventListener('click', () => {
        if (toggle.checked) toggle.checked = false
      })
    })
    return toggle
  }

  // Header: close when any nav or language link is clicked
  const mobileMenuToggle = attachMenuAutoClose(
    'mobile-menu-toggle',
    '.nav__list a, .language-select a'
  )

  // Footer: close when any footer link is clicked
  attachMenuAutoClose('footer-menu-toggle', '.footer__nav a')

  // Close header menu when clicking around the burger area (same behaviour as before)
  const mobileMenuIcon = document.querySelector('.mobile-menu-icon')
  if (mobileMenuIcon && mobileMenuToggle) {
    mobileMenuIcon.addEventListener('click', (e) => {
      if (e.target === mobileMenuIcon && mobileMenuToggle.checked) {
        const rect = mobileMenuIcon.getBoundingClientRect()
        const clickX = e.clientX
        // If click is far from the icon, treat as outside and close
        if (clickX < rect.left - 50 || clickX > rect.right + 50) {
          mobileMenuToggle.checked = false
        }
      }
    })
  }
})
