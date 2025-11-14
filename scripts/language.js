// Language switcher with localStorage support
// Default language: English

const LANGUAGES = {
  EN: 'en',
  CS: 'cs',
}

const DEFAULT_LANGUAGE = LANGUAGES.EN

// Get current language from URL path
function getCurrentLanguage() {
  const path = window.location.pathname
  if (path.includes('/cs/')) return LANGUAGES.CS
  if (path.includes('/en/')) return LANGUAGES.EN
  return null
}

// Get stored language preference from localStorage
function getStoredLanguage() {
  return localStorage.getItem('preferredLanguage')
}

// Store language preference in localStorage
function setStoredLanguage(lang) {
  localStorage.setItem('preferredLanguage', lang)
}

// Get the page name from current URL (e.g., 'index', 'about', 'services')
function getCurrentPage() {
  const path = window.location.pathname
  const fileName = path.split('/').pop() || 'index.html'
  // Extract page name without language suffix and extension
  // e.g., 'index.en.html' or 'index.cs.html' -> 'index'
  return fileName.split('.')[0]
}

// Switch to specified language
function switchLanguage(targetLang) {
  const currentPage = getCurrentPage()
  const currentLang = getCurrentLanguage()

  // Don't reload if already on correct language
  if (currentLang === targetLang) {
    setStoredLanguage(targetLang)
    return
  }

  // Build new URL
  const newPath = `/${targetLang}/${currentPage}.${targetLang}.html`

  // Store preference
  setStoredLanguage(targetLang)

  // Navigate to new language version
  window.location.href = newPath
}

// Check if user should be redirected based on stored preference
function checkLanguagePreference() {
  const currentLang = getCurrentLanguage()
  const storedLang = getStoredLanguage()

  // If no stored preference, set current or default
  if (!storedLang) {
    setStoredLanguage(currentLang || DEFAULT_LANGUAGE)

    // If not on any language path, redirect to default
    if (!currentLang) {
      const currentPage = getCurrentPage()
      window.location.href = `/${DEFAULT_LANGUAGE}/${currentPage}.${DEFAULT_LANGUAGE}.html`
    }
    return
  }

  // If stored preference differs from current language, redirect
  if (currentLang && storedLang !== currentLang) {
    const currentPage = getCurrentPage()
    window.location.href = `/${storedLang}/${currentPage}.${storedLang}.html`
  }

  // If not on any language path, redirect to stored preference
  if (!currentLang) {
    const currentPage = getCurrentPage()
    window.location.href = `/${storedLang}/${currentPage}.${storedLang}.html`
  }
}

// Set up language selector links (called after header is loaded)
function initLanguageSelector() {
  const languageLinks = document.querySelectorAll('.language-select a')

  languageLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      const targetLang = link.getAttribute('href').substring(1) // Remove '#'
      switchLanguage(targetLang)
    })
  })

  // Highlight active language
  const currentLang = getCurrentLanguage()
  languageLinks.forEach((link) => {
    const linkLang = link.getAttribute('href').substring(1)
    if (linkLang === currentLang) {
      link.classList.add('active')
      link.setAttribute('aria-current', 'true')
    }
  })
}

// Initialize language switcher on page load
document.addEventListener('DOMContentLoaded', () => {
  // Check and apply language preference
  checkLanguagePreference()

  // Wait for header to be loaded, then set up language selector
  // Use MutationObserver to detect when header is added
  const observer = new MutationObserver((mutations, obs) => {
    const languageSelect = document.querySelector('.language-select')
    if (languageSelect) {
      initLanguageSelector()
      obs.disconnect()
    }
  })

  // Start observing
  const headerPlaceholder = document.getElementById('header-placeholder')
  if (headerPlaceholder) {
    observer.observe(headerPlaceholder, {
      childList: true,
      subtree: true,
    })
  }

  // Fallback: try to initialize after a short delay
  setTimeout(() => {
    const languageSelect = document.querySelector('.language-select')
    if (languageSelect) {
      initLanguageSelector()
    }
  }, 100)
})
