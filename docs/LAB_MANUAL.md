# Azure AI Browser Extension Workshop
## Lab Manual — Build Your First AI-Powered Browser Extension

**Author:** Santos Martinez  
**Contributors:** William Gonzalez, Kyarra Gutierrez, Andrea Martini, David Warm, Andre Rodrigues  
**Event:** Hackabull  
**Date:** Saturday, April 25th, 1:15 PM – 2:15 PM  
**Location:** Muma College of Business (4202 E Fowler Ave, Tampa, FL) — Room #115  

**Duration:** 1 hour (30-min demo + 30-min hands-on)  
**Audience:** University hackers, hackathon participants, beginners  
**Prerequisites:** A laptop with a Chromium-based browser (Edge, Chrome, Brave, etc.), VS Code with GitHub Copilot (or access to any AI assistant)  
**Goal:** Build a working AI chatbot browser extension using a single AI prompt + Azure OpenAI

---

## 🎯 Workshop Overview

| Segment | Time | Activity |
|---------|------|----------|
| **Part 1: Demo** | 0:00–0:30 | Hacker Leader walks through the architecture, shows USF AI, explains Azure services |
| **Part 2: Lab** | 0:30–1:00 | Hackers vibe-code a full AI extension using a single prompt |

### What Hackers Will Build

A browser extension (works on any Chromium-based browser) that:
1. Shows a floating chat button on any webpage
2. Lets users type a question
3. Sends it to Azure OpenAI (GPT-4o) for a response
4. Displays the AI answer in the chat window

**No backend needed.** The extension calls Azure APIs directly.  
**No prior coding experience needed.** Hackers will generate the entire extension with a single AI prompt — this is **vibe coding**.

---

## 📋 Part 1: Presenter Demo Script (30 minutes)

### Slide 1: What Are Browser Extensions? (3 min)

> "Browser extensions are mini-applications that run inside any Chromium-based browser — Edge, Chrome, Brave, Opera, and more. They can read web pages, add UI elements, and call APIs — all with JavaScript."

**Key concepts to explain:**
- **Manifest V3** — the Chromium extension standard (JSON config file)
- **Content Script** — JavaScript injected into web pages
- **Background Service Worker** — Runs in the background, handles API calls
- **Popup/Side Panel** — Extension's own UI

**Show:** `edge://extensions` (or `chrome://extensions`) in developer mode

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

> "Now you'll build a mini version of this in 30 minutes using a single AI prompt. Open VS Code, fire up Copilot, and follow the lab manual. You're about to vibe code your first browser extension."

**Share the starter repo URL on screen.**

### Slide 6: Resources & Documentation (5 min)

| Resource | URL |
|----------|-----|
| Chromium Extension Docs | https://developer.chrome.com/docs/extensions/mv3/ |
| Edge Extension Docs | https://learn.microsoft.com/en-us/microsoft-edge/extensions-chromium/ |
| Azure OpenAI Quickstart | https://learn.microsoft.com/en-us/azure/ai-services/openai/quickstart |
| Azure Bot Service Docs | https://learn.microsoft.com/en-us/azure/bot-service/ |
| Microsoft AI Principles | https://www.microsoft.com/en-us/ai/principles-and-approach |
| USF AI GitHub | https://github.com/hanshisantos/USF-AI-Workshop |
| Azure Free Account | https://azure.microsoft.com/en-us/free/ |

---

## 🔧 Part 2: Hands-On Lab (30 minutes)

### Prerequisites Checklist

- [ ] A Chromium-based browser installed (Edge, Chrome, Brave, etc.)
- [ ] **GitHub Copilot** (in VS Code) or access to **ChatGPT / any AI assistant**
- [ ] Azure OpenAI API key (provided by Hacker Leader OR use free trial)
- [ ] VS Code installed

> **This lab is designed for AI-assisted development ("vibe coding").** You will use a single prompt to generate your entire extension, then configure and test it. No prior JavaScript experience required!

---

### Step 1: Set Up Your Workspace (2 min)

1. Open **VS Code**
2. Create a new empty folder called `usf-ai-extension`
3. Open that folder in VS Code (`File → Open Folder`)

---

### Step 2: Generate the Entire Extension With One Prompt (5 min)

Open your AI coding assistant (GitHub Copilot Chat, ChatGPT, or any AI tool) and paste the following prompt:

> **Copy this entire prompt and paste it into your AI assistant:**

~~~
Build me a Chromium browser extension (Manifest V3) called "USF AI Assistant" with these 4 files:

