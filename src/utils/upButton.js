export function initScrollButton() {
    // Create the button once
    let upButton = document.getElementById("upButton");
    if (!upButton) {
        upButton = document.createElement("button");
        upButton.id = "upButton";
        upButton.textContent = "↑";
        upButton.classList.add("up-button", "hidden");
        document.body.appendChild(upButton);
        upButton.onclick = function() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        };
    }

    window.onscroll = function() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            upButton.classList.add("show");
            upButton.classList.remove("hidden");
        } else {
            upButton.classList.remove("show");
            upButton.classList.add("hidden")
        }
    };
}