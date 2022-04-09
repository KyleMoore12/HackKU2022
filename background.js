let test = [{
    id: 'ojgfdsk',
    link: 'https://google.com',
    description: "this is google",
    todos: ['check out google', 'testing']
},{
    id: 'ojgffdsdsk',
    link: 'https://googltgbbtrrhtbnnhyrbhbrbhyrbrhbghbhrbrgbeegfbeegfeebgebgrebgregrefsde.com',
    description: "thfdsis is google",
    todos: ['check out gofdsogle', 'testing']
}]

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ links: JSON.stringify(test) });
  });