1. **manifest.json** — Manifest V3, name "USF AI Assistant", version "1.0.0", permissions: activeTab and storage, host_permissions for "https://*.openai.azure.com/*", background service worker (background.js), content script that injects content.js and styles.css on all URLs at document_idle, CSP: script-src 'self'; object-src 'none', icon: icon.png (48px).

2. **content.js** — An IIFE that:
   - Creates a floating action button (FAB) in the bottom-right corner with a 🤖 emoji
   - Creates a chat window (hidden by default) with: a header bar (title "🤖 AI Assistant" + close button), a scrollable messages area, and an input bar with a text field and Send button
   - Toggles the chat open/closed when clicking the FAB or close button
   - On first open, displays a welcome message: "Hey there, Bull! 🐂 I'm your AI Assistant. Ask me anything!"
   - Has an addMessage(text, sender) function that appends styled message bubbles (sender is 'user' or 'bot')
   - Has a sendMessage() function that: adds the user message, shows "Thinking...", sends the question to the background worker via the browser's runtime.sendMessage API with action 'askAI', removes the "Thinking..." message, and displays the response or error
   - Enter key and Send button both trigger sendMessage()
   - Includes a guard to prevent double-injection

3. **background.js** — A service worker that:
   - Has config constants at the top: AZURE_OPENAI_ENDPOINT (placeholder 'https://YOUR-RESOURCE.openai.azure.com'), AZURE_OPENAI_KEY (placeholder 'YOUR-API-KEY-HERE'), AZURE_OPENAI_DEPLOYMENT ('gpt-4o'), API_VERSION ('2024-08-01-preview')
   - Has a SYSTEM_PROMPT that says: "You are a helpful AI assistant for university students. Keep answers concise (under 150 words). Be friendly and encouraging."
   - Listens for messages with action 'askAI', calls Azure OpenAI chat completions endpoint, returns the answer
   - Uses fetch with POST, Content-Type application/json, api-key header, sends system + user messages, max_tokens 300, temperature 0.7
   - Returns true from the listener to keep the async channel open

