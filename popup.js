document.getElementById("verifyBtn").addEventListener("click", async () => {
  const product = document.getElementById("productName").value.trim();
  const resultBox = document.getElementById("resultBox");

  if (!product) {
    resultBox.innerHTML = `<i class="fas fa-exclamation-circle" style="color:yellow;"></i> Please enter a product name`;
    return;
  }

  const normalized = encodeURIComponent(product.replace(/®/g, "").trim());
  const url = `https://script.google.com/macros/s/AKfycbz6t4eFfjPR517PXYCkq0cE_XXxA0f8MNsB_44a80MDfuciiqvB3QF_psvu6oKONdFc/exec?product=${normalized}`;

  resultBox.innerHTML = `<i class="fas fa-spinner fa-spin" style="color:white;"></i> Checking...`;

  try {
    const response = await fetch(url, { method: "GET" });

    const contentType = response.headers.get("content-type");
    if (!contentType.includes("application/json")) {
      throw new Error("Not JSON: " + contentType);
    }

    const data = await response.json();

    if (data && data.certified) {
      resultBox.innerHTML = `<i class="fas fa-check-circle" style="color:lightgreen;"></i> Certified by Hamazon`;
    } else {
      resultBox.innerHTML = `<i class="fas fa-times-circle" style="color:red;"></i> Not certified by Hamazon`;
    }
  } catch (err) {
    console.error("Fetch Error:", err);
    resultBox.innerHTML = `<i class="fas fa-bug" style="color:orange;"></i> Error reaching server`;
  }
});
