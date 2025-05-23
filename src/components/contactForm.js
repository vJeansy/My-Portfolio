export function contactForm() {
    const form = document.getElementById("contactForm");
    const emailInput = document.getElementById("message");
    const errorMessage = document.getElementById("error-message");
    const submitButton = document.getElementById("sendBtn");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const emailValue = emailInput.value;
        if (validateEmail(emailValue)) {
            errorMessage.textContent = "";
            window.location.href = `mailto:jeansypenar@outlook.com?subject=Contact&body=${encodeURIComponent(emailValue)}`;
            // Handle successful email submission
            console.log("Email submitted:", emailValue);
        } else {
            errorMessage.textContent = "Please enter a valid email address.";
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
}