document.getElementById("verifyBtn").addEventListener("click", async () => {
  const input = document.getElementById("productInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!input) {
    resultDiv.textContent = "Please enter a product name.";
    resultDiv.className = "error";
    resultDiv.style.display = "block";
    return;
  }

  resultDiv.textContent = "Verifying...";
  resultDiv.style.display = "block";
  resultDiv.className = "";

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbz6t4eFfjPR517PXYCkq0cE_XXxA0f8MNsB_44a80MDfuciiqvB3QF_psvu6oKONdFc/exec?product=" + encodeURIComponent(input));
    const data = await response.json();

    if (data.status === "success" && data.match) {
      resultDiv.textContent = "✅ Certified by Hamazon!";
      resultDiv.className = "success";
    } else {
      resultDiv.textContent = "❌ Not certified by Hamazon.";
      resultDiv.className = "error";
    }
  } catch (error) {
    resultDiv.textContent = "Error reaching server.";
    resultDiv.className = "error";
  }
});
