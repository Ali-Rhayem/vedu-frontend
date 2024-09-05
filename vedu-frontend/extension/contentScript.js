/* global chrome */
console.log("Content script loaded and running.");

// Ensure chatId is only declared once
const urlPath = window.location.pathname;
const chatId = urlPath.split('/').pop(); // Extract the chatId from the URL path
console.log('URL Path:', urlPath);
console.log('Extracted Chat ID:', chatId);

// Send chatId to the background script if not already sent
if (chatId) {
    chrome.runtime.sendMessage({ type: 'CHAT_ID', chatId: chatId }, (response) => {
        if (chrome.runtime.lastError) {
            console.error('Runtime error:', chrome.runtime.lastError);
        } else if (response && response.status === 'success') {
            console.log('Background script received the chat ID successfully.');
        } else {
            console.error('Failed to send chat ID to background.');
        }
    });
} else {
    console.error('Chat ID not found in URL.');
}
