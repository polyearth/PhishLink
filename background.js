// PhishGuard Background Service Worker
const suspiciousDomains = [
  'paypel.com',
  'amaz0n.com',
  'g00gle.com',
  'facebok.com',
  'twiter.com',
  'appleid.apple.com-signin.us',
  'secure-bankofamerica.com'
];

// Function to check if a URL contains suspicious patterns
function isPotentialPhishing(url) {
  try {
    const domain = new URL(url).hostname;
    
    // Check against known suspicious domains
    if (suspiciousDomains.some(d => domain.includes(d))) {
      return true;
    }
    
    // Check for suspicious patterns in URL
    const suspiciousPatterns = [
      'login',
      'signin',
      'account',
      'secure',
      'update',
      'verify'
    ];
    
    const hasMultipleSuspiciousPatterns = suspiciousPatterns.filter(pattern => 
      url.toLowerCase().includes(pattern)).length >= 2;
      
    const hasSuspiciousTLD = domain.endsWith('.tk') || 
                             domain.endsWith('.ml') || 
                             domain.endsWith('.ga');
                             
    const hasExcessiveSubdomains = domain.split('.').length > 3;
    
    // Return true if multiple suspicious factors are found
    return (hasMultipleSuspiciousTLD && hasMultipleSuspiciousPatterns) || 
           (hasExcessiveSubdomains && hasMultipleSuspiciousPatterns);
           
  } catch (e) {
    console.error("Error analyzing URL:", e);
    return false;
  }
}

// Listen for navigation events
chrome.webNavigation.onCommitted.addListener(async (details) => {
  // Only check main frame navigations
  if (details.frameId === 0) {
    const url = details.url;
    
    // Skip browser internal pages
    if (url.startsWith('chrome://') || url.startsWith('chrome-extension://')) {
      return;
    }
    
    // Check if the site is potentially a phishing site
    const isPotentialThreat = isPotentialPhishing(url);
    
    // Store the result in local storage
    await chrome.storage.local.set({
      [url]: {
        checked: true,
        isPotentialThreat,
        timestamp: Date.now()
      }
    });
    
    // If potential threat, update the icon and show a warning
    if (isPotentialThreat) {
      // Send message to any open popups
      chrome.runtime.sendMessage({
        action: 'phishingDetected',
        url
      });
      
      // Alert the user with a browser notification
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs.length > 0) {
          chrome.tabs.sendMessage(tabs[0].id, {
            action: 'showWarning',
            url
          });
        }
      });
    }
  }
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'checkCurrentPage') {
    chrome.tabs.query({active: true, currentWindow: true}, async (tabs) => {
      if (tabs.length > 0) {
        const url = tabs[0].url;
        
        // Check if we have already analyzed this URL
        const data = await chrome.storage.local.get(url);
        
        if (data[url]) {
          sendResponse(data[url]);
        } else {
          // If not yet analyzed, do it now
          const isPotentialThreat = isPotentialPhishing(url);
          
          const result = {
            checked: true,
            isPotentialThreat,
            timestamp: Date.now()
          };
          
          // Store the result
          await chrome.storage.local.set({[url]: result});
          sendResponse(result);
        }
      }
    });
    
    // Return true to indicate we will respond asynchronously
    return true;
  }
});

// Initialize when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  console.log("PhishGuard extension installed successfully");
});