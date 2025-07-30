document.addEventListener('DOMContentLoaded', () => {
  const btn         = document.getElementById('verifyBtn');
  const resultEl    = document.getElementById('result');
  const inputEl     = document.getElementById('productName');
  const VERIFY_HTML = '<i class="fa-solid fa-shield-check"></i><span>Verify</span>';
  const LOADING_HTML= '<i class="fa-solid fa-spinner fa-spin"></i><span>Verifying...</span>';
  const API_URL     = 'https://script.google.com/macros/s/AKfycbzv61PbeXP1yjhQJWDsasAuCphvbDuxZM3vJQG1V1MzHUlBxR0J7iwwxKebLfB9SMBT/exec';

  btn.addEventListener('click', () => {
    const name = inputEl.value.trim();
    resultEl.textContent = '';
    if (!name) {
      resultEl.textContent = 'Please enter a product name.';
      return;
    }

    // show loading
    btn.disabled = true;
    btn.innerHTML = LOADING_HTML;

    fetch(`${API_URL}?productName=${encodeURIComponent(name)}`)
      .then(res => {
        if (!res.ok) throw new Error(`Network error (${res.status})`);
        const ct = res.headers.get('content-type') || '';
        if (!ct.includes('application/json')) {
          throw new Error(
            'Server didn’t return JSON. ' +
            'Redeploy as a Web App (Anyone, even anonymous).'
          );
        }
        return res.json();
      })
      .then(data => {
        if (data.found === true) {
          resultEl.innerHTML = `<i class="fa-solid fa-check"></i> Yes, “${name}” is verified.`;
        } else if (data.found === false) {
          resultEl.innerHTML = `<i class="fa-solid fa-xmark"></i> No, “${name}” isn’t verified.`;
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
        btn.disabled = false;
        btn.innerHTML = VERIFY_HTML;
      });
  });
});
