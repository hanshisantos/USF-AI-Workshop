// ══════════════════════════════════════════════
// USF AI Assistant — Background Service Worker
// Handles API calls to Azure OpenAI (CORS proxy)
// ══════════════════════════════════════════════

// ── TODO 5: Add your Azure OpenAI credentials ──
// Your instructor will provide these values
const AZURE_OPENAI_ENDPOINT = 'https://YOUR-RESOURCE.openai.azure.com';
const AZURE_OPENAI_KEY = 'YOUR-API-KEY-HERE';
const AZURE_OPENAI_DEPLOYMENT = 'gpt-4o';
const API_VERSION = '2024-08-01-preview';

// ── TODO 6: Write a system prompt for your AI ──
// This defines your AI's personality and purpose
// Ideas: Campus guide, study helper, coding tutor, wellness advisor
const SYSTEM_PROMPT = `You are USF AI, a helpful assistant for University of South Florida students.
You help with questions about campus life, studying, technology, and general knowledge.
Keep answers concise (under 150 words). Be friendly and encouraging.
Always identify yourself as USF AI. Go Bulls! 🐂`;

// ── Message Handler ──
// Listens for messages from the content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'askAI') {
        // TODO 7: Call the Azure OpenAI API
        // Use the callAzureOpenAI function below
        // HINT: callAzureOpenAI(request.question)
        //         .then(answer => sendResponse({ answer }))
        //         .catch(err => sendResponse({ error: err.message }));

        // YOUR CODE HERE:


        return true; // Keep message channel open for async response
    }
});

// ── Azure OpenAI API Call ──
// TODO 8: Complete this function
async function callAzureOpenAI(question) {
    const url = `${AZURE_OPENAI_ENDPOINT}/openai/deployments/${AZURE_OPENAI_DEPLOYMENT}/chat/completions?api-version=${API_VERSION}`;

    // HINT: Use fetch() with method POST
    // Headers: 'Content-Type': 'application/json', 'api-key': AZURE_OPENAI_KEY
    // Body: JSON with messages array (system prompt + user question)
    // Return: data.choices[0].message.content

    // YOUR CODE HERE:

}

console.log('[USF AI] Background worker ready 🐂');
