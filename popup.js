let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({color}) => {
    console.log("Color from chrome storage", color);
    changeColor.style.backgroundColor = color;
});

changeColor.addEventListener("click", async () => {
    console.log("Click event")
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    console.log("tabs", tab);

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: setPageBackgroundColor,
    })
});

function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({color}) => {
        console.log("Changing Color from chrome storage", color);
        document.body.style.backgroundColor = color
    });
}
