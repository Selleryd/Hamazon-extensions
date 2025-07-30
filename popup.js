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
        console.log('HTTP status:', res.status, res.headers.get('content-type'));
        return res.text();
      })
      .then(text => {
        console.log('RAW RESPONSE:', text);
        let data;
        try {
          data = JSON.parse(text);
        } catch(err) {
          console.error('JSON.parse failed', err);
          result.textContent = 'Server returned invalid response';
          return;
        }
        if (data.found) {
          result.innerHTML = `<i class="fa-solid fa-check"></i>
                              Yes, “${name}” is verified.`;
        } else {
          result.innerHTML = `<i class="fa-solid fa-xmark"></i>
                              No, “${name}” is not verified.`;
        }
      })
      .catch(err => {
        console.error('Fetch error:', err);
        result.textContent = 'Error reaching server. Please try again.';
      });
  });
});
