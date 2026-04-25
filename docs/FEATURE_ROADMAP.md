# Feature Improvements & Expansion Roadmap

This document outlines how to evolve the USF AI Assistant from a basic browser extension into a full-featured, production-grade AI assistant platform.

---

## 1. Content Safety — Azure AI Content Safety

The current extension sends user input directly to Azure OpenAI with no moderation layer. In production, you **must** add content filtering to prevent harmful, hateful, or inappropriate content from being processed or returned.

### What to Add

- **Azure AI Content Safety** — A dedicated service that analyzes text (and images) for harmful content across four categories: violence, self-harm, sexual content, and hate speech.
- Each category returns a severity score (0–6) that you can threshold to block or flag content.

### Implementation Approach

1. Create an Azure AI Content Safety resource in the Azure Portal.
2. Before sending the user's message to Azure OpenAI, call the Content Safety **Text Analyze** endpoint.
3. If any category exceeds your severity threshold, return a safe fallback message instead of forwarding to the model.
4. Optionally, also analyze the model's **response** before displaying it to the user.

```javascript
// Example: Pre-screen user input
const safetyResponse = await fetch(`${CONTENT_SAFETY_ENDPOINT}/contentsafety/text:analyze?api-version=2024-09-01`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': CONTENT_SAFETY_KEY
    },
    body: JSON.stringify({
        text: userMessage,
        categories: ["Hate", "SelfHarm", "Sexual", "Violence"]
    })
});
```

### Resources

