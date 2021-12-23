const baseYtVidURL = "https://www.youtube.com/watch?v";

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    // when a YouTube video webpage has loaded
    if (
        tab.active &&
        tab.url.startsWith(baseYtVidURL) &&
        changeInfo.title != null
    ) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            function: incrementYtChannel,
        });
    }
});

// increment the storage value for the YouTube channel on the current page
function incrementYtChannel() {
    // retrieve channel name
    const channelNameContainer = document.querySelector(
        "ytd-channel-name#channel-name.ytd-video-owner-renderer"
    );
    if (channelNameContainer != null) {
        const channelName = channelNameContainer.innerText;

        // get number of times channel has been watched
        // or 0 if key does not exist ie it has never been watched
        chrome.storage.sync.get({ [channelName]: 0 }, function (result) {
            // increment that number
            chrome.storage.sync.set({ [channelName]: result[channelName] + 1 });
        });
    }
}
