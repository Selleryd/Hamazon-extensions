const url = "https://script.google.com/macros/s/AKfycbz6t4eFfjPR517PXYCkq0cE_XXxA0f8MNsB_44a80MDfuciiqvB3QF_psvu6oKONdFc/exec?product=" + encodeURIComponent(productName);

const verifyBtn = document.getElementById("verifyBtn");
const productInput = document.getElementById("productInput");
const resultBox = document.getElementById("result");

verifyBtn.addEventListener("click", async () => {
  const rawInput = productInput.value.trim();
  if (!rawInput) return;

  // Normalize: remove trademark/casing/punctuation
  const normalized = rawInput.replace(/[\u00AE\u2122™®]/g, "").toLowerCase().replace(/[^\w\s]/g, "");

  resultBox.innerHTML = `<i class="fas fa-spinner fa-spin" style="color:white;"></i> <span style="color:white;">Checking...</span>`;
  verifyBtn.disabled = true;

  try {
    const response = await fetch(`${WEB_APP_URL}?product=${encodeURIComponent(normalized)}`);
    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const data = await response.json();
      if (data.certified) {
        resultBox.innerHTML = `<i class="fas fa-check-circle" style="color:lightgreen;"></i> Certified by Hamazon`;
      } else {
        resultBox.innerHTML = `<i class="fas fa-times-circle" style="color:red;"></i> Not certified by Hamazon`;
      }
    } else {
      throw new Error("Invalid response type");
    }
  } catch (err) {
    console.error("Fetch Error:", err);
    resultBox.innerHTML = `<i class="fas fa-bug" style="color:orange;"></i> Error reaching server`;
  } finally {
    verifyBtn.disabled = false;
  }
});
