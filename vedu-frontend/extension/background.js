/* global chrome */
let currentChatId = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'CHAT_ID') {
        currentChatId = message.chatId;
        console.log('Chat ID received in background:', currentChatId);
        sendResponse({ status: 'success' });
    } else if (message.type === 'REQUEST_CHAT_ID') {
        // Respond with the stored chat ID when requested by the popup
        sendResponse({ chatId: currentChatId });
    } else {
        sendResponse({ status: 'error', message: 'Unknown message type' });
    }
});
