/**
 * TikTok Signature API - Quick Start Example
 */

const axios = require("axios");

const API_KEY = "YOUR_API_KEY";
const API_URL = "https://api.tiktoksignature.com/v2";

// Generate signature for any TikTok URL
async function generateSignature(url) {
  const response = await axios.post(
    `${API_URL}/signature/generate`,
    {
      url,
      userAgent: navigator.userAgent,
    },
    {
      headers: { Authorization: `Bearer ${API_KEY}` },
    }
  );

  return response.data.data;
}

// Example usage
(async () => {
  try {
    const signature = await generateSignature(
      "https://www.tiktok.com/@username"
    );

    console.log("msToken:", signature.msToken);
    console.log("X-Bogus:", signature["X-Bogus"]);
    console.log("X-Gnarly:", signature["X-Gnarly"]);
    console.log("Signed URL:", signature.signedUrl);
  } catch (error) {
    console.error("Error:", error.message);
  }
})();
