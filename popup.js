document.getElementById('verifyButton').addEventListener('click', async () => {
  const input = document.getElementById('productInput').value;
  const sanitizedInput = normalizeString(input);

  // Replace this URL with your actual deployed Google Apps Script endpoint
  const apiUrl = "https://script.google.com/macros/s/AKfycbxf9MaN87R686vUWLN_CaESO4Lpv7UfihEipz70uNDXesQiAW62vcnU_b5aIENfe_1a/exec";

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    // Assume data.products is an array of certified product names
    const isCertified = data.products.some(product => 
      normalizeString(product).includes(sanitizedInput) ||
      sanitizedInput.includes(normalizeString(product))
    );

    const result = document.getElementById('result');
    result.innerHTML = isCertified 
      ? `<i class="fa-solid fa-check-circle" style="color:green;"></i> Certified by Hamazon!`
      : `<i class="fa-solid fa-times-circle" style="color:red;"></i> Not certified.`;
  } catch (err) {
    console.error(err);
    document.getElementById('result').innerHTML = `<i class="fa-solid fa-exclamation-circle" style="color:orange;"></i> Error verifying product.`;
  }
});

function normalizeString(str) {
  return str
    .toLowerCase()
    .replace(/[®™.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
    .replace(/\s{2,}/g," ")
    .trim();
}
