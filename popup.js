document.addEventListener("DOMContentLoaded", function () {
  const verifyBtn = document.getElementById("verifyBtn");
  const resultBox = document.getElementById("result");
  const productNameInput = document.getElementById("productName");

  const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbz6t4eFfjPR517PXYCkq0cE_XXxA0f8MNsB_44a80MDfuciiqvB3QF_psvu6oKONdFc/exec"; // <-- replace with deployed Apps Script URL

  verifyBtn.addEventListener("click", async () => {
    const rawInput = productNameInput.value.trim();
    if (!rawInput) return;

    const normalizedInput = normalize(rawInput);

    resultBox.innerHTML = `<i class="fas fa-spinner fa-spin" style="color:white;"></i> <span style="color:white;">Checking...</span>`;
    verifyBtn.disabled = true;

    try {
      const response = await fetch(`${WEB_APP_URL}?product=${encodeURIComponent(normalizedInput)}`);
      const contentType = response.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned non-JSON");
      }

      const data = await response.json();
      const isCertified = data.certified;

      if (isCertified) {
        resultBox.innerHTML = `<i class="fas fa-check-circle" style="color:lightgreen;"></i> Certified by Hamazon`;
      } else {
        resultBox.innerHTML = `<i class="fas fa-times-circle" style="color:red;"></i> Not certified by Hamazon`;
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      resultBox.innerHTML = `<i class="fas fa-bug" style="color:orange;"></i> Error reaching server`;
    }

    verifyBtn.disabled = false;
  });

  function normalize(str) {
    return str
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/[®™©]/g, "") // Remove trademarks
      .replace(/[^a-z0-9]/gi, "");
  }
});
