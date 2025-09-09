"""
TikTok Signature API - Python Example
"""

import requests

API_KEY = 'YOUR_API_KEY'
API_URL = 'https://api.tiktoksignature.com/v2'

def generate_signature(url):
    response = requests.post(
        f'{API_URL}/signature/generate',
        json={
            'url': url,
            'userAgent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        headers={'Authorization': f'Bearer {API_KEY}'}
    )
    return response.json()['data']

# Example
if __name__ == '__main__':
    sig = generate_signature('https://www.tiktok.com/@username')
    print(f"msToken: {sig['msToken']}")
    print(f"X-Bogus: {sig['X-Bogus']}")
    print(f"X-Gnarly: {sig['X-Gnarly']}")