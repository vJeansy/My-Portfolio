export function initScrollButton() {
    window.onscroll = function() { // detect the scroll.
        const upButton = document.createElement("button");
        upButton.id = "upButton";
        upButton.textContent = "↑";
        upButton.classList.add("up-button");
        document.body.appendChild(upButton);
        // Mostrar el botón si el usuario hace scroll down
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
          upButton.classList.add("show");
        }
        // Hide the button if the user scrolls to the top
        else {
          upButton.classList.remove("show");
        }
        // Scroll to the top when the button is clicked
        upButton.onclick = function() {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        };
    }
};