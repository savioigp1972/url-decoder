# 🔓 URL Decoder

URL Decoder is a lightweight browser extension that automatically detects, decodes, and cleans encoded URLs. It helps reveal the real destination behind redirects, tracking links, and nested URL parameters.

## 📦 Latest Release

**Current Version:** v1.0.0

Download the latest release from the [Releases](../../releases) page.

## ✨ Features

- Automatic URL detection
- Multi-layer URL decoding
- Decode nested and heavily encoded URLs
- Remove common tracking parameters:
  - `utm_source`
  - `utm_medium`
  - `utm_campaign`
  - `utm_term`
  - `utm_content`
  - `fbclid`
  - `gclid`
  - `msclkid`
  - `yclid`
- Clean redirect links
- Open decoded URLs instantly
- Copy decoded URLs with one click
- URL history viewer
- Modern minimalist interface
- Fast and privacy-friendly

## 🚀 Installation

### Microsoft Edge

1. Download the latest release from the Releases page.
2. Extract the ZIP file.
3. Open `edge://extensions`.
4. Enable **Developer Mode**.
5. Click **Load unpacked**.
6. Select the extracted extension folder.

### Google Chrome

1. Download the latest release from the Releases page.
2. Extract the ZIP file.
3. Open `chrome://extensions`.
4. Enable **Developer Mode**.
5. Click **Load unpacked**.
6. Select the extracted extension folder.

## 🧪 Tested Features

✅ Single-layer URL decoding

✅ Multi-layer URL decoding

✅ Tracking parameter removal

✅ Redirect cleanup

✅ Complex nested encoded URL extraction

✅ URL history support

## 📂 Project Structure

```text
URLDecoder/
├── manifest.json
├── popup.html
├── popup.css
├── popup.js
├── background.js
├── LICENSE
├── README.md
└── icons/
    └── Designer.ico
```

## 📜 License

Released under the MIT License.

## 🤝 Contributing

Contributions, suggestions, bug reports, and feature requests are welcome.

## ⭐ Support

If you find this project useful, consider starring the repository on GitHub.

## 🚧 Roadmap

Future improvements may include:

- Advanced nested URL extraction
- Additional tracking parameter cleanup
- Improved browser compatibility
- Enhanced history management
- Optional URL validation tools
