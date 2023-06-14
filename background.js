const VIDEO_SUMMERIZER_URL = 'https://chat.openai.com/share/ea0b7446-42eb-4a4e-88e2-de75f5a1eefc';

browser.browserAction.onClicked.addListener((tab) => {
    console.log('Browser action clicked!');
});

// Create a new context menu item.
browser.contextMenus.create({
    id: "my-extension-link-action",
    title: "Summarize using ChatGPT",
    contexts: ["link"], // ContextType
}, () => {
    if (browser.runtime.lastError) {
        console.error(browser.runtime.lastError);
    } else {
        console.log('Context menu item created successfully.');
    }
});

// Add an onClicked listener for the context menu item.
browser.contextMenus.onClicked.addListener((info, tab) => {
    console.log('contextMenus.onClicked event fired.');
    if (info.menuItemId === "my-extension-link-action") {
        console.log("You clicked a link!");
        console.log("Link URL:", info.linkUrl);

        // Open a new tab with the link URL. Encode the video query parameter.
        browser.tabs.create({url: `${VIDEO_SUMMERIZER_URL}?video=${encodeURIComponent(info.linkUrl)}`});

    }
});

