/**
 * TikTok Signature API Client
 */

const axios = require("axios");

class EterniumSignature {
  constructor(config = {}) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || "https://api.tiktoksignature.com/v2";
    this.timeout = config.timeout || 5000;
  }

  async generateSignature(options) {
    const response = await axios.post(
      `${this.baseUrl}/signature/generate`,
      {
        url: options.url,
        userAgent: options.userAgent || this._getDefaultUserAgent(),
        includeHeaders: options.includeHeaders !== false,
      },
      {
        headers: { Authorization: `Bearer ${this.apiKey}` },
        timeout: this.timeout,
      }
    );

    return response.data.data;
  }

  _getDefaultUserAgent() {
    return "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
  }
}

module.exports = EterniumSignature;
