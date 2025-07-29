document.getElementById('verifyBtn').addEventListener('click', async () => {
  const input = document.getElementById('productInput').value;
  const query = normalize(input);
  const url = `https://script.google.com/macros/s/AKfycbz6t4eFfjPR517PXYCkq0cE_XXxA0f8MNsB_44a80MDfuciiqvB3QF_psvu6oKONdFc/exec?query=${encodeURIComponent(query)}`;

  const resultBox = document.getElementById('result');
  resultBox.innerHTML = "Verifying...";

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.certified) {
      resultBox.innerHTML = `<i class="fas fa-check-circle" style="color:limegreen;"></i> This product is <strong>Hamazon Certified</strong>`;
    } else {
      resultBox.innerHTML = `<i class="fas fa-times-circle" style="color:red;"></i> Not certified by Hamazon`;
    }
  } catch (err) {
    console.error(err);
    resultBox.innerHTML = `<i class="fas fa-bug" style="color:orange;"></i> Error reaching server`;
  }
});

function normalize(str) {
  return str.toLowerCase().replace(/[®™.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").trim();
}
