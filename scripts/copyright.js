// Automatically update copyright year in legal footer
window.addEventListener('DOMContentLoaded', function () {
  var yearSpan = document.getElementById('copyright-year')
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear()
  }
})
