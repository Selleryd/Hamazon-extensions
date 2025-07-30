document.addEventListener('DOMContentLoaded', () => {
  const btn      = document.getElementById('verifyBtn');
  const resultEl = document.getElementById('result');
  const nameEl   = document.getElementById('productName');
  const upcEl    = document.getElementById('productUpc');

  const VERIFY_HTML   = '<i class="fa-solid fa-shield-check"></i><span>Verify</span>';
  const LOADING_HTML  = '<i class="fa-solid fa-spinner fa-spin"></i><span>Verifying...</span>';
  const API_URL       = 'https://script.google.com/macros/s/AKfycbxNYKjBjTeCpiAzpRMWlKKLVGNhbURuVZHRjc7rpofcqUr9oapgJwuPxK5GcuxxoY02/exec';

  btn.addEventListener('click', () => {
    const name = nameEl.value.trim();
    const upc  = upcEl.value.trim();
    resultEl.textContent = '';

    if (!name && !upc) {
      resultEl.textContent = 'Please enter a product name or UPC.';
      return;
    }

    const params = [];
    if (name) params.push(`productName=${encodeURIComponent(name)}`);
    if (upc)  params.push(`upc=${encodeURIComponent(upc)}`);
    const url = `${API_URL}?${params.join('&')}`;

    btn.disabled  = true;
    btn.innerHTML = LOADING_HTML;

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`Network ${res.status}`);
        const ct = res.headers.get('content-type') || '';
        if (!ct.includes('application/json')) {
          throw new Error(
            'Server did not return JSON.\n' +
            'Redeploy your Apps Script as Web App (Anyone, even anonymous).'
          );
        }
        return res.json();
      })
      .then(data => {
        if (data.found === true) {
          resultEl.innerHTML = `<i class="fa-solid fa-check"></i> Hamazon Certified!`;
        } else if (data.found === false) {
          resultEl.innerHTML = `<i class="fa-solid fa-xmark"></i> Not Hamazon certified!`;
        } else if (data.error) {
          resultEl.textContent = `Error: ${data.error}`;
        } else {
          resultEl.textContent = 'Unexpected response.';
        }
      })
      .catch(err => {
        console.error(err);
        resultEl.textContent = err.message;
      })
      .finally(() => {
        btn.disabled  = false;
        btn.innerHTML = VERIFY_HTML;
      });
  });
});