4. **styles.css** — Styles for the extension using USF green (#006747) as the primary color:
   - FAB: fixed bottom-right, 56px circle, green background, white text, z-index 999999, scale hover effect
   - Chat window: fixed bottom-right, 370x500px, white background, rounded corners, shadow, flex column layout
   - Header: green gradient background, white text, flex row with space-between
   - Messages area: flex 1, scrollable, light background
   - Message bubbles: rounded, max-width 85%, fade-in animation. User messages: green background, right-aligned. Bot messages: white with border, left-aligned
   - Input area: flex row, text input with green focus border, green send button

Output each file with its complete content. Do not use any frameworks or build tools — plain HTML/CSS/JS only.
~~~

**What just happened?** You described the entire application to AI and it generated all the code for you. This is **vibe coding** — you focus on *what* you want, and AI writes the *how*.

---

### Step 3: Create the Files (3 min)

Take the AI's output and create each file in your `usf-ai-extension/` folder:

```
usf-ai-extension/
├── manifest.json
├── content.js
├── background.js
└── styles.css
```

**If using GitHub Copilot in VS Code:** You can ask Copilot to create the files directly in your workspace. Use the `/new` command or ask it to "create these files in my workspace."

**If using ChatGPT or another web-based AI:** Copy each file's content and create the files manually in VS Code.

---

### Step 4: Add Your API Key (2 min)

Open `background.js` and replace the two placeholder values at the top:

```javascript
const AZURE_OPENAI_ENDPOINT = 'https://YOUR-RESOURCE.openai.azure.com';  // ← Replace
const AZURE_OPENAI_KEY = 'YOUR-API-KEY-HERE';                            // ← Replace
```

> **Your Hacker Leader will provide the endpoint and key on screen.** If you're using your own Azure account, use your own values.

⚠️ **Security note:** Never commit API keys to a public repo. This is fine for a hackathon prototype, but in production you'd use a backend proxy or Azure Key Vault.

---

### Step 5: Load and Test (5 min)

1. Open `edge://extensions` (or `chrome://extensions` for Chrome, `brave://extensions` for Brave, etc.)
2. Enable **Developer mode** (toggle in top-right)
3. Click **Load unpacked**
4. Select your `usf-ai-extension/` folder
5. Navigate to any website (e.g., `https://www.usf.edu`)
6. Look for the 🤖 button in the bottom-right corner
7. Click it, type a question, and press Enter!

**Troubleshooting — ask your AI assistant!** If something doesn't work, paste the error message back into your AI tool and ask it to fix the code. Common issues:

| Error | Likely Cause | Fix |
|-------|-------------|-----|
| "Service worker registration failed" | Syntax error in `background.js` | Paste the error into your AI tool |
| Nothing appears on the page | `content.js` error or manifest issue | Check `edge://extensions` for errors |
| "401 Unauthorized" | Wrong API key or endpoint | Double-check values in `background.js` |
| Extension not showing | Developer mode not enabled | Toggle it on, then reload |

---

### Step 6: Customize With More Prompts (13 min — remaining time)

Now that your base extension works, **keep vibe coding!** Use more prompts to customize it. Here are ready-to-use follow-up prompts:

**⭐ Easy — Personalize It:**
> *"Change the AI's personality in the SYSTEM_PROMPT to act as a [pirate / surfer / medieval knight / your choice]. Make it fun and in-character."*

**⭐ Easy — Brand It:**
> *"Update the extension to use my school's colors and mascot. Change the FAB emoji, header title, and color scheme."*

**⭐⭐ Medium — Add Conversation Memory:**
> *"Modify background.js to store the conversation history in an array and send the full message history to Azure OpenAI on each request, so the AI remembers previous messages in the chat."*

**⭐⭐ Medium — Add a Clear Chat Button:**
> *"Add a 🗑️ button next to the close button in the chat header that clears all messages and resets the conversation."*

**⭐⭐ Medium — Dark Mode:**
> *"Add automatic dark mode support that detects the user's system preference using prefers-color-scheme and adjusts the chat window colors accordingly."*

**⭐⭐⭐ Hard — Summarize the Current Page:**
> *"Add a 'Summarize this page' button that extracts the main text content from the current webpage and sends it to Azure OpenAI with a prompt asking for a concise summary."*

**⭐⭐⭐ Hard — Voice Input:**
> *"Add a microphone button that uses the Web Speech API to convert voice input to text, then sends it as a chat message."*

> **Pro tip:** After each change, go to `edge://extensions` and click the **reload** button (🔄) on your extension, then refresh the page to test.

---

### Reference: What the Files Do

If you want to understand the code your AI generated, here's a quick breakdown:

| File | Role | Key Concept |
|------|------|------------|
| `manifest.json` | Extension config — tells the browser what your extension does | **Manifest V3** — the required format for Chromium-based browser extensions |
| `content.js` | Injected into every webpage — builds the chat UI | **Content Script** — runs in the context of web pages |
| `background.js` | Runs separately — makes API calls to Azure OpenAI | **Service Worker** — handles CORS by proxying API requests |
| `styles.css` | Styles the FAB button and chat window | **Injected CSS** — scoped to your extension's elements |

**Why do we need a background worker?** Content scripts can't make cross-origin API calls (blocked by CORS). The service worker acts as a proxy — the content script sends it a message, it calls the API, and sends back the response.

---

## 🏆 Hackathon Challenge

> **"Create a solution for the USF Community using Azure AI"**

**Ideas to pitch to hackers:**

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
4. **Vibe coding is real** — you can build a working app with a single well-crafted prompt, then iterate with more prompts
5. **Start simple, iterate fast** — your first extension can be 4 files and 100 lines of code
6. **The browser is the new platform** — extensions are apps that meet users where they already are

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
- [ ] Generate API keys for hackers (or use a shared key with rate limiting)
- [ ] Test the single-prompt output on Edge, Chrome, or any Chromium-based browser
- [ ] Have the completed-extension folder ready as a backup/reference
- [ ] Ensure hackers have GitHub Copilot or access to ChatGPT/similar

### During the Workshop
- **The single-prompt approach works ~90% of the time.** If a hacker's output has issues, tell them to paste the error back into their AI tool — that's part of the vibe coding workflow
- Walk around during the lab — most issues are typos in API key configuration
- If AI-generated code doesn't work, the `completed-extension/` folder in the repo has a working reference
- Common errors:
  - "Service worker registration failed" → AI generated invalid JS — paste error back into AI to fix
  - "401 Unauthorized" → wrong API key or endpoint
  - Extension doesn't appear → didn't enable Developer mode
  - Chat doesn't open → ID mismatch between CSS and JS — tell hacker to ask AI to fix it

### After the Workshop
- Share the GitHub repo link for reference
- Point hackers to the Azure free tier for continued building
- Encourage them to form teams for the hackathon challenge
- Remind them: **the best hackathon projects start with a great prompt**

---

**Workshop created by:** Santos Martinez  
**Contributors:** William Gonzalez, Kyarra Gutierrez, Andrea Martini, David Warm, Andre Rodrigues  
**Event:** Hackabull  
**Based on:** USF AI Assistant (https://github.com/hanshisantos/USF-AI-Workshop)  


