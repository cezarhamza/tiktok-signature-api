# 🔐 EterZSign

<div align="center">

[![API Status](https://img.shields.io/badge/API_Status-Online-brightgreen)](https://api.eterzsign.com)
[![Version](https://img.shields.io/badge/Version-2.0.0-blue)](https://github.com/yourusername/tiktok-signature-api)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

<p align="center">
  <strong>Tiktok Signature Api</strong><br>
  <em>Lightning-fast signature generation</em>
</p>

<p align="center">
  <b>🚀 Pure Algorithm Implementation</b> • No headless browsers needed<br>
  <b>⚡ Ultra-Fast Performance</b> • Generate signatures in under 50ms<br>
  <b>🔓 Full Source Code Available</b> • Self-host your own signature server<br>
  <b>💡 Battle-Tested</b> • Powering millions of API requests daily
</p>

<p align="center">
  <br>
  <strong>Want to run your own signature server?</strong><br>
  💬 <a href="https://github.com/EterZ-byte"><b>Contact us on link from our github profile page.</b></a>
</p>

</div>

---

## 📚 Table of Contents

- [Understanding TikTok Signatures](#-understanding-tiktok-signatures)
- [Why EterzSign?](#-why-EterzSign)
- [Getting Started](#-getting-started)
- [API Reference](#-api-reference)
- [Integration Examples](#-integration-examples)
- [Advanced Configuration](#-advanced-configuration)
- [Pricing](#-pricing)
- [Contact](#-contact)
- [License](#-license)

---

## 🎓 Understanding TikTok Signatures

Before diving in, let's understand what you're actually dealing with. Here's what a fully signed TikTok API URL looks like:

```
https://www.tiktok.com/api/post/item_list/?WebIdLastTime=1714421730&aid=1988&app_language=en
&app_name=tiktok_web&browser_language=en-US&browser_name=Mozilla&browser_online=true
&browser_platform=MacIntel&browser_version=5.0%20(Macintosh)&channel=tiktok_web
&cookie_enabled=true&count=35&cursor=0&device_id=7363385157666391557
&device_platform=web_pc&focus_state=true&from_page=user&history_len=5
&is_fullscreen=false&is_page_visible=true&language=en&os=mac
&priority_region=&referer=https%3A%2F%2Fwww.tiktok.com%2Fforyou
&region=GH&screen_height=1080&screen_width=1920
&secUid=MS4wLjABAAAA1UWBntm1n1BFYlyVP4D7ddbfy
&tz_name=Africa%2FAccra&userId=6805706310416925702
&verifyFp=verify_lvlehb8u_stK0hmVj
&webcast_language=en
&msToken=LFGH8L4L05k6FN5aqczU1_tyF3JUNP5y5Pi9r3RSbMe_VlMJ[...]
&X-Bogus=DFSzswVErG2ANaLjtWAPkHBeKL5E
&_signature=_02B4Z6wo00001PqGkMAAAIDCRwm7KzaNr
```

Looks overwhelming? That's because it is. Let me break down what's happening here:

### The Three-Layer Protection System

**1. msToken Generation**
First, you need an msToken. This isn't just a random string - it's a carefully crafted token that TikTok validates server-side. Think of it as your entry ticket.

**2. X-Bogus Signature**
Here's where it gets interesting. TikTok runs a custom virtual machine in your browser that takes your entire URL and generates a signature. This VM is obfuscated beyond recognition. The X-Bogus parameter proves you've gone through their VM gauntlet.

**3. X-Gnarly Header**
Not satisfied yet? TikTok takes your signed URL, combines it with the msToken and your User-Agent, then generates yet another signature for the request headers.

Each layer depends on the previous one. Miss one detail, and TikTok's servers will politely show you the door.

---

## 🚀 Why EterzSign?

Most solutions out there spin up Chrome or Puppeteer instances to execute TikTok's JavaScript. That's like using a sledgehammer to crack a nut - it works, but it's slow and resource-hungry.

We took a different approach. After months of reverse engineering TikTok's virtual machine, we've recreated the signature algorithms natively. No browsers, no overhead, just pure speed:

- **Traditional approach**: Spin up browser → Load TikTok → Execute JS → Extract signatures (~2-5 seconds)
- **Our approach**: Direct algorithm execution → Instant signatures (~50ms)

That's a 40-100x speed improvement, and your servers will thank you for not running hundreds of Chrome instances.

---

## 🎯 Getting Started

### Prerequisites

You'll need:

- Node.js 14+ (or Python 3.7+, we don't judge)
- An API key

### Your First Signature

Here's the simplest way to get started:

```javascript
const EterzSign = require("eterz-sign");

const client = new EterzSign({
  apiKey: "YOUR_API_KEY",
});

// Generate signatures for any TikTok URL
const signature = await client.sign({
  url: "https://www.tiktok.com/@cristiano",
  userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)...",
});

console.log(signature);
// {
//   msToken: "Vqfh3Ly8rN9kF2...",
//   X_Bogus: "DFSzswVOlGnANa...",
//   X_Gnarly: "a024db4e0002...",
//   ttwid: "7123456789...",
//   signedUrl: "https://www.tiktok.com/@cristiano?msToken=..."
// }
```

That's it. Use these signatures in your requests and TikTok will treat you like a regular browser.

---

## 📖 API Reference

### POST /v2/signature/generate

Generate all required signatures for a TikTok request.

**Request Body:**

```json
{
  "url": "https://www.tiktok.com/...",
  "userAgent": "Mozilla/5.0..."
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "msToken": "Generated msToken",
    "X-Bogus": "URL signature",
    "X-Gnarly": "Header signature",
    "ttwid": "Device identifier",
    "signedUrl": "Ready-to-use URL with all parameters"
  }
}
```

**Headers:**

```
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
```

---

## 💻 Integration Examples

### Node.js with Axios

```javascript
const axios = require("axios");

async function getTikTokData(username) {
  // Step 1: Get signatures
  const { data } = await axios.post(
    "https://api.eterzsign.com/v2/signature/generate",
    {
      url: `https://www.tiktok.com/@${username}`,
      userAgent: navigator.userAgent,
    },
    { headers: { Authorization: "Bearer YOUR_API_KEY" } }
  );

  // Step 2: Use the signed URL
  const response = await axios.get(data.signedUrl, {
    headers: {
      "User-Agent": navigator.userAgent,
      "X-Gnarly": data["X-Gnarly"],
    },
  });

  return response.data;
}
```

### Python Example

```python
import requests

def get_tiktok_data(username):
    # Get signatures
    sig_response = requests.post(
        'https://api.eterzsign.com/v2/signature/generate',
        json={
            'url': f'https://www.tiktok.com/@{username}',
            'userAgent': 'Mozilla/5.0...'
        },
        headers={'Authorization': 'Bearer YOUR_API_KEY'}
    )

    signatures = sig_response.json()['data']

    # Use them in your request
    response = requests.get(
        signatures['signedUrl'],
        headers={
            'User-Agent': 'Mozilla/5.0...',
            'X-Gnarly': signatures['X-Gnarly']
        }
    )

    return response.json()
```

### Quick cURL Test

```bash
# Get your signatures
curl -X POST https://api.eterzsign.com/v2/signature/generate \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.tiktok.com/@nike", "userAgent": "Mozilla/5.0..."}'
```

---

## 🔧 Advanced Configuration

### Handling Rate Limits

TikTok has rate limits. We handle retries automatically, but you can customize the behavior:

```javascript
const client = new EterzSign({
  apiKey: "YOUR_API_KEY",
  timeout: 5000, // Request timeout
  retryAttempts: 3, // Automatic retries
  retryDelay: 1000, // Delay between retries
  cache: true, // Cache signatures for identical requests
});
```

### Error Handling

Things can go wrong. Here's how to handle them gracefully:

```javascript
try {
  const signature = await client.sign({ url, userAgent });
} catch (error) {
  if (error.code === "RATE_LIMIT") {
    // You're going too fast, slow down
    await sleep(error.retryAfter);
  } else if (error.code === "INVALID_URL") {
    // Check your URL format
    console.error("Bad URL:", error.message);
  }
}
```

---

### 🔓 Source Code License

We also offer the complete source code if you want to self-host:

- Full msToken generation algorithm
- X-Bogus VM implementation
- X-Gnarly encoding logic
- All obfuscation techniques decoded
- Lifetime updates as TikTok evolves


## 📞 Contact

Got questions? Need the source code? Want to chat about reverse ?
Interested? Let's talk follow the [link](https://github.com/EterZ-byte) on our profile page.

---

<div align="center">

**Built by engineers who prefer algorithms over browsers**

[⭐ Star us on GitHub](https://github.com/EterZ-byte/tiktok-signature-api) • [🐛 Report Issues](https://github.com/EterZ-byte/tiktok-signature-api/issues)

</div>

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
