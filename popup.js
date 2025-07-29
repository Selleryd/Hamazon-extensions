async function checkProduct() {
  const query = document.getElementById('query').value.trim();
  const resultDiv = document.getElementById('result');
  resultDiv.innerText = "Checking...";

  try {
    const res = await fetch(`https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?q=${encodeURIComponent(query)}`);
    const data = await res.json();

    if (data.status === "Not Certified") {
      resultDiv.innerHTML = `<span style="color:red;">❌ Not Certified</span>`;
    } else {
      resultDiv.innerHTML = `
        ✅ <strong>${data.product}</strong><br>
        Brand: ${data.brand}<br>
        Status: ${data.status}<br>
        Lab Test: ${data.lab_date}<br>
        ${data.lab_link ? `<a href="${data.lab_link}" target="_blank">Lab Report</a>` : ""}
      `;
    }
  } catch (err) {
    resultDiv.innerText = "Error checking product.";
  }
}
