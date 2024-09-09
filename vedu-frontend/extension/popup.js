/* global chrome */
let chatId = null;

chrome.runtime.sendMessage({ type: 'REQUEST_CHAT_ID' }, (response) => {
    if (chrome.runtime.lastError) {
        console.error('Runtime error:', chrome.runtime.lastError);
    } else if (response && response.chatId) {
        console.log('Chat ID found:', response.chatId);
        chatId = response.chatId;
        document.getElementById('chatIdDisplay').textContent = `Chat ID: ${response.chatId}`;
    } else {
        console.error('Chat ID not found.');
        document.getElementById('chatIdDisplay').textContent = 'Chat ID not found.';
    }
});

document.getElementById('fetchSummary').addEventListener('click', () => {
    if (chatId) {
        console.log("Chat ID found:", chatId);
        fetchSummary(chatId);
    } else {
        console.error('Chat ID not found.');
        alert('Chat ID not found. Please ensure you are on the correct page.');
    }
});

async function fetchSummary(chatId) {
    console.log('Fetching summary for chat:', chatId);
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/chats/${chatId}/summary`, {
            method: 'GET',
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById('summary').textContent = data.summary.summary;
        } else {
            document.getElementById('summary').textContent = 'Error fetching summary.';
        }
    } catch (error) {
        console.error('Error fetching summary:', error);
        document.getElementById('summary').textContent = 'Error fetching summary.';
    }
}
