// background.js
/* global chrome */
chrome.action.onClicked.addListener((tab) => {
    console.log('Extension icon clicked, injecting content script');
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['contentScript.js']
    }, () => {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
        } else {
            console.log('Content script injected successfully.');
        }
    });
});


let currentChatId = null;

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'CHAT_ID') {
        currentChatId = message.chatId;
        console.log('Chat ID received in background:', currentChatId);
        sendResponse({ status: 'success' });
    } else if (message.type === 'REQUEST_CHAT_ID') {
        // Respond with the stored chat ID when requested by the popup
        if (currentChatId) {
            sendResponse({ chatId: currentChatId });
        } else {
            sendResponse({ status: 'error', message: 'No Chat ID found' });
        }
    } else {
        sendResponse({ status: 'error', message: 'Unknown message type' });
    }
});

// chrome.action.onClicked.addListener((tab) => {
//     chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         files: ['contentScript.js']
//     });
// });

// let currentChatId = null;

// // Listen for messages from the content script
// /*global chrome*/
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.type === 'CHAT_ID') {
//         currentChatId = message.chatId;
//         console.log('Chat ID received in background:', currentChatId);
//         sendResponse({ status: 'success' });
//     } else if (message.type === 'REQUEST_CHAT_ID') {
//         // Respond with the stored chat ID when requested by the popup
//         if (currentChatId) {
//             sendResponse({ chatId: currentChatId });
//         } else {
//             sendResponse({ status: 'error', message: 'No Chat ID found' });
//         }
//     } else {
//         sendResponse({ status: 'error', message: 'Unknown message type' });
//     }
// });

