# Azure AI Browser Extension Workshop
## Lab Manual — Build Your First AI-Powered Chrome Extension

**Duration:** 1 hour (30-min demo + 30-min hands-on)  
**Audience:** University students, hackathon participants, beginners  
**Prerequisites:** A laptop with Chrome/Edge, a GitHub account, basic HTML/JS knowledge  
**Goal:** Build a working AI chatbot browser extension using Azure Bot Service + Azure OpenAI

---

## 🎯 Workshop Overview

| Segment | Time | Activity |
|---------|------|----------|
| **Part 1: Demo** | 0:00–0:30 | Professor walks through the architecture, shows USF AI, explains Azure services |
| **Part 2: Lab** | 0:30–1:00 | Students build a minimal AI extension from a starter template |

### What Students Will Build

A Chrome extension that:
1. Shows a floating chat button on any webpage
2. Lets users type a question
3. Sends it to Azure OpenAI (GPT-4o) for a response
4. Displays the AI answer in the chat window

**No backend needed.** The extension calls Azure APIs directly.

---

## 📋 Part 1: Presenter Demo Script (30 minutes)

### Slide 1: What Are Browser Extensions? (3 min)

> "Browser extensions are mini-applications that run inside Chrome or Edge. They can read web pages, add UI elements, and call APIs — all with JavaScript."

**Key concepts to explain:**
- **Manifest V3** — Chrome's extension standard (JSON config file)
- **Content Script** — JavaScript injected into web pages
- **Background Service Worker** — Runs in the background, handles API calls
- **Popup/Side Panel** — Extension's own UI

**Show:** `chrome://extensions` in developer mode

### Slide 2: The Azure AI Stack (5 min)

> "Azure gives you building blocks for AI. Today we'll use two:"

| Service | What It Does | Free Tier |
|---------|-------------|-----------|
| **Azure OpenAI** | GPT-4o for chat completions | $5 credit on new accounts |
| **Azure Bot Service** | Managed bot with Direct Line API | Free tier available |

**Show:** Azure Portal → Create resources → Azure OpenAI → Deploy GPT-4o

**Microsoft AI Principles** (30 seconds each):
- **Fairness** — AI treats all users equitably
- **Reliability** — Graceful degradation when services are down
- **Privacy** — Don't send PII to AI unless necessary
- **Transparency** — Label AI-generated content clearly
- **Accountability** — Log AI actions, provide audit trail

### Slide 3: Live Demo — USF AI (10 min)

> "Let me show you what a production AI extension looks like."

**Demo sequence (pick 4):**
1. Open `any webpage` → show USF AI chat widget
2. Type `status` → show 10 AI services online
3. Type `hello` → show conversational chit-chat
4. Type `device compliance report` → show AI-generated report
5. Enable voice mode → speak a question → hear TTS response
6. Type `about` → show version, capabilities

**Key teaching points during demo:**
- "This is just HTML/CSS/JS — no React, no build tools"
- "The AI is Azure OpenAI GPT-4o — same model as ChatGPT"
- "Every API call goes through a background service worker for CORS"
- "The extension only activates on specific websites (content scripts)"

### Slide 4: Architecture Walkthrough (5 min)

```
┌─────────────────────────────────────┐
│         Browser Extension           │
│                                     │
│  ┌──────────┐    ┌───────────────┐  │
│  │ Content  │←──→│  Background   │  │
│  │ Script   │    │  Service      │  │
│  │ (Chat UI)│    │  Worker       │  │
│  └──────────┘    │  (API Proxy)  │  │
│                  └───────┬───────┘  │
└──────────────────────────┼──────────┘
                           │ HTTPS
                    ┌──────┴──────┐
                    │  Azure APIs  │
                    │             │
                    │ • OpenAI    │
                    │ • Bot Svc   │
                    │ • Graph API │
                    └─────────────┘
```

**Explain:** Why we need a background worker → Content scripts can't make cross-origin API calls (CORS). The service worker acts as a proxy.

### Slide 5: Your Turn! (2 min)

> "Now you'll build a mini version of this in 30 minutes. Open the starter repo and follow the lab manual."

**Share the starter repo URL on screen.**

### Slide 6: Resources & Documentation (5 min)

