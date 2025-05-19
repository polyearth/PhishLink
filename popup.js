document.addEventListener('DOMContentLoaded', function() {
  const statusElement = document.getElementById('status');
  const currentUrlElement = document.getElementById('current-url');
  const safeResultElement = document.getElementById('safe-result');
  const warningResultElement = document.getElementById('warning-result');
  const settingsToggle = document.getElementById('settings-toggle');
  const settingsPanel = document.getElementById('settings-panel');
  const protectionLevel = document.getElementById('protection-level');
  const notificationToggle = document.getElementById('notification-toggle');

  // Load saved settings
  chrome.storage.local.get(['protectionLevel', 'notificationsEnabled'], function(data) {
    if (data.protectionLevel) {
      protectionLevel.value = data.protectionLevel;
    }
    if (data.notificationsEnabled !== undefined) {
      notificationToggle.checked = data.notificationsEnabled;
    }
  });

  // Save settings when changed
  protectionLevel.addEventListener('change', function() {
    chrome.storage.local.set({ protectionLevel: protectionLevel.value });
  });

  notificationToggle.addEventListener('change', function() {
    chrome.storage.local.set({ notificationsEnabled: notificationToggle.checked });
  });

  // Toggle settings panel
  settingsToggle.addEventListener('click', function() {
    settingsPanel.classList.toggle('hidden');
  });

  // Get the current active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (tabs.length > 0) {
      const currentTab = tabs[0];
      const url = currentTab.url;
      
      // Display the current URL
      currentUrlElement.textContent = url;
      
      // Check if this is a browser internal page
      if (url.startsWith('chrome://') || url.startsWith('chrome-extension://')) {
        statusElement.classList.remove('loading');
        statusElement.innerHTML = '<span>PhishGuard doesn\'t analyze browser pages</span>';
        return;
      }
      
      // Request analysis from the background script
      chrome.runtime.sendMessage({
        action: 'checkCurrentPage'
      }, function(response) {
        // Hide the loading indicator
        statusElement.classList.remove('loading');
        statusElement.classList.add('hidden');
        
        if (response && response.checked) {
          if (response.isPotentialThreat) {
            // Show warning
            warningResultElement.classList.remove('hidden');
            
            // Add animation class
            warningResultElement.classList.add('warning-pulse');
          } else {
            // Show safe result
            safeResultElement.classList.remove('hidden');
          }
        } else {
          // If no response or error, show a message
          statusElement.classList.remove('hidden');
          statusElement.innerHTML = '<span>Unable to analyze this page</span>';
        }
      });
    } else {
      statusElement.classList.remove('loading');
      statusElement.innerHTML = '<span>No active tab found</span>';
    }
  });
  
  // Listen for messages from background script
  chrome.runtime.onMessage.addListener(function(message) {
    if (message.action === 'phishingDetected') {
      // Update UI if the current page is detected as phishing
      statusElement.classList.add('hidden');
      safeResultElement.classList.add('hidden');
      warningResultElement.classList.remove('hidden');
      warningResultElement.classList.add('warning-pulse');
    }
  });
});