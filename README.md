# USF AI Workshop — Build Your First AI Browser Extension

> A hands-on workshop for the Azure Essentials track at Hackabull.

**Author:** Santos Martinez [![ORCID](https://img.shields.io/badge/ORCID-0009--0001--5997--303X-green?logo=orcid)](https://orcid.org/0009-0001-5997-303X)  
**Contributors:** William Gonzalez, Kyarra Gutierrez, Andrea Martini, David Warm, Andre Rodrigues  
**Date:** Saturday, April 25th, 1:15 PM – 2:15 PM  
**Location:** Muma College of Business (4202 E Fowler Ave, Tampa, FL) — Room #115

## 📂 What's Inside

```
USF-AI-Workshop/
├── docs/
│   └── LAB_MANUAL.md          ← Full workshop guide (30-min demo + 30-min lab)
├── starter-extension/          ← Empty template — hackers start here
│   ├── manifest.json
│   ├── content.js              ← TODO: Build the chat UI
│   ├── background.js           ← TODO: Connect to Azure OpenAI
│   └── styles.css              ← Pre-built styling
├── completed-extension/        ← Reference solution — Hacker Leader only
│   ├── manifest.json
│   ├── content.js
│   ├── background.js
│   └── styles.css
├── LICENSE                     ← MIT License
└── README.md                   ← This file
```

## 🚀 Quick Start

1. Clone this repo: `git clone https://github.com/hanshisantos/USF-AI-Workshop.git`
2. Open VS Code and create a new folder for your extension
3. Follow `docs/LAB_MANUAL.md` — use the **single-prompt** approach to generate your entire extension with AI
4. Load the extension in your browser (`edge://extensions` or `chrome://extensions` → Developer mode → Load unpacked)
5. Test on any webpage!

## 🎯 Workshop Goal

Build a working browser extension (compatible with any Chromium-based browser) with an AI chatbot powered by **Azure OpenAI GPT-4o** using a single AI prompt — no prior JavaScript experience required.

## 📋 Prerequisites

- A Chromium-based browser (Edge, Chrome, Brave, etc.)
- VS Code with GitHub Copilot (or access to ChatGPT / any AI assistant)
- Azure OpenAI API key (provided by Hacker Leader)

## 🏆 Hackathon Challenge

> **"Create a solution for the USF Community using Azure AI"**

Ideas: Campus FAQ bot, Study buddy, Accessibility assistant, Job posting analyzer, Research paper summarizer

## 📚 Resources

| Resource | Link |
|----------|------|
| Chromium Extension Docs | https://developer.chrome.com/docs/extensions/mv3/ |
| Edge Extension Docs | https://learn.microsoft.com/en-us/microsoft-edge/extensions-chromium/ |
| Azure OpenAI Quickstart | https://learn.microsoft.com/en-us/azure/ai-services/openai/quickstart |
| Microsoft AI Principles | https://www.microsoft.com/en-us/ai/principles-and-approach |
| Azure Free Account | https://azure.microsoft.com/en-us/free/ |

## 📄 License

MIT — See [LICENSE](LICENSE) for details.