| Resource | URL |
|----------|-----|
| Chrome Extension Docs | https://developer.chrome.com/docs/extensions/mv3/ |
| Azure OpenAI Quickstart | https://learn.microsoft.com/en-us/azure/ai-services/openai/quickstart |
| Azure Bot Service Docs | https://learn.microsoft.com/en-us/azure/bot-service/ |
| Microsoft AI Principles | https://www.microsoft.com/en-us/ai/principles-and-approach |
| USF AI GitHub | https://github.com/scim-microsoft/USF-AI-Workshop |
| Vibe Secure Framework | https://github.com/samarti_microsoft/vibesecure |
| Azure Free Account | https://azure.microsoft.com/en-us/free/ |

---

## 🔧 Part 2: Hands-On Lab (30 minutes)

### Prerequisites Checklist

- [ ] Chrome or Edge browser installed
- [ ] Text editor (VS Code recommended)
- [ ] Azure OpenAI API key (provided by instructor OR use free trial)
- [ ] Basic familiarity with HTML and JavaScript

### Step 1: Create the Project Structure (3 min)

Create a folder called `usf-ai-extension/` with these files:

```
usf-ai-extension/
├── manifest.json
├── content.js
├── background.js
├── styles.css
└── icon.png (any 48x48 PNG)
```

### Step 2: Write the Manifest (3 min)

Create `manifest.json`:

```json
{
  "manifest_version": 3,
  "name": "USF AI Assistant",
  "version": "1.0.0",
  "description": "A simple AI chatbot browser extension",
  "author": "Your Name",
  "permissions": ["activeTab", "storage"],
  "host_permissions": [
    "https://*.openai.azure.com/*"
  ],
  "background": {
    "service_worker": "background.js"
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"],
      "css": ["styles.css"],
      "run_at": "document_idle"
    }
  ],
  "content_security_policy": {
    "extension_pages": "script-src 'self'; object-src 'none';"
  },
  "icons": {
    "48": "icon.png"
  }
}
```

**Teaching point:** Explain each field — what `content_scripts` means, why we need `host_permissions`.

### Step 3: Build the Chat UI (5 min)

Create `content.js`:

```javascript
(function() {
    'use strict';

    // Don't inject twice
    if (document.getElementById('usf-ai-fab')) return;

    // ── Floating Action Button ──
    const fab = document.createElement('button');
    fab.id = 'usf-ai-fab';
    fab.textContent = '🤖';
    fab.title = 'Open AI Assistant';
    document.documentElement.appendChild(fab);

    // ── Chat Window ──
    const chat = document.createElement('div');
    chat.id = 'usf-ai-window';
    chat.style.display = 'none';
    chat.innerHTML = `
        <div id="usf-ai-header">
            <strong>🤖 AI Assistant</strong>
            <button id="usf-ai-close">✕</button>
        </div>
        <div id="usf-ai-messages"></div>
        <div id="usf-ai-input-area">
            <input type="text" id="usf-ai-input" placeholder="Ask me anything..." autocomplete="off">
            <button id="usf-ai-send">Send</button>
        </div>
    `;
    document.documentElement.appendChild(chat);

    // ── Toggle Chat ──
    fab.addEventListener('click', () => {
        const isOpen = chat.style.display !== 'none';
        chat.style.display = isOpen ? 'none' : 'flex';
        fab.style.display = isOpen ? '' : 'none';
    });

    document.getElementById('usf-ai-close').addEventListener('click', () => {
        chat.style.display = 'none';
        fab.style.display = '';
    });

    // ── Send Message ──
    function addMessage(text, sender) {
        const messages = document.getElementById('usf-ai-messages');
        const msg = document.createElement('div');
        msg.className = `usf-msg usf-msg-${sender}`;
        msg.textContent = text;
        messages.appendChild(msg);
        messages.scrollTop = messages.scrollHeight;
    }

    async function sendMessage() {
        const input = document.getElementById('usf-ai-input');
        const text = input.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        input.value = '';
        addMessage('Thinking...', 'bot');

        try {
            // Send to background worker (CORS proxy)
            const response = await chrome.runtime.sendMessage({
                action: 'askAI',
                question: text
            });

            // Remove "Thinking..."
            const messages = document.getElementById('usf-ai-messages');
            messages.removeChild(messages.lastChild);

            if (response && response.answer) {
                addMessage(response.answer, 'bot');
            } else {
                addMessage('Sorry, something went wrong. Try again!', 'bot');
            }
        } catch (err) {
            const messages = document.getElementById('usf-ai-messages');
            messages.removeChild(messages.lastChild);
            addMessage('Error: ' + err.message, 'bot');
        }
    }

    document.getElementById('usf-ai-send').addEventListener('click', sendMessage);
    document.getElementById('usf-ai-input').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    console.log('[AI Assistant] Chat widget loaded!');
})();
```

