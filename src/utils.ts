import browser from "webextension-polyfill";

// export function getCurrentTabUrl() {
//   // Query the current active tab
//   browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
//     // tabs is an array, but it will contain only the current active tab
//     // as specified by the query parameters
//     let currentTab = tabs[0];
//
//     // Check if we got the tab
//     if (currentTab) {
//       // Log or use the tab URL
//       console.log(currentTab.url);
//       return currentTab.url;
//
//     }else {
//       throw new Error('No active tab found');
//     }
//   }).catch((error) => {
//     // Handle error
//     console.error(error);
//   });
// }

export async function getCurrentTabUrl(): Promise<string> {
  let tabs = await browser.tabs.query({active: true, currentWindow: true});
  let currentTab = tabs[0];

  if (currentTab) {
    return currentTab.url as string;
  } else {
    throw new Error('No active tab found');
  }
}

