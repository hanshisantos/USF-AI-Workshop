# USF AI Assistant — Troubleshooting Guide

## Loading the Extension

1. Open **edge://extensions** (Edge) or **chrome://extensions** (Chrome)
2. Enable **Developer mode** (toggle in top-right)
3. Click **Load unpacked** and select the `usf-ai-extension` folder
4. Navigate to any website and look for the 🤖 button in the bottom-right corner

---

## Common Errors

### "Failed to fetch" or "Failed to reach Azure OpenAI"
- **Cause:** The Azure OpenAI endpoint is unreachable, the deployment doesn't exist, or API credentials are wrong.
- **Fix:**
  1. Open `background.js` and verify `AZURE_OPENAI_ENDPOINT` and `AZURE_OPENAI_KEY` are correct
  2. Confirm the deployment name (`gpt-4o`) matches your Azure Portal → **Model deployments** list
  3. Check your network connection — corporate firewalls may block the request

### "Service worker registration failed"
- **Cause:** Syntax error in `background.js`.
- **Fix:** Open the browser DevTools console (F12) and check for JavaScript errors. Paste the error into your AI assistant to fix it.

### "401 Unauthorized"
- **Cause:** Invalid API key or endpoint.
- **Fix:** Double-check the `AZURE_OPENAI_KEY` and `AZURE_OPENAI_ENDPOINT` values in `background.js`.

### Extension doesn't appear on the page
- **Cause:** Developer mode not enabled, or the extension failed to load.
- **Fix:**
  1. Go to **edge://extensions** and ensure **Developer mode** is ON
  2. Check for a red error banner on the extension card
  3. Click the reload button (🔄) on the extension, then refresh the page

### Chat opens but "Thinking..." never resolves
- **Cause:** The service worker is stale or crashed.
- **Fix:**
  1. Go to **edge://extensions**
  2. **Remove** the extension completely
  3. Click **Load unpacked** and re-select the folder
  4. Refresh the webpage

---

## Inspecting the Service Worker

1. Go to **edge://extensions**
2. Find "USF AI Assistant" and click **"Inspect views: service worker"**
3. A DevTools window opens showing the background.js console
4. Look for `[USF AI] Background worker ready` — if missing, the worker didn't load
5. Try sending a chat message and watch for `[USF AI] Calling:` log lines

---

## Reloading After Code Changes

After editing any file (`background.js`, `content.js`, `styles.css`):
1. Go to **edge://extensions** → click the **reload** button (🔄) on the extension
2. **Refresh** the webpage (Ctrl+R)
