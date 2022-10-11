let color = '#3aa757';

chrome.tabs.onCreated.addListener(async (tabData) => {
  console.log('tab created', tabData.pendingUrl);
  if (tabData.pendingUrl && tabData.pendingUrl === 'chrome://newtab/') {
    console.log('updating: ' + tabData.id);
    const result = await chrome.tabs.update(tabData.id, { url: 'https://personalswh.com' });
    await chrome.tabs.reload();
    console.log('result', result);
  }
});

chrome.runtime.onInstalled.addListener(() => {
  console.log('Installed');
});
