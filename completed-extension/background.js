// ══════════════════════════════════════════════
// USF AI Assistant — Background Service Worker (COMPLETED)
// Reference solution for instructors
// ══════════════════════════════════════════════

// ⚠️ REPLACE THESE with your Azure OpenAI values
const AZURE_OPENAI_ENDPOINT = 'https://YOUR-RESOURCE.openai.azure.com';
const AZURE_OPENAI_KEY = 'YOUR-API-KEY-HERE';
const AZURE_OPENAI_DEPLOYMENT = 'gpt-4o';
const API_VERSION = '2024-08-01-preview';

const SYSTEM_PROMPT = `You are USF AI, a helpful assistant for University of South Florida students.
You help with questions about campus life, studying, technology, and general knowledge.
Keep answers concise (under 150 words). Be friendly and encouraging.
Always identify yourself as USF AI. Go Bulls! 🐂`;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'askAI') {
        callAzureOpenAI(request.question)
            .then(answer => sendResponse({ answer }))
            .catch(err => sendResponse({ error: err.message }));
        return true;
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

console.log('[USF AI] Background worker ready 🐂');
