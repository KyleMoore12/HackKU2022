let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.sync.set({ color });
	console.log('Default background color set to %cgreen', `color: ${color}`);
});

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}