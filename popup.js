// popup.js
document.addEventListener('DOMContentLoaded', () => {
  const btn    = document.getElementById('verifyBtn');
  const result = document.getElementById('result');

  btn.addEventListener('click', () => {
    const name = document.getElementById('productName').value.trim();
    result.innerHTML = '';
    if (!name) {
      result.textContent = 'Please enter a product name.';
      return;
    }

    const API_URL =
      'https://script.google.com/macros/s/AKfycbzv61PbeXP1yjhQJWDsasAuCphvbDuxZM3vJQG1V1MzHUlBxR0J7iwwxKebLfB9SMBT/exec';

    fetch(`${API_URL}?productName=${encodeURIComponent(name)}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Network error: status ${res.status}`);
        }
        const ct = res.headers.get('content-type') || '';
        if (!ct.includes('application/json')) {
          throw new Error(
            'Server did not return JSON.\n' +
            'Make sure your Apps Script is deployed as a Web App (Anyone, even anonymous)\n' +
            'and you’re using the /exec URL.'
          );
        }
        return res.json();
      })
      .then(data => {
        if (data.found === true) {
          result.innerHTML = `<i class="fa-solid fa-check"></i>
                              Yes, “${name}” is verified.`;
        } else if (data.found === false) {
          result.innerHTML = `<i class="fa-solid fa-xmark"></i>
                              No, “${name}” is not verified.`;
        } else if (data.error) {
          result.textContent = `Error: ${data.error}`;
        } else {
          result.textContent = 'Unexpected response format.';
        }
      })
      .catch(err => {
        console.error(err);
        result.textContent = err.message;
      });
  });
});
