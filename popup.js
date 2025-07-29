document.addEventListener("DOMContentLoaded", () => {
  const verifyBtn = document.getElementById("verifyBtn");
  const input = document.getElementById("productInput");
  const resultBox = document.getElementById("resultBox");

  const apiBase = "https://script.google.com/macros/s/AKfycbz6t4eFfjPR517PXYCkq0cE_XXxA0f8MNsB_44a80MDfuciiqvB3QF_psvu6oKONdFc/exec"; // Replace this

  verifyBtn.addEventListener("click", async () => {
    const product = input.value.trim();
    if (!product) return;

    resultBox.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Checking...`;

    try {
      const response = await fetch(`${apiBase}?product=${encodeURIComponent(product)}`);
      const text = await response.text();

      const json = JSON.parse(text);

      if (json.certified) {
        resultBox.innerHTML = `<i class="fas fa-check-circle" style="color:lightgreen;"></i> Certified by Hamazon!`;
      } else {
        resultBox.innerHTML = `<i class="fas fa-times-circle" style="color:red;"></i> Not certified by Hamazon`;
      }
    } catch (err) {
      console.error(err);
      resultBox.innerHTML = `<i class="fas fa-bug" style="color:orange;"></i> Error reaching server`;
    }
  });
});
