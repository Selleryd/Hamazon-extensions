// content.js
// Optional: Auto-detect product names on popular shopping sites (Walmart, Amazon, etc.)
// Currently just logs the product title from common selectors

(function () {
  const selectors = [
    "#productTitle", // Amazon
    ".prod-ProductTitle", // Walmart
    "h1.title",
    "meta[property='og:title']",
    "meta[name='title']"
  ];

  let found = false;
  for (const selector of selectors) {
    const el = document.querySelector(selector);
    const title = el?.innerText || el?.content;
    if (title) {
      console.log("Hamazon detected product:", title.trim());
      found = true;
      break;
    }
  }

  if (!found) {
    console.log("Hamazon: No product title found on this page.");
  }
})();
