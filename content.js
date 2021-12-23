// get container of all YT videos in the "Today" section of the subscriptions page
const todayVideosContainer = document.querySelector("#items.ytd-grid-renderer");

// retrieve all counts from storage
chrome.storage.sync.get(null, function (channelCounts) {
    const getChannelCount = function (elt) {
        const channelNameElt = elt.getElementsByTagName("ytd-channel-name")[0];
        const channelName = channelNameElt.innerText;
        return channelName in channelCounts ? channelCounts[channelName] : 0;
    };

    // sort videos in the "Today" section from highest to lowest counts
    Array.from(todayVideosContainer.children)
        .sort((a, b) => getChannelCount(b) - getChannelCount(a))
        .forEach((node) => todayVideosContainer.appendChild(node));
});
