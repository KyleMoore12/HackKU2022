let test = [{
    id: 'ojgfdsk',
    link: 'https://google.com',
    description: "this is google",
    todos: ['check out google']
}]

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ links: JSON.stringify(test) });
  });