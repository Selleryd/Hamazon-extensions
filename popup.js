// ⚠️  Replace with your real Apps-Script Web-App URL (ends in /exec)
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbz6t4eFfjPR517PXYCkq0cE_XXxA0f8MNsB_44a80MDfuciiqvB3QF_psvu6oKONdFc/exec";

document.addEventListener("DOMContentLoaded", () => {
  const btn     = document.getElementById("verifyBtn");
  const inputEl = document.getElementById("productInput");
  const result  = document.getElementById("result");

  btn.addEventListener("click", async () => {
    const product = inputEl.value.trim();
    if (!product) {
      show("Please enter a product name.", "info");
      return;
    }

    show(`<span class="material-icons">hourglass_top</span> Checking…`, "info");
    btn.disabled = true;

    try {
      const url  = `${WEB_APP_URL}?product=${encodeURIComponent(product)}`;
      const resp = await fetch(url);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

      const data = await resp.json();
      if (data.certified) {
        show(`<span class="material-icons">verified</span> Hamazon Certified`, "success");
      } else {
        show(`<span class="material-icons">cancel</span> Not certified`, "error");
      }
    } catch (err) {
      console.error(err);
      show(`<span class="material-icons">error</span> Server error`, "error");
    } finally {
      btn.disabled = false;
    }
  });

  function show(msg, cls) {
    result.className = cls;
    result.innerHTML = msg;
  }
});
