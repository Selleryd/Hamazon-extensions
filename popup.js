\document.addEventListener('DOMContentLoaded', () => {
  const btn      = document.getElementById('verifyBtn');
  const resultEl = document.getElementById('result');
  const nameEl   = document.getElementById('productName');
  const upcEl    = document.getElementById('productUpc');

  const VERIFY_HTML   = '<i class="fa-solid fa-shield-check"></i><span>Verify</span>';
  const LOADING_HTML  = '<i class="fa-solid fa-spinner fa-spin"></i><span>Verifying...</span>';
  const API_URL       = 'https://script.google.com/macros/s/AKfycbzv61PbeXP1yjhQJWDsasAuCphvbDuxZM3vJQG1V1MzHUlBxR0J7iwwxKebLfB9SMBT/exec';

  btn.addEventListener('click', () => {
    const name = nameEl.value.trim();
    const upc  = upcEl.value.trim();
    resultEl.textContent = '';

    if (!name && !upc) {
      resultEl.textContent = 'Please enter a product name or UPC.';
      return;
    }

    // build query string with whichever params are present
    const params = [];
    if (name) params.push(`productName=${encodeURIComponent(name)}`);
    if (upc)  params.push(`upc=${encodeURIComponent(upc)}`);
    const url = `${API_URL}?${params.join('&')}`;

    // loading state
    btn.disabled = true;
    btn.innerHTML = LOADING_HTML;

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`Network ${res.status}`);
        const ct = res.headers.get('content-type') || '';
        if (!ct.includes('application/json')) {
          throw new Error(
            'Server did not return JSON. ' +
            'Redeploy your Web App (Anyone, even anonymous) and use the /exec URL.'
          );
        }
        return res.json();
      })
      .then(data => {
        if (data.found === true) {
          resultEl.innerHTML = `<i class="fa-solid fa-check"></i> Match found!`;
        } else if (data.found === false) {
          resultEl.innerHTML = `<i class="fa-solid fa-xmark"></i> No match.`;
        } else if (data.error) {
          resultEl.textContent = `Error: ${data.error}`;
        } else {
          resultEl.textContent = 'Unexpected response format.';
        }
      })
      .catch(err => {
        console.error(err);
        resultEl.textContent = err.message;
      })
      .finally(() => {
        btn.disabled = false;
        btn.innerHTML = VERIFY_HTML;
      });
  });
});
