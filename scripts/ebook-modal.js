(function () {
  // Replace YOUR_FORM_ID with the ID from your Formspree dashboard
  var FORMSPREE = 'https://formspree.io/f/xwvyabvk';

  function init() {
    var triggerBtn = document.querySelector('[data-ebook-trigger]');
    var modal = document.getElementById('ebook-modal');
    if (!triggerBtn || !modal) return;

    var form = document.getElementById('ebook-form');
    var closeBtn = modal.querySelector('.ebook-modal__close');
    var overlay = modal.querySelector('.ebook-modal__overlay');
    var status = modal.querySelector('.ebook-modal__status');
    var submitBtn = form.querySelector('.ebook-modal__submit');
    var originalLabel = submitBtn.textContent;

    function openModal() {
      modal.removeAttribute('hidden');
      document.body.classList.add('modal-open');
      form.querySelector('input').focus();
    }

    function closeModal() {
      modal.setAttribute('hidden', '');
      document.body.classList.remove('modal-open');
      status.textContent = '';
    }

    triggerBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hasAttribute('hidden')) closeModal();
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.textContent = '';

      var inputs = form.querySelectorAll('[required]');
      var allFilled = true;
      inputs.forEach(function (input) {
        if (!input.value.trim()) allFilled = false;
      });

      var emailInput = form.querySelector('[name="email"]');
      if (!allFilled || !emailInput.validity.valid) {
        status.textContent = status.dataset.requiredError;
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = submitBtn.dataset.loading || '…';

      fetch(FORMSPREE, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
        .then(function (res) {
          if (res.ok) {
            var a = document.createElement('a');
            a.href = triggerBtn.dataset.pdf;
            a.download = '';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            form.reset();
            closeModal();
          } else {
            status.textContent = status.dataset.error;
          }
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
        })
        .catch(function () {
          status.textContent = status.dataset.error;
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
        });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
