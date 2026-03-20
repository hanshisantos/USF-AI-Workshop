// ══════════════════════════════════════════════
// USF AI Assistant — Content Script
// This runs on every webpage and creates the chat UI
// ══════════════════════════════════════════════

(function() {
    'use strict';

    // Prevent double-injection
    if (document.getElementById('usf-ai-fab')) return;

    // ── TODO 1: Create the Floating Action Button (FAB) ──
    // Create a button element, set its id to 'usf-ai-fab'
    // Set the text to '🐂' (USF Bulls!) and append it to the page
    // HINT: document.createElement('button')
    // HINT: document.documentElement.appendChild(fab)

    // YOUR CODE HERE:



    // ── TODO 2: Create the Chat Window ──
    // Create a div with id 'usf-ai-chat'
    // Set its innerHTML to include:
    //   - A header with title and close button
    //   - A messages container (id: 'usf-ai-messages')
    //   - An input area with text input and send button
    // HINT: Look at the completed-extension for the HTML structure

    // YOUR CODE HERE:



    // ── TODO 3: Wire up the FAB click to toggle the chat ──
    // When FAB is clicked, show the chat and hide the FAB
    // When close button is clicked, hide the chat and show the FAB

    // YOUR CODE HERE:



    // ── Helper: Add a message to the chat ──
    function addMessage(text, sender) {
        const messages = document.getElementById('usf-ai-messages');
        if (!messages) return;
        const msg = document.createElement('div');
        msg.className = `usf-msg usf-msg-${sender}`;
        msg.textContent = text;
        messages.appendChild(msg);
        messages.scrollTop = messages.scrollHeight;
    }

    // ── TODO 4: Send message to the AI ──
    // When the user clicks Send or presses Enter:
    //   1. Get the text from the input
    //   2. Call addMessage(text, 'user') to show their message
    //   3. Call addMessage('Thinking...', 'bot') as a placeholder
    //   4. Send a message to the background worker:
    //      chrome.runtime.sendMessage({ action: 'askAI', question: text })
    //   5. When the response comes back, remove "Thinking..." and show the answer
    // HINT: chrome.runtime.sendMessage returns a Promise

    // YOUR CODE HERE:



    console.log('[USF AI] Chat widget loaded! 🐂');
})();