### Step 4: Build the Background Worker (5 min)

Create `background.js`:

```javascript
// ══════════════════════════════════════
// AI Assistant — Background Service Worker
// Handles API calls (CORS proxy)
// ══════════════════════════════════════

// ⚠️ REPLACE THESE with your Azure OpenAI values
const AZURE_OPENAI_ENDPOINT = 'https://YOUR-RESOURCE.openai.azure.com';
const AZURE_OPENAI_KEY = 'YOUR-API-KEY-HERE';
const AZURE_OPENAI_DEPLOYMENT = 'gpt-4o';
const API_VERSION = '2024-08-01-preview';

// System prompt — defines the AI's personality
const SYSTEM_PROMPT = `You are a helpful AI assistant embedded in a browser extension. 
You help university students with questions about technology, coding, and Azure.
Keep answers concise (under 150 words). Be friendly and encouraging.
If you don't know something, say so honestly.`;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'askAI') {
        callAzureOpenAI(request.question)
            .then(answer => sendResponse({ answer }))
            .catch(err => sendResponse({ error: err.message }));
        return true; // Keep message channel open for async response
    }
});

async function callAzureOpenAI(question) {
    const url = `${AZURE_OPENAI_ENDPOINT}/openai/deployments/${AZURE_OPENAI_DEPLOYMENT}/chat/completions?api-version=${API_VERSION}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': AZURE_OPENAI_KEY
        },
        body: JSON.stringify({
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                { role: 'user', content: question }
            ],
            max_tokens: 300,
            temperature: 0.7
        })
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(`Azure OpenAI error ${response.status}: ${err.error?.message || 'Unknown'}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

console.log('[AI Assistant] Background worker ready');
```

### Step 5: Style It (3 min)

Create `styles.css`:

```css
#usf-ai-fab {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #006747;
    color: white;
    font-size: 28px;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 999999;
    transition: transform 0.2s;
}
#usf-ai-fab:hover { transform: scale(1.1); }

#usf-ai-window {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 360px;
    height: 480px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    z-index: 999999;
    display: flex;
    flex-direction: column;
    font-family: 'Segoe UI', system-ui, sans-serif;
    overflow: hidden;
}

#usf-ai-header {
    background: #006747;
    color: white;
    padding: 12px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
#usf-ai-header button {
    background: none;
    border: none;
    color: white;
    font-size: 18px;
    cursor: pointer;
}

#usf-ai-messages {
    flex: 1;
    overflow-y: auto;
    padding: 12px;
}

.usf-msg {
    margin: 8px 0;
    padding: 10px 14px;
    border-radius: 12px;
    max-width: 85%;
    font-size: 14px;
    line-height: 1.4;
    word-wrap: break-word;
}
.usf-msg-user {
    background: #006747;
    color: white;
    margin-left: auto;
    border-bottom-right-radius: 4px;
}
.usf-msg-bot {
    background: #f0f0f0;
    color: #333;
    border-bottom-left-radius: 4px;
}

#usf-ai-input-area {
    display: flex;
    padding: 8px;
    border-top: 1px solid #eee;
    gap: 8px;
}
#usf-ai-input {
    flex: 1;
    padding: 10px 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 14px;
    outline: none;
}
#usf-ai-input:focus { border-color: #006747; }
#usf-ai-send {
    padding: 10px 16px;
    background: #006747;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
}
#usf-ai-send:hover { background: #106ebe; }
```

### Step 6: Load and Test (5 min)

1. Open `chrome://extensions` (or `edge://extensions`)
2. Enable **Developer mode** (toggle in top-right)
3. Click **Load unpacked**
4. Select your `usf-ai-extension/` folder
5. Navigate to any website
6. Click the 🤖 button in the bottom-right
7. Type a question and press Enter!