- [Azure AI Content Safety Documentation](https://learn.microsoft.com/en-us/azure/ai-services/content-safety/)
- [Content Safety Quickstart](https://learn.microsoft.com/en-us/azure/ai-services/content-safety/quickstart-text)

---

## 2. Language Service — Azure AI Language

Enhance the assistant's ability to understand user intent and extract structured information from natural language.

### Capabilities to Explore

| Feature | Use Case |
|---|---|
| **Named Entity Recognition (NER)** | Extract course names, professor names, building locations from queries |
| **Sentiment Analysis** | Gauge student frustration to escalate or soften responses |
| **Key Phrase Extraction** | Summarize long questions into searchable terms |
| **Language Detection** | Detect the user's language and respond accordingly (USF has a diverse student body) |
| **Custom Text Classification** | Route queries to the right knowledge domain (admissions, IT help, academics) |

### Implementation

1. Create an Azure AI Language resource.
2. Use the REST API or the `@azure/ai-language-text` SDK to analyze incoming messages.
3. Feed the extracted entities and intent into your system prompt to improve response relevance.

### Resources

- [Azure AI Language Overview](https://learn.microsoft.com/en-us/azure/ai-services/language-service/)
- [Text Analytics SDK for JavaScript](https://learn.microsoft.com/en-us/javascript/api/overview/azure/ai-language-text-readme)

---

## 3. Retrieval-Augmented Generation (RAG)

The current assistant only knows what GPT-4o was trained on. RAG lets you ground responses in **your own data** — campus documents, course catalogs, FAQs, policies, etc.

### Architecture

```
User Query
    │
    ▼
┌─────────────────────┐
│  Azure AI Search     │  ← Index your documents (PDFs, web pages, databases)
│  (vector + keyword)  │
└────────┬────────────┘
         │ Top-K relevant chunks
         ▼
┌─────────────────────┐
│  Azure OpenAI        │  ← System prompt + retrieved context + user query
│  GPT-4o              │
└─────────────────────┘
         │
         ▼
    Grounded Answer
```

### Steps to Implement

1. **Ingest documents** — Use Azure AI Search to index campus PDFs, web content, and FAQ databases.
2. **Generate embeddings** — Use Azure OpenAI's `text-embedding-ada-002` (or newer) to create vector representations.
3. **Hybrid search** — Combine vector similarity with keyword search for the best retrieval quality.
4. **Augment the prompt** — Inject the top-K retrieved chunks into the system prompt before calling GPT-4o.

### Azure Services Involved

- **Azure AI Search** — Full-text + vector search index
- **Azure Blob Storage** — Store source documents
- **Azure OpenAI** — Embeddings model + chat completion model
- **Azure AI Document Intelligence** (optional) — Extract text from scanned PDFs and forms

### Resources

- [RAG with Azure AI Search](https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview)
- [Azure OpenAI on Your Data](https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/use-your-data)

---

## 4. QnA Maker / Custom Question Answering

For structured FAQ scenarios (e.g., "What are the library hours?" or "How do I add/drop a course?"), **Custom Question Answering** (the successor to QnA Maker) provides a purpose-built solution.

### What It Does

- Import FAQ pages, documents, or manual Q&A pairs into a knowledge base.
- The service handles matching user questions to the best answer — no prompt engineering needed.
- Supports follow-up prompts, multi-turn conversations, and confidence thresholds.

### When to Use It vs. RAG

| Scenario | Best Approach |
|---|---|
| Structured FAQ with known Q&A pairs | Custom Question Answering |
| Open-ended questions over large document sets | RAG with Azure AI Search |
| Both structured and unstructured needs | Combine both — route by confidence score |

### Resources

- [Custom Question Answering](https://learn.microsoft.com/en-us/azure/ai-services/language-service/question-answering/overview)

---

## 5. Azure Bot Service — Multi-Channel Deployment

The browser extension is one channel. **Azure Bot Service** lets you deploy the same AI logic across multiple platforms with minimal additional code.

### Supported Channels

- **Microsoft Teams** — Embed the assistant as a Teams app for students and faculty
- **Telegram** — Reach students on their preferred messaging platform
- **Slack** — For student organizations and club workspaces
- **Web Chat** — Embed a chat widget on the USF website directly
- **SMS / Email** — Via integration with Azure Communication Services
- **WhatsApp** — Via Twilio adapter

### Architecture

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  Browser Ext  │    │  Teams App   │    │  Telegram Bot │
└──────┬───────┘    └──────┬───────┘    └──────┬───────┘
       │                   │                   │
       └───────────┬───────┴───────────────────┘
                   ▼
          ┌─────────────────┐
          │  Azure Bot       │  ← Unified bot logic
          │  Service         │
          └────────┬────────┘
                   ▼
          ┌─────────────────┐
          │  Azure OpenAI    │
          │  + AI Search     │
          │  + Content Safety│
          └─────────────────┘
```

### Steps to Get Started

1. Create a **Bot Service** resource in Azure Portal (choose Multi-Tenant).
2. Use the **Bot Framework SDK for JavaScript** to build your bot logic.
3. Register channels (Teams, Telegram, etc.) in the Azure Portal under your bot's **Channels** blade.
4. Migrate your `callAzureOpenAI()` logic from `background.js` into the bot's message handler.

### Resources

- [Azure Bot Service Documentation](https://learn.microsoft.com/en-us/azure/bot-service/)
- [Bot Framework SDK for JavaScript](https://learn.microsoft.com/en-us/javascript/api/botbuilder/)
- [Connect a Bot to Teams](https://learn.microsoft.com/en-us/azure/bot-service/channel-connect-teams)
- [Connect a Bot to Telegram](https://learn.microsoft.com/en-us/azure/bot-service/channel-connect-telegram)

---

## 6. Additional Improvements

### Conversation History & Memory

- Use `chrome.storage.local` or a backend database to persist conversation history across sessions.
- Implement a sliding context window so the model remembers previous messages in the current session.

### User Authentication

- Integrate Microsoft Entra ID (Azure AD) to authenticate USF students via SSO.
- Personalize responses based on the user's role (student, faculty, staff).

### Accessibility

- Add keyboard navigation support to the chat widget.
- Ensure WCAG 2.1 AA compliance (contrast ratios, screen reader labels, focus management).
- Support text-to-speech and speech-to-text via **Azure AI Speech**.

### Analytics & Monitoring

- Use **Azure Application Insights** to track usage, latency, and error rates.
- Log anonymized conversation data to identify common questions and improve the knowledge base.

### Offline Fallback

- Cache common Q&A pairs locally so the extension provides basic answers even without connectivity.

---

## Expansion Roadmap

```
Phase 1 — Foundation (Current)
  ✅ Browser extension with Azure OpenAI GPT-4o
  ✅ Basic chat UI with FAB trigger
  ✅ Single-turn conversation

Phase 2 — Safety & Quality
  ○ Add Azure AI Content Safety (pre/post filtering)
  ○ Implement conversation history (multi-turn)
  ○ Add error handling and retry logic
  ○ Secure API key via Azure Key Vault + proxy backend

Phase 3 — Knowledge Grounding
  ○ Build a RAG pipeline with Azure AI Search
  ○ Index USF-specific documents (catalogs, policies, FAQs)
  ○ Add Custom Question Answering for structured FAQs
  ○ Integrate Azure AI Language for entity extraction and intent routing

Phase 4 — Multi-Channel
  ○ Deploy Azure Bot Service
  ○ Connect Microsoft Teams channel
  ○ Connect Telegram channel
  ○ Embed Web Chat on USF website

Phase 5 — Production Hardening
  ○ Add Microsoft Entra ID authentication
  ○ Implement rate limiting and abuse prevention
  ○ Enable Application Insights monitoring
  ○ Achieve WCAG 2.1 AA accessibility compliance
  ○ Add speech input/output via Azure AI Speech

Phase 6 — Advanced Features
  ○ Multi-language support with Azure AI Translator
  ○ Document upload and analysis (Azure AI Document Intelligence)
  ○ Proactive notifications (class reminders, deadlines)
  ○ Integration with USF Canvas LMS API
```

---

> This roadmap is a guide — not a requirement. Pick the features that matter most for your use case, validate with users, and iterate. The best extensions are built one improvement at a time.
