let page = document.getElementById("buttonDiv");
let  selectedClassName = "current";
const presetButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"];

function handleButtonClick(event) {
    let current = event.target.parentElement.querySelector(
        `.${selectedClassName}`
    );

    console.log('Immediate previous/parent element',event.target.parentElement.querySelector(
        `.${selectedClassName}`));
    console.log('current event.target.parentElement.querySelector()', current)
    console.log('Event target',event.target);
    console.log(current !== event.target)
    console.log('classList',current.classList)
    console.log('dataset',event.target.dataset)
    if (current && current !== event.target){
        current.classList.remove(selectedClassName)
    }

    let color = event.target.dataset.color;
    event.target.classList.add(selectedClassName);
    chrome.storage.sync.set({color});
}

function constructOptions(buttonColors) {
    chrome.storage.sync.get("color", (data) =>{
        let currentColor = data.color;

        for (let buttonColor of buttonColors){
            let  button = document.createElement("button");
            button.dataset.color = buttonColor;
            button.style.backgroundColor = buttonColor;
            if (buttonColor === currentColor){
                button.classList.add(selectedClassName)
            }
            button.addEventListener("click", handleButtonClick);
            page.appendChild(button);
        }
    })

}

constructOptions(presetButtonColors);
