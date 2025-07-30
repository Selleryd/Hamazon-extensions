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
      'https://script.google.com/macros/s/AKfycbz6t4eFfjPR517PXYCkq0cE_XXxA0f8MNsB_44a80MDfuciiqvB3QF_psvu6oKONdFc/exec';

    fetch(`${API_URL}?productName=${encodeURIComponent(name)}`)
      .then(res => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (data.found === true) {
          result.innerHTML = `<i class="fa-solid fa-check"></i> Yes, “${name}” is verified.`;
        } else if (data.found === false) {
          result.innerHTML = `<i class="fa-solid fa-xmark"></i> No, “${name}” is not verified.`;
        } else if (data.error) {
          result.textContent = `Error: ${data.error}`;
        } else {
          result.textContent = 'Unexpected response format.';
        }
      })
      .catch(err => {
        console.error('Fetch error:', err);
        result.textContent = 'Error reaching server. Please check console.';
      });
  });
});
