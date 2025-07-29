const apiBase = "https://script.google.com/macros/s/AKfycbz6t4eFfjPR517PXYCkq0cE_XXxA0f8MNsB_44a80MDfuciiqvB3QF_psvu6oKONdFc/exec"; // your real deployed URL

document.getElementById("verifyBtn").addEventListener("click", async () => {
  const input = document.getElementById("productInput").value;
  const resultBox = document.getElementById("resultBox");

  resultBox.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Checking...`;

  const productQuery = encodeURIComponent(input);
  const apiURL = `${apiBase}?product=${productQuery}`;

  try {
    const res = await fetch(apiURL);
    const text = await res.text();

    // If server returns HTML instead of JSON, catch it
    const json = JSON.parse(text);

    if (json.certified) {
      resultBox.innerHTML = `<i class="fas fa-check-circle" style="color:green;"></i> Certified by Hamazon!`;
    } else {
      resultBox.innerHTML = `<i class="fas fa-times-circle" style="color:red;"></i> Not certified by Hamazon`;
    }
  } catch (err) {
    console.error('Error parsing response:', err);
    resultBox.innerHTML = `<i class="fas fa-bug" style="color:orange;"></i> Error reaching server`;
  }
});
