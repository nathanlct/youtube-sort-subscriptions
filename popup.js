const channelsList = document.getElementById("channelsList");

chrome.storage.sync.get(null, (counts) =>
    Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .forEach(function ([name, count]) {
            const listItem = document.createElement("li");

            const crossDiv = document.createElement("div");
            crossDiv.appendChild(document.createTextNode("\u00D7"));
            crossDiv.classList.add("cross");
            crossDiv.setAttribute("title", "Delete row");

            crossDiv.addEventListener("click", () => {
                listItem.remove();
                chrome.storage.sync.remove(name);
            });

            const countDiv = document.createElement("div");
            countDiv.appendChild(document.createTextNode(count));
            countDiv.classList.add("count");

            const nameDiv = document.createElement("div");
            nameDiv.appendChild(document.createTextNode(name));
            nameDiv.classList.add("name");
            nameDiv.setAttribute("title", name);

            listItem.appendChild(crossDiv);
            listItem.appendChild(countDiv);
            listItem.appendChild(nameDiv);

            channelsList.appendChild(listItem);
        })
);