### Step 7: Customize Your AI (6 min — remaining time)

**Challenge ideas for students:**

| Challenge | Difficulty | Hint |
|-----------|-----------|------|
| Change the AI's personality | ⭐ Easy | Edit `SYSTEM_PROMPT` in background.js |
| Add a welcome message on chat open | ⭐ Easy | Call `addMessage()` in the click handler |
| Make it only work on your university website | ⭐ Easy | Change `matches` in manifest.json |
| Add conversation memory (multi-turn) | ⭐⭐ Medium | Store messages array, send full history to API |
| Add a "Clear chat" button | ⭐⭐ Medium | Add button to header, clear `usf-ai-messages` innerHTML |
| Show typing indicator | ⭐⭐ Medium | Animate "..." while waiting for response |
| Add dark mode | ⭐⭐ Medium | Detect `prefers-color-scheme` and swap CSS |
| Call a different API (weather, news) | ⭐⭐⭐ Hard | Add a new handler in background.js |

---

## 🏆 Hackathon Challenge

> **"Create a solution for the USF Community using Azure AI"**

**Ideas to pitch to students:**

| Project Idea | Azure Services | Difficulty |
|-------------|---------------|------------|
| Campus FAQ chatbot (answers questions about USF) | Azure OpenAI | ⭐⭐ |
| Study buddy that summarizes webpages | Azure OpenAI + Content extraction | ⭐⭐ |
| Accessibility assistant (reads page aloud) | Azure OpenAI + Azure Speech | ⭐⭐⭐ |
| Job posting analyzer (rates match to your resume) | Azure OpenAI | ⭐⭐⭐ |
| Campus safety alert extension | Azure OpenAI + Azure Maps | ⭐⭐⭐ |
| Research paper summarizer | Azure OpenAI + RAG | ⭐⭐⭐⭐ |

---

## 📚 Key Takeaways

1. **Browser extensions are powerful** — they run in the most-used application on any computer
2. **Azure AI is accessible** — GPT-4o via API is just a REST call
3. **Security matters from day 1** — never hardcode keys in production, always escape HTML, follow Microsoft AI Principles
4. **Start simple, iterate fast** — your first extension can be 4 files and 100 lines of code
5. **The browser is the new platform** — extensions are apps that meet users where they already are

---

## 🔒 Microsoft AI Principles Checklist (for Hackathon Submissions)

Before submitting your hackathon project, verify:

- [ ] **Fairness** — Does your AI treat all users equitably?
- [ ] **Reliability** — Does it work when the AI service is unavailable?
- [ ] **Privacy** — Are you sending only necessary data to the AI?
- [ ] **Transparency** — Is it clear when content is AI-generated?
- [ ] **Inclusiveness** — Is it accessible (keyboard nav, screen reader)?
- [ ] **Accountability** — Can you explain what your AI does and why?

---

## 📎 Instructor Notes

### Before the Workshop
- [ ] Pre-create Azure OpenAI resource and deploy GPT-4o
- [ ] Generate API keys for students (or use a shared key with rate limiting)
- [ ] Test the starter code on both Chrome and Edge
- [ ] Have the USF AI demo ready on `any webpage`

### During the Workshop
- Walk around during the lab — most issues are typos in `manifest.json`
- Common errors:
  - "Service worker registration failed" → syntax error in `background.js`
  - "Cannot read property of null" → element ID typo in `content.js`
  - "401 Unauthorized" → wrong API key or endpoint
  - Extension doesn't appear → didn't enable Developer mode

### After the Workshop
- Share the GitHub repo link for reference
- Point students to the Azure free tier for continued building
- Encourage them to form teams for the hackathon challenge

---

**Workshop created by:** USF Hackathon Workshop  
**Based on:** USF AI USF AI Assistant (https://github.com/scim-microsoft/USF-AI-Workshop)  
**Security Framework:** Vibe Secure (https://github.com/samarti_microsoft/vibesecure)

