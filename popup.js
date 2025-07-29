document.addEventListener("DOMContentLoaded", function () {
  const verifyButton = document.getElementById("verifyButton");
  const resultBox = document.getElementById("resultBox");
  const productInput = document.getElementById("productInput");

  verifyButton.addEventListener("click", () => {
    const productName = productInput.value.trim();

    if (!productName) {
      resultBox.innerHTML = `<i class="fas fa-exclamation-triangle" style="color:orange;"></i> Please enter a product name`;
      return;
    }

    resultBox.innerHTML = `<i class="fas fa-spinner fa-spin" style="color:gray;"></i> Checking...`;

    const url = `https://script.google.com/macros/s/AKfycbz6t4eFfjPR517PXYCkq0cE_XXxA0f8MNsB_44a80MDfuciiqvB3QF_psvu6oKONdFc/exec?product=${encodeURIComponent(productName)}`;

    fetch(url)
      .then(response => {
        if (!response.ok || !response.headers.get("Content-Type")?.includes("application/json")) {
          throw new Error("Invalid response format");
        }
        return response.json();
      })
      .then(data => {
        if (data.certified) {
          resultBox.innerHTML = `<i class="fas fa-check-circle" style="color:lightgreen;"></i> Certified by Hamazon`;
        } else {
          resultBox.innerHTML = `<i class="fas fa-times-circle" style="color:red;"></i> Not certified by Hamazon`;
        }
      })
      .catch(err => {
        console.error("Fetch error:", err);
        resultBox.innerHTML = `<i class="fas fa-bug" style="color:orange;"></i> Error reaching server`;
      });
  });
});
