chrome.commands.onCommand.addListener((command) => {
  if (command === "trigger-autofill") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: {
          tabId: tabs[0].id,
          allFrames: true // ⬅ THIS is crucial
        },
        files: ["content.js"]
      });
    });
  }
});
