/* global chrome */
let currentURL = window.location.href;

console.log("Content script loaded and running on:", currentURL);

function checkForURLChange() {
  if (window.location.href !== currentURL) {
    console.log("URL changed from", currentURL, "to", window.location.href);
    currentURL = window.location.href;
    myFunction(); // This is the function to run when the URL changes
  }
}

// This function will be called when the URL changes
function myFunction() {
  // Extract chatId or other dynamic data from the URL
  const chatId = window.location.pathname.split('/').pop();
  console.log('Chat ID found:', chatId);

  // Send chatId to the background script
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
    console.error('Chat ID not found.');
  }
}

// Immediately run the function to check the current URL
myFunction();

// Use setInterval with a lower polling rate (e.g., 500ms)
setInterval(checkForURLChange, 500);
