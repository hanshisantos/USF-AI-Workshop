// ══════════════════════════════════════════════
// USF AI Assistant — Content Script (COMPLETED)
// Reference solution for instructors
// ══════════════════════════════════════════════

(function() {
    'use strict';

    if (document.getElementById('usf-ai-fab')) return;

    // ── FAB Button ──
    const fab = document.createElement('button');
    fab.id = 'usf-ai-fab';
    fab.textContent = '🐂';
    fab.title = 'Open USF AI Assistant';
    document.documentElement.appendChild(fab);

    // ── Chat Window ──
    const chat = document.createElement('div');
    chat.id = 'usf-ai-chat';
    chat.style.display = 'none';
    chat.innerHTML = `
        <div id="usf-ai-header">
            <strong>🐂 USF AI Assistant</strong>
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
        chat.style.display = 'flex';
        fab.style.display = 'none';
        document.getElementById('usf-ai-input').focus();
        // Welcome message on first open
        const messages = document.getElementById('usf-ai-messages');
        if (messages.children.length === 0) {
            addMessage('Hey there, Bull! 🐂 I\'m USF AI — your campus assistant. Ask me anything!', 'bot');
        }
    });

    document.getElementById('usf-ai-close').addEventListener('click', () => {
        chat.style.display = 'none';
        fab.style.display = '';
    });

    // ── Add Message ──
    function addMessage(text, sender) {
        const messages = document.getElementById('usf-ai-messages');
        const msg = document.createElement('div');
        msg.className = `usf-msg usf-msg-${sender}`;
        msg.textContent = text;
        messages.appendChild(msg);
        messages.scrollTop = messages.scrollHeight;
    }

    // ── Send Message ──
    async function sendMessage() {
        const input = document.getElementById('usf-ai-input');
        const text = input.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        input.value = '';
        addMessage('Thinking...', 'bot');

        try {
            const response = await chrome.runtime.sendMessage({
                action: 'askAI',
                question: text
            });

            // Remove "Thinking..."
            const messages = document.getElementById('usf-ai-messages');
            messages.removeChild(messages.lastChild);

            if (response && response.answer) {
                addMessage(response.answer, 'bot');
            } else if (response && response.error) {
                addMessage('Oops: ' + response.error, 'bot');
            } else {
                addMessage('Something went wrong. Try again!', 'bot');
            }
        } catch (err) {
            const messages = document.getElementById('usf-ai-messages');
            messages.removeChild(messages.lastChild);
            addMessage('Connection error: ' + err.message, 'bot');
        }
    }

    document.getElementById('usf-ai-send').addEventListener('click', sendMessage);
    document.getElementById('usf-ai-input').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    console.log('[USF AI] Chat widget loaded! 🐂');
})();
