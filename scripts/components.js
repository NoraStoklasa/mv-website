// Get current language from URL path
function getCurrentLanguage() {
  const path = window.location.pathname
  if (path.includes('/cs/')) return 'cs'
  if (path.includes('/en/')) return 'en'
  return 'en' // default
}

// Simple component loader: inject fetched HTML into target element by id
async function loadComponent(targetId, path) {
  try {
    const res = await fetch(path)
    if (!res.ok) throw new Error(`Failed to load ${path}`)

    const html = await res.text()
    const target = document.getElementById(targetId)
    if (target) target.innerHTML = html
  } catch (err) {
    console.error('Error loading component:', err)
  }
}

// Load header and footer, then update year in legal footer
document.addEventListener('DOMContentLoaded', async () => {
  const lang = getCurrentLanguage()

  // Load language-specific header and footer
  await loadComponent('header-placeholder', `../${lang}/header.${lang}.html`)
  await loadComponent('footer-placeholder', `../${lang}/footer.${lang}.html`)

  const copyrightYear = document.getElementById('copyright-year')
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear()
  }
})
